import { useEffect, useState } from "react";
import { getTrending } from "../api/postApi";
import "../styles/rightsidebar.css";

function RightSidebar({ refresh }) {

    const [trending, setTrending] = useState([]);

    useEffect(() => {
        loadTrending();
    }, [refresh]);

    const loadTrending = async () => {

        try {

            const response = await getTrending();

            setTrending(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="card p-4">

            <h3>Trending</h3>

            <hr />

            {trending.length === 0 ? (

                <p className="text-muted">
                    No trending searches
                </p>

            ) : (

                trending.map((item) => (

                    <div
                        key={item.keyword}
                        className="trend-item"
                    >
                        #{item.keyword}
                    </div>

                ))

            )}

        </div>

    );

}

export default RightSidebar;