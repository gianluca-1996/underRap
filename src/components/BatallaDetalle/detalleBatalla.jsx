import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import "./detalleBatalla.css"
import { useEffect, useState } from 'react';
import Boton from '../Boton/boton';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function DetalleBatalla(){

    const [batalla, setBatalla] = useState();

    useEffect(() => {
        setTimeout(() => {    
            fetch('src/assets/data/data.json')
            .then(res => res.json())
            .then(data => {setBatalla(data[3])})
            .catch(error => {console.error('No se pudo leer el archivo JSON: ' + error)})
        }, 4000);
    }, []);

    return(
        <Container id='detalleContenedor' fluid>
            {batalla ? 
            (<Row id='filaDetalle'> 
                <Col sm={6}>
                    <img id='imgDetalle' src={batalla.img} alt="evento"/>
                </Col>
                <Col sm={6}>
                    <Card id='cardInfoBatalla'>
                        <CardMedia>
                            <iframe id='mapaInfo' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52456.17831840319!2d-58.423933187558056!3d-34.74271476327053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd2a1814f921f%3A0x1ff108ea8ecb9dd6!2sBanfield%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700177288332!5m2!1ses!2sar" style= {{border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </CardMedia>
                        <CardContent id='cardContentInfoBatalla'>
                            <Row>
                                <h4 id='tituloEventoInfo'>{batalla.titulo}</h4>
                            </Row>
                            <hr />
                            <Row>
                                <Col xs={1}>
                                    <InfoOutlinedIcon />
                                </Col>
                                <Col>
                                    <h5>{batalla.descripcion}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={1}>
                                    <PlaceOutlinedIcon />
                                </Col>
                                <Col>
                                    <h5>{batalla.localidad}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={1}>
                                    <CalendarMonthIcon />
                                </Col>
                                <Col>
                                    <h5>{batalla.fecha}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={1}>
                                    <AccessTimeIcon />
                                </Col>
                                <Col>
                                    <h5>{batalla.hora}hs.</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={1}>
                                    <AttachMoneyIcon />
                                </Col>
                                <Col>
                                    <h5>Inscripción: ${batalla.precio}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={1}>
                                    <PersonOutlineOutlinedIcon />
                                </Col>
                                <Col>
                                    <h5>{batalla.organizador}</h5>                    
                                </Col>
                            </Row>
                        </CardContent>                        
                        <Row className='rowBtnInscripcionCompartir'>
                            <Boton texto={'Inscribirme'}/>
                        </Row>
                        <Row className='rowBtnInscripcionCompartir'>
                            <Boton texto={'Compartir'}/>
                        </Row>
                    </Card>
                </Col>   
            </Row>
            ) : 
            (
                <Spinner animation="grow" className='spinBatallas' />
            )}            
        </Container>
    );
}

export default DetalleBatalla