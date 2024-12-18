// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../../owner/login/login.css";
// import { auth, db } from "../../../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const OwnerLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Basic validation
//     if (!email || !password) {
//       Swal.fire({
//         icon: "error",
//         title: "Missing Information",
//         text: "Email and Password cannot be empty.",
//         confirmButtonColor: "#FF4B2B",
//       });
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Log in with Firebase Authentication
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Check if the user is an owner in Firestore
//       const ownerRef = doc(db, "owners", user.uid);
//       const ownerSnap = await getDoc(ownerRef);

//       if (ownerSnap.exists()) {
//         // If the user is an owner, proceed
//         localStorage.setItem("userName", user.displayName || ownerSnap.data().name);
//         localStorage.setItem("email", user.email);
//         localStorage.setItem("uid", user.uid);

//         Swal.fire({
//           icon: "success",
//           title: "Login Successful",
//           text: "Welcome back, Owner!",
//           confirmButtonColor: "#FF4B2B",
//         }).then(() => {
//           navigate("/owner/dashboard"); // Navigate to the owner dashboard
//         });
//       } else {
//         // User exists but is not an owner
//         Swal.fire({
//           icon: "warning",
//           title: "Access Denied",
//           text: "You are not authorized to log in as an owner.",
//           confirmButtonColor: "#FF4B2B",
//         });
//         auth.signOut(); // Log the user out if they are not an owner
//       }

//       setIsLoading(false);
//     } catch (error) {
//       // Handle login errors
//       if (error.code === "auth/wrong-password") {
//         Swal.fire({
//           icon: "warning",
//           title: "Incorrect Password",
//           text: "The password you entered is incorrect. Please try again.",
//           confirmButtonColor: "#FF4B2B",
//         });
//       } else if (error.code === "auth/user-not-found") {
//         Swal.fire({
//           icon: "warning",
//           title: "User Not Found",
//           text: "No user found with this email. Please check the email or register.",
//           confirmButtonColor: "#FF4B2B",
//         });
//       } else {
//         Swal.fire({
//           icon: "warning",
//           title: "Login Failed",
//           text: "An unexpected error occurred. Please try again.",
//           confirmButtonColor: "#FF4B2B",
//         });
//       }
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="frag">
//       <div className="container">
//         <div className="form-container sign-in-container">
//           <form onSubmit={submitHandler}>
//             <h1>Owner Sign In</h1>
//             <div className="social-container">
//               <Link to={"https://www.facebook.com/login/"} className="social link">
//                 <i className="fa fa-facebook-f"></i>
//               </Link>
//               <Link to={"https://accounts.google.com"} className="social link">
//                 <i className="fa fa-google"></i>
//               </Link>
//               <Link to={"https://in.linkedin.com/"} className="social link">
//                 <i className="fa fa-linkedin"></i>
//               </Link>
//             </div>
//             <span>or use your owner account</span>
//             <input
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               name="email"
//               required
//             />
//             <input
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               required
//             />
//             <Link to={"/owner/forgot-password"} className="link">
//               <u>Forgot your password?</u>
//             </Link>

//             <button type="submit" className="button">
//               {isLoading && <i className="fas fa-spinner fa-pulse"></i>}
//               Sign In
//             </button>
//           </form>
//         </div>

//         <div className="right-box">
//           <h1>Hello, Friend!</h1>
//           <p>Enter your details and start managing your shop today!</p>
//           <Link to={"/owner-register"}>
//             <button className="ghost button" id="signUp">
//               Sign Up
//             </button>
//           </Link>
//         </div>
//       </div>
//       <div className="footer">
//         <p>
//           <i className="fa fa-copyright"></i>
//           Copyright belongs to Arthvyastha
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OwnerLogin;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../../owner/login/login.css";
// import { auth, db } from "../../../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const OwnerLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Basic validation
//     if (!email || !password) {
//       Swal.fire({
//         icon: "error",
//         title: "Missing Information",
//         text: "Email and Password cannot be empty.",
//         confirmButtonColor: "#FF4B2B",
//       });
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Log in with Firebase Authentication
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Check if the user is an owner in Firestore
//       const ownerRef = doc(db, "owners", user.uid);
//       const ownerSnap = await getDoc(ownerRef);

//       if (ownerSnap.exists()) {
//         // Extract additional owner data from Firestore
//         const ownerData = ownerSnap.data();

//         // Save relevant owner information in localStorage
//         localStorage.setItem("userName", ownerData.name || user.displayName || "Owner");
//         localStorage.setItem("email", ownerData.email || user.email);
//         localStorage.setItem("shopName", ownerData.shopName || "N/A");
//         localStorage.setItem("uid", user.uid);

//         Swal.fire({
//           icon: "success",
//           title: "Login Successful",
//           text: `Welcome back, ${ownerData.name || "Owner"}!`,
//           confirmButtonColor: "#FF4B2B",
//         }).then(() => {
//           navigate("/owner/dashboard"); // Navigate to the owner dashboard
//         });
//       } else {
//         // User exists but is not an owner
//         Swal.fire({
//           icon: "warning",
//           title: "Access Denied",
//           text: "You are not authorized to log in as an owner.",
//           confirmButtonColor: "#FF4B2B",
//         });
//         auth.signOut(); // Log the user out if they are not an owner
//       }

