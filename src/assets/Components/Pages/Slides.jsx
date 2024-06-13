import Carousel from 'react-bootstrap/Carousel';

export default function Slides(){
    return (
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/venues/m2.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/venues/m1.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/venues/m3.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              
       
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/venues/m4.jpg"
              alt="fourth slide"
            />
            <Carousel.Caption>
              
       
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/venues/m5.webp"
              alt="fifth slide"
            />
            <Carousel.Caption>
              
       
              
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
}