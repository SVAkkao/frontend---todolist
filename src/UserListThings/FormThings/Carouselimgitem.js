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






function Carouselimgitem({ jimageData,key }) {





  return (<Carousel.Item>
    <div className="d-flex justify-content-between">
      <img
        src={jimageData.jimg}
        className="d-block"
        style={{ width: '33.33%' }} // 设置每个图片的宽度
        alt={`Slide ${key}`}
      />
      <button
        type="button"
        onClick={
          () => { 
            // deleteJbamount(budgetData.jbid) 
          }
      }
        style={{ border: "none", backgroundColor: "transparent" }}
      >
        <div>
          <img style={{ width: "20px", height: '20px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Delete icon" />
        </div>
      </button>
    </div>

  </Carousel.Item>);
}

export default Carouselimgitem