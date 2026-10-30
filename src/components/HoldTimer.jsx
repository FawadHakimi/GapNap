import { useState, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { pad } from '../utils/time';

export default function HoldTimer({ expires, paused, onExpire }) {
  const { t } = useI18n();
  const [left, setLeft] = useState(() => Math.max(0, expires - Date.now()));

  useEffect(() => {
    if (paused) return undefined; // do not expire in the middle of a payment
    const id = setInterval(() => {
      const l = expires - Date.now();
      if (l <= 0) {
        clearInterval(id);
        onExpire();
      } else {
        setLeft(l);
      }
    }, 1000);
    return () => clearInterval(id); // cleanup
  }, [expires, paused, onExpire]);

  const s = Math.ceil(left / 1000);
  return <p className="hold small" role="timer">{t('holdLeft', { time: `${Math.floor(s / 60)}:${pad(s % 60)}` })}</p>;
}
