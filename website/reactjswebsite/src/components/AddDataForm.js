import React, { useState } from "react";

const AddDataForm = () => {
  const [formData, setFormData] = useState({
    symbol: "",
    start_date: "",
    end_date: "",
    s3_bucket: "algiayfdata", // Default value
    s3_key: "",
    event_type: "history", // Default value
    interval_value: "1d", // Default value
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/add-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => alert("Data added successfully!"))
      .catch((error) => console.error("Error adding data:", error));
  };

  return (
    <div>
      <h2>Add New Data</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Symbol:
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          S3 Key (File Path):
          <input
            type="text"
            name="s3_key"
            value={formData.s3_key}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Interval Value:
          <select
            name="interval_value"
            value={formData.interval_value}
            onChange={handleChange}
            required
          >
            <option value="1d">1 Day</option>
            <option value="1wk">1 Week</option>
            <option value="1mo">1 Month</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddDataForm;
