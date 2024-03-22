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
import app from "../Firebase/config.js";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";

function BatallasContenedor() {
  const auth = getAuth();
  const db = getFirestore(app);
  const [eventos, setEventos] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const items = [];
        getDocs(collection(db, "Evento")).then((data) => {
          data.forEach((evento) => {
            items.push({ id: evento.id, data: evento.data() });
          });
          setEventos(items);
        });
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container fluid id="batallaContainer">
      <Row className="RowContainer">{eventos?.length > 0 && <Buscador />}</Row>
      <Row className="RowContainer">
        {eventos ? (
          eventos.length > 0 ? (
            eventos.map((evento) => (
              <Col sm={4} key={evento.id}>
                <Batalla batalla={evento} />
              </Col>
            ))
          ) : (
            <h1 id="sinEventosTitulo">No hay eventos por el momento...</h1>
          )
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
