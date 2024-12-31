import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Orders from './pages/Orders'
import Footer from './pages/Footer'
import Layout from './components/Layout'
import { OrdersProvider } from './context/OrdersContext';
import './App.module.css'

function App() {
  return (
    <>
      <Navbar/>
      <Layout>
        <OrdersProvider>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/pedidos' element={<Orders/>}/>
          </Routes>
        </OrdersProvider>
      </Layout>
      <Footer/>
    </>
  )
}

export default App
