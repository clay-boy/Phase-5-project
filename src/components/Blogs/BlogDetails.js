import React from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();

    return (
        <div className="blog-details">
            <h2>Blog Details (ID: {id})</h2>
            <p>Here you can display the blog details fetched from an API.</p>
        </div>
    );
};

export default BlogDetails;
