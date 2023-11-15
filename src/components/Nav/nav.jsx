import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./nav.css"

const Nav = () => {

    return(
        <Container fluid className='navContainer'>
            <Row>
                <Col sm={4} id='tituloApp'>
                    <h1>underRap</h1>
                </Col>
                <Col sm={4}>
                    <Row>
                        <Col>
                            <h4 className='colLinks'>Home</h4>
                        </Col>
                        <Col>
                            <h4 className='colLinks'>Batallas</h4>
                        </Col>
                        <Col>
                            <h4 className='colLinks'>Contacto</h4>
                        </Col>
                    </Row>
                </Col>
                <Col sm={4}>
                    <Row>
                        <h4 className='colSesion'>Iniciar sesion</h4>
                    </Row>
                    <Row>
                        <h4 className='colSesion'>Registrarme</h4>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Nav