import Boton from "../Boton/boton";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import "./formEvento.css";

function FormEvento() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    /*TODO:
    guardar los datos y redireccionar al usuario a su perfil
    */
    console.log(data);
  };

  return (
    <Container fluid id="containerFormEvento">
      <Row>
        <h1 id="h1NuevoEvento">Crear nuevo evento</h1>
      </Row>
      <Row id="rowFormEvento">
        <Col sm={6} id="colFormEvento">
          <form onSubmit={handleSubmit(onSubmit)} id="formEvento">
            <Row className="rowInputForm">
              <TextField
                id="tituloEvento"
                label="Titulo del evento"
                variant="outlined"
                className="inputFormEvento"
                {...register("tituloEvento", { required: true, maxLength: 20 })}
              />
              {errors.tituloEvento?.type === "required" && (
                <p role="alert">This field is required</p>
              )}
              {errors.tituloEvento?.type === "maxLength" && (
                <p role="alert">Maximo de 20 caracteres</p>
              )}
            </Row>
            <Row className="rowInputForm">
              <TextField
                id="localidad"
                label="Localidad"
                variant="outlined"
                className="inputFormEvento"
                {...register("localidad")}
              />
              {errors.exampleRequired?.type === "required" && (
                <p role="alert">This field is required</p>
              )}
            </Row>
            <Row className="rowInputForm">
              <TextField
                id="fecha"
                variant="outlined"
                type="date"
                className="inputFormEvento"
                {...register("fecha")}
              />
              {errors.exampleRequired?.type === "required" && (
                <p role="alert">This field is required</p>
              )}
            </Row>
            <Row className="rowInputForm">
              <TextField
                id="hora"
                variant="outlined"
                type="time"
                className="inputFormEvento"
                {...register("hora")}
              />
              {errors.exampleRequired?.type === "required" && (
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
                {...register("precio")}
              />
              {errors.exampleRequired?.type === "required" && (
                <p role="alert">This field is required</p>
              )}
            </Row>
            <Row className="rowInputForm">
              <TextField
                id="descripcion"
                label="Descripcion"
                variant="outlined"
                className="inputFormEvento"
                {...register("descripcion")}
              />
              {errors.exampleRequired?.type === "required" && (
                <p role="alert">This field is required</p>
              )}
            </Row>
            <Row id="rowBtnCrearEvento">
              <Boton
                texto={"Crear Evento"}
                submit="submit"
              />
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default FormEvento;
