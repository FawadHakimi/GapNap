import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { normalizePhone } from '../utils/phone';
import { sendSupportRequest } from '../api/napApi';
import StatusMessage from './StatusMessage';

const TOPICS = [['payment', 'topicPayment'], ['booking', 'topicBooking'], ['bill', 'topicBill'], ['other', 'topicOther']];
const MAX = 500;

export default function SupportForm({ initialBooking }) {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', phone: '', topic: 'payment', booking: initialBooking, message: '' });
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | error | success
  const [number, setNumber] = useState('');
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const nameOk = form.name.trim().length >= 2 && form.name.trim().length <= 50;
  const phoneNorm = normalizePhone(form.phone);
  const msgLen = form.message.trim().length;
  const msgOk = msgLen >= 10 && msgLen <= MAX;

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!nameOk || !phoneNorm || !msgOk) return;
    setStatus('sending');
    try {
      const res = await sendSupportRequest({ name: form.name.trim(), phone: phoneNorm, topic: form.topic, bookingNumber: form.booking.trim(), message: form.message.trim() });
      setNumber(res.number);
      setForm({ name: '', phone: '', topic: 'payment', booking: '', message: '' }); // clear after success
      setTouched(false);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div>
        <StatusMessage kind="success">{t('supportSent')}</StatusMessage>
        <p>{t('requestNo')}: <strong>{number}</strong></p>
        <button type="button" className="btn" onClick={() => setStatus('idle')}>{t('sendAnother')}</button>
      </div>
    );
  }
  const sending = status === 'sending';
  return (
    <form onSubmit={handleSubmit} noValidate>
      <label className="field" htmlFor="sp-name">{t('name')}</label>
      <input id="sp-name" className="input" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={touched && !nameOk} />
      {touched && !nameOk && <p className="err small">{t('nameErr')}</p>}

      <label className="field" htmlFor="sp-phone">{t('phone')}</label>
      <input id="sp-phone" className="input" type="tel" value={form.phone} onChange={set('phone')} placeholder="+7 701 123 45 67" autoComplete="tel" aria-invalid={touched && !phoneNorm} />
      {touched && !phoneNorm && <p className="err small">{t('phoneErr')}</p>}

      <label className="field" htmlFor="sp-topic">{t('topic')}</label>
      <select id="sp-topic" className="input" value={form.topic} onChange={set('topic')}>
        {TOPICS.map(([value, label]) => <option key={value} value={value}>{t(label)}</option>)}
      </select>

      <label className="field" htmlFor="sp-booking">{t('bookingOptional')}</label>
      <input id="sp-booking" className="input" value={form.booking} onChange={set('booking')} placeholder="GN-20260101-0001" />

      <label className="field" htmlFor="sp-msg">{t('message')}</label>
      <textarea id="sp-msg" className="input" rows={5} maxLength={MAX} value={form.message} onChange={set('message')} aria-invalid={touched && !msgOk} />
      <p className="small muted counter">{form.message.length}/{MAX}</p>
      {touched && !msgOk && <p className="err small">{t('messageErr')}</p>}

      {status === 'error' && <StatusMessage>{t('sendFail')}</StatusMessage>}
      <button type="submit" className="btn primary block" disabled={sending}>
        {sending ? t('processing') : status === 'error' ? t('retry') : t('sendMessage')}
      </button>
    </form>
  );
}
