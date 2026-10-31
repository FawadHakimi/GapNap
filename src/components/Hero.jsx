import { useI18n } from '../i18n/I18nContext';
import { BEDS, PRICES } from '../config/config';
import { TOTAL_ROOMS } from '../config/venue';
import { fmtPrice } from '../utils/time';

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="hero">
      <p className="hero-label">{t('heroLabel')}</p>
      <h1>{t('heroTitle')}</h1>
      <p className="muted">{t('heroText')}</p>
      <div className="hero-actions">
        <a className="btn primary" href="#/book">{t('bookNap')}</a>
        <a className="link" href="#/find">{t('findBill')}</a>
      </div>
      <ul className="facts">
        <li>{t('factRooms', { n: TOTAL_ROOMS })}</li>
        <li>{t('factBeds', { n: BEDS })}</li>
        <li>{t('factFrom', { price: fmtPrice(Math.min(...Object.values(PRICES))) })}</li>
      </ul>
    </section>
  );
}
