import { Route, Routes } from 'react-router-dom';
// CORE PAGES =====================
import AboutPage from '@src/pages/main/AboutPage';
// import ProjectsPage from '@src/pages/main/ProjectsPage';
import HomePage from '../pages/main/HomePage';
// UTILITY PAGES ===================
import ContactPage from '@src/pages/main/ContactPage';
import NotFoundPage from '@src/pages/utility/NotFoundPage';
import UnderConstructionPage from '@src/pages/utility/UnderConstructionPage';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/Home' element={<HomePage />} />
      <Route path='/Projects' element={<UnderConstructionPage />} />
      <Route path='/About' element={<AboutPage />} />
      <Route path='/Contact' element={<ContactPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default RoutesComponent;
