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
import app from "../Firebase/config.js";
import {
  getFirestore,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  collection,
  orderBy,
  updateDoc,
  arrayRemove,
  arrayUnion
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router";
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import "./perfilExterno.css";

function PerfilExterno() {
  const auth = getAuth();
  const db = getFirestore(app);
  const navigate = useNavigate();
  const param = useParams();
  const [usuario, setUsuario] = useState(null);
  const [posteos, setPosteos] = useState(null);
  const [uidExterno, setUidExterno] = useState(param.id);
  const [usuarioLogueado, setUsuarioLogueado] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userLogueado) => {
      if (userLogueado) {
        const docRefUsuarioLogueado = doc(db, "Usuario", userLogueado.uid);
        getDoc(docRefUsuarioLogueado)
          .then((usuarioRef) => {
            setUsuarioLogueado({ uid: userLogueado.uid, ...usuarioRef.data() });
          })
          .catch((error) => {
            console.log("Error...", error);
          });
      } else {
        navigate("/login", { replace: true });
      }
    });

    //USUARIO EXTERNO
    const docRefUsuario = doc(db, "Usuario", uidExterno);
    getDoc(docRefUsuario)
      .then((usuarioRef) => {
        setUidExterno(uidExterno);
        setUsuario(usuarioRef.data());
        obtenerPosteosUsuario(uidExterno);
      })
      .catch((error) => {
        console.log("Error...", error);
      });

    return () => unsubscribe();
  }, []);

  const obtenerPosteosUsuario = (uid) => {
    const q = query(
      collection(db, "Noticias"),
      where("usuarioId", "==", uid),
      orderBy("fechaHora", "desc")
    );
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
      });
  };

  const comenzarASeguir = async () => {
    await updateDoc(doc(db, "Usuario", uidExterno), {
      seguidores: arrayUnion({aka: usuarioLogueado.aka, uid: usuarioLogueado.uid})
    });
    
    usuario.seguidores.push({aka: usuarioLogueado.aka, uid: usuarioLogueado.uid});
    setUsuario(prev => ({
      ...prev,
      seguidores: usuario.seguidores
    }));
  }

  const dejarDeSeguir = async () => {
    await updateDoc(doc(db, "Usuario", uidExterno), {
      seguidores: arrayRemove({aka: usuarioLogueado.aka, uid: usuarioLogueado.uid})
    });

    const seguidores = usuario.seguidores.filter(seguidor => {seguidor.uid !== usuarioLogueado.uid}) ;
    setUsuario(prev => ({
      ...prev,
      seguidores: seguidores
    }));
  }

  return (
    <Container fluid id="contenedorPerfil">
      {usuario ? (
        <>
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
            <Col sm={3}>
              <h2 className="usuarioInfoPerfil tituloAkaUsuario">
                {usuario.aka}
              </h2>
            </Col>
            <Col sm={1}>
              {usuario.seguidores.find(seguidor => seguidor.uid === usuarioLogueado.uid) ? 
                <>
                  <HowToRegRoundedIcon onClick={dejarDeSeguir} style={{color: "#eeeeee", fontSize: "60px", cursor: "pointer"}}/> 
                  <p className="infoSeguidor">Seguido</p>
                </>
                : 
                <>
                  <PersonAddAlt1RoundedIcon onClick={comenzarASeguir} style={{color: "#eeeeee", fontSize: "60px", cursor: "pointer"}}/>
                  <p className="infoSeguidor">Seguir</p>
                </>
              }
            </Col>
          </Row>
          <Row id="rowInfoUsuario">
            <Col sm={3} id="colUsuarioInfo">
              <Row>
                <Col xs={2}>
                  <AssignmentIndIcon color="primary" />
                </Col>
                <Col>
                  <h4 className="usuarioInfoPerfil">
                    Seguidores: {usuario.seguidores.length}
                  </h4>
                </Col>
                <Col>
                  <h4 className="usuarioInfoPerfil">
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
              {posteos?.length ? (
                <>
                  <h2>Actividad</h2>
                  {posteos.map((post) => (
                    <Post
                      key={post.id}
                      post={post.data()}
                      columnas={12}
                      idPost={post.id}
                      obtenerPosteosUsuario={obtenerPosteosUsuario}
                      uid={usuarioLogueado?.uid}
                      aka={usuarioLogueado?.aka}
                    />
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

export default PerfilExterno;
