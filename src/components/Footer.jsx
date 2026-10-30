import { useI18n } from '../i18n/I18nContext';
import Logo from './Logo';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer no-print">
      <div className="container">
        <Logo size="small" />
        <p className="muted small">{t('footerText')}</p>
      </div>
    </footer>
  );
}
