import { useI18n } from '../i18n/I18nContext';

export default function StepIndicator({ step }) {
  const { t } = useI18n();
  return (
    <ol className="steps no-print">
      {[1, 2, 3, 4].map((n) => (
        <li key={n} className={n === step ? 'on' : n < step ? 'done' : ''} aria-current={n === step ? 'step' : undefined}>
          <span className="dot">{n < step ? '✓' : n}</span>
          <span className="small">{t(`s${n}`)}</span>
        </li>
      ))}
    </ol>
  );
}
