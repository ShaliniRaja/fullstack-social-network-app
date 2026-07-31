import { useState } from "react";
import { createPostBox } from "../api/postApi";
import "../styles/CreatePostModal.css";

function CreatePostModal({ onClose, refreshPosts }) {

    const [post, setPost] = useState("");

    // Email saved during login
    const email = localStorage.getItem("email");

    const handlePost = async () => {

        try {

            const response = await createPostBox({
                email: email,
                post: post
            });

            if (response.status === 200 || response.status === 201) {

                setPost("");

                refreshPosts();

                onClose();

            }

        } catch (error) {

            console.error(error);

            alert("Unable to create post.");

        }

    };

    return (

        <div className="post-overlay">

            <div className="post-modal">

                <div className="post-header">

                    <h3>Create Post</h3>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="post-body">

                    <textarea
                        className="post-text"
                        placeholder="What's on your mind?"
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                    />

                </div>

                <div className="post-footer">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="post-btn"
                        disabled={!post.trim()}
                        onClick={handlePost}
                    >
                        Post
                    </button>

                </div>

            </div>

        </div>

    );

}

export default CreatePostModal;