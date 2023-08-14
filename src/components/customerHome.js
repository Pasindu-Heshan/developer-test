import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";

const CustomerHome = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [billingData, setBillingData] = useState(null);

  useEffect(() => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("loggedIn");
    console.log(localStorage.getItem("loggedIn"));

  }, []);

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(accountNumber);

    try {
      const formData = new FormData();
      formData.append("account_number", accountNumber);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/customer/getCustomerDetails",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        setBillingData(response.data);
        alert(response.data.message);
      } else {
        alert(response.data.message);
        setBillingData(null);
      }
    } catch (error) {
      console.error("Error fetching billing data:", error);
    }
  };

  return (
    <div className="mt-4">
      <h2>Customer Portal</h2>
      <div className="container mt-4 rounded pb-4 w-25 p-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="accountNumber">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Get Billing Data
          </Button>
        </Form>
      </div>

      {billingData && (
        <div className="container mt-4 pb-4 w-75 p-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Last Reading Date</th>
                <th>Previous Reading Date</th>
                <th>Last Meter Reading</th>
                <th>Previous Meter Reading</th>
                <th>Fixed Charge Amount (LKR)</th>
                <th>First Range Billed Amount (LKR)</th>
                <th>Second Range Billed Amount (LKR)</th>
                <th>Third Range Billed Amount (LKR)</th>
                <th>Total Billed Amount (LKR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{billingData.data.last_reading_date}</td>
                <td>{billingData.data.previous_reading_date}</td>
                <td>{billingData.data.last_reading}</td>
                <td>{billingData.data.previous_reading}</td>
                <td>{billingData.data.fixed_charge}</td>
                <td>{billingData.data.first_range_amount}</td>
                <td>{billingData.data.second_range_amount}</td>
                <td>{billingData.data.third_range_amount}</td>
                <td>{billingData.data.total_amount}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CustomerHome;
