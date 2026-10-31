import { useState, useEffect } from 'react';
import { DURATIONS } from '../config/config';

// '#/' home, '#/book', '#/book?d=60', '#/find', '#/support', '#/support?b=GN-20260101-0001'
export function parseHash(hash) {
  const [path, query = ''] = hash.replace(/^#/, '').split('?');
  const params = new URLSearchParams(query);
  const d = Number(params.get('d'));
  const b = (params.get('b') || '').toUpperCase();
  return {
    page: ['/book', '/find', '/support'].includes(path) ? path.slice(1) : 'home',
    duration: DURATIONS.includes(d) ? d : null,
    booking: /^[A-Z]{2}-\d{8}-\d{4}$/.test(b) ? b : '',
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
