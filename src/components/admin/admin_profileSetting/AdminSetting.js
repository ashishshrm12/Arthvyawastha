import React, {useRef, useState} from "react";
import '../../users/settings/UserSettings'
import { storage,auth,db } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const AdminSetting = () => {
  const fileInputRef=useRef(null);

  const [email, setEmail] = useState(localStorage.getItem('email')|| "");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(localStorage.getItem('userName')|| "");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(localStorage.getItem('photoURL'))

  // const onSeclectFile = (e) =>{
  //   setFile(e.target.files[0])
  //   setImageUrl(URL.createObjectURL(e.target.files[0]))
  // }

  const onSeclectFile = (e) => {
    const selectedFile = e.target.files[0];
  
    // Check the file type
    if (selectedFile) {
      const fileType = selectedFile.type;
  
      // Only allow .jpg and .png file formats
      if (fileType !== "image/png" && fileType !== "image/jpeg") {
        alert("Please upload a .jpg or .png file.");
        setFile(null); // Clear the file selection
        setImageUrl(localStorage.getItem('photoURL')); // Restore the previous image
      } else {
        setFile(selectedFile); // Set the valid file
        setImageUrl(URL.createObjectURL(selectedFile)); // Preview the image
      }
    }
  };

  const updateLogo=()=>{
    const fileRef = ref(storage,localStorage.getItem('photoURL'))
    const storageRef = ref(storage, fileRef._location.path_);
    uploadBytesResumable(storageRef, file)
    .then(result=>{
      window.location.reload();
    })
    
  }

  // const updateName=()=>{
  //   updateProfile(auth.currentUser,{
  //     displayName:displayName
  //   })
  //   .then(res=>{
  //     localStorage.setItem('userName',displayName)
  //     updateDoc(doc(db,"admins",localStorage.getItem('uid')),{
  //       displayName: displayName
  //     })
  //     .then(res=>{
  //       window.location.reload()
  //     })
  //   })
  // }

  const updateName = () => {
    // Regex to check that displayName starts with 3 or more alphabetic characters
    const nameRegex = /^[a-zA-Z]{3}[a-zA-Z0-9]*$/;
  
    // Check if the displayName is valid
    if (!nameRegex.test(displayName)) {
      alert("Name must start with at least 3 alphabetic characters.");
      return; // Prevent updating if the name doesn't match the pattern
    }
  
    // Proceed with the update if valid
    updateProfile(auth.currentUser, {
      displayName: displayName
    })
      .then(res => {
        localStorage.setItem('userName', displayName);
        updateDoc(doc(db, "admins", localStorage.getItem('uid')), {
          displayName: displayName
        })
          .then(res => {
            window.location.reload();
          })
      })
      .catch(err => {
        console.error("Error updating name:", err);
      });
  };


  return (
    <div className="user-setting">
      <div className='user-setting-wrapper'>
        <div className="setting-heading">
          <p  >Settings</p>
        </div>
        <div className="user-profile">
            <img onClick={() => fileInputRef.current.click()} className="pro" alt="profile-pic" src={imageUrl}/>
            {/* <input onChange={(e) => {onSeclectFile(e)}} style={{display:"none"}}  type="file" ref={fileInputRef} /> */}
            <input onChange={(e) => { onSeclectFile(e) }} style={{ display: "none" }} type="file" ref={fileInputRef} accept=".jpg,.png"/>
            {file && <button onClick={()=>{updateLogo()}}>Update Profile Pic</button>}
        </div>

        <div className="updateName">
          <input onChange={e=>{setDisplayName(e.target.value)}} type="text" placeholder="Enter new name" value={displayName} />
          <button onClick={updateName}>Update Name</button>
        </div>
      </div>
    </div>
  )
}

export default AdminSetting;
