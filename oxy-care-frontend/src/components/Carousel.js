import Carousel from 'react-bootstrap/Carousel';
import image1 from '../images/karachi.jpg';
import image2 from '../images/faisii.jpg';
import image3 from '../images/lahore.png';
import image4 from '../images/multi.jpg';
import image5 from '../images/pic5.jpg';
import image6 from '../images/pic4.jpg';

function CarouselGallery() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={image1} alt='image' className="d-block w-100"/>
        <Carousel.Caption>
          <h3>Karachi</h3>
          <p>Karachi affected by climate change</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={image2} alt='image' className="d-block w-100"/>
        <Carousel.Caption>
          <h3>Faislabad</h3>
          <p>Faislabad affected by climate change</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={image3} alt='image'className="d-block w-100"/>
        <Carousel.Caption>
          <h3>Lahore</h3>
          <p>
          Lahore affected by climate change
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={image4} alt='image'className="d-block w-100"/>
        <Carousel.Caption>
          <h3>Multan</h3>
          <p>
            Multan affected by climate change
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={image5} alt='image'className="d-block w-100"/>
        <Carousel.Caption>
          <h3>Peshawar</h3>
          <p>
            Peshawar affected by climate change.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={image6} alt='image'className="d-block w-100"/>
        <Carousel.Caption>
          <h3>Islamabad</h3>
          <p>
            Islamabad affected by climate change.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselGallery;