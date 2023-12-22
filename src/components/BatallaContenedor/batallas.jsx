import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import "./batallas.css"
import Batalla from './Batalla/batalla';
import Spinner from 'react-bootstrap/Spinner';
import Buscador from '../Buscador/buscador';
import useFetch from '../hooks/use-fetch';

function BatallasContenedor(){
    const dataBatallas = useFetch('/src/assets/data/evento.json');
    const items = dataBatallas.data ? dataBatallas.data : null;

    return(
        <Container fluid id='batallaContainer'>
            <Row className='RowContainer'>
                {items && <Buscador/>}
            </Row>
            <Row className='RowContainer'>
                {
                items ? 
                items.map( (evento) => <Col sm={4} key={evento.id}><Batalla batalla={evento} /> </Col>) 
                :
                <Col>
                    <Spinner className='spinBatallas' animation="grow"/>
                </Col> 
                }
            </Row>
        </Container>
    );
}

export default BatallasContenedor