import Button from '@mui/material/Button';
import "./boton.css"

function Boton({texto}){
    return(
        <Button id='boton' variant="contained">{texto}</Button>
    );
}

export default Boton