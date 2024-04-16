import React from 'react';
import { Card, ListGroup, Badge, Image } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa';

const RecommendationsList = ({ recommendations }) => {
  return (
    <div>
      <Card>
        <Card.Header>
          <FaClipboardList /> 行前建議
        </Card.Header>
        <ListGroup variant="flush">
          {recommendations['行前建議']?.length > 0 ? (
            recommendations['行前建議'].map((suggestion, index) => (
              <ListGroup.Item key={index}>{suggestion}</ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>暫無行前建議</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
      <Card className="mt-3">
        <Card.Header>
          <FaMapMarkerAlt /> 景點推薦
        </Card.Header>
        {recommendations['景點推薦']?.length > 0 ? (
          recommendations['景點推薦'].map((item, index) => (
            <Card.Body key={index}>
              <Card.Title>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(item.名稱)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.名稱}
                </a>{' '}
                <Badge pill variant="primary">
                  {item.類型}
                </Badge>
              </Card.Title>
              <Card.Text>{item.描述}</Card.Text>
              {item.圖片 && <Image src={item.圖片} fluid />}
            </Card.Body>
          ))
        ) : (
          <Card.Body>
            <Card.Text>暫無景點推薦</Card.Text>
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default RecommendationsList;