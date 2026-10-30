import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { findBooking } from '../api/napApi';
import Bill from './Bill';
import StatusMessage from './StatusMessage';

export default function FindBill({ onClose }) {
  const { t } = useI18n();
  const [phone, setPhone] = useState('');
  const [number, setNumber] = useState('');
  const [state, setState] = useState({ status: 'idle', booking: null });

  async function handleSubmit(e) {
    e.preventDefault();
    setState({ status: 'loading', booking: null });
    try {
      const b = await findBooking(phone, number);
      setState(b ? { status: 'found', booking: b } : { status: 'notfound', booking: null });
    } catch {
      setState({ status: 'error', booking: null });
    }
  }

  if (state.status === 'found') {
    return <Bill booking={state.booking} onClose={onClose} closeLabel={t('closeFind')} />;
  }
  return (
    <section>
      <h2>{t('findBill')}</h2>
      <p className="muted">{t('findHint')}</p>
      <form onSubmit={handleSubmit}>
        <label className="field" htmlFor="fb-phone">{t('phone')}</label>
        <input id="fb-phone" className="input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 701 123 45 67" />
        <label className="field" htmlFor="fb-no">{t('bookingNo')}</label>
        <input id="fb-no" className="input" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="GN-20260101-0001" />
        {state.status === 'notfound' && <StatusMessage>{t('notFound')}</StatusMessage>}
        {state.status === 'error' && <StatusMessage>{t('loadError')}</StatusMessage>}
        <div className="actions">
          <button type="button" className="btn" onClick={onClose}>{t('closeFind')}</button>
          <button type="submit" className="btn primary" disabled={state.status === 'loading' || !phone || !number}>
            {state.status === 'loading' ? t('processing') : t('find')}
          </button>
        </div>
      </form>
    </section>
  );
}
