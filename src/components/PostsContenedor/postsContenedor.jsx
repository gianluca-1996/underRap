import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Post from "./Post/post";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import "./postsContenedor.css";
import app from "../Firebase/config";

function PostsContenedor() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [posteos, setPosteos] = useState();
  const db = getFirestore(app);
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //setUidUser(user.uid);
        getDoc(doc(db, "Usuario", user.uid))
          .then((usuarioRef) => {
            setUsuario({ aka: usuarioRef.data().aka, uid: user.uid });
          })
          .catch((error) => {
            console.log("Error...", error);
          });
        obtenerPosteos();
      } else {
        navigate("login");
      }
    });

    return () => unsubscribe();
  }, []);

  const obtenerPosteos = () => {
    const posteosData = [];
    getDocs(collection(db, "Noticias"))
      .then((documentos) => {
        documentos.forEach((doc) => {
          posteosData.push({ id: doc.id, ...doc.data() });
        });
        setPosteos(posteosData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid id="postsContainer">
      {posteos ? (
        posteos.map((data) => (
          <Post
            key={data.id}
            post={data}
            idPost={data.id}
            uid={usuario.uid}
            aka={usuario.aka}
            obtenerPosteos={obtenerPosteos}
          />
        ))
      ) : (
        <Spinner className="spinBatallas" animation="grow" />
      )}
    </Container>
  );
}

export default PostsContenedor;
