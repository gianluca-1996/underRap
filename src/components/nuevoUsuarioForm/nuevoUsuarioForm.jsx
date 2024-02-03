import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Spinner from "react-bootstrap/Spinner";
import Boton from "../Boton/boton";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import app from "../Firebase/config";
import "./nuevoUsuarioForm.css";

function NuevoUsuarioForm() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore(app);
  const [passIncorrecto, setPassIncorrecto] = useState(false);
  const [muestraForm, setMuestraForm] = useState(false);
  const [rol, setRol] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/eventos");
      else setMuestraForm(true);
    });

    return () => unsubscribe();
  }, []);

  const handleChangeAge = (event) => {
    setRol(event.target.value);
  };

  const onSubmit = (data) => {
    //TODO: COMPARAR CONTRASEÑAS Y MOSTRAR ERROR
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // crear usuario en la bd con sus datos basicos
        setDoc(doc(db, "Usuario", userCredential.user.uid), {
          aka: data.aka,
          ciudad: data.ciudad,
          fotoPerfil: '',
          rol: data.rol,
          portada: '',
          seguidores: [],
          seguidos: []
        })
        .then(() => {
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.log(error);
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const onChangeHandlePass = (e) => {
    if (e.target.value !== e.target.form.password.value)
      setPassIncorrecto(true);
    else setPassIncorrecto(false);
  };

  return (
    <Container fluid id="containerFormLogin">
      {muestraForm ? (
        <>
          <Row>
            <h1 id="h1IniciarSesion">Crear cuenta de usuario</h1>
          </Row>
          <Row id="rowFormLogin">
            <Col sm={6} id="colFormLogin">
              <form onSubmit={handleSubmit(onSubmit)} id="formLogin">
                <Row className="rowInputForm">
                  <TextField
                    id="aka"
                    label="AKA / usuario"
                    variant="outlined"
                    className="inputFormLogin"
                    {...register("aka", {
                      required: true,
                    })}
                  />
                  {errors.aka?.type === "required" && (
                    <p className="error" role="alert">
                      Campo obligatorio
                    </p>
                  )}
                </Row>
                <Row className="rowInputForm">
                  <TextField
                    id="ciudad"
                    label="ciudad"
                    variant="outlined"
                    className="inputFormLogin"
                    {...register("ciudad", {
                      required: true,
                    })}
                  />
                  {errors.ciudad?.type === "required" && (
                    <p className="error" role="alert">
                      Campo obligatorio
                    </p>
                  )}
                </Row>
                <Row className="rowInputForm">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="rolLabel">Rol de usuario</InputLabel>
                      <Select
                        labelId="rolLabel"
                        id="rol"
                        value={rol}
                        label="Rol de usuario"
                        className="inputFormLogin"
                        {...register("rol", {
                          required: true,
                          onChange: handleChangeAge,
                        })}
                      >
                        <MenuItem value={'organizador'}>Organizador</MenuItem>
                        <MenuItem value={'competidor'}>Competidor</MenuItem>
                      </Select>
                      {errors.rol?.type === "required" && (
                        <p className="error" role="alert">
                          Campo obligatorio
                        </p>
                      )}
                    </FormControl>
                  </Box>
                  
                </Row>
                <Row className="rowInputForm">
                  <TextField
                    id="email"
                    label="e-mail"
                    variant="outlined"
                    className="inputFormLogin"
                    {...register("email", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                  />
                  {errors.mail?.type === "required" && (
                    <p className="error" role="alert">
                      Campo obligatorio
                    </p>
                  )}
                  {errors.mail?.type === "pattern" && (
                    <p className="error" role="alert">
                      e-mail invalido
                    </p>
                  )}
                </Row>
                <Row className="rowInputForm">
                  <TextField
                    id="password"
                    type="password"
                    label="contraseña"
                    variant="outlined"
                    className="inputFormEvento"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <p className="error" role="alert">
                      Este campo es requerido
                    </p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="error" role="alert">
                      Debe tener 6 caracteres como minimo
                    </p>
                  )}
                </Row>
                <Row className="rowInputForm">
                  <TextField
                    id="passwordConfirm"
                    type="password"
                    label="confirmar contraseña"
                    variant="outlined"
                    className="inputFormEvento"
                    {...register("passwordConfirm", {
                      required: true,
                      minLength: 5,
                      onChange: onChangeHandlePass,
                    })}
                  />
                  {errors.passwordConfirm?.type === "required" && (
                    <p className="error" role="alert">
                      Este campo es requerido
                    </p>
                  )}
                  {errors.passwordConfirm?.type === "minLength" && (
                    <p className="error" role="alert">
                      Debe tener 6 caracteres como minimo
                    </p>
                  )}
                  {passIncorrecto && (
                    <p className="error">Las contraseñas no coinciden</p>
                  )}
                </Row>
                <Row id="rowBtnIngresar">
                  <Boton texto={"Crear cuenta"} submit="submit" />
                </Row>
              </form>
            </Col>
          </Row>
        </>
      ) : (
        <Spinner className="spinBatallas" animation="grow" />
      )}
    </Container>
  );
}
export default NuevoUsuarioForm;
