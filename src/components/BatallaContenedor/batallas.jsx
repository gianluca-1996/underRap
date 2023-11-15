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
            setItems([
                {titulo: 'batalla 1', descripcion: 'descripcion batalla 1', img: 'src/assets/img/imagen1.jpg'}, 
                {titulo: 'batalla 2', descripcion: 'descripcion batalla 2', img: 'src/assets/img/imagen2.jpg'},
                {titulo: 'batalla 3', descripcion: 'descripcion batalla 3', img: 'src/assets/img/img3.png'},
                {titulo: 'batalla 4', descripcion: 'descripcion batalla 4', img: 'src/assets/img/img4.png'},
                {titulo: 'batalla 1', descripcion: 'descripcion batalla 1', img: 'src/assets/img/imagen1.jpg'}, 
                {titulo: 'batalla 3', descripcion: 'descripcion batalla 3', img: 'src/assets/img/img3.png'},
                {titulo: 'batalla 2', descripcion: 'descripcion batalla 2', img: 'src/assets/img/imagen2.jpg'}
            ]);
        }, 5000);
    }, []);

    return(
        <div id='contenedor-batallas'>
            {items && <Buscador/>}
            <Container fluid id='batallaContainer'>
                {items ? <Batalla batallas={items}/> : <Spinner id='spinBatallas' animation="grow"/>}
            </Container>
        </div>
    );
}

export default BatallasContenedor