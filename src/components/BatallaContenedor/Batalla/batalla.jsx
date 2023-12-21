import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Boton from '../../Boton/boton';
import Typography from '@mui/material/Typography';
import "./batalla.css"

function Batalla({batalla}){
    return(
        <Card key={batalla.id} sx={{ width: '30vw', height:'60vh', textAlign:'center', padding:'1rem', margin:'3px' }} id='cardItem'>
            <CardMedia
            sx={{ height: '30vh' }}
            image={batalla.img}
            title={batalla.titulo}
            id='cardMediaBatalla'
            />
            <CardContent>
            <Typography gutterBottom className='descripcionCard' variant="h5" component="div">
                {batalla.titulo}
            </Typography>
            <Typography className='descripcionCard' variant="body2">
                {batalla.descripcion}
            </Typography>
            </CardContent>
            <Boton texto={'Mas Info'}/>
        </Card>
    );
}

export default Batalla