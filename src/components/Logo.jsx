import logoUrl from '../assets/logo.svg';

export default function Logo({ size = 'small' }) {
  return (
    <span className={`logo logo-${size}`}>
      <img className="logo-img" src={logoUrl} alt="GapNap logo" />
      <span className="logo-text">GapNap</span>
    </span>
  );
}
