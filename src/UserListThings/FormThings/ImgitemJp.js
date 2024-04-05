import React from 'react'
import './ImgHover.css'
const API_IMAGE = process.env.REACT_APP_IMAGE_URL



function ImgitemJp({ jpimageData, deleteJpimage }) {





  return (
    <>
      <div className="d-flex justify-content-between imgFrame">
        <button
          className='deleteBtn'
          type="button"
          style={{
            // position: 'absolute',
            position: 'relative',
            // top: '50%',
            // left: '50%',
            // transform: 'translate(-50%, -50%)',
            border: "none",
            backgroundColor: "transparent"
          }}
          onClick={
            () => {
              deleteJpimage(jpimageData.jpiid)
            }
          }
        >

          <img
            title='點擊圖片即可刪除'
            src={`${API_IMAGE}${jpimageData.jpimg}`}
            className="d-block imgHover"
            style={{ width: '100%', position: 'relative' }} // 设置每个图片的宽度
            alt={`Slide ${jpimageData.jpiid}`}
          />

          <img
            style={{
              width: "25%",
              // height: '20px',
              paddingBottom: '0',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            className='deleteIcon'
            src="/UserListSource/delete.png" alt="Delete icon" />
        </button>








      </div >
    </>
  );
}

export default ImgitemJp