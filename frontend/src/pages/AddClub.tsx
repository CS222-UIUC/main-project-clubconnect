import React, { useState } from "react";
import Navbar from "../components/Navbar";
/*
name
description
established - date
member count - number
profile 
owner - store json web token
admin
*/

const AddClubForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [establishedDate, setEstablishedDate] = useState("");
  const [memberCount, setMemberCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newClub = {
      name,
      description,
      categories: categories.split(",").map((cat) => cat.trim()),
      establishedDate,
      memberCount,
    };

    try {
      const response = await fetch("/api/org", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClub),
      });

      if (!response.ok) {
        throw new Error("Failed to add club");
      }

      alert("Club added successfully!");
    } catch (error) {
      console.error("Error adding club:", error);
      alert("Error adding club.");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <h3>Add New Club</h3>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Club Name
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categories" className="form-label">
            Categories
          </label>
          <input
            id="categories"
            type="text"
            className="form-control"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="establishedDate" className="form-label">
            Established Date
          </label>
          <input
            id="establishedDate"
            type="date"
            className="form-control"
            value={establishedDate}
            onChange={(e) => setEstablishedDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="memberCount" className="form-label">
            Member Count
          </label>
          <input
            id="memberCount"
            type="number"
            className="form-control"
            value={memberCount}
            onChange={(e) => setMemberCount(parseInt(e.target.value) || 0)}
            required
          />
        </div>
        <div className="mb-3">
            <label htmlFor="memberCount" className="form-label">
            Select categories
          </label>
          <select
            className="form-multi-select"
            multiple
            data-coreui-search="true"
          >
            <option value="0">Angular</option>
            <option value="1">Bootstrap</option>
            <option value="2">React.js</option>
            <option value="3">Vue.js</option>
            <optgroup label="backend">
              <option value="4">Django</option>
              <option value="5">Laravel</option>
              <option value="6">Node.js</option>
            </optgroup>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Club
        </button>
      </form>
    </div>
  );
};

export default AddClubForm;
