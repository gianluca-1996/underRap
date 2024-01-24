import Boton from "../Boton/boton";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase/config.js"
import { useNavigate } from 'react-router-dom';
import "./loginForm.css";

const auth = getAuth();

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.mail, data.password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ' ' + errorMessage);
      });
  };

  return (
    <Container fluid id="containerFormLogin">
      <Row>
        <h1 id="h1IniciarSesion">Iniciar Sesion</h1>
      </Row>
      <Row id="rowFormLogin">
        <Col sm={6} id="colFormLogin">
          <form onSubmit={handleSubmit(onSubmit)} id="formLogin">
            <Row className="rowInputForm">
              <TextField
                id="mail"
                label="e-mail"
                variant="outlined"
                className="inputFormLogin"
                {...register("mail", {
                  required: true,
                  pattern: /^[^s@]+@[^s@]+.[^s@]+$/,
                })}
              />
              {errors.mail?.type === "required" && (
                <p role="alert">Este campo es requerido</p>
              )}
              {errors.mail?.type === "pattern" && (
                <p role="alert">e-mail invalido</p>
              )}
            </Row>
            <Row className="rowInputForm">
              <TextField
                id="password"
                type="password"
                label="password"
                variant="outlined"
                className="inputFormEvento"
                {...register("password", {
                  required: true,
                  minLength: 5,
                })}
              />
              {errors.password?.type === "required" && (
                <p role="alert">Este campo es requerido</p>
              )}
              {errors.password?.type === "minLength" && (
                <p role="alert">Debe tener 5 caracteres como minimo</p>
              )}
            </Row>
            <Row id="rowBtnIngresar">
              <Boton texto={"Ingresar"} submit="submit" />
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
