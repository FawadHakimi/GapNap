import { useI18n } from '../i18n/I18nContext';

const LANGS = [['en', 'EN'], ['ru', 'RU'], ['kk', 'KZ']];

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang">
      {LANGS.map(([code, label]) => (
        <button key={code} type="button" className="lang-btn" aria-pressed={lang === code} onClick={() => setLang(code)}>
          {label}
        </button>
      ))}
    </div>
  );
}
