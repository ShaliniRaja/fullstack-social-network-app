import api from "./axios";

export const getProfile = () => {
    const profileId = localStorage.getItem("email");   
    return api.get(`/${profileId}`);
};

export const saveProfile = (profile) => {
    return api.post("/saveProfile", profile);
};

export const getProfileByEmail = (email) => {
    return api.get(`/${email}`);
};
