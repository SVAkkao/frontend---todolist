import React from 'react'
import { Carousel } from "react-bootstrap";


function GetCarouselItem(i = 0, itemsInGroup = ["/logo.svg"]) {
    const renderImg = (image, index) => (<img
        key={image}
        src={image}
        className="d-block"
        style={{ width: '33.33%' }} // 设置每个图片的宽度
        alt={`Slide ${index}`}
    />);
    return <Carousel.Item key={i}>
        <div className="d-flex justify-content-between">
            {itemsInGroup.map(renderImg)}
        </div>
    </Carousel.Item>;
}






function Carouselimg() {





  return (
    <div>Carouselimg</div>
  )
}

export default Carouselimg