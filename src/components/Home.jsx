import { useI18n } from '../i18n/I18nContext';
import { OPEN, CLOSE, DURATIONS } from '../config/config';
import { fmtTime } from '../utils/time';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import PriceCards from './PriceCards';
import LiveAvailability from './LiveAvailability';

export default function Home() {
  const { t } = useI18n();
  return (
    <>
      <Hero />
      <HowItWorks />
      <PriceCards />
      <LiveAvailability />
      <section>
        <h2>{t('infoTitle')}</h2>
        <p className="card">
          {t('infoText', { from: fmtTime(OPEN), to: fmtTime(CLOSE), max: t(`dur${Math.max(...DURATIONS)}`) })}
        </p>
      </section>
    </>
  );
}
