import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from 'react';
import Boton from '../../Boton/boton';
import "./post.css"

function Post({post}){

    const [muestraComent, setMuestraComent] = useState(true);
    const [comentario, setComentario] = useState('');
    const [meGustaColor, setMeGustaColor] = useState(false);

    const handleMuestraComentario = () => {
        setMuestraComent((previa) => !previa);
    }

    const onSubmitComentario = (e) => {
        e.preventDefault();
        alert(e.target.texto.value);
        setComentario('');
    }

    const onChangeComent = (e) => {
        setComentario(e.target.value);
    }

    const onClickMeGusta = () => {
        setMeGustaColor((previa) => !previa);
    }

    return(
            <Container fluid id='containerPost'>
                <Row id='rowPost'>
                    <Col sm={6}>
                        <Card id="cardPost">
                            <CardContent>
                                <Row>
                                    <Col sm={1}>
                                        
                                    </Col>
                                    <Col>                                        
                                        <Typography gutterBottom variant="h5" component="div">
                                            {post.usuario}
                                        </Typography>
                                    </Col>
                                </Row>
                                <Typography variant="body2" id="textoPost">
                                    {post.texto}
                                </Typography>
                                <Row id='rowIconos'>
                                    <Col sm={1}>
                                        <CalendarMonthIcon />
                                    </Col>
                                    <Col sm={3}>
                                        <Chip label={post.fecha} />
                                    </Col>
                                    <Col sm={1}>
                                        <AccessTimeIcon />
                                    </Col>
                                    <Col sm={4}>
                                        <Chip label={post.hora} />
                                    </Col>
                                    <Col sm={1}>
                                        <IconButton onClick={onClickMeGusta}>
                                            <FavoriteIcon color={meGustaColor ? 'error' : 'none'} />    
                                        </IconButton>
                                    </Col>
                                    <Col sm={1}>
                                        <IconButton onClick={handleMuestraComentario}>
                                            <AddCommentIcon />
                                        </IconButton>
                                    </Col>
                                </Row>
                                <Row id='rowComentario' hidden={muestraComent}>
                                    <Col sm={10}>
                                        <form onSubmit={onSubmitComentario}>
                                            <Row>
                                                <TextField 
                                                label="Escribe un comentario" 
                                                variant="outlined" 
                                                id='texto'
                                                value={comentario}
                                                onChange={onChangeComent}/>
                                            </Row>
                                            <Row id='rowBtnPublicarComentario'>
                                                <Col sm={3}>
                                                    <Boton id='btnPublicar'
                                                    type='submit'
                                                    texto={'Publicar'} />
                                                </Col>
                                            </Row>
                                        </form>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Container>
    )
}

export default Post
