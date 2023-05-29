import { Routes, Route } from 'react-router-dom'
import './styles/styles.css';
import Layout from './components/Layout';
import HomePage from './pages/homePage/HomePage';
import ShoppingCartPage from './pages/shoppingCart/ShoppingCartPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage />}/>
        <Route path="/shopingCart/" element={<ShoppingCartPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
