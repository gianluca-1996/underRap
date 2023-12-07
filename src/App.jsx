import './App.css'
import Nav from './components/Nav/nav'
import Main from './components/Main/main'
import Footer from './components/Footer/footer'
import BatallasContenedor from './components/BatallaContenedor/batallas'
import DetalleBatalla from './components/BatallaDetalle/detalleBatalla'
import PostsContenedor from './components/PostsContenedor/postsContenedor'
import Perfil from './components/PerfilUsuario/perfil'

function App() {

  return (
    <>
      <Nav/>
      <Perfil/>
      <Footer/>
    </>
  )
}

export default App
