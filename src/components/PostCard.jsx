import { useState } from "react";
import {
    saveLike,
    deleteLike,
    saveComment,
    getComment,
    editComment,
    deleteComment,
    editPost,
    deletePost
} from "../api/postApi";

import "../styles/PostCard.css";
import CreatePostModal from "./CreatePostModal";

function PostCard({ post ,refreshPosts  }) {

    const [liked, setLiked] = useState(post.liked);
    const [likeCount, setLikeCount] = useState(post.likeCount || 0);
    const [likeId, setLikeId] = useState(post.id);

    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState("");
    const [commentCount, setCommentCount] = useState(post.commentCount || 0);

    const [comments, setComments] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedComment, setEditedComment] = useState("");

    const [editingPost, setEditingPost] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
const [editedPost, setEditedPost] = useState(post.post);

  //  const [showPostModal, setShowPostModal] = useState(false);


const handleEditPost = async () => {

    try {

        await editPost({

            email: localStorage.getItem("email"),
            id: post.id,
            post: editedPost

        });

        post.post = editedPost;

        setEditingPost(false);

    } catch (error) {

        console.error(error);

    }

};

const handleDeletePost = async () => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        await deletePost(post.postId);

        refreshPosts();

    } catch (error) {

        console.error(error);

        alert("Unable to delete post.");

    }

};

    const handleLike = async () => {

        try {

            if (!liked) {

                const response = await saveLike({

                    email: localStorage.getItem("email"),
                    postId: post.postId

                });

                setLiked(response.data.liked);
                setLikeCount(response.data.likeCount);
                setLikeId(response.data.id);

            } else {

                const response = await deleteLike(likeId);

                setLiked(response.data.liked);
                setLikeCount(response.data.likeCount);
                setLikeId(null);

            }

        } catch (error) {

            console.error(error);

        }

    };

    const toggleComments = async () => {

        if (!showComment) {

            try {

                console.log(post);
console.log(post.postId);
        
                const response = await getComment(post.postId);


                setComments(response.data);
                setCommentCount(response.data.commentCount);

            } catch (error) {

                console.error(error);

            }

        }

        setShowComment(!showComment);

    };

    const handleComment = async () => {

        if (!comment.trim()) return;

        try {

            await saveComment({

                email: localStorage.getItem("email"),
                postId: post.postId,
                comment

            });

            const response = await getComment(post.postId);

            setComments(response.data);
            setCommentCount(response.data.length);

            setComment("");

        } catch (error) {

            console.error(error);

        }

    };

    const updateComment = async (item) => {

        try {

            await editComment({

                ...item,
                comment: editedComment

            });

            const response = await getComment(post.postId);

            setComments(response.data);

            setEditingId(null);
            setEditedComment("");

        } catch (error) {

            console.error(error);

        }

    };

    const removeComment = async (id) => {

        try {

            await deleteComment(id);

            const response = await getComment(post.postId);

            setComments(response.data);
            setCommentCount(response.data.commentCount);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="post-card">

           <div className="post-header">

    <div className="profile-circle">
        👤
    </div>

    <div className="post-user">

        <h5>{post.name}</h5>

        <p>{post.job}</p>

    </div>

    {post.emailId === localStorage.getItem("email") && (

        <div className="post-menu">

            <button
                className="menu-btn"
                onClick={() => setShowMenu(!showMenu)}
            >
                ⋮
            </button>

            {showMenu && (

                <div className="menu-dropdown">

                   

                    <button
                        onClick={() => {
                           handleDeletePost();
                            setShowMenu(false);
                        }}
                    >
                        🗑️ Delete Post
                    </button>

                </div>

            )}

        </div>

    )}
    
</div>

            <div className="post-content">

    {editingPost ? (

        <>
            <textarea
                value={editedPost}
                onChange={(e) => setEditedPost(e.target.value)}
            />

            <div className="mt-2">

                <button
                    className="btn btn-success btn-sm me-2"
                    onClick={handleEditPost}
                >
                    Save
                </button>

                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                        setEditingPost(false);
                        setEditedPost(post.post);
                    }}
                >
                    Cancel
                </button>

            </div>

        </>

    ) : (

        <p>{post.post}</p>

    )}

</div>

            <div className="post-counts">

                <span>👍 {likeCount} Likes</span>

                <span>💬 {commentCount} Comments</span>

            </div>

            <hr />

            <div className="post-actions">

                <button
                    className={`like-btn ${liked ? "liked-btn" : ""}`}
                    onClick={handleLike}
                >
                    👍 {liked ? "Liked" : "Like"}
                </button>

                <button onClick={toggleComments}>
                    💬 Comment
                </button>

                <button>
                    ↗ Share
                </button>

            </div>

            {showComment && (

                <>

                    <div className="comment-box">

                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <button
                            disabled={!comment.trim()}
                            onClick={handleComment}
                        >
                            Post
                        </button>

                    </div>

                    <div className="comments-list">

                        {comments.map((item) => (

                            <div
                                className="comment-item"
                                key={item.id}
                            >

                                <div className="comment-content">

                                    <strong>{item.email}</strong>

                                    {editingId === item.id ? (

                                        <input
                                            value={editedComment}
                                            onChange={(e) =>
                                                setEditedComment(e.target.value)
                                            }
                                        />

                                    ) : (

                                        <p>{item.comment}</p>

                                    )}

                                </div>

                                {item.email === localStorage.getItem("email") && (

                                    <div className="comment-actions">

                                        {editingId === item.id ? (

                                            <button
                                                onClick={() => updateComment(item)}
                                            >
                                                Save
                                            </button>

                                        ) : (

                                            <button
                                                onClick={() => {

                                                    setEditingId(item.id);
                                                    setEditedComment(item.comment);

                                                }}
                                            >
                                                Edit
                                            </button>

                                        )}

                                        <button
                                            onClick={() => removeComment(item.id)}
                                        >
                                            Delete
                                        </button>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                </>

            )}

        </div>

    );

}

export default PostCard;