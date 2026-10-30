import { useState, useEffect, useCallback } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { BEDS, DAYS, DURATIONS, OPEN, CLOSE, STEP, PRICES } from '../config/config';
import { addDays, dateKey, fmtPrice, fmtTime, overlaps } from '../utils/time';
import { getBookings, holdBed, releaseHold, createBooking } from '../api/napApi';
import StepIndicator from './StepIndicator';
import DurationCard from './DurationCard';
import DatePicker from './DatePicker';
import TimeGrid from './TimeGrid';
import BedGrid from './BedGrid';
import HoldTimer from './HoldTimer';
import PaymentForm from './PaymentForm';
import QrPayment from './QrPayment';
import Bill from './Bill';
import Spinner from './Spinner';
import StatusMessage from './StatusMessage';

const BED_NUMBERS = Array.from({ length: BEDS }, (_, i) => i + 1);

export default function NapBooking({ initialDuration = null }) {
  const { t, fmtDate } = useI18n();
  const [step, setStep] = useState(initialDuration ? 2 : 1); // price card on Home: step 1 already done
  const [duration, setDuration] = useState(initialDuration);
  const [date, setDate] = useState(() => dateKey(new Date()));
  const [start, setStart] = useState(null);
  const [bed, setBed] = useState(null);
  const [hold, setHold] = useState(null);
  const [bill, setBill] = useState(null);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);
  const [payFailed, setPayFailed] = useState(false);
  const [avail, setAvail] = useState({ status: 'loading', bookings: [] });
  const [reload, setReload] = useState(0);

  // Load availability when the date changes. `cancelled` ignores outdated responses.
  useEffect(() => {
    let cancelled = false;
    setAvail((a) => ({ ...a, status: 'loading' }));
    getBookings(date)
      .then((bookings) => { if (!cancelled) setAvail({ status: 'ready', bookings }); })
      .catch(() => { if (!cancelled) setAvail({ status: 'error', bookings: [] }); });
    return () => { cancelled = true; };
  }, [date, reload]);

  // Derived values, computed during render.
  const now = new Date();
  const dates = Array.from({ length: DAYS }, (_, i) => dateKey(addDays(now, i)));
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const isBusyAt = (b, s) => avail.bookings.some((x) => x.bed === b && overlaps(s, s + duration, x.start, x.start + x.duration));
  const freeAt = (s) => BED_NUMBERS.filter((b) => !isBusyAt(b, s)).length;
  const slots = [];
  if (duration) {
    for (let s = OPEN; s + duration <= CLOSE; s += STEP) {
      slots.push({ start: s, disabled: (date === dates[0] && s < nowMin) || freeAt(s) === 0 });
    }
  }
  const noSlots = avail.status === 'ready' && slots.every((s) => s.disabled);

  function chooseDuration(d) {
    setDuration(d);
    if (start !== null && start + d > CLOSE) setStart(null);
    setBed(null);
  }
  function chooseDate(k) { setDate(k); setStart(null); setBed(null); }
  function chooseStart(s) { setStart(s); setBed(null); }

  function goToBeds() {
    setNotice(null);
    setReload((r) => r + 1); // refresh availability before choosing a bed
    setStep(3);
  }

  async function goToPayment() {
    setBusy(true);
    setNotice(null);
    try {
      setHold(await holdBed({ bed, date, start, duration }));
      setPayFailed(false);
      setStep(4);
    } catch (e) {
      setNotice(e.message === 'conflict' ? 'conflict' : 'loadError');
      setBed(null);
      setReload((r) => r + 1);
    } finally {
      setBusy(false);
    }
  }

  async function backFromPayment() {
    const id = hold.id;
    setHold(null);
    setStep(3);
    setReload((r) => r + 1);
    await releaseHold(id).catch(() => {});
    setReload((r) => r + 1);
  }

  function reset() {
    setStep(1); setDuration(null); setDate(dateKey(new Date())); setStart(null);
    setBed(null); setHold(null); setBill(null); setPayFailed(false);
  }

  const handleExpire = useCallback(() => {
    if (hold) releaseHold(hold.id).catch(() => {});
    reset();
    setNotice('holdExpired');
  }, [hold]);

  async function pay({ name, phone }) {
    setBusy(true);
    setNotice(null);
    setPayFailed(false);
    try {
      const booking = await createBooking({ holdId: hold.id, bed, date, start, duration, name, phone });
      setHold(null);
      setBill(booking);
    } catch (e) {
      if (e.message === 'conflict') {
        setNotice('conflict');
        setHold(null);
        setBed(null);
        setStep(3);
        setReload((r) => r + 1);
      } else {
        setPayFailed(true);
        setNotice('payFail');
      }
    } finally {
      setBusy(false);
    }
  }

  if (bill) return <Bill booking={bill} onClose={() => { reset(); setNotice(null); }} closeLabel={t('another')} />;

  const availState = avail.status === 'loading' ? <Spinner /> : avail.status === 'error' ? (
    <StatusMessage action={<button type="button" className="btn small-btn" onClick={() => setReload((r) => r + 1)}>{t('retry')}</button>}>
      {t('loadError')}
    </StatusMessage>
  ) : null;

  return (
    <div>
      <StepIndicator step={step} />
      {notice && <StatusMessage>{t(notice)}</StatusMessage>}

      {step === 1 && (
        <section>
          <h2>{t('chooseDuration')}</h2>
          <div className="cards">
            {DURATIONS.map((d) => (
              <DurationCard key={d} minutes={d} selected={duration === d} onSelect={chooseDuration} />
            ))}
          </div>
          <div className="actions">
            <button type="button" className="btn primary" disabled={!duration} onClick={() => { setNotice(null); setStep(2); }}>{t('next')}</button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section>
          <h2>{t('chooseTime')}</h2>
          <DatePicker dates={dates} value={date} onChange={chooseDate} />
          {availState}
          {avail.status === 'ready' && (noSlots
            ? <StatusMessage kind="info">{t('noSlots')}</StatusMessage>
            : <TimeGrid slots={slots} value={start} onChange={chooseStart} />)}
          <div className="actions">
            <button type="button" className="btn" onClick={() => setStep(1)}>{t('back')}</button>
            <button type="button" className="btn primary" disabled={start === null || avail.status !== 'ready'} onClick={goToBeds}>{t('next')}</button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section>
          <h2>{t('chooseBed')}</h2>
          {availState}
          {avail.status === 'ready' && (
            <>
              <p className="muted">{t('bedsFree', { n: freeAt(start), total: BEDS })}</p>
              <BedGrid beds={BED_NUMBERS} selected={bed} isBusy={(n) => isBusyAt(n, start)} onSelect={setBed} />
            </>
          )}
          <div className="actions">
            <button type="button" className="btn" onClick={() => setStep(2)}>{t('back')}</button>
            <button type="button" className="btn primary" disabled={!bed || busy || avail.status !== 'ready'} onClick={goToPayment}>
              {busy ? t('processing') : t('next')}
            </button>
          </div>
        </section>
      )}

      {step === 4 && hold && (
        <section>
          <h2>{t('payTitle')}</h2>
          <HoldTimer expires={hold.expires} paused={busy} onExpire={handleExpire} />
          <div className="card summary">
            <div className="row"><span className="muted">{t('bed')}</span><strong>{bed}</strong></div>
            <div className="row"><span className="muted">{t('date')}</span><strong>{fmtDate(date, { weekday: 'short', day: 'numeric', month: 'long' })}</strong></div>
            <div className="row"><span className="muted">{t('time')}</span><strong>{fmtTime(start)}–{fmtTime(start + duration)}</strong></div>
            <div className="row"><span className="muted">{t('total')}</span><strong>{fmtPrice(PRICES[duration])}</strong></div>
          </div>
          <PaymentForm onSubmit={pay} busy={busy} failed={payFailed}>
            <QrPayment value={`GAPNAP|${hold.id}|${PRICES[duration]}|KZT`} amount={PRICES[duration]} />
          </PaymentForm>
          <div className="actions">
            <button type="button" className="btn" disabled={busy} onClick={backFromPayment}>{t('back')}</button>
          </div>
        </section>
      )}

      <p className="center"><a className="link no-print" href="#/find">{t('findBill')}</a></p>
    </div>
  );
}
