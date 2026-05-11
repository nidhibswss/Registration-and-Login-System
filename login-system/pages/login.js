import { useState } from "react";
import { loginUser } from "../firebase/members";   // from members.js
import { useRouter } from "next/router";



/*
-----OVERVIEW : -------
 login.js handles the member(user)login page for the SpringField Library system
 contains simple CSS
 handles the following tasks:
 1. store user input (library card number and PIN)
 2. validates user input before firebase 
 3. sends login request to firebase 
 4. handles error
------------------------
 */


export default function Login() {
  const router = useRouter();

  // states
  const [cardNumber, setCardNumber] = useState("");
  const [pinNumber, setPinNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // validation before sending to firebase
  const validateForm = () => {

// validate field inputs

    if ( cardNumber && !pinNumber) { 
      return "Please enter your PIN number"
    }
    if ( !cardNumber && pinNumber){
      return "Please enter your card number"
    }
    if (!cardNumber || !pinNumber) {
      return "Both fields are required";
    }
    if (cardNumber.length !==8){
      return "Card number must be 8 digits"
    } 
    
    if (isNaN(cardNumber)) { 
      return "Card number must be numbers only";
    }

    if (pinNumber.length !== 4) {
      return "PIN must be exactly 4 digits"
    } 
    if ( isNaN(pinNumber)) {   
      return "PIN must be numbers";
    }
    return null;
  };


  // main login function - when uswer clicks login
  function manageLogin(e) {      
    e.preventDefault(); //stop reload
    setErrorMsg("");

    const foundError = validateForm();

    if (foundError) {
      setErrorMsg(foundError);
      return;
    }

    // send info to firebase
    loginUser(cardNumber, pinNumber)

    // firebase sucess -->
      .then((member) => {

        // save user data
        localStorage.setItem("member", JSON.stringify(member));
        router.push("/home");  // send the user homepage
      })

      //firebase fails --> 
      .catch(() => {
        setErrorMsg("Invalid card number or PIN");
      });
  }   


  //CSS
  const container = {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    background: "#FDF5E6",
    border: "1px solid black",
    fontFamily: "Times New Roman",
  };

  const loginInput = {
    padding: "15px",
    margin: "6px",
    fontSize: "14px",
  };

  const loginButton = {
    padding: "10px",
    background: "#4a68d1",
    color: "white",
    fontSize: "15px",
  };

  const errorMssg = {
      color: "white",
      background: "#d9534f",
      padding: "8px",
  };

  return (
    <div style={container}>
      <h2 style={{ textAlign: "center", fontFamily: "arial" }}>Spring Field Library</h2>
      <h3 style={{ textAlign: "center", fontFamily: "arial" }}>Member Login</h3>
      <br />

      {errorMsg && <p style={errorMssg}>{errorMsg}</p>}

      <form onSubmit={manageLogin} style={{ display: "flex", flexDirection: "column" }}>
        
        <input
          style={loginInput}
          placeholder="Library Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <input
          style={loginInput}
          type="password"
          placeholder="PIN (4 digits)"
          value={pinNumber}
          onChange={(e) => setPinNumber(e.target.value)}
        />
        <button style={loginButton} type="submit">Login</button>
      </form>

      <p
          style={{
            textAlign: "center",
            color: "#4a68d1",
        }}
        onClick={() => router.push("/register")}
      >
        <br />
        Create an account
      </p>
    
    </div>
  );
}
