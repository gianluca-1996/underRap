import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./nav.css"

const Nav = () => {

    return(
        <Container fluid className='navContainer'>
            <Row>
                <Col sm={4}>
                    <h1>underRap</h1>
                </Col>
                <Col sm={6}>
                    <Row>
                        <Col>
                            <p className='colLinks'>Home</p>
                        </Col>
                        <Col>
                            <p className='colLinks'>Batallas</p>
                        </Col>
                        <Col>
                            <p className='colLinks'>Contacto</p>
                        </Col>
                    </Row>
                </Col>
                <Col sm={2}>
                    <Row>
                        <p className='colSesion'>Iniciar sesion</p>
                    </Row>
                    <Row className='colSesion'>
                    <p className='colSesion'>Registrarme</p>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Nav