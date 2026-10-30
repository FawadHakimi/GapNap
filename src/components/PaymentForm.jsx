import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { normalizePhone } from '../utils/phone';

export default function PaymentForm({ onSubmit, busy, failed, children }) {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);

  const nameOk = name.trim().length >= 2 && name.trim().length <= 50;
  const phoneNorm = normalizePhone(phone);

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (nameOk && phoneNorm) onSubmit({ name: name.trim(), phone: phoneNorm });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label className="field" htmlFor="nr-name">{t('name')}</label>
      <input id="nr-name" className="input" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setTouched(true)} autoComplete="name" aria-invalid={touched && !nameOk} />
      {touched && !nameOk && <p className="err small">{t('nameErr')}</p>}

      <label className="field" htmlFor="nr-phone">{t('phone')}</label>
      <input id="nr-phone" className="input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={() => setTouched(true)} placeholder="+7 701 123 45 67" autoComplete="tel" aria-invalid={touched && !phoneNorm} />
      {touched && !phoneNorm && <p className="err small">{t('phoneErr')}</p>}

      {children}
      <button type="submit" className="btn primary block" disabled={busy}>
        {busy ? t('processing') : failed ? t('retry') : t('iPaid')}
      </button>
    </form>
  );
}
