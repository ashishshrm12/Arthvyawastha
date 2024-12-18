// import React, {useRef, useState} from "react";
// import '../../users/settings/UserSettings'
// import { storage,auth,db } from "../../../firebase";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { updateProfile } from "firebase/auth";
// import { doc, updateDoc } from "firebase/firestore";

// const OwnerSetting = () => {
//   const fileInputRef=useRef(null);

//   const [email, setEmail] = useState(localStorage.getItem('email')|| "");
//   const [password, setPassword] = useState("");
//   const [displayName, setDisplayName] = useState(localStorage.getItem('userName')|| "");
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(localStorage.getItem('photoURL'))

//   const onSeclectFile = (e) =>{
//     setFile(e.target.files[0])
//     setImageUrl(URL.createObjectURL(e.target.files[0]))
//   }

//   const updateLogo=()=>{
//     const fileRef = ref(storage,localStorage.getItem('photoURL'))
//     const storageRef = ref(storage, fileRef._location.path_);
//     uploadBytesResumable(storageRef, file)
//     .then(result=>{
//       window.location.reload();
//     })
    
//   }

//   const updateName=()=>{
//     updateProfile(auth.currentUser,{
//       displayName:displayName
//     })
//     .then(res=>{
//       localStorage.setItem('userName',displayName)
//       updateDoc(doc(db,"admins",localStorage.getItem('uid')),{
//         displayName: displayName
//       })
//       .then(res=>{
//         window.location.reload()
//       })
//     })
//   }


//   return (
//     <div className="user-setting">
//       <div className='user-setting-wrapper'>
//         <div className="setting-heading">
//           <p  >Settings</p>
//         </div>
//         <div className="user-profile">
//             <img onClick={() => fileInputRef.current.click()} className="pro" alt="profile-pic" src={imageUrl}/>
//             <input onChange={(e) => {onSeclectFile(e)}} style={{display:"none"}}  type="file" ref={fileInputRef} />
//             {file && <button onClick={()=>{updateLogo()}}>Update Profile Pic</button>}
//         </div>

//         <div className="updateName">
//           <input onChange={e=>{setDisplayName(e.target.value)}} type="text" placeholder="Enter new name" value={displayName} />
//           <button onClick={updateName}>Update Name</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OwnerSetting;

import React, { useRef, useState } from "react";
import { storage, auth, db } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2"; // For better alerts
import './OwnerSettings.css'; // Add your CSS file if needed
// import '../../users/settings/UserSettings.css';


const OwnerSetting = () => {
  const fileInputRef = useRef(null);

  // States for owner details
  const [email] = useState(localStorage.getItem("email") || "");
  const [displayName, setDisplayName] = useState(localStorage.getItem("userName") || "");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(localStorage.getItem("photoURL"));

  // Handle file selection and preview
  const onSelectFile = (e) => {
    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0])); // For instant preview
  };

  // Update profile picture
  const updateProfilePicture = () => {
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "No File Selected",
        text: "Please select a profile picture to update.",
        confirmButtonColor: "#FF4B2B",
      });
      return;
    }

    const filePath = `owners/${auth.currentUser.uid}/profilePicture`;
    const storageRef = ref(storage, filePath);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Error uploading file:", error);
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "There was an error uploading the profile picture. Please try again.",
          confirmButtonColor: "#FF4B2B",
        });
      },
      async () => {
        // Get the download URL after successful upload
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Update in Firebase Auth
        await updateProfile(auth.currentUser, { photoURL: downloadURL });

        // Update in Firestore
        await updateDoc(doc(db, "owners", auth.currentUser.uid), { photoURL: downloadURL });

        // Update in localStorage
        localStorage.setItem("photoURL", downloadURL);

        Swal.fire({
          icon: "success",
          title: "Profile Picture Updated",
          text: "Your profile picture has been updated successfully!",
          confirmButtonColor: "#4CAF50",
        });

        setFile(null); // Clear file input
      }
    );
  };

  // Update display name
  const updateDisplayName = async () => {
    if (!displayName) {
      Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "Display name cannot be empty.",
        confirmButtonColor: "#FF4B2B",
      });
      return;
    }

    try {
      // Update in Firebase Auth
      await updateProfile(auth.currentUser, { displayName });

      // Update in Firestore
      await updateDoc(doc(db, "owners", auth.currentUser.uid), { displayName });

      // Update in localStorage
      localStorage.setItem("userName", displayName);

      Swal.fire({
        icon: "success",
        title: "Name Updated",
        text: "Your name has been updated successfully!",
        confirmButtonColor: "#4CAF50",
      });
    } catch (error) {
      console.error("Error updating name:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "An error occurred while updating your name. Please try again.",
        confirmButtonColor: "#FF4B2B",
      });
    }
  };

  return (
    <div className="owner-settings">
      <div className="settings-wrappers">
        <div className="settings-headers">
          <h1>Owner Settings</h1>
        </div>

        {/* Profile Picture Section */}
        <div className="profile-sections">
          <img
            onClick={() => fileInputRef.current.click()}
            className="profile-pics"
            alt="Profile"
            src={imageUrl || "https://via.placeholder.com/150"}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={onSelectFile}
          />
          {file && <button onClick={updateProfilePicture}>Update Profile Picture</button>}
        </div>

        {/* Update Name Section */}
        <div className="update-name-sections">
          <input
            type="text"
            placeholder="Enter new name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <button onClick={updateDisplayName}>Update Name</button>
        </div>
      </div>
    </div>
  );
};

export default OwnerSetting;

