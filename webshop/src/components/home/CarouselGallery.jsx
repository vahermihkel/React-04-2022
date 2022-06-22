import { useState } from "react";
import { Carousel } from "react-bootstrap";

function CarouselGallery() {
  const [images, setImages] = useState(
    [
      {
        src: "https://picsum.photos/500/200",
        alt: "First slide",
        header: "First slide label",
        text: "Nulla vitae elit libero, a pharetra augue mollis interdum."
      },
      {
        src: "https://picsum.photos/id/102/500/200",
        alt: "Second slide",
        header: "Second slide label",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        src: "https://picsum.photos/id/321/500/200",
        alt: "Third slide",
        header: "Third slide label",
        text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur."
      }
    ]
    );

  return ( 
    <Carousel>
      { images.map(element => <Carousel.Item>
        <img
          src={element.src}
          alt={element.alt}
        />
        <Carousel.Caption>
          <h3>{element.header}</h3>
          <p>{element.text}</p>
        </Carousel.Caption>
      </Carousel.Item>)}
    </Carousel>
   );
}

export default CarouselGallery;