import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import {ProductNew,Favorites,Home} from './pages';
import { LoadingScreen, Navbar } from './components';
import { useSelector } from 'react-redux';

function App() {

  const isLoading = useSelector(state=>state.isLoading)
  return (
    <div className="App">
      <HashRouter>

     <Navbar/> 
      {isLoading && <LoadingScreen/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductNew/>} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
