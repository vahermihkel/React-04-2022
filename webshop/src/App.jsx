import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import AboutUs from './pages/AboutUs';
import AddProduct from './pages/admin/AddProduct';
import AdminHome from './pages/admin/AdminHome';
import Category from './pages/admin/Category';
import ViewProducts from './pages/admin/ViewProducts';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Shops from './pages/Shops';

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path='' exact element={ <Home /> } />
        <Route path='admin' exact element={ <AdminHome /> } />
        <Route path='admin/tooted' exact element={ <ViewProducts /> } />
        <Route path='admin/lisa-toode' exact element={ <AddProduct /> } />
        <Route path='admin/kategooriad' exact element={ <Category /> } />
        <Route path='ostukorv' exact element={ <Cart /> } />
        <Route path='poed' exact element={ <Shops /> } />
        <Route path='meist' exact element={ <AboutUs /> } />
        <Route path='*' exact element={ <NotFound /> } />
        {/* muuda/:id   -> muutmise lehele
        idRef, nameRef, descriptionRef, priceRef, imgSrcRef, categoryRef, isActiveRef */}
      </Routes>
    </div>
  );
}

export default App;
