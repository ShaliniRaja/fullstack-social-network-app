import api from "./axios";

export const createPost = (post) => {
    return api.post("/saveRequest", post);
};

export const createPostBox = (data) => {
    return api.post("/savePost", data);
};

export const editPost = (request) => {
    return api.put("/editPost", request);
};

export const deletePost = (id) => {
    return api.delete(`/deletePost/${id}`);
};


export const getAllPosts = () => { 
    const profileId = localStorage.getItem("email");   
    return api.get(`/getAllPost/${profileId}`);
};

export const saveLike = (data) => {
    return api.post("/saveLike", data);
};

export const deleteLike = (id) => {
    return api.delete(`/deleteLike/${id}`);
};

export const saveComment = (data) => {
    return api.post("/saveComment", data);
};

export const getComment = (id) => {
    return api.get(`/getComment/${id}`);
};

export const editComment = (data) => {
    return api.put("/editComment", data);
};

export const deleteComment = (id) => {
    return api.delete(`/deleteComment/${id}`);
};

export const searchPosts = (keyword) => {
    return api.get(`/search/${keyword}`);
};

export const getTrending = () => {
    return api.get("/trending");
};