import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Cart from './pages/Cart';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path='' exact element={ <Home /> } />
        <Route path='admin' exact element={ <div>
          {/* Saab uut toodet lisada nagu eesti keelses
          idRef, nameRef, descriptionRef, priceRef, imgSrcRef, categoryRef, isActiveRef */}
          <button>Lisa toode</button> 
           {/* Samasugune list nagu Home-s
          AGA: igal tootel on nupp "MUUDA" ja nupp "KUSTUTA"
          <Link>MUUDA</Link>    onClick()=> KUSTUTA */}
          <button>Vaata tooteid</button>
          </div> } />
        <Route path='ostukorv' exact element={ <Cart /> } />
        {/* muuda/:id   -> muutmise lehele
        idRef, nameRef, descriptionRef, priceRef, imgSrcRef, categoryRef, isActiveRef */}
      </Routes>
    </div>
  );
}

export default App;
