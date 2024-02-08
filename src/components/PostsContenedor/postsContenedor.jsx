import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Post from "./Post/post";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./postsContenedor.css";

function PostsContenedor() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [posteos, setPosteos] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        /*fetch("/src/assets/data/posts.json")
          .then((result) => result.json())
          .then((data) => {
            setPosteos(data);
          })
          .catch((error) => {
            console.log(error);
          });
          */
      }
      else{
        navigate('login');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container fluid id="postsContainer">
      {posteos ? (
        posteos.map((data) => <Post key={data.id} post={data} idPost={data.id} />)
      ) : (
        <Spinner className="spinBatallas" animation="grow" />
      )}
    </Container>
  );
}

export default PostsContenedor;
