import { useI18n } from '../i18n/I18nContext';

export default function Features() {
  const { t } = useI18n();
  return (
    <section className="section">
      <h2>{t('whyTitle')}</h2>
      <div className="grid3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="card">
            <h3>{t(`f${n}t`)}</h3>
            <p className="muted">{t(`f${n}d`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
