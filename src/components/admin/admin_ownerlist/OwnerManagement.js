// import React, { useState, useEffect } from "react";
// import { db } from "../../../firebase";
// import { collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
// import Swal from "sweetalert2";
// import './OwnerManagement.css';

// const OwnerManagement = () => {
//   const [owners, setOwners] = useState([]);
//   const [filteredOwners, setFilteredOwners] = useState([]);
//   const [newOwner, setNewOwner] = useState({ name: "", email: "", shopName: "" });
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchOwners = async () => {
//       const ownersSnapshot = await getDocs(collection(db, "owners"));
//       const ownersData = ownersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setOwners(ownersData);
//       setFilteredOwners(ownersData);
//     };
//     fetchOwners();
//   }, []);

//   const validateFields = () => {
//     const nameRegex = /^[A-Za-z\s]{2,20}$/; // Letters and spaces, 2-50 characters
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.(com|in)$/; // Valid email format
//     const shopNameRegex = /^[A-Za-z0-9\s]{2,20}$/; // Letters, numbers, spaces, 2-100 characters

//     if (!nameRegex.test(newOwner.name)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Name",
//         text: "Name should only contain letters and spaces, and be 2-20 characters long.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (!emailRegex.test(newOwner.email)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Email",
//         text: "Please enter a valid email address.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (!shopNameRegex.test(newOwner.shopName)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Shop Name",
//         text: "Shop name should only contain letters, numbers, and spaces, and be 2-20 characters long.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     return true;
//   };

//   const addOwner = async () => {
//     if (!validateFields()) {
//       return; // Stop execution if validation fails
//     }

//     try {
//       const docRef = await addDoc(collection(db, "owners"), newOwner);
//       const newOwnerWithId = { id: docRef.id, ...newOwner };
//       setOwners([...owners, newOwnerWithId]);
//       setFilteredOwners([...owners, newOwnerWithId]);

//       Swal.fire({
//         icon: "success",
//         title: "Owner Added",
//         text: "The new owner has been successfully added!",
//         confirmButtonColor: "#4caf50",
//       });

//       setNewOwner({ name: "", email: "", shopName: "" });
//     } catch (error) {
//       Swal.fire({
//         icon: "warning",
//         title: "Error",
//         text: "An error occurred while adding the owner. Please try again.",
//         confirmButtonColor: "#e53935",
//       });
//     }
//   };

//   const deleteOwner = async (id) => {
//     const confirmDelete = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action will permanently delete the owner.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#e53935",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirmDelete.isConfirmed) {
//       try {
//         await deleteDoc(doc(db, "owners", id));
//         const updatedOwners = owners.filter((owner) => owner.id !== id);
//         setOwners(updatedOwners);
//         setFilteredOwners(updatedOwners);

//         Swal.fire({
//           icon: "success",
//           title: "Deleted",
//           text: "The owner has been successfully deleted.",
//           confirmButtonColor: "#4caf50",
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: "warning",
//           title: "Error",
//           text: "An error occurred while deleting the owner. Please try again.",
//           confirmButtonColor: "#e53935",
//         });
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (query) {
//       const filtered = owners.filter((owner) =>
//         owner.name.toLowerCase().includes(query) ||
//         owner.email.toLowerCase().includes(query) ||
//         owner.shopName.toLowerCase().includes(query)
//       );
//       setFilteredOwners(filtered);
//     } else {
//       setFilteredOwners(owners);
//     }
//   };

//   return (
//     <div className="owner-managements">
//       <h1 className="headers">Manage Shop Owners</h1>

//       {/* Add Owner Section */}
//       <div className="add-owner-sections">
//         <input
//           type="text"
//           className="input-fields"
//           placeholder="Name"
//           value={newOwner.name}
//           maxLength={20}
//           onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })}
//         />
//         <input
//           type="email"
//           className="input-fields"
//           placeholder="Email"
//           value={newOwner.email}
//           onChange={(e) => setNewOwner({ ...newOwner, email: e.target.value })}
//         />
//         <input
//           type="text"
//           className="input-fields"
//           placeholder="Shop Name"
//           value={newOwner.shopName}
//           maxLength={50}
//           onChange={(e) => setNewOwner({ ...newOwner, shopName: e.target.value })}
//         />
//         <button className="add-buttons" onClick={addOwner}>Add Owner</button>
//       </div>

//       {/* Search Section */}
//       <div className="search-sections">
//         <input
//           type="text"
//           className="search-bars"
//           placeholder="Search by name, email, or shop name"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>

//       {/* Registered Owners */}
//       <h2 className="sub-headers">Registered Owners</h2>
//       <table className="owner-tables">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Shop Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredOwners.length > 0 ? (
//             filteredOwners.map((owner) => (
//               <tr key={owner.id}>
//                 <td>{owner.name}</td>
//                 <td>{owner.shopName}</td>
//                 <td>{owner.email}</td>
//                 <td>
//                   <button className="delete-buttons" onClick={() => deleteOwner(owner.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="no-results">No owners match your search.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OwnerManagement;


// import React, { useState, useEffect } from "react";
// import { db } from "../../../firebase";
// import { collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
// import Swal from "sweetalert2";
// import './OwnerManagement.css';

// const OwnerManagement = () => {
//   const [owners, setOwners] = useState([]);
//   const [filteredOwners, setFilteredOwners] = useState([]);
//   const [newOwner, setNewOwner] = useState({ name: "", email: "", shopName: "", password: "", confirmPassword: "" });
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchOwners = async () => {
//       const ownersSnapshot = await getDocs(collection(db, "owners"));
//       const ownersData = ownersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setOwners(ownersData);
//       setFilteredOwners(ownersData);
//     };
//     fetchOwners();
//   }, []);

//   const validateFields = () => {
//     const nameRegex = /^[A-Za-z\s]{2,20}$/; // Letters and spaces, 2-50 characters
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.(com|in)$/; // Valid email format
//     const shopNameRegex = /^[A-Za-z0-9\s]{2,20}$/; // Letters, numbers, spaces, 2-100 characters
//     const passwordRegex = /^.{8,}$/; // At least 8 characters

//     if (!nameRegex.test(newOwner.name)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Name",
//         text: "Name should only contain letters and spaces, and be 2-20 characters long.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (!emailRegex.test(newOwner.email)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Email",
//         text: "Please enter a valid email address.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (!shopNameRegex.test(newOwner.shopName)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Shop Name",
//         text: "Shop name should only contain letters, numbers, and spaces, and be 2-20 characters long.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (!passwordRegex.test(newOwner.password)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Weak Password",
//         text: "Password must be at least 8 characters long.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (newOwner.password !== newOwner.confirmPassword) {
//       Swal.fire({
//         icon: "warning",
//         title: "Passwords Do Not Match",
//         text: "Please make sure both passwords match.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     return true;
//   };

//   const addOwner = async () => {
//     if (!validateFields()) {
//       return; // Stop execution if validation fails
//     }

//     try {
//       const { name, email, shopName, password } = newOwner; // Save only relevant fields
//       const docRef = await addDoc(collection(db, "owners"), { name, email, shopName, password });
//       const newOwnerWithId = { id: docRef.id, name, email, shopName };
//       setOwners([...owners, newOwnerWithId]);
//       setFilteredOwners([...owners, newOwnerWithId]);

//       Swal.fire({
//         icon: "success",
//         title: "Owner Added",
//         text: "The new owner has been successfully added!",
//         confirmButtonColor: "#4caf50",
//       });

//       setNewOwner({ name: "", email: "", shopName: "", password: "", confirmPassword: "" });
//     } catch (error) {
//       Swal.fire({
//         icon: "warning",
//         title: "Error",
//         text: "An error occurred while adding the owner. Please try again.",
//         confirmButtonColor: "#e53935",
//       });
//     }
//   };

//   const deleteOwner = async (id) => {
//     const confirmDelete = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action will permanently delete the owner.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#e53935",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirmDelete.isConfirmed) {
//       try {
//         await deleteDoc(doc(db, "owners", id));
//         const updatedOwners = owners.filter((owner) => owner.id !== id);
//         setOwners(updatedOwners);
//         setFilteredOwners(updatedOwners);

//         Swal.fire({
//           icon: "success",
//           title: "Deleted",
//           text: "The owner has been successfully deleted.",
//           confirmButtonColor: "#4caf50",
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: "warning",
//           title: "Error",
//           text: "An error occurred while deleting the owner. Please try again.",
//           confirmButtonColor: "#e53935",
//         });
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (query) {
//       const filtered = owners.filter((owner) =>
//         owner.name.toLowerCase().includes(query) ||
//         owner.email.toLowerCase().includes(query) ||
//         owner.shopName.toLowerCase().includes(query)
//       );
//       setFilteredOwners(filtered);
//     } else {
//       setFilteredOwners(owners);
//     }
//   };

//   return (
//     <div className="owner-managements">
//       <h1 className="headers">Manage Shop Owners</h1>

//       {/* Add Owner Section */}
//       <div className="add-owner-sections">
//         <input
//           type="text"
//           className="input-fields"
//           placeholder="Name"
//           value={newOwner.name}
//           maxLength={20}
//           onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })}
//         />
//         <input
//           type="email"
//           className="input-fields"
//           placeholder="Email"
//           value={newOwner.email}
//           onChange={(e) => setNewOwner({ ...newOwner, email: e.target.value })}
//         />
//         <input
//           type="text"
//           className="input-fields"
//           placeholder="Shop Name"
//           value={newOwner.shopName}
//           maxLength={50}
//           onChange={(e) => setNewOwner({ ...newOwner, shopName: e.target.value })}
//         />
//         <input
//           type="password"
//           className="input-fields"
//           placeholder="Password"
//           value={newOwner.password}
//           onChange={(e) => setNewOwner({ ...newOwner, password: e.target.value })}
//         />
//         <input
//           type="password"
//           className="input-fields"
//           placeholder="Confirm Password"
//           value={newOwner.confirmPassword}
//           onChange={(e) => setNewOwner({ ...newOwner, confirmPassword: e.target.value })}
//         />
//         <button className="add-buttons" onClick={addOwner}>Add Owner</button>
//       </div>

//       {/* Search Section */}
//       <div className="search-sections">
//         <input
//           type="text"
//           className="search-bars"
//           placeholder="Search by name, email, or shop name"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>

//       {/* Registered Owners */}
//       <h2 className="sub-headers">Registered Owners</h2>
//       <table className="owner-tables">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Shop Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredOwners.length > 0 ? (
//             filteredOwners.map((owner) => (
//               <tr key={owner.id}>
//                 <td>{owner.name}</td>
//                 <td>{owner.shopName}</td>
//                 <td>{owner.email}</td>
//                 <td>
//                   <button className="delete-buttons" onClick={() => deleteOwner(owner.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="no-results">No owners match your search.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OwnerManagement;



import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import './OwnerManagement.css';

const OwnerManagement = () => {
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [newOwner, setNewOwner] = useState({ name: "", email: "", shopName: "", password: "", confirmPassword: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOwners = async () => {
      const ownersSnapshot = await getDocs(collection(db, "owners"));
      const ownersData = ownersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOwners(ownersData);
      setFilteredOwners(ownersData);
    };
    fetchOwners();
  }, []);

  const validateFields = () => {
    const nameRegex = /^[a-zA-Z]{3}[a-zA-Z0-9]*$/; // Name should start with 3 alphabets, then continue with any letters or spaces
    const emailRegex = /^[a-zA-Z]{3}[a-zA-Z0-9]*@gmail\.(com|in)$/; // Email should end with @gmail.com
    const shopNameRegex = /^[a-zA-Z]{3}[a-zA-Z0-9]*$/; // Shop name should start with 3 alphabets and allow alphanumeric characters, spaces, # and ,
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[_.@#$%^&+=]).{8,16}$/; // Password should be at least 8 characters long

    if (!nameRegex.test(newOwner.name)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Name",
        text: "Name should start with 3 alphabetic characters, followed by any letters or spaces.",
        confirmButtonColor: "#e53935",
      });
      return false;
    }

    if (!emailRegex.test(newOwner.email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address that ends with @gmail.com.",
        confirmButtonColor: "#e53935",
      });
      return false;
    }

    if (!shopNameRegex.test(newOwner.shopName)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Shop Name",
        text: "Shop name should start with 3 alphabetic characters, and only contain alphanumeric characters",
        confirmButtonColor: "#e53935",
      });
      return false;
    }

    if (!passwordRegex.test(newOwner.password)) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 8 characters long.",
        confirmButtonColor: "#e53935",
      });
      return false;
    }

    if (newOwner.password !== newOwner.confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Passwords Do Not Match",
        text: "Please make sure both passwords match.",
        confirmButtonColor: "#e53935",
      });
      return false;
    }

    return true;
  };

  const addOwner = async () => {
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }

    try {
      const { name, email, shopName, password } = newOwner; // Save only relevant fields
      const docRef = await addDoc(collection(db, "owners"), { name, email, shopName, password });
      const newOwnerWithId = { id: docRef.id, name, email, shopName };
      setOwners([...owners, newOwnerWithId]);
      setFilteredOwners([...owners, newOwnerWithId]);

      Swal.fire({
        icon: "success",
        title: "Owner Added",
        text: "The new owner has been successfully added!",
        confirmButtonColor: "#4caf50",
      });

      setNewOwner({ name: "", email: "", shopName: "", password: "", confirmPassword: "" });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "An error occurred while adding the owner. Please try again.",
        confirmButtonColor: "#e53935",
      });
    }
  };

  const deleteOwner = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the owner.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53935",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await deleteDoc(doc(db, "owners", id));
        const updatedOwners = owners.filter((owner) => owner.id !== id);
        setOwners(updatedOwners);
        setFilteredOwners(updatedOwners);

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "The owner has been successfully deleted.",
          confirmButtonColor: "#4caf50",
        });
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "An error occurred while deleting the owner. Please try again.",
          confirmButtonColor: "#e53935",
        });
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = owners.filter((owner) =>
        owner.name.toLowerCase().includes(query) ||
        owner.email.toLowerCase().includes(query) ||
        owner.shopName.toLowerCase().includes(query)
      );
      setFilteredOwners(filtered);
    } else {
      setFilteredOwners(owners);
    }
  };

  return (
    <div className="owner-managements">
      <h1 className="headers">Manage Shop Owners</h1>

      {/* Add Owner Section */}
      <div className="add-owner-sections">
        <input
          type="text"
          className="input-fields"
          placeholder="Name"
          value={newOwner.name}
          maxLength={20}
          onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })}
        />
        <input
          type="email"
          className="input-fields"
          placeholder="Email"
          value={newOwner.email}
          onChange={(e) => setNewOwner({ ...newOwner, email: e.target.value })}
        />
        <input
          type="text"
          className="input-fields"
          placeholder="Shop Name"
          value={newOwner.shopName}
          maxLength={50}
          onChange={(e) => setNewOwner({ ...newOwner, shopName: e.target.value })}
        />
        <input
          type="password"
          className="input-fields"
          placeholder="Password"
          value={newOwner.password}
          onChange={(e) => setNewOwner({ ...newOwner, password: e.target.value })}
        />
        <input
          type="password"
          className="input-fields"
          placeholder="Confirm Password"
          value={newOwner.confirmPassword}
          onChange={(e) => setNewOwner({ ...newOwner, confirmPassword: e.target.value })}
        />
        <button className="add-buttons" onClick={addOwner}>Add Owner</button>
      </div>

      {/* Search Section */}
      <div className="search-sections">
        <input
          type="text"
          className="search-bars"
          placeholder="Search by name, email, or shop name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Registered Owners */}
      <h2 className="sub-headers">Registered Owners</h2>
      <table className="owner-tables">
        <thead>
          <tr>
            <th>Name</th>
            <th>Shop Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOwners.length > 0 ? (
            filteredOwners.map((owner) => (
              <tr key={owner.id}>
                <td>{owner.name}</td>
                <td>{owner.shopName}</td>
                <td>{owner.email}</td>
                <td>
                  <button className="delete-buttons" onClick={() => deleteOwner(owner.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-results">No owners match your search.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerManagement;
// import React, { useState, useEffect } from "react";
// import { db } from "../../../firebase";
// import { collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
// import Swal from "sweetalert2";
// import './OwnerManagement.css';

// const OwnerManagement = () => {
//   const [owners, setOwners] = useState([]);
//   const [filteredOwners, setFilteredOwners] = useState([]);
//   const [newOwner, setNewOwner] = useState({ name: "", email: "", shopName: "", password: "", confirmPassword: "" });
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchOwners = async () => {
//       const ownersSnapshot = await getDocs(collection(db, "owners"));
//       const ownersData = ownersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setOwners(ownersData);
//       setFilteredOwners(ownersData);
//     };
//     fetchOwners();
//   }, []);

//   const validateFields = () => {
//     const nameRegex = /^[A-Za-z\s]{2,20}$/; // Letters and spaces, 2-50 characters
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.(com|in)$/; // Valid email format
//     const shopNameRegex = /^[A-Za-z0-9\s]{2,20}$/; // Letters, numbers, spaces, 2-100 characters
//     const passwordRegex = /^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[_.@#$%^&+=]).{8,16}$/; // At least 8 characters

//     if (!nameRegex.test(newOwner.name)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Name",
//         text: "Name should only contain letters and spaces, and be 2-20 characters long.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (!emailRegex.test(newOwner.email)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Email",
//         text: "Please enter a valid email address.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (!shopNameRegex.test(newOwner.shopName)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Shop Name",
//         text: "Shop name should only contain letters, numbers, and spaces, and be 2-20 characters long.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (!passwordRegex.test(newOwner.password)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Weak Password",
//         text: "Password must be at least 8 characters long.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (newOwner.password !== newOwner.confirmPassword) {
//       Swal.fire({
//         icon: "warning",
//         title: "Passwords Do Not Match",
//         text: "Please make sure both passwords match.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     return true;
//   };

//   const addOwner = async () => {
//     if (!validateFields()) {
//       return; // Stop execution if validation fails
//     }

//     try {
//       const { name, email, shopName, password } = newOwner; // Save only relevant fields
//       const docRef = await addDoc(collection(db, "owners"), { name, email, shopName, password });
//       const newOwnerWithId = { id: docRef.id, name, email, shopName };
//       setOwners([...owners, newOwnerWithId]);
//       setFilteredOwners([...owners, newOwnerWithId]);

//       Swal.fire({
//         icon: "success",
//         title: "Owner Added",
//         text: "The new owner has been successfully added!",
//         confirmButtonColor: "#4caf50",
//       });

//       setNewOwner({ name: "", email: "", shopName: "", password: "", confirmPassword: "" });
//     } catch (error) {
//       Swal.fire({
//         icon: "warning",
//         title: "Error",
//         text: "An error occurred while adding the owner. Please try again.",
//         confirmButtonColor: "#e53935",
//       });
//     }
//   };

//   const deleteOwner = async (id) => {
//     const confirmDelete = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action will permanently delete the owner.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#e53935",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirmDelete.isConfirmed) {
//       try {
//         await deleteDoc(doc(db, "owners", id));
//         const updatedOwners = owners.filter((owner) => owner.id !== id);
//         setOwners(updatedOwners);
//         setFilteredOwners(updatedOwners);

//         Swal.fire({
//           icon: "success",
//           title: "Deleted",
//           text: "The owner has been successfully deleted.",
//           confirmButtonColor: "#4caf50",
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: "warning",
//           title: "Error",
//           text: "An error occurred while deleting the owner. Please try again.",
//           confirmButtonColor: "#e53935",
//         });
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
  
//     if (query) {
//       const filtered = owners.filter((owner) => {
//         return (
//           owner && owner.name && owner.name.toLowerCase().includes(query)
//           //  ||
//           // owner.email && owner.email.toLowerCase().includes(query) ||
//           // owner.shopName && owner.shopName.toLowerCase().includes(query)
//         );
//       });
//       setFilteredOwners(filtered);
//     } else {
//       setFilteredOwners(owners);
//     }
//   };
  

//   return (
//     <div className="owner-managements">
//       <h1 className="headers">Manage Shop Owners</h1>

//       {/* Add Owner Section */}
//       <div className="add-owner-sections">
//         <input
//           type="text"
//           className="input-fields"
//           placeholder="Name"
//           value={newOwner.name}
//           maxLength={20}
//           onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })}
//         />
//         <input
//           type="email"
//           className="input-fields"
//           placeholder="Email"
//           value={newOwner.email}
//           onChange={(e) => setNewOwner({ ...newOwner, email: e.target.value })}
//         />
//         <input
//           type="text"
//           className="input-fields"
//           placeholder="Shop Name"
//           value={newOwner.shopName}
//           maxLength={50}
//           onChange={(e) => setNewOwner({ ...newOwner, shopName: e.target.value })}
//         />
//         <input
//           type="password"
//           className="input-fields"
//           placeholder="Password"
//           value={newOwner.password}
//           onChange={(e) => setNewOwner({ ...newOwner, password: e.target.value })}
//         />
//         <input
//           type="password"
//           className="input-fields"
//           placeholder="Confirm Password"
//           value={newOwner.confirmPassword}
//           onChange={(e) => setNewOwner({ ...newOwner, confirmPassword: e.target.value })}
//         />
//         <button className="add-buttons" onClick={addOwner}>Add Owner</button>
//       </div>

//       {/* Search Section */}
//       <div className="search-sections">
//         <input
//           type="text"
//           className="search-bars"
//           placeholder="Search by name"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>

//       {/* Registered Owners */}
//       <h2 className="sub-headers">Registered Owners</h2>
//       <table className="owner-tables">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Shop Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredOwners.length > 0 ? (
//             filteredOwners.map((owner) => (
//               <tr key={owner.id}>
//                 <td>{owner.name}</td>
//                 <td>{owner.shopName}</td>
//                 <td>{owner.email}</td>
//                 <td>
//                   <button className="delete-buttons" onClick={() => deleteOwner(owner.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="no-results">No owners match your search.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OwnerManagement;



