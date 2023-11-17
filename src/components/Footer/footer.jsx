import "./footer.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function Footer(){
    return(
        <Container fluid>
            <Row id="footer">
                <p>DESARROLLADO POR GIANLUCA</p>
            </Row>
        </Container>
    );
}

export default Footer;