import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Navbar from "../components/Navbar";
import { Club } from "../types";
import { useState } from "react";

function ClubInfo() {
  const location = useLocation();
  const club = location.state?.club as Club;

  const [show, setShow] = useState<boolean>(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const [clubData, setClubData] = useState({
    name: club.name,
    description: club.description,
    categories: club.categories.join(", "),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setClubData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('/org/', {
        method:"PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
          name: clubData.name,
          description: clubData.description,
          categories: clubData.categories
        })
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Error updating club:", error);
      alert("Error updating club. Please try again.");
    }
  };

  const [following, setFollow] = useState<boolean>(false);
  const handleToggleSave = async () => {
    setFollow((prev) => !prev);
    if (!following) {
      try {
        const response = await fetch('/user/followOrg', {
          method:"POST",
          headers:{"Content-Type": "application/json"},
          body:JSON.stringify(club)
        })
        if (response.ok) {
          console.log("Club followed successfully");
        } else {
            const errorMessage = await response.text();
            console.error("Error response from server:", errorMessage);
            alert("Failed to follow club. Please try again.");
        }
      } catch (error) {
        console.error("Error following club:", error);
        alert("Error following club. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <section className="container py-5">
        <div
          className="d-flex align-items-center justify-content-between p-5 mb-4"
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div className="d-flex align-items-center">
            <div>
              <h2 className="mb-1">
                <strong>{club.name}</strong>
              </h2>
              <p className="text-muted mb-1" style={{ fontSize: "0.9em" }}>
                {club.categories.join(", ")}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleShow}
          >
            Edit
          </button>
        </div>

        <div className="mt-4 d-flex justify-content-center">
          <div style={{ maxWidth: "1200px", width: "100%" }}>
            <hr className="mb-4" />
            <h4 className="mb-1">
              <strong>Description</strong>
            </h4>
            <p style={{ fontSize: "1.1em", lineHeight: "1.6" }}>
              {club.description}
            </p>

            <hr className="my-4" />
            <h4 className="mb-1">
              <strong>Events</strong>
            </h4>
            <p style={{ fontSize: "1.1em", lineHeight: "1.6" }}></p>
          </div>
        </div>

      </section>

      <div className="d-flex justify-content-center mt-4">
        <button 
          className={`btn-lg btn ${following ? 'btn-success' : 'btn-primary'}`} 
          onClick={handleToggleSave}
        >
          {following ? 'Following' : 'Follow Club'}
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Club Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="clubName" className="form-label">
                Club Name
              </label>
              <input
                type="text"
                className="form-control"
                id="clubName"
                defaultValue={club.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clubCategories" className="form-label">
                Categories
              </label>
              <input
                type="text"
                className="form-control"
                id="clubCategories"
                defaultValue={club.categories.join(", ")}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clubDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="clubDescription"
                rows={4}
                defaultValue={club.description}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClubInfo;
