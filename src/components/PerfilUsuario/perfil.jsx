import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Post from "../PostsContenedor/Post/post";
import Boton from "../Boton/boton";
import app from "../Firebase/config.js";
import { Link } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  collection,
  orderBy
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PostNuevoForm from "../PostNuevoForm/postNuevoForm.jsx";
import FormEvento from "../FormEvento/formEvento.jsx";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./perfil.css";

function Perfil() {
  const auth = getAuth();
  const db = getFirestore(app);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [posteos, setPosteos] = useState(null);
  const [uid, setUid] = useState();
  const [openSeguidores, setOpenSeguidores] = useState(false);
  const [openSeguidos, setOpenSeguidos] = useState(false);
  const handleOpenSeguidores = () => setOpenSeguidores(true);
  const handleOpenSeguidos = () => setOpenSeguidos(true);
  const handleCloseSeguidores = () => setOpenSeguidores(false);
  const handleCloseSeguidos = () => setOpenSeguidos(false);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRefUsuario = doc(db, "Usuario", user.uid);
        getDoc(docRefUsuario)
          .then((usuarioRef) => {
            setUid(user.uid);
            setUsuario(usuarioRef.data());
            obtenerPosteosUsuario(user.uid);
          })
          .catch((error) => {
            console.log("Error...", error);
          });
      } else {
        navigate("/login", { replace: true });
      }
    });

    return () => unsubscribe();
  }, []);

  const obtenerPosteosUsuario = (uid) => {
    const q = query(collection(db, "Noticias"), where("usuarioId", "==", uid), orderBy('fechaHora', 'desc'));
    const posteosColeccion = [];

    getDocs(q)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        posteosColeccion.push(doc);
      });

      setPosteos(posteosColeccion);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <Container fluid id="contenedorPerfil">
      {usuario ? (
        <>
                  <div>
            <Modal
              open={openSeguidores}
              onClose={handleCloseSeguidores}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h4>Seguidores:</h4>
                {usuario.seguidores.length > 0 ? (
                  <ul>
                    {usuario.seguidores.map((seguidor) => (
                      <li key={seguidor.aka}>
                        <p>{seguidor.aka}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h4>No hay usuarios</h4>
                )}
              </Box>
            </Modal>
          </div>
          <div>
            <Modal
              open={openSeguidos}
              onClose={handleCloseSeguidos}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h4>Seguidos:</h4>
                {usuario.seguidos.length > 0 ? (
                  <ul>
                    {usuario.seguidos.map((seguidor) => (
                      <li key={seguidor.aka}>
                        <p>{seguidor.aka}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h4>No hay usuarios</h4>
                )}
              </Box>
            </Modal>
          </div>
          <div
            id="portada"
            style={{ backgroundImage: `url(${usuario.portada})` }}
          >
            <div
              id="fotoPerfil"
              style={{ backgroundImage: `url(${usuario.fotoPerfil})` }}
            />
          </div>
          <Row id="rowAKA">
            <Col sm={4}>
              <h2 className="usuarioInfoPerfil tituloAkaUsuario">
                AKA: "{usuario.aka}"
              </h2>
            </Col>
            {usuario.rol === "organizador" &&
              (false ? (
                <Col sm={2}>
                  <Link to={"/iniciarEvento"}>
                    <Boton texto={"Iniciar Evento"} />
                  </Link>
                </Col>
              ) : (
                <Col sm={2} >
                  <FormEvento usuario={usuario}/>
                </Col>
              ))}
          </Row>
          <Row id="rowInfoUsuario">
            <Col sm={3} id="colUsuarioInfo">
              <Row>
                <Col xs={2}>
                  <AssignmentIndIcon color="primary" />
                </Col>
                <Col>
                  <h4 
                    className="usuarioInfoPerfil"
                    onClick={handleOpenSeguidores}
                    style={{ cursor: "pointer" }}
                  >
                    Seguidores: {usuario.seguidores.length}
                  </h4>
                </Col>
                <Col>
                  <h4 
                    className="usuarioInfoPerfil"
                    onClick={handleOpenSeguidos}
                    style={{ cursor: "pointer" }}
                  >
                    Seguidos: {usuario.seguidos.length}
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col xs={2}>
                  <LocationOnIcon color="primary" />
                </Col>
                <Col>
                  <h4 className="usuarioInfoPerfil">{usuario.ciudad}</h4>
                </Col>
              </Row>
              {usuario.rol === "organizador" ? (
                <Row>
                  <Col xs={2}>
                    <CheckCircleIcon color="primary" />
                  </Col>
                  <Col>
                    <h4 className="usuarioInfoPerfil">Organizador</h4>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col xs={2}>
                    <CheckCircleIcon color="primary" />
                  </Col>
                  <Col>
                    <h4 className="usuarioInfoPerfil">Competidor</h4>
                  </Col>
                </Row>
              )}
              <Row>
                <Col xs={2}>
                  <InstagramIcon color="primary" />
                </Col>
                <Col xs={2}>
                  <YouTubeIcon color="primary" />
                </Col>
              </Row>
            </Col>
            <Col sm={8} id="colActividadPerfil">
              <Container
                fluid
                style={{
                  background: "white",
                  borderRadius: "15px",
                  marginTop: "2%",
                }}
              >
                <PostNuevoForm
                  handlePosteos={obtenerPosteosUsuario}
                  uid={uid}
                  aka={usuario.aka}
                />
              </Container>

              {posteos?.length ? (
                <>
                  <h2>Actividad</h2>
                  {posteos.map((post) => (
                    <Post key={post.id} post={post.data()} columnas={12} idPost={post.id} 
                    obtenerPosteosUsuario={obtenerPosteosUsuario} uid={uid} aka={usuario.aka}/>
                  ))}
                </>
              ) : (
                <h1>No hay actividad del usuario</h1>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <Spinner className="spinBatallas" animation="grow" />
      )}
    </Container>
  );
}

export default Perfil;
