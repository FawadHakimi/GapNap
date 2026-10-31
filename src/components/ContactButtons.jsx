import { useI18n } from '../i18n/I18nContext';
import { CONTACTS } from '../config/contacts';

export default function ContactButtons() {
  const { t } = useI18n();
  const items = [
    { key: 'telegram', label: 'contactTelegram', href: `https://t.me/${CONTACTS.telegram}`, ext: true },
    { key: 'whatsapp', label: 'contactWhatsapp', href: `https://wa.me/${CONTACTS.whatsapp}`, ext: true },
    { key: 'phone', label: 'contactPhone', href: `tel:${CONTACTS.phone}` },
    { key: 'email', label: 'contactEmail', href: `mailto:${CONTACTS.email}` },
  ].filter((i) => CONTACTS[i.key]); // hide buttons with empty values
  return (
    <div className="contacts">
      {items.map((i) => (
        <a key={i.key} className="btn" href={i.href} {...(i.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{t(i.label)}</a>
      ))}
    </div>
  );
}
