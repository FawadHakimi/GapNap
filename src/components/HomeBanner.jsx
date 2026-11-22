export default function HomeBanner() {
  return (
    <div className="home-banner">
      <img
        src={`${import.meta.env.BASE_URL}home-banner.jpg`}
        alt="GapNap"
      />
    </div>
  );
}
