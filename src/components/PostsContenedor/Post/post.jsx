import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardContent from "@mui/material/CardContent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCommentIcon from "@mui/icons-material/AddComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";
import Boton from "../../Boton/boton";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { formatDistanceToNow, parseISO } from "date-fns";
import "./post.css";

function Post({ post, columnas = 6 }) {
  const [muestraComent, setMuestraComent] = useState(true);
  const [comentario, setComentario] = useState("");
  const [meGusta, setMeGusta] = useState(false);

  const fechaPost = new Date(post.fechaHora.toDate());

  // fecha de creación del posteo en formato ISO
  const fechaCreacionISO = fechaPost.toISOString();

  // Convierte la cadena ISO a objeto Date
  const fechaCreacion = parseISO(fechaCreacionISO);

  // Calcula la distancia en palabras a la fecha actual
  const tiempoTranscurrido = formatDistanceToNow(fechaCreacion, {
    addSuffix: true,
  });

  const handleMuestraComentario = () => {
    setMuestraComent((previa) => !previa);
  };

  const onSubmitComentario = (e) => {
    e.preventDefault();
    alert(e.target.texto.value);
    setComentario("");
  };

  const onChangeComent = (e) => {
    setComentario(e.target.value);
  };

  const onClickMeGusta = () => {
    setMeGusta((previa) => !previa);
  };

  return (
    <Container fluid id="containerPost">
      <Row id="rowPost">
        <Col sm={columnas}>
          <Card id="cardPost">
            <CardContent>
              <Row id="rowFotoUser">
                <Col xs={2}>
                  <div id="fotoPost">
                    <img src={post.imagenPerfil} alt="usuario" />
                  </div>
                </Col>
                <Col xs={4} id="colNombreUsuario">
                  <Typography gutterBottom variant="h5" component="div">
                    <strong id="nombreUsuarioPost">{post.aka}</strong>
                  </Typography>
                </Col>
              </Row>
              <hr />
              <Typography variant="body2" id="textoPost">
                <strong>{post.textoPrincipal}</strong>
              </Typography>
              <hr />
              <Row className="rowFechaHora">
                <Chip
                  label={
                    <>
                      <CalendarMonthIcon /> {tiempoTranscurrido}
                    </>
                  }
                />
              </Row>
              <Row className="rowFechaHora">
                <Chip
                  label={
                    <>
                      <AccessTimeIcon />{" "}
                      {`${fechaPost.getHours()}:${fechaPost.getMinutes()}`}
                    </>
                  }
                />
              </Row>
              <Row id="rowAcciones">
                <Col className="colMegustaComent" xs={6}>
                  <IconButton onClick={onClickMeGusta}>
                    <ThumbUpAltIcon color={meGusta ? "error" : "none"} />
                  </IconButton>
                </Col>
                <Col className="colMegustaComent" xs={6}>
                  <IconButton onClick={handleMuestraComentario}>
                    <AddCommentIcon />
                  </IconButton>
                </Col>
              </Row>
              <Row id="rowComentario" hidden={muestraComent}>
                <Col sm={10}>
                  <form onSubmit={onSubmitComentario}>
                    <Row>
                      <TextField
                        label="Escribe un comentario"
                        variant="outlined"
                        id="texto"
                        value={comentario}
                        onChange={onChangeComent}
                      />
                    </Row>
                    <Row id="rowBtnPublicarComentario">
                      <Boton
                        id="btnPublicar"
                        submit={"submit"}
                        texto={"Publicar"}
                      />
                    </Row>
                  </form>
                </Col>
              </Row>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Post;