//       setIsLoading(false);
//     } catch (error) {
//       // Handle login errors
//       if (error.code === "auth/wrong-password") {
//         Swal.fire({
//           icon: "warning",
//           title: "Incorrect Password",
//           text: "The password you entered is incorrect. Please try again.",
//           confirmButtonColor: "#FF4B2B",
//         });
//       } else if (error.code === "auth/user-not-found") {
//         Swal.fire({
//           icon: "warning",
//           title: "User Not Found",
//           text: "No user found with this email. Please check the email or register.",
//           confirmButtonColor: "#FF4B2B",
//         });
//       } else {
//         Swal.fire({
//           icon: "warning",
//           title: "Login Failed",
//           text: "An unexpected error occurred. Please try again.",
//           confirmButtonColor: "#FF4B2B",
//         });
//       }
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="frag">
//       <div className="container">
//         <div className="form-container sign-in-container">
//           <form onSubmit={submitHandler}>
//             <h1>Owner Sign In</h1>
//             <div className="social-container">
//               <Link to={"https://www.facebook.com/login/"} className="social link">
//                 <i className="fa fa-facebook-f"></i>
//               </Link>
//               <Link to={"https://accounts.google.com"} className="social link">
//                 <i className="fa fa-google"></i>
//               </Link>
//               <Link to={"https://in.linkedin.com/"} className="social link">
//                 <i className="fa fa-linkedin"></i>
//               </Link>
//             </div>
//             <span>or use your owner account</span>
//             <input
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               name="email"
//               value={email}
//               required
//             />
//             <input
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               value={password}
//               required
//             />
//             <Link to={"/owner/forgot-password"} className="link">
//               <u>Forgot your password?</u>
//             </Link>

//             <button type="submit" className="button">
//               {isLoading && <i className="fas fa-spinner fa-pulse"></i>}
//               Sign In
//             </button>
//           </form>
//         </div>

//         <div className="right-box">
//           <h1>Hello, Friend!</h1>
//           <p>Enter your details and start managing your shop today!</p>
//           <Link to={"/owner-register"}>
//             <button className="ghost button" id="signUp">
//               Sign Up
//             </button>
//           </Link>
//         </div>
//       </div>
//       <div className="footer">
//         <p>
//           <i className="fa fa-copyright"></i>
//           Copyright belongs to Arthvyastha
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OwnerLogin;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../owner/login/login.css";
import { auth, db } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2"; // Import SweetAlert2

const OwnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Email and Password cannot be empty.",
        confirmButtonColor: "#FF4B2B",
      });
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const ownerRef = doc(db, "owners", user.uid);
      const ownerSnap = await getDoc(ownerRef);

      if (ownerSnap.exists()) {
        const ownerData = ownerSnap.data();
        localStorage.setItem("userName", ownerData.name || user.displayName || "Owner");
        localStorage.setItem("email", ownerData.email || user.email);
        localStorage.setItem("shopName", ownerData.shopName || "N/A");
        localStorage.setItem("uid", user.uid);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${ownerData.name || "Owner"}!`,
          confirmButtonColor: "#FF4B2B",
        }).then(() => {
          navigate("/owner/dashboard");
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Access Denied",
          text: "You are not authorized to log in as an owner.",
          confirmButtonColor: "#FF4B2B",
        });
        auth.signOut();
      }

      setIsLoading(false);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        Swal.fire({
          icon: "warning",
          title: "Incorrect Password",
          text: "The password you entered is incorrect. Please try again.",
          confirmButtonColor: "#FF4B2B",
        });
      } else if (error.code === "auth/user-not-found") {
        Swal.fire({
          icon: "warning",
          title: "User Not Found",
          text: "No user found with this email. Please check the email or register.",
          confirmButtonColor: "#FF4B2B",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Login Failed",
          text: "An unexpected error occurred. Please try again.",
          confirmButtonColor: "#FF4B2B",
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="frag">
      <div className="container">
        <div className="form-container sign-in-container">
          <form onSubmit={submitHandler}>
            <h1>Owner Sign In</h1>
            <div className="social-container">
              <Link to={"https://www.facebook.com/login/"} className="social link">
                <i className="fa fa-facebook-f"></i>
              </Link>
              <Link to={"https://accounts.google.com"} className="social link">
                <i className="fa fa-google"></i>
              </Link>
              <Link to={"https://in.linkedin.com/"} className="social link">
                <i className="fa fa-linkedin"></i>
              </Link>
            </div>
            <span>or use your owner account</span>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              name="email"
              value={email}
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                value={password}
                required
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            <Link to={"/owner/forgot-password"} className="link">
              <u>Forgot your password?</u>
            </Link>

            <button type="submit" className="button">
              {isLoading && <i className="fas fa-spinner fa-pulse"></i>}
              Sign In
            </button>
          </form>
        </div>

        <div className="right-box">
          <h1>Hello, Friend!</h1>
          <p>Enter your details and start managing your shop today!</p>
          <Link to={"/owner-register"}>
            <button className="ghost button" id="signUp">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <div className="footer">
        <p>
          <i className="fa fa-copyright"></i>
          Copyright belongs to Arthvyastha
        </p>
      </div>
    </div>
  );
};

export default OwnerLogin;



