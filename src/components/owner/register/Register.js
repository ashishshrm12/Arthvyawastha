// import React, { useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./register.css";
// import { auth, storage, db } from "../../../firebase";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const Register = () => {
//   const fileInputRef = useRef(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
//   const [displayName, setDisplayName] = useState("");
//   const [file, setFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for toggling confirm password visibility

//   const navigate = useNavigate();

//   // Regular expressions for email and password validation
//   const emailRegex = /^[a-zA-Z]{3}[a-zA-Z0-9]*@gmail\.(com|in)$/;
//   const passwordRegex = /^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[_.@#$%^&+=]).{8,16}$/;

//   const submitHandler = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Email and password validation
//     if (!emailRegex.test(email)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Email",
//         text: "Please enter a valid email address no leading space ex :- (ram123@gmail.com).",
//         confirmButtonColor: "#FF4B2B",
//       });
//       setIsLoading(false);
//       return;
//     }

//     if (!passwordRegex.test(password)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Password",
//         text: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
//         confirmButtonColor: "#FF4B2B",
//       });
//       setIsLoading(false);
//       return;
//     }

//     if (password !== confirmPassword) {
//       Swal.fire({
//         icon: "warning",
//         title: "Password Mismatch",
//         text: "Passwords do not match. Please make sure both password fields are the same.",
//         confirmButtonColor: "#FF4B2B",
//       });
//       setIsLoading(false);
//       return;
//     }

