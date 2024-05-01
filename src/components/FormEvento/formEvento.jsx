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
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function FormEvento({usuario}) {
  const auth = getAuth();
  const db = getFirestore(app);
  const navigate = useNavigate();
  const [uid, setUid] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        navigate("/login", { replace: true });
      }
    });

    return () => unsubscribe();
  }, []);

  const onSubmit = (data) => {
    const storage = getStorage();
      const imgRef = ref(storage, `img/${data.img[0].name}`);
      uploadBytes(imgRef, data.img[0])
      .then(() => {  
        getDownloadURL(imgRef)
        .then(url => {
          addDoc(collection(db, "Evento"), {
            titulo: data.titulo,
            localidad: data.localidad,
            fecha: Timestamp.fromDate(new Date(`${data.fecha}T${data.hora}`)),
            imagen: `${url}`,
            inscripcion: data.precio,
            organizadorAka: usuario.aka,
            organizadorId: uid,
            descripcion: data.descripcion,
          })
          .then(() => {
            alert("evento creado con éxito!");
            navigate("/eventos", { replace: true });
          })
          .catch(error => alert("ERROR, no se pudo crear el evento"))
        })
      });
    /*addDoc(collection(db, "Evento"), {
      titulo: data.titulo,
      localidad: data.localidad,
      fecha: Timestamp.fromDate(new Date(`${data.fecha}T${data.hora}`)),
      imagen: `${data.img[0].name}`,
      inscripcion: data.precio,
      organizadorAka: usuario.aka,
      organizadorId: uid,
      descripcion: data.descripcion,
    })
    .then(() => {        
      const storage = getStorage();
      const imgRef = ref(storage, `img/${data.img[0].name}`);
      uploadBytes(imgRef, data.img[0]).then((snapshot) => {  
        getDownloadURL(imgRef)
        .then(url => {
          console.log(url);
          alert("evento creado con éxito!");
          navigate("/eventos", { replace: true });
        })
      });
    })
    .catch((error) => {
      console.log(error);
    });*/
  };

  return (
      <div>
        <Button onClick={handleOpen}>Crear nuevo evento</Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Crear nuevo evento
              </Typography>
              <Container fluid id="containerFormEvento">
                <Row id="rowFormEvento">
                  <Col sm={12} id="colFormEvento">
                    <form onSubmit={handleSubmit(onSubmit)} id="formEvento">
                      <Row className="rowInputForm">
                        <TextField
                          id="titulo"
                          label="Titulo del evento"
                          variant="outlined"
                          className="inputFormEvento"
                          {...register("titulo", {
                            required: true,
                            maxLength: 50,
                          })}
                        />
                        {errors.titulo?.type === "required" && (
                          <p role="alert">This field is required</p>
                        )}
                        {errors.titulo?.type === "maxLength" && (
                          <p role="alert">Maximo de 50 caracteres</p>
                        )}
                      </Row>
                      <Row className="rowInputForm">
                        <TextField
                          id="localidad"
                          label="Localidad"
                          variant="outlined"
                          className="inputFormEvento"
                          {...register("localidad", {
                            required: true,
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
                            required: true,
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
                            required: true,
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
                            required: true,
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
                            required: true,
                          })}
                        />
                        {errors.descripcion?.type === "required" && (
                          <p role="alert">This field is required</p>
                        )}
                      </Row>
                      <Row className="rowInputForm">
                        <input 
                          id="img"
                          label="Imagen"
                          variant="outlined"
                          className="inputFormEvento"
                          type="file"
                          {...register("img", {
                            required: true,
                          })}
                        />
                        {errors.img?.type === "required" && (
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
            </Box>
          </Fade>
        </Modal>
      </div>
  );
}

export default FormEvento;
