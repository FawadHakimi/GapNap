import { useI18n } from '../i18n/I18nContext';
import { DURATIONS, PRICES } from '../config/config';
import { fmtPrice } from '../utils/time';

export default function PriceCards() {
  const { t } = useI18n();
  return (
    <section>
      <h2>{t('pricesTitle')}</h2>
      <div className="cards">
        {DURATIONS.map((d) => (
          <a key={d} className="card choice" href={`#/book?d=${d}`}>
            <span className="card-title">{t(`dur${d}`)}</span>
            <span className="card-price">{fmtPrice(PRICES[d])}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
