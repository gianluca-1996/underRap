import Spinner from "react-bootstrap/Spinner";
import Boton from "../Boton/boton";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from "react";
import "./loginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [passIncorrecto, setPassIncorrecto] = useState(false);
  const [muestraForm, setMuestraForm] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate('/eventos');
      else  setMuestraForm(true);
    })

    return () => unsubscribe();
  }, []);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.mail, data.password)
      .then(() => {
        navigate('/eventos', {replace: true});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + ' ' + errorMessage);
        setPassIncorrecto(true);
      });
  };


  return (
    <Container fluid id="containerFormLogin">
      {muestraForm ? 
      (<>
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
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
              {passIncorrecto && <p>Contraseña incorrecta. Intente nuevamente</p>}
            </Row>
            <Row id="rowBtnIngresar">
              <Boton texto={"Ingresar"} submit="submit" />
            </Row>
          </form>
        </Col>
      </Row>
      </>) : 
      (<Spinner className="spinBatallas" animation="grow" />)
      }
      
    </Container>
  );
}
export default LoginForm;
