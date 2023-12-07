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
            .catch(error => console.error('Error al leer el archivo JSON:', error));
        }, 5000);

        setTimeout(() => {
            fetch('src/assets/data/posts.json')
            .then(response => response.json())
            .then(info => {
                let posteos = info.filter((post) => post.usuarioId == 1);
                setPosteosUsuario(posteos);
            })
            .catch(error => console.error('Error al leer el archivo JSON:', error));
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
                            <h2 className='usuarioInfoPerfil' id='tituloAkaUsuario'>{usuario.aka}</h2>
                            <Col sm={3} id='colUsuarioInfo'>
                                <h3 className='usuarioInfoPerfil'>{usuario.nombre} {usuario.apellido}</h3>
                                <h3 className='usuarioInfoPerfil'>{usuario.ciudad}</h3>
                                <h3 className='usuarioInfoPerfil'>{usuario.nacimiento}</h3>
                                <h3 className='usuarioInfoPerfil'>
                                    <a href={usuario.urlInstagram}>Instagram</a>
                                </h3>
                            </Col>
                            <Col sm={8} id='colActividadPerfil'>
                                {
                                    posteosUsuario ?
                                    <>
                                        <h2>Noticias</h2>
                                        {posteosUsuario.map((post => <Post key={post.id} post={post}/>))}
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