import "./App.css";
import Nav from "./components/Nav/nav";
import Main from "./components/Main/main";
import Footer from "./components/Footer/footer";
import BatallasContenedor from "./components/BatallaContenedor/batallas";
import DetalleBatalla from "./components/BatallaDetalle/detalleBatalla";
import PostsContenedor from "./components/PostsContenedor/postsContenedor";
import Perfil from "./components/PerfilUsuario/perfil";
import LoginForm from "./components/LoginForm/loginForm";
import NuevoUsuarioForm from "./components/nuevoUsuarioForm/nuevoUsuarioForm";
import PerfilExterno from "./components/PerfilExterno/perfilExterno";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<PostsContenedor />} />
          <Route path="/eventos" element={<BatallasContenedor />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/detalleEvento/:id" element={<DetalleBatalla />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/nuevaCuenta" element={<NuevoUsuarioForm />} />
          <Route path="/perfilExterno/:id" element={<PerfilExterno />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
