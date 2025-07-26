import react from 'react';
import {useLocation } from 'react-router-dom'
import { useEffect,useState } from 'react';
function Description (){
    const location =useLocation();
    const blogId=location.state?.blogId;
    const [blogContent, setBlogContent] = useState(null);
    useEffect( () => {
        const fetchdata= async()=>{
            try {
                    if (blogId) {
                    const response = await fetch(`http://localhost:5001/user/all/${blogId}`,{
                        method: "GET",
                        credentials: "include" 
                    })
                    const data =await response.json();
                    if(response.ok){
                        setBlogContent(data.content);
                    }
                }
                }
                catch (errors){
                    alert("error occcured");
                    console.log(errors)
                }
            }
            fetchdata();
            
        }, [blogId]);
    return(
        <>  
        {blogContent} 
        <div className="mt-6 px-4">
        <div className="flex items-center justify-start space-x-4 mb-4">
        <button className="flex items-center px-3 py-1 bg-white rounded-full shadow hover:bg-gray-100 transition">
            <svg className="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="ml-1 text-sm">90</span>
        </button>
        <button className="flex items-center px-3 py-1 bg-white rounded-full shadow hover:bg-gray-100 transition">
            <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5 0h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2.5" />
            </svg>
            <span className="ml-1 text-sm">80</span>
        </button>
    </div>

    <div className="relative flex items-center mb-4">
        <input 
            type="text" 
            placeholder="Add a comment..." 
            className="block w-full rounded-full border border-gray-300 pl-4 pr-10 py-1.5 text-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button className="absolute right-2 text-indigo-600 hover:text-indigo-500">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        </button>
        </div>

        <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500 font-medium mb-6">
            View all comments
        </button>
        </div>

    </>
    )
}

export default Description;