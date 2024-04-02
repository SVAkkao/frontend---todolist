import React from 'react'
import { Carousel } from "react-bootstrap";

const API_IMAGE = process.env.REACT_APP_IMAGE_URL

function Carouselimgitem({ jimageData,deleteJimage }) {





  return (
  
    
    <div className="d-flex justify-content-between">
      <img
        src={`${API_IMAGE}${jimageData.jimg}`}
        className="d-block"
        style={{ width: '100%' }} // 设置每个图片的宽度
        alt={`Slide ${jimageData.jiid}`}
      />
      <button
        type="button"
        onClick={
          () => { 
            deleteJimage(jimageData.jiid) 
          }
      }
        style={{ border: "none", backgroundColor: "transparent" }}
      >
        <div>
          <img style={{ width: "20px", height: '20px', paddingBottom: '0' }} src="/UserListSource/delete.png" alt="Delete icon" />
        </div>
      </button>
    </div>

  );
}

export default Carouselimgitem