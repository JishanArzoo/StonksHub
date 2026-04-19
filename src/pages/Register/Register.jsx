import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import style from "./Register.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fName, setFName] =  useState("");
  const [lName, setLName] =  useState("");
  const [dob, setDob] =  useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] =  useState("");
  const [address1, setAddress1] =  useState("");
  const [address2, setAddress2] =  useState("");
  const [state, setState] =  useState("");
  const [pinCode, setPinCode] =  useState("");
  const [password, setPassword] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // const  newDob = (dob) => {
      //   const result = dob.split("-").reverse().join("-");
      //   console.log(result)
      //   return result
        
      // }
      // const newDob2 = newDob(dob)
      console.log(dob)
      const res = await axios.post(`${apiUrl}/api/v1/users/register`, {
        email: email,
        phone: phone,
        streetAddress: address1,
        city: address2,
        pinCode: pinCode,
        state: state,
        firstName: fName,
        lastName: lName,
        dob: dob,
        taxResidence: "IND",
        taxID: "111-55-4321",
        password: password,
      }, {withCredentials: true});
      console.log(res)
      // Store JWT
      // localStorage.setItem("token", res.data.token);

      alert("Registration Successful, Proceed to Login 🚀");
      // window.location.href = "/dashboard";
      navigate("/");
    } catch (err) {
      alert("Login Failed ❌");
      console.log(err)
    }
  };

  return (
    <div className={`${style.parentDiv}`}>
      <Card className={style.card}>
        <Card.Body className={style.cardBody} >
          <h3 className="text-center mb-3 ">Register</h3>

          <Form onSubmit={handleRegistration}>
            <Form.Group className={`${style.formLine} mb-3`}>
              <Form.Label>First Name :&nbsp;&nbsp;</Form.Label>
              <Form.Control 
                className={style.formField}
                type="text"
                placeholder="Enter First Name"
                onChange={(e) => setFName(e.target.value)}
              />
              <Form.Label>Last Name :</Form.Label>
              <Form.Control 
                className={style.formField}
                type="text"
                placeholder="Enter Last Name"
                onChange={(e) => setLName(e.target.value)}
              />
              <Form.Label>Date Of Birth :</Form.Label>
              <Form.Control 
                className={style.formField}
                type="date"
                placeholder="Enter DOB"
                onChange={(e) => setDob(e.target.value)}
              />
               <Form.Label>Email :</Form.Label>
              <Form.Control 
                className={style.formField}
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Label>Phone :</Form.Label>
              <Form.Control 
                className={style.formField}
                type="tel"
                placeholder="Enter Phone No"
                onChange={(e) => setPhone(e.target.value)}
              />
               <Form.Label>Address Line 1 :</Form.Label>
              <Form.Control 
                className={style.formField}
                type="text"
                placeholder="Enter Address Line 1"
                onChange={(e) => setAddress1(e.target.value)}
              />
              <Form.Label>Address Line 2 :</Form.Label>
              <Form.Control 
                className={style.formField}
                type="text"
                placeholder="Enter Address Line 2"
                onChange={(e) => setAddress2(e.target.value)}
              />
              <Form.Label>State :</Form.Label>
              <Form.Control 
                className={style.formField}
                type="text"
                placeholder="Enter State Name"
                onChange={(e) => setState(e.target.value)}
              />
              <Form.Label>Pin Code :</Form.Label>
              <Form.Control 
                className={style.formField}
                type="text"
                placeholder="Enter Pin Code"
                onChange={(e) => setPinCode(e.target.value)}
              />
              
              
              
              <Form.Label>Password :</Form.Label>
              <Form.Control
                className={style.formField}
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />

            </Form.Group>

            <Button type="submit" className="w-100">
              Register
            </Button>
          </Form>

          <p className="mt-3 text-center">
            Already Signed Up? <a href="/" style={{color: "navy"}}>Login</a>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;