import React, { useState } from 'react';
import ClubCard from "../components/ClubCard";
import Navbar from "../components/Navbar";
import { Club } from '../types';

const clubsData: Club[] = [
    {
        name: "AI Club",
        description: "explore ai",
        member_count: 10,
        established: "",
        categories: ["Technology", "AI", "Machine Learning"],
    },
    {
        name: "Music Club",
        description: "make music",
        member_count: 10,
        established: "",
        categories: ["Arts", "Music", "Performance"],
    },
    {
        name: "Robotics Club",
        description: "build robots",
        member_count: 10,
        established: "",
        categories: ["Engineering", "Technology", "Robotics", "STEM"],
    },
    {
        name: "Environmental Club",
        description: "environment",
        member_count: 10,
        established: "",
        categories: ["Outdoors", "STEM"],
    },
    {
        name: "Theater Club",
        description: "plays, acting, theatre",
        member_count: 10,
        established: "",
        categories: ["Arts", "Performance"],
    },
    {
        name: "Asian American Association",
        description: "asian culture",
        member_count: 10,
        established: "",
        categories: ["Identity", "Culture"],
    },
];

const uniqueCategories = Array.from(
    new Set(clubsData.flatMap((club) => club.categories))
);

const ClubsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const filteredClubs = clubsData.filter((club) => {
        const matchesSearch = club.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" ||
            club.categories.includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <Navbar />
            <section className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search clubs by name"
                        className="form-control w-50"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    <select
                        className="form-select w-25"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="All">All Categories</option>
                        {uniqueCategories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="row">
                    {filteredClubs.map((club, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <ClubCard club={club} />
                        </div>
                    ))}
                </div>
                
            </section>
        </div>
    );
};

export default ClubsPage;
