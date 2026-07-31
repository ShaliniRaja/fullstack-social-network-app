import api from "./axios";

export const login = (request) => {
    return api.post("/login", request);
};

export const forgotPassword = (request) => {
    return api.put("/forgetPassword", request);
};
