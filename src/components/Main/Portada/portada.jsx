import Carousel from 'react-bootstrap/Carousel';
import "./portada.css"

function Portada() {
  return (
    <Carousel fluid id='carousel'>
      <Carousel.Item>
        <div className='imgCarousel'>
          <img src="src/assets/img/imagen1.jpg" alt="img1" />
        </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className='imgCarousel'>
          <img src="src/assets/img/imagen2.jpg" alt="img2" />
        </div>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Portada;