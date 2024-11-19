import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import BlogList from "./components/Blogs/BlogList";
import BlogDetails from "./components/Blogs/BlogDetails";
import CommunityList from "./components/Community/CommunityList";
import CommunityDetails from "./components/Community/CommunityDetails";
import UserProfile from "./components/Profile/UserProfile";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import "./styles.css";

const App = () => {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/blogs" element={<BlogList />} />
                        <Route path="/blogs/:id" element={<BlogDetails />} />
                        <Route path="/communities" element={<CommunityList />} />
                        <Route path="/communities/:id" element={<CommunityDetails />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
