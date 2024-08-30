import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap"; // Import Bootstrap components
import { Link, useLocation } from "react-router-dom";

function Homepage() {
  const location = useLocation();
  const { username } = location.state?.formData;
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data));
  }, []);

  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homepage-container">
      <header className="app-name-banner">
        <h1 className="display-4 text-dark text-center">
          Wanderlust: A Tourism Website
        </h1>
      </header>
      <Container className="homepage-content">
        {username && ( // Check if userName exists
          <h4 className="text-dark text-center mb-4">
            Welcome, {username}! Wanderlust Awaits!
          </h4>
        )}
        {!username && ( // Display default message if no userName
          <h4 className="text-dark text-center mb-4">Wanderlust Awaits!</h4>
        )}
        <Form.Control
          type="text"
          className="mb-3"
          placeholder="Search your dream destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Row xs={1} sm={2} md={3} className="g-4">
          {filteredDestinations.map((destination) => (
            <Col key={destination.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={destination.image}
                  alt={destination.name}
                  className="img-fluid rounded-top"
                />
                <Card.Body>
                  <Link to={`/destinations/${destination.id}`}>
                    <Card.Title className="h5">{destination.name}</Card.Title>
                  </Link>
                  <Card.Text>{destination.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;
