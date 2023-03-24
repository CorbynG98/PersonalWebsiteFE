import RoutesComponent from '../components/RoutesComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import '../custom.css';
import NavBarComponentTop from '../components/NavBarComponentTop';
import NavBarComponentBottom from '../components/NavBarComponentBottom';

export const Renderer = () => {
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
