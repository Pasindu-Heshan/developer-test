import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ReaderHome = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [readingDate, setReadingDate] = useState("");
  const [readingValue, setReadingValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInValue = localStorage.getItem("loggedIn");
    console.log("loggedIn:", loggedInValue);
  
    if (loggedInValue == null) {
      navigate("/");
    }
  }, []);
  

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("loggedIn");
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(readingDate);
  
    const formData = new FormData();
    formData.append("account_number", accountNumber);
    formData.append("reading_date", readingDate);
    formData.append("reading_value", readingValue);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/meterReader/addMeterReading", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
  
      const responseData = await response.json();
  
      console.log("Response:", responseData);
      setReadingDate("");
      setAccountNumber("");
      setReadingValue("");
      setResponseMessage(responseData.message);
    } catch (e) {
      console.error("Error:", e);
    }
  };
  

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-4 bg-light rounded pb-4 w-25 p-3">
        <h2>Enter Meter Reading</h2>
        {responseMessage && (
          <div className={`alert ${responseMessage.includes("success") ? "alert-success" : "alert-danger"}`} role="alert">
            {responseMessage}
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="customerAccountNumber" className="mt-3">
            <Form.Label>Customer Account Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="readingDate" className="mt-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={readingDate}
              onChange={(e) => setReadingDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="meterReading" className="mt-3">
            <Form.Label>Meter Reading Value</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter meter reading"
              value={readingValue}
              onChange={(e) => setReadingValue(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ReaderHome;
