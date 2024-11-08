import Navbar from "../components/Navbar";
import "../App.css";

interface Club {
  name: string;
  description: string;
  image: string;
}

const clubs: Club[] = [
  {
    name: "AI Club",
    description: "example description",
    image: "",
  },
  {
    name: "Music Club",
    description: "example description",
    image: "",
  },
  {
    name: "Robotics Club",
    description: "example description",
    image: "",
  },
];

export default function Home() {
  return (
    <div>
      <Navbar />
      <section className="hero-section d-flex align-items-center">
        <div className="container text-center">
          <h1 className="display-4">Welcome to ClubConnect</h1>
          <p className="lead">
            Discover your community, find events, and join clubs that match your
            passions.
          </p>
          <a href="#clubs" className="btn btn-primary btn-lg mx-2">
            Explore Clubs
          </a>
          <a href="/clubs" className="btn btn-primary btn-lg mx-2">
            Explore Categories
          </a>
        </div>
      </section>

      <section id="features" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose ClubConnect?</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <i className="feature-icon bi bi-people-fill"></i>
              <h4 className="mt-3">Connect with Students</h4>
              <p>
                Meet like-minded peers and build your network through our club
                community.
              </p>
            </div>
            <div className="col-md-4">
              <i className="feature-icon bi bi-calendar-event-fill"></i>
              <h4 className="mt-3">Stay Updated on Events</h4>
              <p>
                Find and attend events hosted by your favorite clubs across
                campus.
              </p>
            </div>
            <div className="col-md-4">
              <i className="feature-icon bi bi-search"></i>
              <h4 className="mt-3">Easy Club Discovery</h4>
              <p>
                Explore clubs by category, interest, or major to find the best
                fit for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="clubs" className="py-5">
        <div className="container">
            <h3 className="text-center mb-4">Explore Clubs</h3>
            <div className="row">
            {clubs.map((club, index) => (
                <div key={index} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                    <img
                    src={club.image}
                    className="card-img-top"
                    alt={`${club.name} image`}
                    />
                    <div className="card-body">
                    <h5 className="card-title">{club.name}</h5>
                    <p className="card-text">{club.description}</p>
                    <a href="#" className="btn btn-primary">
                        Learn More
                    </a>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
      </section>
    </div>
  );
}
