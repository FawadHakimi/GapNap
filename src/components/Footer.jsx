import { useI18n } from '../i18n/I18nContext';
import Logo from './Logo';

const LINKS = [['#/', 'navHome'], ['#/book', 'navBook'], ['#/find', 'navFind'], ['#/support', 'navSupport']];

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer no-print">
      <div className="container">
        <Logo size="small" />
        <p className="muted small">{t('footerText')}</p>
        <nav className="footer-nav" aria-label="Footer">
          {LINKS.map(([href, label]) => <a key={href} href={href}>{t(label)}</a>)}
        </nav>
      </div>
    </footer>
  );
}
