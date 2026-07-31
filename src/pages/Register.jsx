import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveProfile } from "../api/profileApi";
import "../styles/Register.css";

function Register() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        job: "",
        employer: "",
        place: "",
        password: ""
    });

    const isFormValid =
    profile.name.trim() !== "" &&
    profile.email.trim() !== "" &&
    profile.job.trim() !== "" &&
    profile.employer.trim() !== "" &&
    profile.place.trim() !== "" &&
    profile.password.trim() ;

    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    const register = async () => {

        try {

            const response = await saveProfile(profile);

            if (response.status === 200 || response.status === 201) {

                alert("Registration Successful");

                navigate("/login");

            }

        } catch (error) {

            console.error(error);

            alert("Registration Failed - email already exist");

        }

    };

   return (

<div className="register-container">

    <div className="register-left">

        <div className="register-card">

            <h2>Create Account</h2>

            <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
            />

            <input
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
            />

            <input
                name="job"
                placeholder="Job Title"
                onChange={handleChange}
            />

            <input
                name="employer"
                placeholder="Employer"
                onChange={handleChange}
            />

            <input
                name="place"
                placeholder="Place"
                onChange={handleChange}
            />

             <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
            />

            <button
                className="register-btn"
                disabled={!isFormValid}
                onClick={register}
            >
                Create Account
            </button>

            <div className="login-link">
                Already have an account?{" "}
                <span onClick={() => navigate("/login")}>
                    Login
                </span>
            </div>

        </div>

    </div>

    <div className="register-right">

        <div className="register-content">

             <h1>Create Your</h1>

            <h2>PSConnect-In Profile</h2>

    <p>
        Complete your profile to showcase your skills,
        connect with professionals, share your achievements,
        and grow your network.
    </p>

        </div>

    </div>

</div>

);

}

export default Register;