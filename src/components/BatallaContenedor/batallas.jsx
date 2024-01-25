import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import "./batallas.css"
import Batalla from './Batalla/batalla';
import Spinner from 'react-bootstrap/Spinner';
import Buscador from '../Buscador/buscador';
import { useEffect, useContext, useState } from "react";
import UsuarioContext from "../UsuarioContext/usuarioContext";
import { useNavigate } from 'react-router-dom';

function BatallasContenedor(){
    const [items, setItems] = useState();
    const userCtx = useContext(UsuarioContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(userCtx.usuarioActual){
            fetch('/src/assets/data/evento.json')
            .then((result) => result.json())
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else{
          navigate('/login', {replace: true});
        }
      }, [userCtx]);

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