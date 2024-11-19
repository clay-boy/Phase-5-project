import React from "react";
import { Link } from "react-router-dom";

const CommunityList = () => {
    const communities = [
        { id: 1, name: "React Developers" },
        { id: 2, name: "Python Enthusiasts" },
    ];

    return (
        <div className="community-list">
            <h2>Communities</h2>
            {communities.map((community) => (
                <div key={community.id} className="community-card">
                    <h3>{community.name}</h3>
                    <Link to={`/communities/${community.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
};

export default CommunityList;
