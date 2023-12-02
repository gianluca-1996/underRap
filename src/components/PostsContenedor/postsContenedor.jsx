import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Post from './Post/post';
import "./postsContenedor.css"

function PostsContenedor(){

    const [items, setItems] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch('src/assets/data/posts.json')
            .then(response => response.json())
            .then(info => {setItems(info)})
            .catch(error => console.error('Error al leer el archivo JSON:', error));
        }, 5000);
    }, []);

    return(
        <Container fluid id='postsContainer'>
            {items ? items.map((data) => <Post post={data} key={data.id}/>) : <Spinner className='spinBatallas' animation="grow"/> } 
        </Container>
    )
}

export default PostsContenedor
