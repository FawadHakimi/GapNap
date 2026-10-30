import { useI18n } from '../i18n/I18nContext';
import { PRICES } from '../config/config';
import { fmtPrice } from '../utils/time';

export default function DurationCard({ minutes, selected, onSelect }) {
  const { t } = useI18n();
  return (
    <button type="button" className="card choice" aria-pressed={selected} onClick={() => onSelect(minutes)}>
      <span className="card-title">{t(`dur${minutes}`)}</span>
      <span className="card-price">{fmtPrice(PRICES[minutes])}</span>
    </button>
  );
}
