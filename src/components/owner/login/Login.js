// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./login.css";
// import { auth } from "../../../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Basic validation
//     if (!email || !password) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Information",
//         text: "Email and Password cannot be empty.",
//         confirmButtonColor: "#FF4B2B",
//       });
//       setIsLoading(false);
//       return;
//     }

//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         localStorage.setItem('userName', user.displayName);
//         localStorage.setItem('photoURL', user.photoURL);
//         localStorage.setItem("email", user.email);
//         localStorage.setItem("uid", user.uid);

//         Swal.fire({
//           icon: "success",
//           title: "Login Successful",
//           text: "Welcome back!",
//           confirmButtonColor: "#FF4B2B",
//         }).then(() => {
//           navigate('/user-dashboard');
//         });

//         setIsLoading(false);
//       })
//       .catch((error) => {
//         // Display specific error messages using SweetAlert2
//         if (error.code === 'auth/wrong-password') {
//           Swal.fire({
//             icon: "warning",
//             title: "Incorrect Password",
//             text: "The password you entered is incorrect. Please try again.",
//             confirmButtonColor: "#FF4B2B",
//           });
//         } else if (error.code === 'auth/user-not-found') {
//           Swal.fire({
//             icon: "warning",
//             title: "User Not Found",
//             text: "No user found with this email. Please check the email or register.",
//             confirmButtonColor: "#FF4B2B",
//           });
//         } else {
//           Swal.fire({
//             icon: "warning",
//             title: "Login Failed",
//             text: "An unexpected error occurred. Please try again.",
//             confirmButtonColor: "#FF4B2B",
//           });
//         }
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="frag">
//       <div className="container">
//         <div className="form-container sign-in-container">
//           <form onSubmit={submitHandler}>
//             <h1>Sign in</h1>
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
//             <span>or use your account</span>
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
//             <Link to={"login_forgotpass.html"} className="link">
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
//           <p>Enter your personal details and start your journey with us</p>
//           <Link to={"/register"}>
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

// export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./login.css";
// import { auth } from "../../../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility

//   const navigate = useNavigate();

//   // Regular expressions for email and password validation
//   const emailRegex = /^[a-zA-Z]{3}[a-zA-Z0-9]*@gmail\.(com|in)$/; // Simple email regex
//   const passwordRegex = /^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[_.@#$%^&+=]).{8,16}$/; // Password must be 6-20 characters, including at least one letter and one number

//   const submitHandler = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Email validation
//     if (!email || !emailRegex.test(email)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Email",
//         text: "Please enter a valid email address no leading space ex :- (ram123@gmail.com).",
//         confirmButtonColor: "#FF4B2B",
//       });
//       setIsLoading(false);
//       return;
//     }

//     // Password validation
//     if (!password || !passwordRegex.test(password)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Password",
//         text: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
//         confirmButtonColor: "#FF4B2B",
//       });
//       setIsLoading(false);
//       return;
//     }

//     // Sign in process
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         localStorage.setItem('userName', user.displayName);
//         localStorage.setItem('photoURL', user.photoURL);
//         localStorage.setItem("email", user.email);
//         localStorage.setItem("uid", user.uid);

//         Swal.fire({
//           icon: "success",
//           title: "Login Successful",
//           text: "Welcome back!",
//           confirmButtonColor: "#FF4B2B",
//         }).then(() => {
//           navigate('/user-dashboard');
//         });

//         setIsLoading(false);
//       })
//       .catch((error) => {
//         // Display specific error messages using SweetAlert2
//         if (error.code === 'auth/wrong-password') {
//           Swal.fire({
//             icon: "warning",
//             title: "Incorrect Password",
//             text: "The password you entered is incorrect. Please try again.",
//             confirmButtonColor: "#FF4B2B",
//           });
//         } else if (error.code === 'auth/user-not-found') {
//           Swal.fire({
//             icon: "warning",
//             title: "User Not Found",
//             text: "No user found with this email. Please check the email or register.",
//             confirmButtonColor: "#FF4B2B",
//           });
//         } else {
//           Swal.fire({
//             icon: "warning",
//             title: "Login Failed",
//             text: "An unexpected error occurred. Please try again.",
//             confirmButtonColor: "#FF4B2B",
//           });
//         }
//         setIsLoading(false);
//       });
//   };

//   const togglePasswordVisibility = () => {
//   setShowPassword(!showPassword);
//   };

