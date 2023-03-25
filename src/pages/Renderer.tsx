import NavBarComponentBottom from '@src/components/NavBarComponentBottom';
import NavBarComponentTop from '@src/components/NavBarComponentTop';
import RoutesComponent from '@src/components/RoutesComponent';
import { State } from '@src/models/State';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '../custom.css';

export const Renderer = () => {
  const isLoggedIn = useSelector((state: State) => state.isLoggedIn);

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate='Corbyn Greenwood | %s'
        defaultTitle='Corbyn Greenwood | Home'
      />
      <Router>
        <div className='maxHeight'>
          <NavBarComponentTop />
          <RoutesComponent />
          <NavBarComponentBottom />
        </div>
      </Router>
    </HelmetProvider>
  );
};
