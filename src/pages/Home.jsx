import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";
import { getAllPosts } from "../api/postApi";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import {  searchPosts } from "../api/postApi";

function Home() {

    const [posts, setPosts] = useState([]);
    const [showPostModal, setShowPostModal] = useState(false);
    const [searchText, setSearchText] = useState("");
const [refreshTrending, setRefreshTrending] = useState(0);
//const [searchText, setSearchText] = useState("");
    useEffect(() => {
        loadPosts();
    }, []);

    const navigate = useNavigate();

useEffect(() => {

    const email = localStorage.getItem("email");

    if (!email) {

        navigate("/");

    }

}, []);

    const loadPosts = async () => {

        try {

            const response = await getAllPosts();

            setPosts(response.data);

            

        } catch (error) {

            console.error("Unable to load posts", error);

        }

    };

  const handleSearch = async (text) => {

    if (text.trim() === "") {

        loadPosts();
        return;

    }

    const response = await searchPosts(text);

    setPosts(response.data);

    setRefreshTrending(prev => prev + 1);

};

    return (

        <div className="home-page">

            <Navbar
    refreshPosts={loadPosts}
    onSearch={handleSearch}
/>

            <div className="home-content">

                <div className="left-column">
                    <LeftSidebar />
                </div>

                <div className="feed">

                
                   {posts.map((post) => (

    <PostCard
     refreshPosts={loadPosts}
        key={post.postId}
        post={post}
    />


))}

                </div>

                <div className="right-column">
                    <RightSidebar refresh={refreshTrending} />
                </div>

            </div>

            {showPostModal && (

                <CreatePostModal
                    onClose={() => {
                        setShowPostModal(false);
                        refreshPosts={loadPosts}
                    }}
                />

            )}

        </div>

    );

}

export default Home;