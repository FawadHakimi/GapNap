import { useI18n } from '../i18n/I18nContext';
import Logo from './Logo';

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="hero">
      <Logo size="large" />
      <h1>{t('heroTitle')}</h1>
      <p className="muted">{t('heroText')}</p>
      <div className="hero-actions">
        <a className="btn primary" href="#/book">{t('bookNap')}</a>
        <a className="link" href="#/find">{t('findBill')}</a>
      </div>
    </section>
  );
}
