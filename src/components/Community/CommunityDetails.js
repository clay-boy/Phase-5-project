import React from "react";
import { useParams } from "react-router-dom";

const CommunityDetails = () => {
    const { id } = useParams();

    return (
        <div className="community-details">
            <h2>Community Details (ID: {id})</h2>
            <p>Here you can display details about the community fetched from an API.</p>
        </div>
    );
};

export default CommunityDetails;
