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
  const opcionesComent = ["Eliminar", "Editar"];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Usar formato de 24 horas
  };
  const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(
    new Date(comentario.fecha.toDate())
  );

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

  return (
    <>
      <Row
        style={{
          backgroundColor: "#e0e0e0",
          borderRadius: "15px",
        }}
      >
        <Row style={{justifyContent: "space-between"}}>
          <Col>
            <p style={{textDecoration: "underline"}}>{comentario.aka}</p>
          </Col>
          <Col xs={1}>
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
        </Row>
        <h6>{comentario.comentario}</h6>
        <Row>
          <p>{formattedDate}</p>
        </Row>
      </Row>
      <hr />
    </>
  );
};

export default ComentarioPost;
