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
import Boton from '../Boton/boton';
import { useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../Firebase/config.js";
import "./detalleBatalla.css"


function DetalleBatalla(){
    const auth = getAuth();
    const db = getFirestore(app);
    const navigate = useNavigate();
    const param = useParams();
    const eventoId = param.id;
    const [batalla, setBatalla] = useState()
    const [formattedDate, setFormattedDate] = useState();
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Usar formato de 24 horas
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user){
            getDoc(doc(db, "Evento", eventoId))
            .then((doc) => {
                setBatalla(doc.data());
            })
            .catch((error) => {
                console.log(error);
            })
          }
          else{
            navigate('/login');
          }
        })
    
        return () => unsubscribe();
      }, []);


    return(
        <Container id='detalleContenedor' fluid>
            {batalla ? 
            (<Row id='filaDetalle'> 
                <Col sm={6}>
                    <img id='imgDetalle' src={batalla.imagen} alt="evento"/>
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
                                    <PersonOutlineOutlinedIcon />
                                </Col>
                                <Col>
                                    <h5>{batalla.organizadorAka}</h5>                    
                                </Col>
                            </Row>
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
                                    <h5>{new Intl.DateTimeFormat("es-ES", options).format(
                                        new Date(batalla.fecha.toDate())
                                    )}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={1}>
                                    <AttachMoneyIcon />
                                </Col>
                                <Col>
                                    <h5>Inscripción: ${batalla.inscripcion}</h5>
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