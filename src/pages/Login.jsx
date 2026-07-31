import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import "../styles/Login.css";
import ForgotPasswordModal from "../components/ForgotPasswordModal";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleLogin = async () => {

        try {

            const response = await login({
                email,
                password
            });

            console.log("Login Response:", response);

            if (response.status === 200) {
                 localStorage.setItem("profileId", response.data.id);
                 localStorage.setItem("email", response.data.email);
                navigate("/home");
            }

        } catch (error) {

            console.error("Login Failed:", error);
            alert("Invalid Email or Password");

        }

    };

    
    return (

        <>

            <div className="login-container">

                {/* Left Section */}

                <div className="left-section">

                    <h1>Welcome to</h1>

                    <h2>PSConnect-In</h2>

                    <p>
                        Build your professional network,
                        share your achievements,
                        and connect with professionals around the world.
                    </p>

                </div>

                {/* Right Section */}

                <div className="right-section">

                    <div className="login-card">

                        <h2>Login</h2>

                        <div className="input-group">

                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>

                        <div className="input-group">

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                       

                        <button
                            className="login-btn"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                        <div className="signup">

                            Don't have an account?{" "}

                            <span
                                className="signup-link"
                                onClick={() => navigate("/register")}
                            >
                                Sign Up
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Forgot Password Popup */}

            {showForgotPassword && (
                <ForgotPasswordModal
                    onClose={() => setShowForgotPassword(false)}
                />
            )}

        </>

    );
}

export default Login;