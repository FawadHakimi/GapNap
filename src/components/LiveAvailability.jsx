import { useState, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { BEDS, OPEN, CLOSE } from '../config/config';
import { ROOMS } from '../config/venue';
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

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const open = nowMin >= OPEN && nowMin < CLOSE;
  const busy = new Set(state.bookings.filter((x) => overlaps(nowMin, nowMin + 1, x.start, x.start + x.duration)).map((x) => x.bed));
  const perRoom = ROOMS.map((r) => ({ id: r.id, free: r.to - r.from + 1 - [...busy].filter((b) => b >= r.from && b <= r.to).length }));
  const free = BEDS - busy.size;

  let body;
  if (state.status === 'loading') body = <Spinner />;
  else if (state.status === 'error') {
    body = (
      <StatusMessage action={<button type="button" className="btn small-btn" onClick={() => setReload((r) => r + 1)}>{t('retry')}</button>}>
        {t('loadError')}
      </StatusMessage>
    );
  } else if (!open) body = <StatusMessage kind="info">{t('liveClosed', { from: fmtTime(OPEN), to: fmtTime(CLOSE) })}</StatusMessage>;
  else if (free === 0) body = <StatusMessage kind="info">{t('liveFull')}</StatusMessage>;
  else {
    body = (
      <div className="card live-card">
        <div>
          <p className="live">{t('liveFree', { n: free, total: BEDS })}</p>
          <p className="muted small">{perRoom.map((r) => t('roomFree', { n: r.id, free: r.free })).join(' · ')}</p>
        </div>
        <a className="btn primary" href="#/book">{t('seeFree')}</a>
      </div>
    );
  }
  return (
    <section className="section">
      <h2 className="sr-only">{t('liveTitle')}</h2>
      {body}
    </section>
  );
}
