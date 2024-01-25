import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import app from "../Firebase/config.js";
import UsuarioContext from "../UsuarioContext/usuarioContext";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./nav.css";

const auth = getAuth();

const Nav = () => {
  const userCtx = useContext(UsuarioContext);
  const navigate = useNavigate();
  const [usuarioLogueado, setUsuarioLogueado] = useState();
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    if(userCtx.usuarioActual){
      const docRefUsuario = doc(db, "Usuario", userCtx.usuarioActual.uid);
      getDoc(docRefUsuario)
      .then((usuarioInfo) => {
        setUsuarioLogueado(usuarioInfo.data());
        setNombreUsuario(usuarioInfo.data().nombre);
      })
      .catch((error) => {
        console.log("Error en nav", error);
      });
    }
  }, [userCtx]);

  const onClickCierraSesion = () => {
    auth.signOut().then(() => {
      userCtx.actualizar(null);
      setUsuarioLogueado(null);
      navigate('/login');
    });
  };

  return (
    <Container fluid className="navContainer">
      <Row>
        <Col sm={4} id="tituloApp">
          <h1>underRap</h1>
        </Col>
        {usuarioLogueado ? (
          <>
            <Col sm={4}>
              <Row>
                <Col>
                  <Link to={"/eventos"}>
                    <h4 className="colLinks">Eventos</h4>
                  </Link>
                </Col>
                <Col>
                  <Link to={"/"}>
                    <h4 className="colLinks">Noticias</h4>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col sm={4}>
              <Row>
                <Link to={'/perfil'}>
                  <h4 className="colSesion">Perfil</h4>
                </Link>
              </Row>
            </Col>
            <Col sm={4}>
              <Row>
                <h4>Bienvenido {nombreUsuario}</h4>
              </Row>
            </Col>
            <Col sm={4}>
              <Row>
                <button onClick={onClickCierraSesion}>
                  <h4 className="colSesion">Cerrar Sesion</h4>
                </button>
              </Row>
            </Col>
          </>
        ) : (
          <Col sm={8}>
            <Row>
              <Link to={`/login`}>
                <h4 className="colSesion">Iniciar sesion</h4>
              </Link>
            </Row>
            <Row>
              <h4 className="colSesion">Registrarme</h4>
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Nav;
