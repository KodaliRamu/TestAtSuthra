import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [totalClients, setTotalClients] = useState(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [newBooking, setNewBooking] = useState({
    clientName: "",
    clientEmail: "",
    clientMobile: "",
    clientAddress: "",
    createdAt: "",
    products: [
      {
        category: "",
        type: "",
        numberOfPieces: "",
        size: "",
        description: "",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dashboard");
        if (response.data && typeof response.data === "object") {
          setTotalBookings(response.data.totalBookings);
          setTotalClients(response.data.totalClients);

          if (Array.isArray(response.data.clients)) {
            setClients(response.data.clients);
          } else {
            setClients([]);
          }
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedProducts = [...newBooking.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: value,
    };
    setNewBooking({ ...newBooking, products: updatedProducts });
  };
  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };

    fetch("http://localhost:3000/api/bookings", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        setClients(result.bookings);
        setTotalBookings(result.length);
      })

      .catch((error) => console.error(error));
  }, []);

  const handleAddBooking = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/bookings",
        newBooking,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Booking added:", response.data);

      setClients([...clients, response.data]);
      setTotalBookings(totalBookings + 1);
      setNewBooking({
        clientName: "",
        clientEmail: "",
        clientMobile: "",
        clientAddress: "",
        createdAt: "",
        products: [
          {
            category: "",
            type: "",
            numberOfPieces: "",
            size: "",
            description: "",
          },
        ],
      });
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card total-clients">
            <h3>Total Clients</h3>
            <p>{totalClients}</p>
          </div>
          <div className="stat-card total-bookings">
            <h3>Total Bookings</h3>
            <p>{totalBookings}</p>
          </div>
        </div>

        <div className="new-booking-form">
          <h2>Add New Booking</h2>
          <input
            type="text"
            name="clientName"
            placeholder="Client Name"
            value={newBooking.clientName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="clientEmail"
            placeholder="Client Email"
            value={newBooking.clientEmail}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="clientMobile"
            placeholder="Client Mobile"
            value={newBooking.clientMobile}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="clientAddress"
            placeholder="Client Address"
            value={newBooking.clientAddress}
            onChange={handleInputChange}
          />

          {/* Product Fields */}
          {newBooking.products.map((product, index) => (
            <div key={index} className="product-fields">
              <input
                type="text"
                name="category"
                placeholder="Product Category"
                value={product.category}
                onChange={(e) => handleProductChange(e, index)}
              />
              <input
                type="text"
                name="type"
                placeholder="Product Type"
                value={product.type}
                onChange={(e) => handleProductChange(e, index)}
              />
              <input
                type="text"
                name="numberOfPieces"
                placeholder="Number of Pieces"
                value={product.numberOfPieces}
                onChange={(e) => handleProductChange(e, index)}
              />
              <input
                type="text"
                name="size"
                placeholder="Product Size"
                value={product.size}
                onChange={(e) => handleProductChange(e, index)}
              />
              <input
                type="text"
                name="description"
                placeholder="Product Description"
                value={product.description}
                onChange={(e) => handleProductChange(e, index)}
              />
            </div>
          ))}

          <button onClick={handleAddBooking}>Add Booking</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Booking Date</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index}>
                  <td>{client.clientName}</td>
                  <td>{client.clientEmail}</td>
                  <td>{client.clientMobile}</td>
                  <td>{client.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
