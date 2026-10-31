import { useI18n } from '../i18n/I18nContext';

export default function FinalCta() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="card cta">
        <p>{t('ctaText')}</p>
        <a className="btn primary" href="#/book">{t('bookNap')}</a>
      </div>
    </section>
  );
}
