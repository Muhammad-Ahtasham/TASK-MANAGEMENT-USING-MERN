import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function RefreshHandler({setIsauthenticated}){
    console.log('setIsauthenticated (from props):', setIsauthenticated);

    const location=useLocation();
    const navigate=useNavigate();
    useEffect(()=>{
         console.log("Authenticated:", setIsauthenticated);
        if(localStorage.getItem('token'))
        {
           setIsauthenticated(true);
           if(location.pathname==='/' || location.pathname==='/login' || location.pathname==='/signup'){
            navigate('/home',{replace:false})
           }
        }
    },[location,navigate,setIsauthenticated])
    return (
        null
    )
}
export default RefreshHandler;
