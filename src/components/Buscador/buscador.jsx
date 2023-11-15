import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./buscador.css"

function Buscador(){
    return(
        <Container fluid>
        <Row id='buscador'>
            <Col xs="auto">
                <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                />
            </Col>
            <Col xs="auto">
                <Button id='btnBuscar' type="submit" variant="contained">Buscar</Button>
            </Col>
        </Row>
        </Container>
    );
}

export default Buscador