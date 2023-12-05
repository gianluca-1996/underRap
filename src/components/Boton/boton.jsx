import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';

function Boton({texto, submit}){
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blue[800]),
        backgroundColor: blue[800],
        '&:hover': {
          backgroundColor: blue[700],
        }
      }));

    return(
        <ColorButton
        variant="contained"
        type={submit}>
        {texto}
        </ColorButton>
    );
}

export default Boton