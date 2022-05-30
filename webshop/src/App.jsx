import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import AdminHome from './pages/admin/AdminHome';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Shops from './pages/Shops';

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path='' exact element={ <Home /> } />
        <Route path='admin' exact element={ <AdminHome /> } />
        <Route path='ostukorv' exact element={ <Cart /> } />
        <Route path='poed' exact element={ <Shops /> } />
        {/* muuda/:id   -> muutmise lehele
        idRef, nameRef, descriptionRef, priceRef, imgSrcRef, categoryRef, isActiveRef */}
      </Routes>
    </div>
  );
}

export default App;
