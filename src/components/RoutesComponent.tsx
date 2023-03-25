import { Route, Routes } from 'react-router-dom';
// CORE PAGES =====================
import AboutPage from '@src/pages/main/AboutPage';
import HomePage from '@src/pages/main/HomePage';
// UTILITY PAGES ===================
import AdminPage from '@src/pages/admin/AdminPage';
import CVPage from '@src/pages/CVPage';
import LoginPage from '@src/pages/LoginPage';
import ContactPage from '@src/pages/main/ContactPage';
import ProjectsPage from '@src/pages/main/ProjectsPage';
import NotFoundPage from '@src/pages/utility/NotFoundPage';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/Home' element={<HomePage />} />
      <Route path='/Projects' element={<ProjectsPage />} />
      <Route path='/About' element={<AboutPage />} />
      <Route path='/Contact' element={<ContactPage />} />
      <Route path='/Resume' element={<CVPage />} />
      <Route path='/Login' element={<LoginPage />} />
      <Route path='/Admin' element={<AdminPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default RoutesComponent;
