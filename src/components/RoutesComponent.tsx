import { Route, Routes } from 'react-router-dom';
// CORE PAGES =====================
import AboutPage from '../pages/main/AboutPage';
import HomePage from '../pages/main/HomePage';
// UTILITY PAGES ===================
import ContactPage from '../pages/main/ContactPage';
import ProjectsPage from '../pages/main/ProjectsPage';
import NotFoundPage from '../pages/utility/NotFoundPage';
import CVPage from '../pages/CVPage';
import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/admin/AdminPage';

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
