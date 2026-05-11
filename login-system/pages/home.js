import { useState, useEffect } from "react";
import { useRouter } from "next/router";

/*
-----OVERVIEW : -------
 home.js shows the page after a user logs in
 user is greeted with a welcome message
 user can navigate to login page and view dashboard 

------------------------
 */
export default function Home() {
  const router = useRouter();

  //store user'name and card 
  const [memberName, setmemberName] = useState(null);
  const [memberCard, setmemberCard] = useState(null);


  // check if user is logged in
  useEffect(() => {
    let savedMember = localStorage.getItem("member"); //read saved user from localStorage

    // saved member exist --> 
    if (savedMember !== null) {
      let memberObject = JSON.parse(savedMember); //coverting JSON string back into an javascript object
//name and card number stored in the  2 state vars
      setmemberName(memberObject.fullName);
      setmemberCard(memberObject.libraryCardNumber);

     
    } 
     // no saved member --> 
    else {
      router.push("/login");
    }
  },

   []);


   if (!memberName || !memberCard) {
    return null; // show nothing for a moment
  }
  

  // simple page design
  const container = {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    paddingTop: "1px",
    background: "#FDF5E6",
    border: "1px solid black",

  };

  const page = {
    textAlign: "center",
    marginTop: "60px",
    fontFamily: "Arial",
  };

  const button2 = {
    padding: "10px 20px",
    marginTop: "20px",
    background: "#4a68d1",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  };
// showing welcoming message and lib card number
  return (
    <div style={container}>
    <div style={page}>
    <h2 style={{ textAlign: "center", fontFamily: "arial" }}>Spring Field Library</h2>
    <br /> 
    <br /> 
  
      <h3>Welcome, {memberName}</h3>
      <p>library card number: {memberCard}</p>
      <br /> 
      <button
        style={button2}
        onClick={() => {
          localStorage.removeItem("member");//logout a member
          router.push("/login");
        }}
      >  Logout 
      </button>
      <button
        style={button2}
        onClick={() => {
          localStorage.removeItem("member");
          router.push("/dashboard"); // DAHSBOARD - to be integrated with other team's subproject
        }}
      >
        Dashboard
      </button>

    </div>
    </div>
  );
}
