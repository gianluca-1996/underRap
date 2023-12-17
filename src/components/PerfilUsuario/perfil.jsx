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
import { useCallback, useEffect, useReducer} from 'react';
import "./perfil.css"
import Boton from '../Boton/boton';

const usuarioEstado = {
    usuario: null,
    posteos: null,
    error: null,
    loadingUser: true
}

const usuarioReducer = (estado, accion) => {
    if (accion.tipo === 'FETCH_START'){
        return {
            ...estado
        };
    }

    if (accion.tipo === 'FETCH_SUCCES'){
        return {
            error: false,
            usuario: accion.payload,
            posteos: accion.posteos,
            loadingUser: false
        };
    }

    if (accion.tipo === 'FETCH_ERROR'){
        return {
            ...estado,
            loadingUser: false,
            error: accion.payload
        };
    }

    return usuarioEstado;
}

function Perfil(){

    const [userPostState, dispatch] = useReducer(usuarioReducer, usuarioEstado);

    const fetchData = useCallback(
        async function fetchData(){
            dispatch({ tipo: 'FETCH_START' });
            
            try {
                const responseUser = await fetch('src/assets/data/usuario.json');
                const responsePost = await fetch('src/assets/data/posts.json');
                
                if (!responseUser.ok || !responsePost.ok) {
                    throw new Error('Failed to fetch data.');
                }
                
                const usuarios = await responseUser.json();
                const posteos = await responsePost.json();

                dispatch({tipo: 'FETCH_SUCCES', payload: usuarios[0], posteos: posteos.filter((post) => post.usuarioId == 1)});
            } catch (error) {
                dispatch({ tipo: 'FETCH_ERROR', payload: 'error.message si' });
            }
        }, []
    );

    useEffect(() => {
        setTimeout(() => {
            fetchData();
        }, 3000);
    }, [fetchData]);

    return(
        <Container fluid id='contenedorPerfil'>
            {
                userPostState.usuario &&
                <>
                    <div id='portada' style={{backgroundImage: `url(${userPostState.usuario.portada})`}}>
                        <div id='fotoPerfil' style={{backgroundImage: `url(${userPostState.usuario.fotoPerfil})`}}/>
                    </div>
                    <Row id='rowAKA'>
                        <Col sm={4}>
                            <h2 className='usuarioInfoPerfil tituloAkaUsuario'>AKA: "{userPostState.usuario.aka}"</h2>
                        </Col>
                        <Col sm={6}>
                            <h2 className='usuarioInfoPerfil tituloAkaUsuario'>
                                Seguidores: {userPostState.usuario.seguidores.length} - 
                                Seguidos: {userPostState.usuario.seguidos.length}
                            </h2>
                        </Col>
                        {
                            userPostState.usuario.organizador && 
                            <Col sm={2}>
                                <Boton texto={'Crear Evento'}/>
                            </Col>
                        }
                    </Row>
                    <Row id='rowInfoUsuario'>
                        <Col sm={3} id='colUsuarioInfo'>
                            <Row>
                                <Col xs={2}>
                                    <AssignmentIndIcon color='primary'/>
                                </Col>
                                <Col>
                                    <h4 className='usuarioInfoPerfil'>{userPostState.usuario.nombre} {userPostState.usuario.apellido}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={2}>
                                    <LocationOnIcon color='primary'/>
                                </Col>
                                <Col>
                                    <h4 className='usuarioInfoPerfil'>{userPostState.usuario.ciudad}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={2}>
                                    <CalendarMonthIcon color='primary'/>
                                </Col>
                                <Col>
                                    <h4 className='usuarioInfoPerfil'>{userPostState.usuario.nacimiento}</h4>
                                </Col>
                            </Row>
                            {
                                userPostState.usuario.organizador ?
                                <Row>
                                    <Col xs={2}>
                                        <CheckCircleIcon color='primary'/>
                                    </Col>
                                    <Col>
                                        <h4 className='usuarioInfoPerfil'>Organizador de eventos</h4>
                                    </Col>
                                </Row>
                                :
                                <Row>
                                    <Col xs={2}>
                                        <CheckCircleIcon color='primary'/>
                                    </Col>
                                    <Col>
                                        <h4 className='usuarioInfoPerfil'>Competidor</h4>
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
                                userPostState.posteos &&
                                <>
                                    <h2>Actividad</h2>
                                    {userPostState.posteos.map((post => <Post key={post.id} post={post} columnas={12}/>))}
                                </>
                            }
                        </Col>
                    </Row>
                </>
            }
            {userPostState.loadingUser && <Spinner className='spinBatallas' animation="grow"/>}
            {userPostState.error && <h1>{userPostState.error}</h1>}
        </Container>
    )
}

export default Perfil