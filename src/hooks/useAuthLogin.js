import { useEffect, useState } from 'react';
import {setUser} from "../store/userSlice";
import { useDispatch } from 'react-redux';
import axios from 'axios';

const useAuthLogin = () => {
    const[loading,setLoading]=useState(true)

    const dispatch= useDispatch()
    
    useEffect(()=>{
        //IIFE
    (async function autoLoginApiCall(){
      try {
        const response=await axios.get(`${process.env.REACT_APP_INTERNAL_API}/refresh`,{
          withCredentials:true
        })
        if (response.status === 200) {
          //1.setUser
          const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            auth: response.data.auth,
          };
          dispatch(setUser(user))
        }
      } catch (error) {
        //
      }
      finally{
        setLoading(false)
      }
    })()
    },[dispatch])

    return loading
}

export default useAuthLogin