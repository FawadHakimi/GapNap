import { useI18n } from '../i18n/I18nContext';
import { ROOMS } from '../config/venue';
import BedButton from './BedButton';

export default function BedGrid({ selected, isBusy, onSelect }) {
  const { t } = useI18n();
  return (
    <>
      {ROOMS.map((room) => (
        <section key={room.id} aria-label={t('roomN', { n: room.id })}>
          <h3 className="room-title">{t('roomN', { n: room.id })}</h3>
          <div className="bed-grid">
            {Array.from({ length: room.to - room.from + 1 }, (_, i) => room.from + i).map((n) => (
              <BedButton key={n} number={n} state={isBusy(n) ? 'busy' : n === selected ? 'selected' : 'free'} onSelect={onSelect} />
            ))}
          </div>
        </section>
      ))}
      <div className="legend small muted">
        <span><i className="sw sw-free" /> {t('free')}</span>
        <span><i className="sw sw-sel" /> {t('selected')}</span>
        <span><i className="sw sw-busy" /> {t('booked')}</span>
      </div>
    </>
  );
}
