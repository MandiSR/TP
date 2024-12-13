// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// //import { getAnalytics } from "firebase/analytics";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCRP5S5KmPaR-x7obYwDO780WY1hZEC3zU",
//   authDomain: "final-9adbe.firebaseapp.com",
//   projectId: "final-9adbe",
//   storageBucket: "final-9adbe.firebasestorage.app",
//   messagingSenderId: "490048141843",
//   appId: "1:490048141843:web:63fa6ed8feaa624346dde6",
//   measurementId: "G-47TKMNNMPL"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// //const analytics = getAnalytics(app);

// export const auth = getAuth(app)
// export const googleProvider = new GoogleAuthProvider()


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAfe0_Yz99vAZqpuEaLKxlZqjuM0KssBI",
  authDomain: "final-65857.firebaseapp.com",
  projectId: "final-65857",
  storageBucket: "final-65857.firebasestorage.app",
  messagingSenderId: "773934284903",
  appId: "1:773934284903:web:4d75009c2e683a9e0694c2",
  measurementId: "G-LBCGFNK7H4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()