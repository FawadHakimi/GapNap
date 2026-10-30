import { useI18n } from '../i18n/I18nContext';

export default function DatePicker({ dates, value, onChange }) {
  const { t, fmtDate } = useI18n();
  return (
    <div className="chips" role="group" aria-label={t('date')}>
      {dates.map((key, i) => (
        <button key={key} type="button" className="chip" aria-pressed={key === value} onClick={() => onChange(key)}>
          <span className="small">{i === 0 ? t('today') : fmtDate(key, { weekday: 'short' })}</span>
          <strong>{fmtDate(key, { day: 'numeric', month: 'short' })}</strong>
        </button>
      ))}
    </div>
  );
}
