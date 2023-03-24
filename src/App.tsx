import { Renderer } from './pages/Renderer';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { initBaseData, setActiveLink } from './context/slices/auth_slice';
import { store } from './context/store';
import ErrorBoundary from './pages/utility/ErrorBoundry';

export default function App() {
  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (isMounted) {
        var path = window.location.pathname;
        var active = '';
        if (path.toLowerCase().indexOf('home') != -1 || path == '/')
          active = 'home';
        if (path.toLowerCase().indexOf('resume') != -1) active = 'resume';
        if (path.toLowerCase().indexOf('projects') != -1) active = 'projects';
        if (path.toLowerCase().indexOf('about') != -1) active = 'about';
        if (path.toLowerCase().indexOf('contact') != -1) active = 'connect';
        store.dispatch(initBaseData());
        store.dispatch(setActiveLink(active));
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Renderer />
      </Provider>
    </ErrorBoundary>
  );
}
