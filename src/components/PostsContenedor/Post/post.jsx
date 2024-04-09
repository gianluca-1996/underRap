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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useEffect, useState, useTransition } from "react";
import Boton from "../../Boton/boton";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  doc,
  deleteDoc,
  getFirestore,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import app from "../../Firebase/config";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ComentarioPost from "./ComentariosPost/comentarioPost";
import "./post.css";

function Post({ post, idPost, columnas = 6, obtenerPosteos, uid, aka }) {
  const db = getFirestore(app);
  const [muestraComent, setMuestraComent] = useState(true);
  const [comentario, setComentario] = useState("");
  const [meGusta, setMeGusta] = useState(false);
  const [cantidadMeGusta, setCantidadMeGusta] = useState(post.meGusta.length);
  const [comentariosPost, setComentariosPost] = useState(post.comentarios);

  useEffect(() => {
    if (post.meGusta.find((elemento) => elemento === uid)) setMeGusta(true);
  }, []);

  const fechaPost = new Date(post.fechaHora.toDate());

  // fecha de creación del posteo en formato ISO
  const fechaCreacionISO = fechaPost.toISOString();

  // Convierte la cadena ISO a objeto Date
  const fechaCreacion = parseISO(fechaCreacionISO);

  // Calcula la distancia en palabras a la fecha actual
  const tiempoTranscurrido = formatDistanceToNow(fechaCreacion, {
    addSuffix: true,
  });

  const options = ["Eliminar", "Editar"];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOption = (e) => {
    if (e.target.childNodes[0].data === "Eliminar") {
      deleteDoc(doc(db, "Noticias", idPost))
        .then(() => {
          obtenerPosteos(uid);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (e.target.childNodes[0].data === "Editar") {
      console.log("Editar posteo");
    }
  };

  const handleMuestraComentario = () => {
    setMuestraComent((previa) => !previa);
  };

  const onSubmitComentario = (e) => {
    e.preventDefault();
    if (e.target.texto.value) {
      let fechaActual = Timestamp.now();
      let comentario = e.target.texto.value;
      updateDoc(doc(db, "Noticias", idPost), {
        comentarios: arrayUnion({
          comentario: comentario,
          idUsuario: uid,
          aka: aka,
          fecha: fechaActual,
        }),
      })
        .then(() => {
          setComentariosPost((prev) => [
            ...prev,
            {
              comentario: comentario,
              idUsuario: uid,
              aka: aka,
              fecha: fechaActual,
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setComentario("");
  };

  const onChangeComent = (e) => {
    setComentario(e.target.value);
  };

  const handleOnClickMeGusta = () => {
    if (meGusta) {
      setMeGusta((previa) => !previa);
      updateDoc(doc(db, "Noticias", idPost), {
        meGusta: arrayRemove(uid),
      });

      setCantidadMeGusta((prev) => prev - 1);
    } else {
      setMeGusta((previa) => !previa);
      updateDoc(doc(db, "Noticias", idPost), {
        meGusta: arrayUnion(uid),
      });

      setCantidadMeGusta((prev) => prev + 1);
    }
  };

  return (
    <Container fluid id="containerPost">
      <Row id="rowPost">
        <Col sm={columnas}>
          <Card id="cardPost">
            <CardContent>
              <Row
                className={uid === post.usuarioId ? "fotoUserLog" : "fotoUser"}
              >
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
                {uid === post.usuarioId ? (
                  <Col xs={1}>
                    <div>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          "aria-labelledby": "long-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        {options.map((option) => (
                          <MenuItem
                            key={option}
                            onClick={handleClickOption}
                            value={option}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  </Col>
                ) : (
                  <></>
                )}
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
                  <IconButton onClick={handleOnClickMeGusta}>
                    <ThumbUpAltIcon color={meGusta ? "error" : "none"} />
                  </IconButton>
                  <p>{cantidadMeGusta != 0 && cantidadMeGusta}</p>
                </Col>
                <Col className="colMegustaComent" xs={6}>
                  <IconButton onClick={handleMuestraComentario}>
                    <AddCommentIcon />
                  </IconButton>
                  <p>{comentariosPost.length != 0 && comentariosPost.length}</p>
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
                {
                  /*MOSTRAR COMENTARIOS EXISTENTES */
                  comentariosPost.length > 0 && (
                    <Row
                      style={{
                        margin: "5%",
                      }}
                    >
                      <h3 style={{ textAlign: "center" }}>Comentarios</h3>
                      <Col>
                        <ul id="listaComent">
                          {comentariosPost.map((coment) => (
                            <li key={coment.fecha}>
                              <ComentarioPost comentario={coment} aka={aka} setComentariosPost={setComentariosPost} idPost={idPost} />
                            </li>
                          ))}
                        </ul>
                      </Col>
                    </Row>
                  )
                }
              </Row>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Post;
