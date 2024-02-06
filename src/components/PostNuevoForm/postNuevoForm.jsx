import Spinner from "react-bootstrap/Spinner";
import Boton from "../Boton/boton";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { getFirestore, doc, collection, addDoc, Timestamp } from "firebase/firestore";
import app from "../Firebase/config";
import "./postNuevoForm.css";
import { useState } from "react";

function PostNuevoForm({ handlePosteos, uid, aka }) {
  const db = getFirestore(app);
  const [comentario, setComentario] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const post = {
      usuarioId: uid,
      aka: aka,
      fechaHora: Timestamp.now(),
      imagenPerfil: '',
      textoPrincipal: data.textoPost,
      meGusta: [],
      comentarios: []
    }
    addDoc(collection(db, "Noticias"), post)
      .then(() => {
        handlePosteos(uid);
        setComentario("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeComent = (e) => {
    setComentario(e.target.value);
  };

  return (
    <>
      <h4>Crea un nuevo post para la comunidad...</h4>
      <form onSubmit={handleSubmit(onSubmit)} id="formPost">
        <Row className="rowInputForm">
          <TextField
            id="textoPost"
            label="¿Que tienes en mente?"
            variant="outlined"
            className="inputFormLogin"
            value={comentario}
            {...register("textoPost", {
              required: true,
              onChange: onChangeComent
            })}
          />
          {errors.textoPost?.type === "required" && (
            <p role="alert">Este campo es requerido</p>
          )}
        </Row>
        <Row id="rowBtnPost">
          <Boton texto={"Publicar"} submit="submit" />
        </Row>
      </form>
    </>
  );
}

export default PostNuevoForm;
