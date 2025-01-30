import React, { useState } from "react";
import axios from "axios";
import "./ItemBook.css";

const AddBooking = () => {
  const [newBooking, setNewBooking] = useState({
    clientName: "",
    clientEmail: "",
    clientMobile: "",
    clientAddress: "",
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
      // Handle success (e.g., display confirmation, reset form)
      console.log("Booking added:", response.data);
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  return (
    <div className="add-booking-container">
      <h1>Add New Booking</h1>
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
  );
};

export default AddBooking;
