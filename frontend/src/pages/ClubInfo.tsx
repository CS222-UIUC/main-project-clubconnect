import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import { Club } from "../types";

const ClubInfo: React.FC = () => {
  const location = useLocation();
  const club = location.state?.club as Club;

  return (
    <div>
      <Navbar />
      <section className="container py-5">
        <h2>{club.name}</h2>

        <div className="mb-3">
          {club.categories.map((category, index) => (
            <span
              key={index}
              className="badge bg-secondary me-2"
              style={{ fontSize: "0.9em" }}
            >
              {category}
            </span>
          ))}
        </div>
        
        <p>{club.description}</p>
      </section>
    </div>
  );
};

export default ClubInfo;
