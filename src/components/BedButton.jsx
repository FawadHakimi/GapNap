import { useI18n } from '../i18n/I18nContext';

export default function BedButton({ number, state, onSelect }) {
  const { t } = useI18n();
  const label = t(state === 'busy' ? 'booked' : state === 'selected' ? 'selected' : 'free');
  return (
    <button
      type="button"
      className={`bed bed-${state}`}
      disabled={state === 'busy'}
      aria-pressed={state === 'selected'}
      aria-label={t('bedAria', { n: number, state: label })}
      onClick={() => onSelect(number)}
    >
      {number}
    </button>
  );
}
