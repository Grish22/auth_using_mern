import React, { use } from "react";
import {useEffect} from "react";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import UseContext from "../context/usercontest";

function Viewblog () {
    const [Blogdata, setBlogData] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch("http://localhost:5001/user/all", {
                    method: "GET",
                    credentials: "include"
                });
                if (response.ok) {
                    const blogData = await response.json();
                    console.log("Blog data fetched successfully:", blogData);
                    setBlogData(blogData.blogs);
                } else {
                    alert("Failed to fetch blog.");
                }
            } catch (error) {
                alert("Error fetching blog: " + error.message);
            }
        };
        fetchBlog();
    }, []);
    const handleDescription=(blogid)=>{
        navigate(`/user/all/${blogid}`,{
            state:{
                blogId:blogid
            }
        });
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
                    Discover Amazing Blogs
                </h1>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Explore our collection of insightful articles, stories, and knowledge shared by our community.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Blogdata.map((blog) => (
                        <div 
                            key={blog._id} 
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Blog Image */}
                            <div className="h-48 bg-indigo-100 overflow-hidden">
                                <img 
                                    src={blog.image || 'https://via.placeholder.com/400x200'} 
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Blog Content */}
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {blog.description || "Click to read more about this interesting topic..."}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <span className="text-indigo-600 font-semibold">
                                                {blog.author?.firstName?.[0] || 'A'}
                                            </span>
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600">
                                            {blog.author?.firstName || 'Anonymous'}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => handleDescription(blog._id)}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors duration-150 ease-in-out"
                                    >
                                        Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Empty State */}
                {Blogdata.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No blogs available at the moment. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Viewblog ;