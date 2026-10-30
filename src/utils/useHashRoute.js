import { useState, useEffect } from 'react';
import { DURATIONS } from '../config/config';

// '#/' home, '#/book' booking, '#/book?d=60' booking with duration, '#/find' find bill
export function parseHash(hash) {
  const [path, query = ''] = hash.replace(/^#/, '').split('?');
  const d = Number(new URLSearchParams(query).get('d'));
  return {
    page: path === '/book' ? 'book' : path === '/find' ? 'find' : 'home',
    duration: DURATIONS.includes(d) ? d : null,
  };
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}
