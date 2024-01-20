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
import useFetch from '../hooks/use-fetch';
import Boton from '../Boton/boton';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "./perfil.css"



function Perfil(){

    const params = useParams();
    const idUser = params.id;
    const dataUser = useFetch('/src/assets/data/usuario.json');
    const dataPost = useFetch('/src/assets/data/posts.json');
    const usuario = dataUser.data ? dataUser.data[idUser] : null;
    let posteos = null;

    if(dataPost.data && usuario){
        if(dataPost.data.some( (posteo) => posteo.usuarioId == usuario.id)) posteos = dataPost.data.filter( (post) => post.usuarioId == usuario.id )
    }

    return(
        <Container fluid id='contenedorPerfil'>
            {
                usuario &&
                <>
                    <div id='portada' style={{backgroundImage: `url(${usuario.portada})`}}>
                        <div id='fotoPerfil' style={{backgroundImage: `url(${usuario.fotoPerfil})`}}/>
                    </div>
                    <Row id='rowAKA'>
                        <Col sm={4}>
                            <h2 className='usuarioInfoPerfil tituloAkaUsuario'>AKA: "{usuario.aka}"</h2>
                        </Col>
                        <Col sm={6}>
                            <h2 className='usuarioInfoPerfil tituloAkaUsuario'>
                                Seguidores: {usuario.seguidores.length} - 
                                Seguidos: {usuario.seguidos.length}
                            </h2>
                        </Col>
                        {
                            usuario.organizador && 
                            ( false ? 
                                <Col sm={2}>
                                    <Link to={"/iniciarEvento"}>
                                        <Boton texto={'Iniciar Evento'}/>
                                    </Link>
                                </Col>
                                :
                                <Col sm={2}>
                                    <Link to={"/nuevoEvento"}>
                                        <Boton texto={'Crear Evento'}/>
                                    </Link>
                                </Col>
                            )
                        }
                    </Row>
                    <Row id='rowInfoUsuario'>
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
                            {
                                usuario.organizador ?
                                <Row>
                                    <Col xs={2}>
                                        <CheckCircleIcon color='primary'/>
                                    </Col>
                                    <Col>
                                        <h4 className='usuarioInfoPerfil'>Rol: organizador</h4>
                                    </Col>
                                </Row>
                                :
                                <Row>
                                    <Col xs={2}>
                                        <CheckCircleIcon color='primary'/>
                                    </Col>
                                    <Col>
                                        <h4 className='usuarioInfoPerfil'>Rol: competidor</h4>
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
                                posteos ?
                                <>
                                    <h2>Actividad</h2>
                                    {posteos.map((post => <Post key={post.id} post={post} columnas={12}/>))}
                                </>
                                :
                                <h1>No hay actividad del usuario</h1>
                            }
                            {
                                dataPost.error &&
                                <h1>{dataPost.error}</h1>
                            }
                        </Col>
                    </Row>
                </>
            }
            {dataUser.loading && <Spinner className='spinBatallas' animation="grow"/>}
            {dataUser.error && <h1>{dataUser.error}</h1>}
        </Container>
    )
}

export default Perfil