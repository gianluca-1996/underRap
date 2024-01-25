import './App.css'
import Nav from './components/Nav/nav'
import Main from './components/Main/main'
import Footer from './components/Footer/footer'
import BatallasContenedor from './components/BatallaContenedor/batallas'
import DetalleBatalla from './components/BatallaDetalle/detalleBatalla'
import PostsContenedor from './components/PostsContenedor/postsContenedor'
import Perfil from './components/PerfilUsuario/perfil'
import FormEvento from './components/FormEvento/formEvento'
import LoginForm from './components/LoginForm/loginForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UsuarioContext from './components/UsuarioContext/usuarioContext'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';

function App() {

  const auth = getAuth();
  const [usuario, setUsuario] = useState();

  const actualizaUsuario = (usuario) => {
    setUsuario(usuario);
  }

  const usuarioCtx = {
    usuarioActual: usuario,
    actualizar: actualizaUsuario
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) usuarioCtx.actualizar(user);
    });

    return () => unsubscribe();
  }, []);
  

  return (
    <>
      <UsuarioContext.Provider value={usuarioCtx}>
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path='/' element={<PostsContenedor />} />
            <Route path='/eventos' element={<BatallasContenedor />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/detalleEvento/:id' element={<DetalleBatalla />} />
            <Route path='/nuevoEvento' element={<FormEvento />} />
            <Route path='/login' element={<LoginForm />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </UsuarioContext.Provider >
    </>
  )
}

export default App
