import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import app from "../Firebase/config.js";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountMenu from "../AccountMenu/accountMenu.jsx";
import "./nav.css";

const Nav = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuarioLogueado(true);
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
          <h1>underRap</h1>
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
              <AccountMenu
                auth={auth}
                isLog={usuarioLogueado ? true : false}
                logOutHandle={onClickCierraSesion}
              />
            </Col>
          </>
        ) : (
          <Col sm={1}>
            <AccountMenu auth={auth} isLog={usuarioLogueado ? true : false} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Nav;
