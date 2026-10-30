import { QRCodeSVG } from 'qrcode.react';
import { useI18n } from '../i18n/I18nContext';
import { fmtPrice } from '../utils/time';

export default function QrPayment({ value, amount }) {
  const { t } = useI18n();
  return (
    <div className="qr">
      <div className="qr-box"><QRCodeSVG value={value} size={160} bgColor="#ffffff" fgColor="#111111" /></div>
      <strong>{fmtPrice(amount)}</strong>
      <span className="muted small">{t('scan')}</span>
    </div>
  );
}
