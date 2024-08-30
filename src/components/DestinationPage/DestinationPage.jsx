import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Badge,
  Button,
} from "react-bootstrap";

function DestinationPage() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/destinations/${id}`)
      .then((res) => res.json())
      .then((data) => setDestination(data));
  }, [id]);

  if (!destination) {
    return <div>Loading...</div>;
  }

  const handleBookNow = () => {
    // Pass the destination data to the BookingPage
    navigate(`/booking/${id}`, { state: { destination } });
  };

  return (
    <Container className="destination-page-container">
      <h1 className="display-4 text-center mb-4">{destination.name}</h1>
      <Row>
        <Col md={6}>
          <Image src={destination.image} alt={destination.name} fluid rounded />
        </Col>
        <Col md={6}>
          <p className="destination-description">{destination.description}</p>

          <h3 className="mt-4">Attractions:</h3>
          <ListGroup className="mb-4">
            {destination.attractions.map((attraction, index) => (
              <ListGroup.Item key={index}>{attraction}</ListGroup.Item>
            ))}
          </ListGroup>

          <h3 className="mt-4">Activities:</h3>
          <div>
            {destination.activities.map((activity, index) => (
              <Badge pill bg="secondary" className="me-2" key={index}>
                {activity}
              </Badge>
            ))}
          </div>
          <Button className="mt-4" variant="primary" onClick={handleBookNow}>
            Book Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DestinationPage;
