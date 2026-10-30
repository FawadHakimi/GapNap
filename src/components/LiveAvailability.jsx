import { useState, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { BEDS, OPEN, CLOSE } from '../config/config';
import { dateKey, fmtTime, overlaps } from '../utils/time';
import { getBookings } from '../api/napApi';
import Spinner from './Spinner';
import StatusMessage from './StatusMessage';

export default function LiveAvailability() {
  const { t } = useI18n();
  const [state, setState] = useState({ status: 'loading', bookings: [] });
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false; // ignore outdated responses
    setState((s) => ({ ...s, status: 'loading' }));
    getBookings(dateKey(new Date()))
      .then((bookings) => { if (!cancelled) setState({ status: 'ready', bookings }); })
      .catch(() => { if (!cancelled) setState({ status: 'error', bookings: [] }); });
    return () => { cancelled = true; };
  }, [reload]);

  const hours = { from: fmtTime(OPEN), to: fmtTime(CLOSE) };
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const open = nowMin >= OPEN && nowMin < CLOSE;
  const busyBeds = new Set(state.bookings.filter((x) => overlaps(nowMin, nowMin + 1, x.start, x.start + x.duration)).map((x) => x.bed));
  const free = BEDS - busyBeds.size;

  let body;
  if (state.status === 'loading') body = <Spinner />;
  else if (state.status === 'error') {
    body = (
      <StatusMessage action={<button type="button" className="btn small-btn" onClick={() => setReload((r) => r + 1)}>{t('retry')}</button>}>
        {t('loadError')}
      </StatusMessage>
    );
  } else if (!open) body = <StatusMessage kind="info">{t('liveClosed', hours)}</StatusMessage>;
  else if (free === 0) body = <StatusMessage kind="info">{t('liveFull')}</StatusMessage>;
  else body = <p className="card live">{t('liveFree', { n: free, total: BEDS })}</p>;

  return (
    <section>
      <h2>{t('liveTitle')}</h2>
      {body}
    </section>
  );
}
