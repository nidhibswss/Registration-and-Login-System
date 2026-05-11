import { useState } from "react";
import { registerUser } from "../firebase/members"; //from members.js
import { useRouter } from "next/router";


/*
-----OVERVIEW : -------
 register.js manages user registration form for Springfield library registration system.
 contains simple CSS 
 handling 3 main tasks:
 1. Stores user input values from the form (fullname, email,phone, dob, set PIN)
 2. validate user input before firebase
 3. Sends user info to firebase 
 4. handles error
------------------------
 */

export default function Register() {
  const router = useRouter();

  // to store user input from the form 
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [pinNumber, setPinNumber] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  
  const [libraryCard, setLibraryCard] = useState("");


// validations before firebase 
  const checkForm = () => {

     // Validate all required fields 
    if (!fullName || !emailAddress || !phoneNumber || !dateOfBirth || !pinNumber) {
      return "All fields are required";
    }


  // validate phone number is 10 digits
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      return "Phone number must be 10 digits";
    }


// validate PIN is exactly 4 digits
    if (pinNumber.length !== 4 || isNaN(pinNumber)) {
      return "PIN must be exactly 4 digits";
    }

    return null; // -- all valid 
  };


  // when user clicks submit the form
  function manageRegister(e) {
    e.preventDefault(); //stop reload
   
    const errorFound = checkForm();

    if (errorFound) {
      setErrorMsg(errorFound);
    } else {
      setErrorMsg("");
    
// send info to firebase
    registerUser({
      fullName: fullName,
      email: emailAddress,
      phone: phoneNumber,
      dob: dateOfBirth,
      pin: pinNumber,
    })
    //firebase success --> save a random card number
      .then((cardNum) => {setLibraryCard(cardNum); 
      })
    // firebase fail --> show error message
      .catch(() => {setErrorMsg("Registration unsuccessful, please try again."); //firebase failed
      });
  }
}


  // CSS
  const container = {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    background: "#FDF5E6",
    border: "1px solid black",
    fontFamily: "Times New Roman",
  };

  const formInput = {
    padding: "15px",
    margin: "6px",
    fontSize: "14px",
  };

  const submitButton = {
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

  const successPage = {
    padding: "15px",
    background: "#e5ffe4",
    border: "1px solid #a3e6a1",
    borderRadius: "8px",
    textAlign: "center",
  };

  return (
    <div style={container}>
      
      <h2 style={{ textAlign: "center", fontFamily: "arial" }}>Spring Field Library</h2>
      <h3 style={{ textAlign: "center", fontFamily: "arial" }}>Registration Form</h3>
      <br />

      {errorMsg && <p style={errorMssg}>{errorMsg}</p>}

      {!libraryCard ? (
        <form onSubmit={manageRegister} 
        style={{ display: "flex", flexDirection: "column" }}>
          
          <input
            style={formInput}
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            style={formInput}
            placeholder="Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />

          <input
            style={formInput}
            placeholder="Phone Number (10 digits)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <input
            style={formInput}
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <input
            style={formInput}
            placeholder="PIN (4 digits)"
            value={pinNumber}
            onChange={(e) => setPinNumber(e.target.value)}
          />

          <button style={submitButton} type="submit">Submit</button>
        </form>
      ) : 
      (
        <div style={successPage}>
          <h2>Registered Successfull!</h2>
          <br /> 
          <h3>welcome,{fullName} </h3>
          <p>Your Library Card Number is {libraryCard}</p>
          <br /> 
          <h2>{libraryCard}</h2>
          <br /> 
          <p>Please use the library card to log in.</p>
        </div>
      )}

      <p
        style={{
          textAlign: "center",
          color: "#4a68d1",
        }} onClick={() => router.push("/login")}
      >Login
      </p>
    </div>
  );
}
