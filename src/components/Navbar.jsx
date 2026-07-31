import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ refreshPosts, onSearch }) {

    const [showPostModal, setShowPostModal] = useState(false);
    const [searchText, setSearchText] = useState("");

    const navigate = useNavigate();

const handleLogout = () => {

    localStorage.removeItem("email");
    localStorage.removeItem("profileId");
    localStorage.removeItem("token"); // if you use JWT later

    navigate("/");

};

    return (
        <nav className="navbar">

    <div className="logo-section">

        <div className="ps-logo">
            PS
        </div>

        <div className="logo-title">
            PSConnect-In
        </div>

    </div>

    <div className="nav-center">

       <input
            type="text"
            className="search-box"
            placeholder="Search by name, job, email or post..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {

                if (e.key === "Enter") {

                    onSearch(searchText);

                }

            }}
        />

        <div
            className="start-post"
            onClick={() => setShowPostModal(true)}
        >
            ✍️ Start a post...
        </div>

    </div>

    <div className="nav-right">

          <div className="home">
            🏠
        </div>      

        <div className="notification">
            🔔
        </div>

         <div className="profile-menu">

    <button
        className="logout-btn"
        onClick={handleLogout}
    >
        Logout
    </button>

</div>

    </div>

   

    {showPostModal && (
                <CreatePostModal
                    onClose={() => setShowPostModal(false)}
                    refreshPosts={refreshPosts}
                />
            )}

</nav>

            
           
    );

}

export default Navbar;