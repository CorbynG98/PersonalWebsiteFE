import { Renderer } from '@src/pages/Renderer';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { initBaseData } from './context/slices/auth_slice';
import { store } from './context/store';
import ErrorBoundary from './pages/utility/ErrorBoundry';

export default function App() {
  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (isMounted) {
        store.dispatch(initBaseData());
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
