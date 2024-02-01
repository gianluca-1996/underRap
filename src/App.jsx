import "./App.css";
import Nav from "./components/Nav/nav";
import Main from "./components/Main/main";
import Footer from "./components/Footer/footer";
import BatallasContenedor from "./components/BatallaContenedor/batallas";
import DetalleBatalla from "./components/BatallaDetalle/detalleBatalla";
import PostsContenedor from "./components/PostsContenedor/postsContenedor";
import Perfil from "./components/PerfilUsuario/perfil";
import FormEvento from "./components/FormEvento/formEvento";
import LoginForm from "./components/LoginForm/loginForm";
import NuevoUsuarioForm from "./components/nuevoUsuarioForm/nuevoUsuarioForm";
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
          <Route path="/nuevoEvento" element={<FormEvento />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/nuevaCuenta" element={<NuevoUsuarioForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
