import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import "./boton.css"

function Boton({texto}){
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blue[800]),
        backgroundColor: blue[800],
        '&:hover': {
          backgroundColor: blue[700],
        },
        marginTop: '20%'
      }));

    return(
        <ColorButton
        variant="contained">
        {texto}
        </ColorButton>
    );
}

export default Boton