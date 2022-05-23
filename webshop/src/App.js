import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path='' exact element={ <Home /> } />
        <Route path='admin' exact element={ <div>admin</div> } />
        <Route path='ostukorv' exact element={ <div>ostukorv</div> } />
      </Routes>
    </div>
  );
}

export default App;
