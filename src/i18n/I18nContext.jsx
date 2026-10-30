import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import en from './en';
import ru from './ru';
import kk from './kk';

const dicts = { en, ru, kk };
const locales = { en: 'en-GB', ru: 'ru-RU', kk: 'kk-KZ' };
const Ctx = createContext(null);

function initialLang() {
  try {
    const s = localStorage.getItem('gapnap_lang');
    if (dicts[s]) return s;
  } catch { /* ignore */ }
  const b = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return dicts[b] ? b : 'en';
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  useEffect(() => {
    try { localStorage.setItem('gapnap_lang', lang); } catch { /* ignore */ }
  }, [lang]);

  const value = useMemo(() => {
    const locale = locales[lang];
    return {
      lang,
      setLang,
      t: (key, params = {}) => {
        let s = dicts[lang][key] ?? dicts.en[key] ?? key;
        for (const p in params) s = s.replace(`{${p}}`, params[p]);
        return s;
      },
      fmtDate: (key, opts) => new Intl.DateTimeFormat(locale, opts).format(new Date(`${key}T00:00:00`)),
      fmtDateTime: (iso) => new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso)),
    };
  }, [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
