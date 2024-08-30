import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";

function BookingPage() {
  const { id } = useParams();
  const location = useLocation();
  const destination = location.state?.destination;
  const hotels = location.state?.hotels;
  const flights = location.state?.flights;
  const tours = location.state?.tours;
  const selectedHotels = location.state?.selectedHotels || [];
  const selectedFlights = location.state?.selectedFlights || [];
  const selectedTours = location.state?.selectedTours || [];
  const navigate = useNavigate();

  const getHotelDetails = (hotelId) => {
    return hotels.find((hotel) => hotel.id === hotelId);
  };

  const getFlightDetails = (flightId) => {
    return flights.find((flight) => flight.id === flightId);
  };

  const getTourDetails = (tourId) => {
    return tours.find((tour) => tour.id === tourId);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedHotels.forEach((hotelId) => {
      const hotel = getHotelDetails(hotelId);
      totalPrice += hotel.price;
    });
    selectedFlights.forEach((flightId) => {
      const flight = getFlightDetails(flightId);
      totalPrice += flight.price;
    });
    selectedTours.forEach((tourId) => {
      const tour = getTourDetails(tourId);
      totalPrice += tour.price;
    });
    return totalPrice;
  };

  return (
    <Container className="mt-4 confirmation-container">
      <h1 className="text-center">
        Booking Confirmation for {destination.name}
      </h1>
      <Row>
        <Col md={4}>
          <Card className="confirmation-card">
            <Card.Header>Selected Hotels</Card.Header>
            <ListGroup variant="flush">
              {selectedHotels.map((hotelId) => {
                const hotel = getHotelDetails(hotelId);
                return (
                  <ListGroup.Item key={hotelId}>
                    {hotel.name} - ${hotel.price}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="confirmation-card">
            <Card.Header>Selected Flights</Card.Header>
            <ListGroup variant="flush">
              {selectedFlights.map((flightId) => {
                const flight = getFlightDetails(flightId);
                return (
                  <ListGroup.Item key={flightId}>
                    {flight.airline} - {flight.origin} to {destination.name}
                    <br />
                    Departure: {flight.departureDate}
                    <br />
                    Arrival: {flight.arrivalDate}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="confirmation-card">
            <Card.Header>Selected Tours</Card.Header>
            <ListGroup variant="flush">
              {selectedTours.map((tourId) => {
                const tour = getTourDetails(tourId);
                return (
                  <ListGroup.Item key={tourId}>{tour.name}</ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <div className="mt-3 text-center">
        <h2 className="text-success">Total Price: ${calculateTotalPrice()}</h2>
        <Button variant="success" onClick={() => navigate("/")}>
          Continue Booking
        </Button>
      </div>
    </Container>
  );
}

export default BookingPage;
