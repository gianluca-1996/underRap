import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Post from './Post/post';
import { useEffect, useContext, useState } from "react";
import UsuarioContext from "../UsuarioContext/usuarioContext";
import { useNavigate } from 'react-router-dom';
import "./postsContenedor.css"

function PostsContenedor(){

    const userCtx = useContext(UsuarioContext);
    const navigate = useNavigate();
    const [posteos, setPosteos] = useState();

    useEffect(() => {
        if(userCtx.usuarioActual){
            fetch('/src/assets/data/posts.json')
            .then((result) => result.json())
            .then((data) => {
                setPosteos(data);
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
        <Container fluid id='postsContainer'>
            {
                posteos ? posteos.map((data) => <Post post={data} key={data.id}/>) 
                : 
                <Spinner className='spinBatallas' animation="grow"/> 
            } 
        </Container>
    )
}

export default PostsContenedor
