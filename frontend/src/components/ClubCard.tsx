import React from 'react';
import { Club } from '../types';
import { Link } from 'react-router-dom';


interface ClubCardProps {
    club: Club;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
    return (
        <div className="card h-100 shadow-sm">
            <img
                src={club.image}
                className="card-img-top"
                alt={`${club.name} image`}
            />
            <div className="card-body">
                <h5 className="card-title">{club.name}</h5>
                <p className="card-text">{club.description}</p>
                
                <div className="mb-3">
                    {club.categories.map((category, index) => (
                        <span
                            key={index}
                            className="badge bg-secondary me-2"
                            style={{ fontSize: '0.9em' }}
                        >
                            {category}
                        </span>
                    ))}
                </div>

                <Link to={`/clubs/${club.name}`} state={{ club }} className="btn btn-primary">
                    Learn More
                </Link>
            </div>
        </div>
    );
};

export default ClubCard;
