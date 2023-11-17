import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import "./detalleBatalla.css"
import { useEffect, useState } from 'react';
import Boton from '../Boton/boton';

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
            (<>
                <Row id='filaDetalle'>
                    <Col sm={6} >
                        <img id='imgDetalle' src={batalla.img} alt="evento" />
                    </Col>
                    <Col>
                        <Row id='rowInfoDetalle'>
                            <h1>{batalla.titulo}</h1>
                            <h2>{batalla.descripcion}</h2>
                            <h2>Localidad: {batalla.localidad}</h2>
                            <h2>Hora: {batalla.hora}hs.</h2>
                            <h2>Inscripción: ${batalla.precio}</h2>
                            <h2>Organizador: {batalla.organizador}</h2>
                        </Row>
                        <iframe id='mapaInfo' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52456.17831840319!2d-58.423933187558056!3d-34.74271476327053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd2a1814f921f%3A0x1ff108ea8ecb9dd6!2sBanfield%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700177288332!5m2!1ses!2sar" style= {{border:0, width: '100%', height: '50'}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <Row className='rowBtnDetalle'>
                            <Boton texto={'Inscribirme'}/>
                        </Row>
                        <Row className='rowBtnDetalle'>
                            <Boton texto={'Compartir'}/>
                        </Row>
                    </Col>
                </Row>
            </>
            ) : 
            (
                <Spinner animation="grow" className='spinBatallas' />
            )}            
        </Container>
    );
}

export default DetalleBatalla