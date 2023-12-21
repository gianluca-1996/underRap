import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import "./batallas.css"
import Batalla from './Batalla/batalla';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Buscador from '../Buscador/buscador';

function BatallasContenedor(){
    const [items, setItems] = useState(null); 

    useEffect(() => {
        setTimeout(() => {
            fetch('src/assets/data/evento.json')
            .then(response => response.json())
            .then(info => {setItems(info)})
            .catch(error => console.error('Error al leer el archivo JSON:', error));
        }, 1000);
    }, []);

    return(
        <Container fluid id='batallaContainer'>
            <Row className='RowContainer'>
                {items && <Buscador/>}
            </Row>
            <Row className='RowContainer'>
                {items ? 
                items.map( (evento) => <Batalla key={evento.id} batalla={evento} /> ) 
                : <Spinner className='spinBatallas' animation="grow"/>}
            </Row>
        </Container>
    );
}

export default BatallasContenedor