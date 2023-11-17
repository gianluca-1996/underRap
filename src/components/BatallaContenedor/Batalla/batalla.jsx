import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Boton from '../../Boton/boton';
import Typography from '@mui/material/Typography';
import "./batalla.css"

function Batalla({batallas}){
    return(
        <>
            {batallas.map((item) => 
                <Card key={item.id} sx={{ width: '27rem', height:'43rem', textAlign:'center', padding:'1rem', margin:'3px' }} id='cardItem'>
                    <CardMedia
                    sx={{ height: '30rem' }}
                    image={item.img}
                    title={item.titulo}
                    />
                    <CardContent>
                    <Typography gutterBottom className='descripcionCard' variant="h5" component="div">
                        {item.titulo}
                    </Typography>
                    <Typography className='descripcionCard' variant="body2">
                        {item.descripcion}
                    </Typography>
                    </CardContent>
                    <Boton texto={'Mas Info'}/>
                </Card>
            )}
        </>
    );
}

export default Batalla