import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Orders from './pages/Orders'
import Footer from './pages/Footer'
import Layout from './components/Layout'
import './App.css'

function App() {
  return (
    <>
      <Navbar/>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pedidos' element={<Orders/>}/>
        </Routes>
      </Layout>
      <Footer/>
    </>
  )
}

export default App
