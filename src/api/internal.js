import axios from "axios";


const api=axios.create({
    baseURL:process.env.REACT_APP_INTERNAL_API,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
    }
});

//login api

export const login=async (data)=>{
    let response;
     
    try {
        response=await api.post("/login",data)
    } catch (error) {
        return error
    }
    return response
}


//signup api

export const signup=async(data)=>{
    let response;
    try {
        response=await api.post("/register",data)
    } catch (error) {
        return error
    }
    return response
}

//signout api

export const signout=async()=>{
    let response;
    try {
        response=await api.post("/logout")
    } catch (error) {
        return error
    }
    return response
}

//getAllBlogs api

export const getAllBlogs=async()=>{
    let response;
    try {
        response=await api.get("/blog/all")
    } catch (error) {
        return error
    }
    return response
}

//submitBlog api
export const submitBlog=async(data)=>{
    let response;
    try {
        response=await api.post("/blog",data)
    } catch (error) {
        return error
    }
    return response
};

//getBlogById
export const getBlogById=async(id)=>{
    let response;
    try {
        response=await api.get(`/blog/${id}`)
    } catch (error) {
        return error
    }
    return response
}
//getCommentById api
export const getCommentsById = async (id) => {
    let response;
  
    try {
      response = await api.get(`/comment/${id}`, {
        validateStatus: false,
      });
    } catch (error) {
      return error;
    }
  
    return response;
  };

//postComment api

export const postComment=async(data)=>{
    let response;
    try {
        response=await api.post("/comment",data)
    } catch (error) {
        return error
    }
    return response
}
//deleteBlog api

export const deleteBlog=async(id)=>{
    let response;
    try {
        response=await api.delete(`/blog/${id}`)
    } catch (error) {
        return error
    }
    return response
}
//updateBlog api

export const updateBlog=async(data)=>{
    let response;
    try {
        response=await api.put("/blog",data)
    } catch (error) {
        return error
    }
    return response
}

//AutoRefreshToken api call
//protected-resource->401
// /refresh -> authenthicated state
// /protected-resource

api.interceptors.response.use(
    config=>config,
    async (error)=>{
        const originalReq=error.config;

        if ((error.response.status === 401 || error.response.status===500) && originalReq && !originalReq._isRetry) {
           originalReq._isRetry=true;

           try {
            await axios.get(`${process.env.REACT_APP_INTERNAL_API}/refresh`,{
                withCredentials:true
            })
            return api.request(originalReq)
           } catch (error) {
            return error
           }
        }

    }
)

