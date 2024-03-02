import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { doc, updateDoc, arrayRemove, getFirestore } from "firebase/firestore";
import app from "../../../Firebase/config";

const ComentarioPost = ({ comentario, aka, setComentariosPost, idPost }) => {
  const db = getFirestore(app);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpcionesComent = (e) => {
    if (e.target.childNodes[0].data === "Eliminar") {
      //eliminar coment
      updateDoc(doc(db, "Noticias", idPost), {
        comentarios: arrayRemove(comentario),
      }).then(() => {
        setComentariosPost((previa) =>
          previa.filter((coment) => coment !== comentario)
        );
      });
    }

    if (e.target.childNodes[0].data === "Editar") {
      console.log("Editar posteo");
    }
  };

  const opcionesComent = ["Eliminar", "Editar"];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Row
        style={{
          backgroundColor: "#e0e0e0",
          borderRadius: "15px",
        }}
      >
        <Col xs={10}>
          <p>{comentario.aka}</p>
        </Col>
        <Col>
          {aka === comentario.aka && (
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
                  {opcionesComent.map((option) => (
                    <MenuItem
                      key={option}
                      onClick={handleClickOpcionesComent}
                      value={option}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </Col>
          )}
        </Col>
        <h5>{comentario.comentario}</h5>
      </Row>
      <hr />
    </>
  );
};

export default ComentarioPost;
