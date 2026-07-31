import { useState } from "react";
import { createPost } from "../api/postApi";

function CreatePost() {

    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const save = async () => {

        try {

            const response = await createPost({
                name,
                comment
            });

            console.log(response.data);

            alert("Saved Successfully");

            setName("");
            setComment("");

        } catch (error) {

            console.error(error);

            alert("Failed");

        }

    };

    return (

        <div className="card p-3">

            <input
                className="form-control mb-3"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <textarea
                className="form-control"
                rows="4"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <button
                className="btn btn-primary mt-3"
                onClick={save}
            >
                Post
            </button>

        </div>

    );

}

export default CreatePost;