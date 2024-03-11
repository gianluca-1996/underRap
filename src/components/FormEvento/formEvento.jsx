import Boton from "../Boton/boton";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../Firebase/config.js";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  Timestamp
} from "firebase/firestore";
import "./formEvento.css";

function FormEvento() {
  const auth = getAuth();
  const db = getFirestore(app);
  const navigate = useNavigate();
  const [muestraContenido, setMuestraContenido] = useState(false);
  const [uid, setUid] = useState();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user){
        setMuestraContenido(true);
        setUid(user.uid);
      }
      else{
        navigate('/login', {replace: true});
      }
    })

    return () => unsubscribe();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    /*TODO:
    guardar los datos y redireccionar al usuario a su perfil
    */
    addDoc(collection(db, "Evento"), {
      titulo: data.titulo,
      localidad: data.localidad,
      fecha: Timestamp.fromDate(new Date(`${data.fecha}T${data.hora}`)),
      imagen: "/src/assets/img/imagen1.jpg",
      inscripcion: data.precio,
      organizadorId: uid,
      descripcion: data.descripcion
    })
    .then(() => {
      alert('evento creado');
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <>
      {muestraContenido && (
        <Container fluid id="containerFormEvento">
          <Row>
            <h1 id="h1NuevoEvento">Crear nuevo evento</h1>
          </Row>
          <Row id="rowFormEvento">
            <Col sm={6} id="colFormEvento">
              <form onSubmit={handleSubmit(onSubmit)} id="formEvento">
                <Row className="rowInputForm">
                  <TextField
                    id="titulo"
                    label="Titulo del evento"
                    variant="outlined"
                    className="inputFormEvento"
                    {...register("titulo", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                  {errors.titulo?.type === "required" && (
                    <p role="alert">This field is required</p>
                  )}
                  {errors.titulo?.type === "maxLength" && (
                    <p role="alert">Maximo de 20 caracteres</p>
                  )}
                </Row>
                <Row className="rowInputForm">
                  <TextField
                    id="localidad"
                    label="Localidad"
                    variant="outlined"
                    className="inputFormEvento"
                    {...register("localidad", {
                      required: true
                    })}
                  />
                  {errors.localidad?.type === "required" && (
                    <p role="alert">This field is required</p>
                  )}
                </Row>
                <Row className="rowInputForm">
                  <TextField
                    id="fecha"
                    variant="outlined"
                    type="date"
                    className="inputFormEvento"
                    {...register("fecha", {
                      required: true
                    })}
                  />
                  {errors.fecha?.type === "required" && (
                    <p role="alert">This field is required</p>
                  )}
                </Row>
                <Row className="rowInputForm">
                  <TextField
                    id="hora"
                    variant="outlined"
                    type="time"
                    className="inputFormEvento"
                    {...register("hora", {
                      required: true
                    })}
                  />
                  {errors.hora?.type === "required" && (
                    <p role="alert">This field is required</p>
                  )}
                </Row>
                <Row className="rowInputForm">
                  <TextField
                    id="precio"
                    label="Valor Inscripcion"
                    variant="outlined"
                    className="inputFormEvento"
                    type="number"
                    {...register("precio", {
                      required: true
                    })}
                  />
                  {errors.precio?.type === "required" && (
                    <p role="alert">This field is required</p>
                  )}
                </Row>
                <Row className="rowInputForm">
                  <TextField
                    id="descripcion"
                    label="Descripcion"
                    variant="outlined"
                    className="inputFormEvento"
                    {...register("descripcion", {
                      required: true
                    })}
                  />
                  {errors.descripcion?.type === "required" && (
                    <p role="alert">This field is required</p>
                  )}
                </Row>
                <Row id="rowBtnCrearEvento">
                  <Boton texto={"Crear Evento"} submit="submit" />
                </Row>
              </form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default FormEvento;
