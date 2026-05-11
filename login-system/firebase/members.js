import { db } from "./config"; //firebase config 
import {collection, addDoc,query, where, getDocs, doc } from "firebase/firestore"; //firebase database import 



/*
-----OVERVIEW : -------
 member.js acts as the connection between the react front-end and the Firebase firestore  database 
Handling 3 main tasks : 
1. Register a new library member (user)
2. generate a unique random 8 digit library card number for registering user
3. Verify user's PIN and card number during logging in  
------------------------
 */



// function to generate a random 8 digit unique card number
function generateCard() {
  const min = 11000000;
  const max = 99999999;

 let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber.toString();
}

//---to register a new member and  generate card----
export function registerUser(userData) {
  const libraryCardNumber = generateCard();

  const fullName = userData.fullName;
  const email = userData.email;
  const pin = userData.pin; 
  const phone = userData.phone;
  const dob = userData.dob;

// add user's info to the firebase 
return addDoc(collection(db, "members"), {
  fullName,
  email,
  phone,
  dob,
  pin,
  libraryCardNumber
})
// firebase success --> 
.then(() => {
  return libraryCardNumber;
})
// firebase fails --> 
.catch(() => {
 return "registration error";
});
}


//---login a user-----
export function loginUser(card, pin) {
  
  // creates a query to search the members collection in firebase
  const q = query(
    collection(db, "members"),
    where("libraryCardNumber", "==", card), 
    where("pin", "==", pin)
  );

// run the query
return getDocs(q)
.then((result) => {
const errorMssg = "login error"
  if (card.length !== 8){
    return errorMssg;
  }

  if (pin.length !== 4){
    return errorMssg;
  }
  if (result.empty) {
    return errorMssg;
  }

  // get first match returned from firebase
  const firstMatch = result.docs[0];
  const user = firstMatch.data();
  return user;
 
})

.catch(() => {
  return "login failed";
});
}