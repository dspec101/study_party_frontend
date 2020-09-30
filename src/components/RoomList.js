import React from "react";
import { Card, Row, Col } from "react-bootstrap";

function RoomList(props) {
  return (
    <Row>
      {props.data.map((roomObject) => (
        <Col md={6} sm={12} lg={4}> 
        <Card style={{width: "18rem"}} 
          onClick={() => {
            props.roomSelector(roomObject.id);
          }}
        >
        <Card.Img src={roomObject.image_url} alt="" style={{height: "225px", objectFit:"contain"}}  />
         <Card.Body> 
         <Card.Title> {roomObject.title} </Card.Title>
          <p> 8 members: Joe, Natasha, Ariel... </p> 
          <p> 2 members currently live </p> 
         </Card.Body>
        </Card>
        </Col>
      ))}
    </Row>
  );
}

export default RoomList;






