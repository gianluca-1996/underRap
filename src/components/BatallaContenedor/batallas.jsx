import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "./batallas.css";
import Batalla from "./Batalla/batalla";
import Spinner from "react-bootstrap/Spinner";
import Buscador from "../Buscador/buscador";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function BatallasContenedor() {
  const auth = getAuth();
  const [items, setItems] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetch("/src/assets/data/evento.json")
          .then((result) => result.json())
          .then((data) => {
            setItems(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container fluid id="batallaContainer">
      <Row className="RowContainer">{items && <Buscador />}</Row>
      <Row className="RowContainer">
        {items ? (
          items.map((evento) => (
            <Col sm={4} key={evento.id}>
              <Batalla batalla={evento} />{" "}
            </Col>
          ))
        ) : (
          <Col>
            <Spinner className="spinBatallas" animation="grow" />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default BatallasContenedor;
