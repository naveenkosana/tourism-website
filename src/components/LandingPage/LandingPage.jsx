import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { AuthContext } from "./../../AuthContext";

function LandingPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  //   const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful login (e.g., redirect to homepage)
        //const data = await response.json();
        //login(data.user);

        console.log("Login successful!");
        navigate("/home", {
          state: {
            formData,
          },
        }); // Redirect to homepage
      } else {
        // Handle login errors
        console.error("Login failed");
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <h1 className="text-center mb-4">Welcome to Our Tourism Website!</h1>
          <p className="text-center">
            Explore the world's most amazing destinations.
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              {" "}
               <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Link to="/register" className="ms-2">
                <Button variant="secondary">Register</Button>
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
