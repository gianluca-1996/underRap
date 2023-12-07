import Container from 'react-bootstrap/Container';
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
        }, 5000);
    }, []);

    return(
        <div id='contenedor-batallas'>
            {items && <Buscador/>}
            <Container fluid id='batallaContainer'>
                {items ? <Batalla batallas={items}/> : <Spinner className='spinBatallas' animation="grow"/>}
            </Container>
        </div>
    );
}

export default BatallasContenedor