//     // Proceed with user creation if validation is successful
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((newUser) => {
//         const date = new Date().getTime();
//         const storageRef = ref(storage, `${displayName + date}`);
//         uploadBytesResumable(storageRef, file)
//           .then(() => {
//             getDownloadURL(storageRef).then((downloadedUrl) => {
//               updateProfile(newUser.user, {
//                 displayName: displayName,
//                 photoURL: downloadedUrl,
//               });

//               setDoc(doc(db, "users", newUser.user.uid), {
//                 uid: newUser.user.uid,
//                 displayName: displayName,
//                 email: email,
//                 photoURL: downloadedUrl,
//               });
//               Swal.fire({
//                 icon: "success",
//                 title: "Registration Successful",
//                 text: "You have been successfully registered!",
//                 confirmButtonColor: "#FF4B2B",
//               }).then(() => {
//                 navigate("/user-dashboard");
//               });
//               setIsLoading(false);
//               localStorage.setItem("userName", displayName);
//               localStorage.setItem("photoURL", downloadedUrl);
//               localStorage.setItem("email", newUser.user.email);
//               localStorage.setItem("uid", newUser.user.uid);
//             });
//           })
//           .catch((error) => {
//             Swal.fire({
//               icon: "warning",
//               title: "File Upload Error",
//               text: "There was an error uploading your profile picture. Please try again.",
//               confirmButtonColor: "#FF4B2B",
//             });
//             console.log(error);
//             setIsLoading(false);
//           });
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         if (err.code === "auth/email-already-in-use") {
//           Swal.fire({
//             icon: "warning",
//             title: "User Already Exists",
//             text: "A user with this email already exists. Please try another email.",
//             confirmButtonColor: "#FF4B2B",
//           });
//         } else {
//           Swal.fire({
//             icon: "warning",
//             title: "Registration Error",
//             text: "An error occurred during registration. Please try again.",
//             confirmButtonColor: "#FF4B2B",
//           });
//           console.log(err.message);
//         }
//       });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <>
//       <div className="frags">
//         <div className="containers" id="">
//           <div className="left-box">
//             <h1>Welcome Back!</h1>
//             <p>To keep connected with us please login with your personal info</p>
//             <Link to={"/login"}>
//               <button className="ghosts buttons" id="signIn">
//                 Sign In
//               </button>
//             </Link>
//           </div>

//           <div className="form-containers sign-up-container">
//             <form onSubmit={submitHandler}>
//               <h1>Create Account</h1>
//               {/* <div className="social-containers">
//                 <Link to={"https://www.facebook.com/login/"} className="social links">
//                   <i className="fa fa-facebook-f"></i>
//                 </Link>
//                 <Link to={"https://accounts.google.com"} className="social links">
//                   <i className="fa fa-google"></i>
//                 </Link>
//                 <Link to={"https://in.linkedin.com/"} className="social links">
//                   <i className="fa fa-linkedin"></i>
//                 </Link>
//               </div> */}
//               {/* <span>or use your email for registration</span> */}

//               <input
//                 type="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 name="email"
//                 value={email}
//                 required
//               />
//               <input
//                 type="text"
//                 onChange={(e) => setDisplayName(e.target.value)}
//                 placeholder="Name"
//                 value={displayName}
//               />
//               <div className="password-container">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Password"
//                   value={password}
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="eye-icon"
//                   onClick={togglePasswordVisibility}
//                   aria-label="Toggle password visibility"
//                 >
//                   <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//                 </button>
//               </div>
//               <div className="password-container">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="eye-icon"
//                   onClick={toggleConfirmPasswordVisibility}
//                   aria-label="Toggle confirm password visibility"
//                 >
//                   <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//                 </button>
//               </div>
//               <input
//                 type="file"
//                 onChange={(e) => setFile(e.target.files[0])}
//                 style={{ display: "none" }}
//                 ref={fileInputRef}
//               />
//               <input
//                 type="button"
//                 value={"Select Your Profile Picture"}
//                 onClick={() => fileInputRef.current.click()}
//                 className="cursors"
//                 required
//               />

//               <button type="submit" className="button">
//                 {isLoading && <i className="fas fa-spinner fa-pulse"></i>}
//                 Sign Up
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="footers">
//           <p>
//             <i className="fa fa-copyright"></i>
//             Copyright belongs to team Arthvyawastha
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
// import React, { useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./register.css";
// import { auth, storage, db } from "../../../firebase";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const Register = () => {
//   const fileInputRef = useRef(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [displayName, setDisplayName] = useState("");
//   const [file, setFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   // Regular expressions for email and password validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const passwordRegex = /^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[_.@#$%^&+=]).{8,16}$/;


//   const submitHandler = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Email and password validation
//     if (!emailRegex.test(email)) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Email",
//         text: "Please enter a valid email format.",
//         confirmButtonColor: "#FF4B2B",
//       });
//       setIsLoading(false);
//       return;
//     }

//     if (!passwordRegex.test(password)) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Password",
//         text: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
//         confirmButtonColor: "#FF4B2B",
//       });
//       setIsLoading(false);
//       return;
//     }

//     // Proceed with user creation if validation is successful
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((newUser) => {
//         const date = new Date().getTime();
//         const storageRef = ref(storage, `${displayName + date}`);
//         uploadBytesResumable(storageRef, file)
//           .then(() => {
//             getDownloadURL(storageRef).then((downloadedUrl) => {
//               updateProfile(newUser.user, {
//                 displayName: displayName,
//                 photoURL: downloadedUrl,
//               });

//               setDoc(doc(db, "users", newUser.user.uid), {
//                 uid: newUser.user.uid,
//                 displayName: displayName,
//                 email: email,
//                 photoURL: downloadedUrl,
//               });
//               Swal.fire({
//                 icon: "success",
//                 title: "Registration Successful",
//                 text: "You have been successfully registered!",
//                 confirmButtonColor: "#FF4B2B",
//               }).then(() => {
//                 navigate("/user-dashboard");
//               });
//               setIsLoading(false);
//               localStorage.setItem("userName", displayName);
//               localStorage.setItem("photoURL", downloadedUrl);
//               localStorage.setItem("email", newUser.user.email);
//               localStorage.setItem("uid", newUser.user.uid);
//             });
//           })
//           .catch((error) => {
//             Swal.fire({
//               icon: "error",
//               title: "File Upload Error",
//               text: "There was an error uploading your profile picture. Please try again.",
//               confirmButtonColor: "#FF4B2B",
//             });
//             console.log(error);
//             setIsLoading(false);
//           });
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         if (err.code === "auth/email-already-in-use") {
//           Swal.fire({
//             icon: "error",
//             title: "User Already Exists",
//             text: "A user with this email already exists. Please try another email.",
//             confirmButtonColor: "#FF4B2B",
//           });
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Registration Error",
//             text: "An error occurred during registration. Please try again.",
//             confirmButtonColor: "#FF4B2B",
//           });
//           console.log(err.message);
//         }
//       });
//   };

//   return (
//     <>
//       <div className="frags">
//         <div className="containers" id="">
//           <div className="left-box">
//             <h1>Welcome Back!</h1>
//             <p>To keep connected with us please login with your personal info</p>
//             <Link to={"/login"}>
//               <button className="ghosts buttons" id="signIn">
//                 Sign In
//               </button>
//             </Link>
//           </div>

//           <div className="form-containers sign-up-container">
//             <form onSubmit={submitHandler}>
//               <h1>Create Account</h1>
//               <div className="social-containers">
//                 <Link to={"https://www.facebook.com/login/"} className="social links">
//                   <i className="fa fa-facebook-f"></i>
//                 </Link>
//                 <Link to={"https://accounts.google.com"} className="social links">
//                   <i className="fa fa-google"></i>
//                 </Link>
//                 <Link to={"https://in.linkedin.com/"} className="social links">
//                   <i className="fa fa-linkedin"></i>
//                 </Link>
//               </div>
//               <span>or use your email for registration</span>

//               <input
//                 type="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 name="email"
//                 value={email}
//                 required
//               />
//               <input
//                 type="text"
//                 onChange={(e) => setDisplayName(e.target.value)}
//                 placeholder="Name"
//                 value={displayName}
//               />
//               <input
//                 type="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 value={password}
//                 required
//               />
//               <input
//                 type="file"
//                 onChange={(e) => setFile(e.target.files[0])}
//                 style={{ display: "none" }}
//                 ref={fileInputRef}
//               />
//               <input
//                 type="button"
//                 value={"Select Your Profile Picture"}
//                 onClick={() => fileInputRef.current.click()}
//                 className="cursors"
//                 required
//               />

//               <button type="submit" className="button">
//                 {isLoading && <i className="fas fa-spinner fa-pulse"></i>}
//                 Sign Up
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="footers">
//           <p>
//             <i className="fa fa-copyright"></i>
//             Copyright belongs to team Arthvyawastha
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { auth, storage, db } from "../../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const Register = () => {
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [displayName, setDisplayName] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility for password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle visibility for confirm password

  const navigate = useNavigate();

  // Regular expressions for email and password validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[_.@#$%^&+=]).{8,16}$/;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  
    // Check if a file was selected and its format is either .png or .jpg
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType !== "image/png" && fileType !== "image/jpeg") {
        Swal.fire({
          icon: "warning",
          title: "Invalid File Format",
          text: "Please upload a file in .png or .jpg format.",
          confirmButtonColor: "#FF4B2B",
        });
        setFile(null); // Clear the file state
      } else {
        setFile(selectedFile); // Set the file if it's valid
    }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Email and password validation
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email format.",
        confirmButtonColor: "#FF4B2B",
      });
      setIsLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be 8-16 characters long and include uppercase, lowercase, numbers, and special characters.",
        confirmButtonColor: "#FF4B2B",
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password Mismatch",
        text: "Passwords do not match. Please make sure both password fields are the same.",
        confirmButtonColor: "#FF4B2B",
      });
      setIsLoading(false);
      return;
    }

    // Proceed with user creation if validation is successful
    createUserWithEmailAndPassword(auth, email, password)
      .then((newUser) => {
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName}_${date}`);
        uploadBytesResumable(storageRef, file)
          .then(() => {
            getDownloadURL(storageRef).then((downloadedUrl) => {
              updateProfile(newUser.user, {
                displayName: displayName,
                photoURL: downloadedUrl,
              });

              setDoc(doc(db, "users", newUser.user.uid), {
                uid: newUser.user.uid,
                displayName: displayName,
                email: email,
                photoURL: downloadedUrl,
              });
              Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: "You have been successfully registered!",
                confirmButtonColor: "#FF4B2B",
              }).then(() => {
                navigate("/user-dashboard");
              });
              setIsLoading(false);
              localStorage.setItem("userName", displayName);
              localStorage.setItem("photoURL", downloadedUrl);
              localStorage.setItem("email", newUser.user.email);
              localStorage.setItem("uid", newUser.user.uid);
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "File Upload Error",
              text: "There was an error uploading your profile picture. Please try again.",
              confirmButtonColor: "#FF4B2B",
            });
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.code === "auth/email-already-in-use") {
          Swal.fire({
            icon: "error",
            title: "User Already Exists",
            text: "A user with this email already exists. Please try another email.",
            confirmButtonColor: "#FF4B2B",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration Error",
            text: "An error occurred during registration. Please try again.",
            confirmButtonColor: "#FF4B2B",
          });
          console.log(err.message);
        }
      });
  };

  return (
    <div className="frags">
      <div className="containers" id="">
        <div className="left-box">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <Link to={"/login"}>
            <button className="ghosts buttons" id="signIn">
              Sign In
            </button>
          </Link>
        </div>

        <div className="form-containers sign-up-container">
          <form onSubmit={submitHandler}>
            <h1>Create Account</h1>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              value={email}
              required
            />
            <input
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Name"
              value={displayName}
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
            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                value={confirmPassword}
                required
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle confirm password visibility"
              >
                <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            {/* <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
              ref={fileInputRef}
            /> */}
            <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
            />
            <input
              type="button"
              value={"Select Your Profile Picture"}
              onClick={() => fileInputRef.current.click()}
              className="cursors"
              required
            />

            <button type="submit" className="button">
              {isLoading && <i className="fas fa-spinner fa-pulse"></i>}
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="footers">
        <p>
          <i className="fa fa-copyright"></i>
          Copyright belongs to team Arthvyawastha
        </p>
      </div>
    </div>
  );
};

export default Register;
