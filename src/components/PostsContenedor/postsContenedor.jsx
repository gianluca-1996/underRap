import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Post from './Post/post';
import "./postsContenedor.css"
import useFetch from '../hooks/use-fetch';

function PostsContenedor(){

    const items = useFetch('/src/assets/data/posts.json');
    const posteos = items.data ? items.data : null

    return(
        <Container fluid id='postsContainer'>
            {posteos ? posteos.map((data) => <Post post={data} key={data.id}/>) : <Spinner className='spinBatallas' animation="grow"/> } 
        </Container>
    )
}

export default PostsContenedor
