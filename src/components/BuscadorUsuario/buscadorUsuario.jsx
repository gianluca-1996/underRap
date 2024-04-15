import * as React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import TextField from "@mui/material/TextField";
import {
  query,
  where,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import app from "../Firebase/config.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./buscadorUsuario.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 250,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const BuscadorUsuario = () => {
  const db = getFirestore(app);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [listaUsuarios, setListaUsuarios] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setListaUsuarios([]);
  };

  const onChangeText = (e) => {
    const iniciales = e.target.value;
    const usuariosAux = [];

    if (iniciales.length > 2) {
      const usuarioRef = collection(db, "Usuario");
      const consulta = query(
        usuarioRef,
        where("aka", ">=", iniciales),
        where("aka", "<=", iniciales + "\uf8ff")
      );
      getDocs(consulta)
        .then((snapShot) => {
          snapShot.forEach((elemento) => {
            usuariosAux.push({id: elemento.id, ...elemento.data()});
          });
          setListaUsuarios(usuariosAux);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleOnClickUsuario = e => {
    handleClose();
    //TODO: navegar hacia el perfil del usuario seleccionado (nuevo componente de perfil)
    navigate(`/perfilExterno/${e.target.attributes.value.nodeValue}`);
  }

  return (
    <div id="buscadorIcon">
      <PersonSearchIcon onClick={handleOpen} id="PersonSearchIcon"/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Row>
            <h3>Buscar usuario</h3>
            <TextField
              id="outlined-basic"
              label="ingresar usuario/aka"
              variant="outlined"
              onChange={onChangeText}
            />
          </Row>
          {listaUsuarios.length > 0 && 
            listaUsuarios.map(usuario => <Row key={usuario.id} id="lineResult">
              <Col>
                foto
              </Col>
              <Col>
                <h6 onClick={handleOnClickUsuario} value={usuario.id}>{usuario.aka}</h6>
              </Col>
            </Row>)
          }
        </Box>
      </Modal>
    </div>
  );
};

export default BuscadorUsuario;
