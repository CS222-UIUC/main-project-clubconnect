import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import { Club } from "../types";

function ClubInfo() {
  const location = useLocation();
  const club = location.state?.club as Club;

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
          {/* Button to open modal */}
          <button
            type="button"
            className="btn btn-primary"
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

    
    </div>
  );
}

export default ClubInfo;
