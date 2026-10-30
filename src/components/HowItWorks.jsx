import { useI18n } from '../i18n/I18nContext';

export default function HowItWorks() {
  const { t } = useI18n();
  return (
    <section>
      <h2>{t('howTitle')}</h2>
      <ol className="how">
        {[1, 2, 3].map((n) => (
          <li key={n} className="card"><span className="dot">{n}</span><span>{t(`how${n}`)}</span></li>
        ))}
      </ol>
    </section>
  );
}
