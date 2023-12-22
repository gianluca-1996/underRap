import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import "./nav.css"

const Nav = () => {

    const isLog = true;

    return(
        <Container fluid className='navContainer'>
                    <Row>
                    <Col sm={4} id='tituloApp'>
                        <h1>underRap</h1>
                    </Col>
            {
                isLog ?
                <>
                    <Col sm={4}>
                        <Row>
                            <Col>
                                <Link to={"/eventos"}>
                                    <h4 className='colLinks'>Eventos</h4>
                                </Link>
                            </Col>
                            <Col>
                            <Link to={"/"}>
                                <h4 className='colLinks'>Noticias</h4>
                            </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={4}>
                        <Row>
                            <Link to={`/perfil/${0}`}>
                                <h4 className='colSesion'>Perfil</h4>
                            </Link>
                        </Row>
                    </Col>
                </>
                :
                <Col sm={4}>
                        <Row>
                            <h4 className='colSesion'>Iniciar sesion</h4>
                        </Row>
                        <Row>
                            <h4 className='colSesion'>Registrarme</h4>
                        </Row>
                </Col>
            }
                </Row>
        </Container>
    )
}

export default Nav