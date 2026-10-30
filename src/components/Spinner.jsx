import { useI18n } from '../i18n/I18nContext';

export default function Spinner() {
  const { t } = useI18n();
  return (
    <div className="center muted" role="status">
      <span className="spinner" aria-hidden="true" /> {t('loading')}
    </div>
  );
}
