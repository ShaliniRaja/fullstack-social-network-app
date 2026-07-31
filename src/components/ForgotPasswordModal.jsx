import { useState } from "react";
import { forgotPassword } from "../api/authApi";
import "../styles/forgotPassword.css";

function ForgotPasswordModal({ onClose }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isFormValid =
        email.trim() !== "" &&
        password.trim() !== "";

    const handleUpdatePassword = async () => {

        try {

            const response = await forgotPassword({
                email,
                password
            });

            if (response.status === 200) {

                alert("Password updated successfully.");

                setEmail("");
                setPassword("");

                onClose();

            }

        } catch (error) {

            console.error(error);

            alert("Unable to update password.Please Check Email");

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal-box">

                <h3>Forgot Password</h3>

                <p className="modal-subtitle">
                    Enter your email and new password.
                </p>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-4"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

               <div className="modal-buttons">

    <button
        className="cancel-btn"
        onClick={onClose}
    >
        Cancel
    </button>

    <button
        className="update-btn"
        disabled={!isFormValid}
        onClick={handleUpdatePassword}
    >
        Update Password
    </button>

</div>

            </div>

        </div>

    );

}

export default ForgotPasswordModal;