//   return (
//     <div className="frag">
//       <div className="container">
//         <div className="form-container sign-in-container">
//           <form onSubmit={submitHandler}>
//             <h1>Sign in</h1>
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
//             <span>or use your account</span>
//             <input
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               name="email"
//               required
//             />
//             <div className="password-container">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 required
//               />
//               <button
//                 type="button"
//                 className="eye-icon"
//                 onClick={togglePasswordVisibility}
//                 aria-label="Toggle password visibility"
//               >
//                 <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//               </button>
//             </div>
//             <Link to={"login_forgotpass.html"} className="link">
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
//           <p>Enter your personal details and start your journey with us</p>
//           <Link to={"/register"}>
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

// export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./login.css";
// import { auth } from "../../../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility

//   const navigate = useNavigate();

//   // Regular expressions for email and password validation
//   const emailRegex = /^[a-zA-Z]{3}[a-zA-Z0-9]*@gmail\.(com|in)$/; // Simple email regex
//   const passwordRegex = /^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[_.@#$%^&+=]).{8,16}$/; // Password must be 6-20 characters, including at least one letter and one number

//   const submitHandler = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Email validation
//     if (!email || !emailRegex.test(email)) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Email",
//         text: "Please enter a valid email address no leading space ex :- (ram123@gmail.com).",
//         confirmButtonColor: "#FF4B2B",
//       });
//       setIsLoading(false);
//       return;
//     }

//     // Password validation
//     if (!password || !passwordRegex.test(password)) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Password",
//         text: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
//         confirmButtonColor: "#FF4B2B",
//       });
//       setIsLoading(false);
//       return;
//     }

//     // Sign in process
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         localStorage.setItem('userName', user.displayName);
//         localStorage.setItem('photoURL', user.photoURL);
//         localStorage.setItem("email", user.email);
//         localStorage.setItem("uid", user.uid);

//         Swal.fire({
//           icon: "success",
//           title: "Login Successful",
//           text: "Welcome back!",
//           confirmButtonColor: "#FF4B2B",
//         }).then(() => {
//           navigate('/user-dashboard');
//         });

//         setIsLoading(false);
//       })
//       .catch((error) => {
//         // Display specific error messages using SweetAlert2
//         if (error.code === 'auth/wrong-password') {
//           Swal.fire({
//             icon: "warning",
//             title: "Incorrect Password",
//             text: "The password you entered is incorrect. Please try again.",
//             confirmButtonColor: "#FF4B2B",
//           });
//         } else if (error.code === 'auth/user-not-found') {
//           Swal.fire({
//             icon: "warning",
//             title: "User Not Found",
//             text: "No user found with this email. Please check the email or register.",
//             confirmButtonColor: "#FF4B2B",
//           });
//         } else {
//           Swal.fire({
//             icon: "warning",
//             title: "Login Failed",
//             text: "An unexpected error occurred. Please try again.",
//             confirmButtonColor: "#FF4B2B",
//           });
//         }
//         setIsLoading(false);
//       });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="frag">
//       <div className="container">
//         <div className="form-container sign-in-container">
//           <form onSubmit={submitHandler}>
//             <h1>Sign in</h1>
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
//             <span>or use your account</span>
//             <input
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               name="email"
//               required
//             />
//             <div className="password-container">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 required
//               />
//               <button
//                 type="button"
//                 className="eye-icon"
//                 onClick={togglePasswordVisibility}
//                 aria-label="Toggle password visibility"
//               >
//                 <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//               </button>
//             </div>
//             <Link to={"login_forgotpass.html"} className="link">
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
//           <p>Enter your personal details and start your journey with us</p>
//           <Link to={"/register"}>
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

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Email and Password cannot be empty.",
        confirmButtonColor: "#FF4B2B",
      });
      setIsLoading(false);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("userName", user.displayName);
        localStorage.setItem("photoURL", user.photoURL);
        localStorage.setItem("email", user.email);
        localStorage.setItem("uid", user.uid);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          confirmButtonColor: "#FF4B2B",
        }).then(() => {
          navigate("/user-dashboard");
        });

        setIsLoading(false);
      })
      .catch((error) => {
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
      });
  };

  return (
    <div className="frag">
      <div className="container">
        <div className="form-container sign-in-container">
          <form onSubmit={submitHandler}>
            <h1>Sign in</h1>
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
            <span>or use your account</span>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              name="email"
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="eye-icon"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            <Link to={"login_forgotpass.html"} className="link">
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
          <p>Enter your personal details and start your journey with us</p>
          <Link to={"/register"}>
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

export default Login;

