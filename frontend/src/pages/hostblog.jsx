import React, { use } from "react";
import {useEffect} from "react";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import UseContext from "../context/usercontest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Hostblog() {
    const [Blogdata, setBlogData] = useState([]);
    const [view,setView] = useState({});
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const {user}=UseContext();
    const navigate=useNavigate();
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:5001/host/all/${user.id}`, {
                    method: "GET",
                    credentials: "include",    
                }
            );
                if (response.ok) {
                    const blogData = await response.json();
                    console.log("Blog data fetched successfully:", blogData);
                    setBlogData(blogData.blogs);
                } else {
                    toast.success("Failed to fetch blog.");
                }
            } catch (error) {
                toast.success("Error fetching blog: " + error.message);
            }
        };
        fetchBlog();
    }, []);
    const getview= async (blogid) =>{
        const fetchdata=async()=>{
            try{
                const response=await fetch(`http://localhost:5001/user/views/${blogid}`);
                const data = await response.json();
                if(response){
                    console.log(blogid,data.view);
                    setView(prev=> ({...prev,[blogid]:data.view}));
                }
                else{
                    toast.success("No view");
                }
                
            }
            catch(err){
                console.log(err);
                toast.success("No view");
            }
        }
        fetchdata();
    };
    useEffect(()=>{
        Blogdata.map((blog)=>{
            getview(blog._id);
        })
    },[Blogdata])
    const handleEdit=  (blog)=>{
        navigate('/host/create',
        {
            state: {
                isEdit: true,
                blogData: blog
                }
        }
    )
    }
    const handleDelete = async (blogId) => {
        const fetchData=async ()=> {
            const response = window.confirm("Are you sure you want to delete this blog?") &&
            await fetch(`http://localhost:5001/host/delete/${blogId}`, {
                method: "DELETE",
                credentials: "include"
                });
                if(response.ok){
                    setBlogData(Blogdata.filter(blog=>blog._id!= blogId));
                    toast.success("Blog deleted successfully!");
                }
            }
        fetchData();
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-indigo-600">My Blogs</h1>
                        <p className="mt-2 text-gray-600">Manage your published content</p>
                    </div>
                    <button 
                        onClick={() => navigate('/host/create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-150 ease-in-out"
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Blog
                    </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Blogdata.map((blog) => (
                        <div 
                            key={blog._id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                        >
                            {/* Blog Preview Image */}
                            <div className="w-full h-48 overflow-hidden rounded-t-xl">
                                <img 
                                    src={`http://localhost:5001/${encodeURI(blog.path.replace("\\", "/"))}`} 
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Blog Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{blog.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">{blog.content}</p>
                                
                                {/* Blog Stats */}
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <span className="flex items-center" >

                                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        

                                        {view[blog._id] || 0 } views
                                    </span>
                                    <span className="mx-2">•</span>
                                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => handleEdit(blog)}
                                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-md text-sm font-medium transition-colors duration-150"
                                    >
                                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-red-600 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium transition-colors duration-150"
                                    >
                                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {Blogdata.length === 0 && (
                    <div className="text-center py-12">
                        <div className="mb-4">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No blogs yet</h3>
                        <p className="mt-1 text-gray-500">Get started by creating your first blog post.</p>
                        <div className="mt-6">
                            <button
                                onClick={() => navigate('/host/create')}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Create New Blog
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Hostblog;