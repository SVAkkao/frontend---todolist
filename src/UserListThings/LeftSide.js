import React, { useState, useEffect } from "react";
import { Row, Col, Spinner, Modal, Form, Button } from "react-bootstrap";
// import Image from "react-bootstrap/Image";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Mylist from "./Mylist";
import axios from 'axios'

import { useUserStore } from "../stores/user";

const API_HOST = process.env.REACT_APP_API_URL;
const API_IMAGE = process.env.REACT_APP_IMAGE_URL


const postAddList = (body) => {
  const token = localStorage.getItem("userToken");
  return fetch(`${API_HOST}/api/POST/addlist`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body
  }).then(r => r.json());
};

// Components
// function TripLists({ triplist, handleButtonClick }) {
//   if( !Array.isArray(triplist) ) {
//     return <p className="text-center">現在還沒有旅遊清單。下一個能悸動你心中地方在哪呢？</p>;
//   }
//   if( triplist.length < 1 ) {
//     return <p className="text-center">現在還沒有旅遊清單。下一個能悸動你心中地方在哪呢？</p>;
//   }
//   return triplist.map((item, index) => (
//     <Mylist key={index} data={item} onButtonClick={handleButtonClick} />
//   ));
// }

// function AddList({ onUpdateInfo }) {
//   // Modal modules
//   const [modalModel, setModalModel] = useState(false);
//   const closeModal = () => setModalModel(false);
//   const openModal = () => setModalModel(true);
//   // AJAX modules
//   const addList = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const formdata = new FormData(form);
//     postAddList(formdata).then( () => {
//       onUpdateInfo();
//       closeModal();
//     }).catch( (e) => {
//       alert(e);
//     });
//     // postAddList = (formdata);
//   };
//   return <Row>
//     <Col className="text-center">
//       <img
//         className="mb-5 click-icon"
//         style={{ width: "48px", height: "48px" }}
//         src="/UserListSource/add.png"
//         alt="Add icon"
//         onClick={openModal}
//       />
//       <Modal show={modalModel} onHide={closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>新增清單</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p className="text-center">好。清單要叫什麼名字呢？</p>
//           <Form onSubmit={addList}>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>清單名字</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="title"
//                 placeholder="取個響亮的名字吧"
//                 autoFocus
//                 required
//                 aria-required
//               />
//             </Form.Group>
//             <Button type="submit">
//               送出
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Col>
//   </Row>;
// }

// function UserInfo() {
//   const { user, getUserPhoto } = useUserStore();
//   return <Row style={{ alignItems: "center" }}>
//     <Col>
//       <div style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
//         <Avatar
//           src={getUserPhoto()}
//           style={{ width: 150, height: 150, margin: 20 }}
//         />
//         <Typography variant="h3" sx={{ ml: 2 }}>
//           {user.name}
//         </Typography>
//       </div>
//     </Col>
//   </Row>;
// }


//呼叫使用者資料API
const getUserApi = () => {
  const token = localStorage.getItem('userToken')
  return axios.get(`${API_HOST}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}




function LeftSide({ data, onSelect, onUpdateInfo }) {

  const [selectedTlid, setSelectedTlid] = useState(null);

  if (onSelect && typeof onSelect === "function" && selectedTlid !== null) {
    onSelect(selectedTlid);
  }

  const [userName, setUserName] = useState('')
  const [userPhoto, setUserPhoto] = useState('')

  const fetchUser = async () => {
    try {
      const response = await getUserApi()
      setUserName(response.data.name)
      setUserPhoto(response.data.photo)
    } catch (error) {
      console.error('取得用戶訊息失敗：', error)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])


  const handleButtonClick = (tlid) => {
    setSelectedTlid(tlid);
  };

  if (!data) {
    return <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>;
  }

  return (
    <>

      <Row style={{ alignItems: 'center' }}>
        <Col>
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}
          >
            <Avatar
              src={
                userPhoto ? `${API_IMAGE}${userPhoto}` : 'avatar-template.svg'
              }
              style={{ width: 150, height: 150, margin: 20 }}
            />
            <Typography variant="h3" sx={{ ml: 2 }}>
              {userName}
            </Typography>
          </div>
        </Col>
      </Row>
      <Row className="m-5 text2" style={{ justifyContent: 'space-between' }}>
        <Col>
          <a className="supportColor">未完成</a>
        </Col>
        <Col>
          <a className="supportColor">已完成</a>
        </Col>
      </Row>
      {data.map((item, index) => (
        <Mylist key={index} data={item} onButtonClick={handleButtonClick} />
      ))}
      <Row>
        <Col className="text-center">
          <button
            type="button"
            onClick={postAddList}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <img
              className="mb-5"
              style={{ width: '48px', height: '48px' }}
              src="/UserListSource/add.png"
              alt="Icon"
            />
          </button>
        </Col>
      </Row>

      {/* <TripLists
        triplist={data.tourist_lists}
        handleButtonClick={handleButtonClick}
      /> */}
      {/* <AddList onUpdateInfo={onUpdateInfo} /> */}
    </>
  );
}

export default LeftSide;
