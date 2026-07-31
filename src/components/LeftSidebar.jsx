import { useEffect, useState } from "react";
import { getProfile } from "../api/profileApi";
import "../styles/leftsidebar.css";

function LeftSidebar() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const response = await getProfile();
            setProfile(response.data);

        } catch (error) {

            console.error("Error loading profile:", error);

        }

    };

    if (!profile) {
        return (
            <div className="left-sidebar">
                Loading...
            </div>
        );
    }

    return (

        <div className="left-sidebar">

            <div className="profile-card">

                {profile.imageUrl ? (

                    <img
                        src={`data:image/jpeg;base64,${profile.imageUrl}`}
                        alt="Profile"
                        className="profile-image"
                    />

                ) : (

                    <div className="profile-placeholder">
                        👤
                    </div>

                )}

                <h3>{profile.name}</h3>

                <p className="job">{profile.job}</p>

                <hr />

                <div className="profile-info">

                    <p>
                        <strong>🏢 Company</strong><br />
                        {profile.employer}
                    </p>

                    <p>
                        <strong>📍 Location</strong><br />
                        {profile.place}
                    </p>

                </div>

            </div>

        </div>

    );

}

export default LeftSidebar;