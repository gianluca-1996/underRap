import './App.css'
import Nav from './components/Nav/nav'
import Main from './components/Main/main'
import Footer from './components/Footer/footer'
import BatallasContenedor from './components/BatallaContenedor/batallas'
import DetalleBatalla from './components/BatallaDetalle/detalleBatalla'
import PostsContenedor from './components/PostsContenedor/postsContenedor'
import Perfil from './components/PerfilUsuario/perfil'
import FormEvento from './components/FormEvento/formEvento'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path='/' element={<PostsContenedor />} />
            <Route path='/eventos' element={<BatallasContenedor />} />
            <Route path="/perfil/:id" element={<Perfil />} />
            <Route path='/detalleEvento/:id' element={<DetalleBatalla />} />
            <Route path='/nuevoEvento' element={<FormEvento />} />
          </Routes>
        </BrowserRouter>
        <Footer/>
    </>
  )
}

export default App
