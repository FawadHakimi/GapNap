import { useEffect } from 'react';
import { I18nProvider } from './i18n/I18nContext';
import { useHashRoute } from './utils/useHashRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NapBooking from './components/NapBooking';
import FindBill from './components/FindBill';
import Support from './components/Support';

export default function App() {
  const route = useHashRoute();
  useEffect(() => { window.scrollTo(0, 0); }, [route.page, route.duration, route.booking]);
  return (
    <I18nProvider>
      <Header page={route.page} />
      <main className="container">
        {route.page === 'home' && <Home />}
        {route.page !== 'home' && (
          <div className="narrow">
            {/* key restarts the flow when a price card passes a new duration */}
            {route.page === 'book' && <NapBooking key={route.duration ?? 'new'} initialDuration={route.duration} />}
            {route.page === 'find' && <FindBill onClose={() => { window.location.hash = '#/book'; }} />}
            {route.page === 'support' && <Support key={route.booking} initialBooking={route.booking} />}
          </div>
        )}
      </main>
      <Footer />
    </I18nProvider>
  );
}
