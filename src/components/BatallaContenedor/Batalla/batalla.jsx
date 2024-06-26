import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Boton from '../../Boton/boton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import "./batalla.css"

function Batalla({batalla}){
    const evento = batalla.data;
    return(
        <Card key={batalla.id} sx={{ width: '30vw', height:'60vh', textAlign:'center', padding:'1rem', margin:'3px' }} id='cardItem'>
            <CardMedia
            sx={{ height: '30vh' }}
            image={evento.imagen}
            title={evento.titulo}
            id='cardMediaBatalla'
            />
            <CardContent>
            <Typography gutterBottom className='descripcionCard' variant="h5" component="div">
                {evento.titulo}
            </Typography>
            <Typography className='descripcionCard' variant="body2">
                {evento.descripcion}
            </Typography>
            </CardContent>
            <Link to={`/detalleEvento/${batalla.id}`}>
                <Boton texto={'Mas Info'}/>
            </Link>
        </Card>
    );
}

export default Batalla