import React, { useState } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiUrl}/api/v1/users/login`, {
        email,
        password,
      }, {withCredentials: true});

      // Store JWT
      // localStorage.setItem("token", res.data.token);

      alert("Login Successful 🚀");
      // window.location.href = "/dashboard";
      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed ❌");
    }
  };

  return (
    <div className={`${style.parentDiv}`}>
      {/* <div class="timeinc-widget" data-city="new-york-city">
  <a href="https://www.time.inc/time/new-york-city">Current time in New York City</a>
</div> */}
      <Card className={style.card}>
        <Card.Body className={style.cardBody} >
          <h3 className="text-center mb-3 ">Login</h3>

          <Form onSubmit={handleLogin}>
            <Form.Group className={`${style.formLine} mb-3`}>
              <Form.Label>Email :</Form.Label>
              <Form.Control 
                className={style.formField}
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
                <br/>
            <Form.Group className={`${style.formLine} mb-3`}>
              <Form.Label>Password :</Form.Label>
              
              <Form.Control
                className={style.formField}
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br/>
            <Button type="submit" className="w-100">
              Login
            </Button>
          </Form>
          
          <p className="mt-3 text-center">
            New user? <a href="" onClick={() => navigate("/register)} style={{color: "navy"}}>Register</a>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
