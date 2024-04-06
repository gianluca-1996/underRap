import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountMenu from "../AccountMenu/accountMenu.jsx";
import BuscadorUsuario from "../BuscadorUsuario/buscadorUsuario.jsx";
import "./nav.css";

const Nav = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuarioLogueado(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const onClickCierraSesion = () => {
    auth.signOut().then(() => {
      setUsuarioLogueado(null);
      navigate("/login");
    });
  };

  return (
    <Container fluid className="navContainer">
      <Row className="rowNavIn">
        <Col sm={2} id="tituloApp">
          <h1>undeRapp</h1>
        </Col>
        {usuarioLogueado ? (
          <>
            <Col sm={4}>
              <Row>
                <Col sm={3}>
                  <Link to={"/eventos"} className="link">
                    <h4 className="colLinks">Eventos</h4>
                  </Link>
                </Col>
                <Col sm={3}>
                  <Link to={"/"} className="link">
                    <h4 className="colLinks">Noticias</h4>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col sm={1}>
              <BuscadorUsuario />
            </Col>
            <Col sm={1}>
              <AccountMenu
                auth={auth}
                isLog={usuarioLogueado ? true : false}
                logOutHandle={onClickCierraSesion}
              />
            </Col>
            <Row>
              {usuarioLogueado?.email && <p>{usuarioLogueado.email}</p>}
            </Row>
          </>
        ) : (
          <>
            <Col sm={1}>
              <AccountMenu auth={auth} isLog={usuarioLogueado ? true : false} />
            </Col>
            <Row>
              {usuarioLogueado?.email && <p>{usuarioLogueado.email}</p>}
            </Row>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Nav;
