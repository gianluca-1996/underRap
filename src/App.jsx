import './App.css'
import Nav from './components/Nav/nav'
import Main from './components/Main/main'
import Footer from './components/Footer/footer'
import BatallasContenedor from './components/BatallaContenedor/batallas'
import DetalleBatalla from './components/BatallaDetalle/detalleBatalla'

function App() {

  return (
    <>
      <Nav/>
      <DetalleBatalla/>
      <Footer/>
    </>
  )
}

export default App
