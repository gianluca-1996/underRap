import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../Firebase/config.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./nav.css";
import Boton from "../Boton/boton";
import { useEffect, useState } from "react";

const auth = getAuth();

const Nav = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState();
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const db = getFirestore(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const docRefUsuario = doc(db, "Usuario", user.uid);
              getDoc(docRefUsuario)
                .then((usuarioInfo) => {
                  console.log(user);
                  setUsuarioLogueado(usuarioInfo.data());
                  //setNombreUsuario(usuarioInfo.data().nombre);
                })
                .catch((error) => {
                  console.log("Error en nav", error);
                });
            }
        });

        return () => unsubscribe();
    }, []);



  const onClickCierraSesion = () => {
    auth.signOut().then(() => {
      console.log("Sesion cerrada con exito");
      setUsuarioLogueado(null);
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
                <Link to={`/perfil/${0}`}>
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
          <Col sm={4}>
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
