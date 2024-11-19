import React from "react";
import { Link } from "react-router-dom";

const BlogList = () => {
    const blogs = [
        { id: 1, title: "First Blog", excerpt: "This is the first blog." },
        { id: 2, title: "Second Blog", excerpt: "This is the second blog." },
    ];

    return (
        <div className="blog-list">
            <h2>Blogs</h2>
            {blogs.map((blog) => (
                <div key={blog.id} className="blog-card">
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
                    <Link to={`/blogs/${blog.id}`}>Read More</Link>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
