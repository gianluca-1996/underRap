import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Post from '../PostsContenedor/Post/post'
import { useEffect, useState } from 'react';
import "./perfil.css"

function Perfil(){

    const [usuario, setUsuario] = useState();
    const [posteosUsuario, setPosteosUsuario] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch('src/assets/data/usuario.json')
            .then(response => response.json())
            .then(info => {setUsuario(info[0])})
            .catch(error => console.error('Error al leer el archivo usuario.JSON:', error));
        }, 5000);

        setTimeout(() => {
            fetch('src/assets/data/posts.json')
            .then(response => response.json())
            .then(info => {
                let posteos = info.filter((post) => post.usuarioId == 1);
                setPosteosUsuario(posteos);
            })
            .catch(error => console.error('Error al leer el archivo posts.JSON:', error));
        }, 7000);
    }, []);

    return(
        <Container fluid id='contenedorPerfil'>
            {
                usuario ? (
                    <>
                        <div id='portada' style={{backgroundImage: `url(${usuario.portada})`}}>
                            <div id='fotoPerfil' style={{backgroundImage: `url(${usuario.fotoPerfil})`}}/>
                        </div>
                        <Row id='rowInfoUsuario'>
                            <h2 className='usuarioInfoPerfil tituloAkaUsuario'>AKA - {usuario.aka}</h2>
                            <h4 className='usuarioInfoPerfil tituloAkaUsuario'>
                                Seguidores: {usuario.seguidores.length} - 
                                Seguidos: {usuario.seguidos.length}
                            </h4>
                            <Col sm={3} id='colUsuarioInfo'>
                                <Row>
                                    <Col xs={2}>
                                        <AssignmentIndIcon color='primary'/>
                                    </Col>
                                    <Col>
                                        <h4 className='usuarioInfoPerfil'>{usuario.nombre} {usuario.apellido}</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                        <LocationOnIcon color='primary'/>
                                    </Col>
                                    <Col>
                                        <h4 className='usuarioInfoPerfil'>{usuario.ciudad}</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                        <CalendarMonthIcon color='primary'/>
                                    </Col>
                                    <Col>
                                        <h4 className='usuarioInfoPerfil'>{usuario.nacimiento}</h4>
                                    </Col>
                                </Row>
                                {usuario.organizador && 
                                    <Row>
                                        <Col xs={2}>
                                            <CheckCircleIcon color='primary'/>
                                        </Col>
                                        <Col>
                                            <h4 className='usuarioInfoPerfil'>Organizador de eventos</h4>
                                        </Col>
                                    </Row>
                                }
                                <Row>
                                    <Col xs={2}>
                                        <InstagramIcon color='primary'/>
                                    </Col>
                                    <Col xs={2}>
                                        <YouTubeIcon color='primary'/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={8} id='colActividadPerfil'>
                                {
                                    posteosUsuario ?
                                    <>
                                        <h2>Noticias</h2>
                                        {posteosUsuario.map((post => <Post key={post.id} post={post} columnas={12}/>))}
                                    </>
                                    :
                                    (<Spinner className='spinBatallas' animation="grow"/>)
                                }
                            </Col>
                        </Row>
                    </>
                ) 
                : 
                (<Spinner className='spinBatallas' animation="grow"/>)
            }
        </Container>
    )
}

export default Perfil