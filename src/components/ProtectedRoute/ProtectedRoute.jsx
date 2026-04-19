import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import style from "./ProtectedRoute.module.css"

function ProtectedRoute({ children }) {
    const apiUrl = import.meta.env.VITE_API_URL;
  const [isAuth, setIsAuth] = useState(null);
    
  useEffect(() => {
    axios.get(`${apiUrl}/api/v1/users/get-user`, {
      withCredentials: true 
    })
    .then(() => setIsAuth(true))
    .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) {
    return <div className={style.parentDiv}>
            <Spinner animation="border" variant="light"  />
        </div>}
      

  return isAuth ? (children) : (<>{alert("You must login before proceeding... 📝")} <Navigate to="/" /> </>);
}

export default ProtectedRoute;