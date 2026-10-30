import { useI18n } from '../i18n/I18nContext';
import BedButton from './BedButton';

export default function BedGrid({ beds, selected, isBusy, onSelect }) {
  const { t } = useI18n();
  return (
    <>
      <div className="bed-grid">
        {beds.map((n) => (
          <BedButton key={n} number={n} state={isBusy(n) ? 'busy' : n === selected ? 'selected' : 'free'} onSelect={onSelect} />
        ))}
      </div>
      <div className="legend small muted">
        <span><i className="sw sw-free" /> {t('free')}</span>
        <span><i className="sw sw-sel" /> {t('selected')}</span>
        <span><i className="sw sw-busy" /> {t('booked')}</span>
      </div>
    </>
  );
}
