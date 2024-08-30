import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  ListGroup,
} from "react-bootstrap";

function BookingPage() {
  const { id } = useParams();
  const location = useLocation();
  const destination = location.state?.destination;
  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);
  const [tours, setTours] = useState([]);
  const [selectedHotels, setSelectedHotels] = useState([]);
  const [selectedFlights, setSelectedFlights] = useState([]);
  const [selectedTours, setSelectedTours] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (destination) {
      // Fetch hotels, flights, and tours based on the passed destination
      fetchHotels(destination.name);
      fetchFlights(destination.name);
      fetchTours(destination.name);
    }
  }, [destination]);

  const fetchHotels = async (location) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hotels/${location}`
      );
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setErrorMessage("Error fetching hotels. Please try again later.");
    }
  };

  const fetchFlights = async (location) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/flights/${location}`
      );
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setErrorMessage("Error fetching flights. Please try again later.");
    }
  };

  const fetchTours = async (location) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tours/${location}`
      );
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
      setErrorMessage("Error fetching tours. Please try again later.");
    }
  };

  const handleHotelSelection = (hotelId) => {
    setSelectedHotels((prevSelected) => {
      if (prevSelected.includes(hotelId)) {
        return prevSelected.filter((id) => id !== hotelId);
      } else {
        return [...prevSelected, hotelId];
      }
    });
  };

  const handleFlightSelection = (flightId) => {
    setSelectedFlights((prevSelected) => {
      if (prevSelected.includes(flightId)) {
        return prevSelected.filter((id) => id !== flightId);
      } else {
        return [...prevSelected, flightId];
      }
    });
  };

  const handleTourSelection = (tourId) => {
    setSelectedTours((prevSelected) => {
      if (prevSelected.includes(tourId)) {
        return prevSelected.filter((id) => id !== tourId);
      } else {
        return [...prevSelected, tourId];
      }
    });
  };

  const handleSubmit = () => {
    // Handle booking logic (e.g., store booking information, simulate payment)
    console.log(
      "Booking confirmed:",
      selectedHotels,
      selectedFlights,
      selectedTours
    );

    // Redirect to a confirmation page or homepage
    navigate("/booking-confirmation", {
      state: {
        destination,
        flights,
        hotels,
        tours,
        selectedHotels,
        selectedFlights,
        selectedTours,
      },
    });
  };

  return (
    <Container className="mt-4">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <h1 className="text-center mb-4">Book Your Trip to {destination.name}</h1>
      <Row>
        <Col md={4}>
          <h3>Hotels</h3>
          <Card className="mb-3">
            <Card.Header>
              <h5 className="card-title">Hotels</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {hotels.map((hotel) => (
                <ListGroup.Item key={hotel.id} className="card-item">
                  <Form.Check
                    type="checkbox"
                    label={`${hotel.name} - ${hotel.price} per night`}
                    name="hotel"
                    value={hotel.id}
                    checked={selectedHotels.includes(hotel.id)}
                    onChange={() => handleHotelSelection(hotel.id)}
                  />
                  <p>{hotel.description}</p>
                  <ul className="list-unstyled">
                    {hotel.amenities.map((amenity) => (
                      <li key={amenity}>{amenity}</li>
                    ))}
                  </ul>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <h3>Flights</h3>
          <Card className="mb-3">
            <Card.Header>
              <h5 className="card-title">Flights</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {flights.map((flight) => (
                <ListGroup.Item key={flight.id} className="card-item">
                  <Form.Check
                    type="checkbox"
                    label={`${flight.airline} - ${flight.origin} to ${flight.destination}`}
                    name="flight"
                    value={flight.id}
                    checked={selectedFlights.includes(flight.id)}
                    onChange={() => handleFlightSelection(flight.id)}
                  />
                  <p>Duration: {flight.duration}</p>
                  <p>Layovers: {flight.layovers}</p>
                  <p>Cabin Class: {flight.cabinClass}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <h3>Tours</h3>
          <Card className="mb-3">
            <Card.Header>
              <h5 className="card-title">Tours</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {tours.map((tour) => (
                <ListGroup.Item key={tour.id} className="card-item">
                  <Form.Check
                    type="checkbox"
                    label={`${tour.name}`}
                    name="tour"
                    value={tour.id}
                    checked={selectedTours.includes(tour.id)}
                    onChange={() => handleTourSelection(tour.id)}
                  />
                  <p>{tour.description}</p>
                  <p>Duration: {tour.duration}</p>
                  <p>Guide Language: {tour.guideLanguage}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <div className="mt-3 text-center">
        <Button variant="primary" onClick={handleSubmit}>
          Book Now
        </Button>
      </div>
    </Container>
  );
}

export default BookingPage;
