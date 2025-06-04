// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrdersProvider } from './context/OrdersProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';

import Home from './pages/home';
import Orders from './pages/orders';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Hero />
        <OrdersProvider>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>
        </OrdersProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
