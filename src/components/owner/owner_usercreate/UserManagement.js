

// import React, { useState, useEffect } from "react";
// import { db } from "../../../firebase";
// import { collection, addDoc, deleteDoc, getDocs, doc, query, where } from "firebase/firestore";
// import Swal from "sweetalert2";
// import "./UserManagement.css";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [newUser, setNewUser] = useState({ name: "", email: "", password: "", confirmPassword: "" });
//   const [searchQuery, setSearchQuery] = useState("");
//   const ownerEmail = localStorage.getItem("email"); // Get logged-in owner's email

//   useEffect(() => {
//     if (!ownerEmail) return;

//     // Fetch users created by the logged-in owner
//     const fetchUsers = async () => {
//       const usersCollection = collection(db, "users");
//       const q = query(usersCollection, where("ownerEmail", "==", ownerEmail)); // Filter by ownerEmail
//       const usersSnapshot = await getDocs(q);
//       const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setUsers(usersData);
//       setFilteredUsers(usersData);
//     };

//     fetchUsers();
//   }, [ownerEmail]);

//   const validateFields = () => {
//     const nameRegex = /^[A-Za-z\s]{2,20}$/; // Letters and spaces, 2-50 characters
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[^\s@]+\.[^\s@]+$/; // Valid email format
//     const passwordRegex = /^.{8,}$/; // At least 8 characters

//     if (!nameRegex.test(newUser.name)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Name",
//         text: "Name should only contain letters and spaces, and be 2-20 characters long.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (!emailRegex.test(newUser.email)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Email",
//         text: "Please enter a valid email address.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (!passwordRegex.test(newUser.password)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Weak Password",
//         text: "Password must be at least 8 characters long.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (newUser.password !== newUser.confirmPassword) {
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

//   const addUser = async () => {
//     if (!validateFields()) {
//       return; // Stop execution if validation fails
//     }

//     try {
//       const { name, email, password } = newUser; // Save only relevant fields

//       // Generate a unique ID for the user using Firestore's `doc().id`
//       const userDocRef = doc(collection(db, "users")); // Create a reference
//       const uid = userDocRef.id; // Get the generated ID

//       // Save the user data in Firestore
//       await addDoc(collection(db, "users"), {
//         uid, // Store the generated unique ID
//         name,
//         email,
//         password,
//         ownerEmail, // Link the user to the logged-in owner's email
//       });

//       const newUserWithId = { id: uid, name, email };
//       setUsers([...users, newUserWithId]);
//       setFilteredUsers([...users, newUserWithId]);

//       Swal.fire({
//         icon: "success",
//         title: "User Added",
//         text: `The new user ${name} has been successfully added!`,
//         confirmButtonColor: "#4caf50",
//       });

//       setNewUser({ name: "", email: "", password: "", confirmPassword: "" });
//     } catch (error) {
//       Swal.fire({
//         icon: "warning",
//         title: "Error",
//         text: "An error occurred while adding the user. Please try again.",
//         confirmButtonColor: "#e53935",
//       });
//       console.error("Error adding user:", error);
//     }
//   };

//   const deleteUser = async (id) => {
//     const confirmDelete = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action will permanently delete the user.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#e53935",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirmDelete.isConfirmed) {
//       try {
//         await deleteDoc(doc(db, "users", id));
//         const updatedUsers = users.filter((user) => user.id !== id);
//         setUsers(updatedUsers);
//         setFilteredUsers(updatedUsers);

//         Swal.fire({
//           icon: "success",
//           title: "Deleted",
//           text: "The user has been successfully deleted.",
//           confirmButtonColor: "#4caf50",
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: "warning",
//           title: "Error",
//           text: "An error occurred while deleting the user. Please try again.",
//           confirmButtonColor: "#e53935",
//         });
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (query) {
//       const filtered = users.filter((user) =>
//         user.name.toLowerCase().includes(query) ||
//         user.email.toLowerCase().includes(query)
//       );
//       setFilteredUsers(filtered);
//     } else {
//       setFilteredUsers(users);
//     }
//   };

//   return (
//     <div className="user-managements">
//       <h1 className="headerss">Manage Users</h1>

//       {/* Add User Section */}
//       <div className="add-owner-sectionss">
//         <input
//           type="text"
//           className="input-fieldss"
//           placeholder="Name"
//           value={newUser.name}
//           maxLength={20}
//           onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//         />
//         <input
//           type="email"
//           className="input-fieldss"
//           placeholder="Email"
//           value={newUser.email}
//           onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//         />
//         <input
//           type="password"
//           className="input-fieldss"
//           placeholder="Password"
//           value={newUser.password}
//           onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//         />
//         <input
//           type="password"
//           className="input-fieldss"
//           placeholder="Confirm Password"
//           value={newUser.confirmPassword}
//           onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
//         />
//         <button className="add-buttonss" onClick={addUser}>Add User</button>
//       </div>

//       {/* Search Section */}
//       <div className="search-sectionss">
//         <input
//           type="text"
//           className="search-barss"
//           placeholder="Search by name or email"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>

//       {/* Registered Users */}
//       <h2 className="sub-headerss">Registered Users</h2>
//       <table className="owner-tabless">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <button className="delete-buttonss" onClick={() => deleteUser(user.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="no-resultss">No users match your search.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserManagement;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../../../firebase";
// import { collection, addDoc, deleteDoc, getDocs, doc, query, where } from "firebase/firestore";
// import Swal from "sweetalert2";
// import "./UserManagement.css";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [newUser, setNewUser] = useState({ name: "", email: "", password: "", confirmPassword: "" });
//   const [searchQuery, setSearchQuery] = useState("");
//   const ownerEmail = localStorage.getItem("email"); // Get logged-in owner's email
//   const navigate = useNavigate(); // Navigation hook

//   useEffect(() => {
//     if (!ownerEmail) return;

//     // Fetch users created by the logged-in owner
//     const fetchUsers = async () => {
//       const usersCollection = collection(db, "users");
//       const q = query(usersCollection, where("ownerEmail", "==", ownerEmail)); // Filter by ownerEmail
//       const usersSnapshot = await getDocs(q);
//       const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setUsers(usersData);
//       setFilteredUsers(usersData);
//     };

//     fetchUsers();
//   }, [ownerEmail]);

//   const validateFields = () => {
//     const nameRegex = /^[A-Za-z\s]{2,20}$/; // Letters and spaces, 2-50 characters
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[^\s@]+\.[^\s@]+$/; // Valid email format
//     const passwordRegex = /^.{8,}$/; // At least 8 characters

//     if (!nameRegex.test(newUser.name)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Name",
//         text: "Name should only contain letters and spaces, and be 2-20 characters long.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (!emailRegex.test(newUser.email)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Email",
//         text: "Please enter a valid email address.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (!passwordRegex.test(newUser.password)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Weak Password",
//         text: "Password must be at least 8 characters long.",
//         confirmButtonColor: "#e53935",
//       });
//       return false;
//     }

//     if (newUser.password !== newUser.confirmPassword) {
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

//   const addUser = async () => {
//     if (!validateFields()) {
//       return; // Stop execution if validation fails
//     }

//     try {
//       const { name, email, password } = newUser; // Save only relevant fields

//       // Generate a unique ID for the user using Firestore's `doc().id`
//       const userDocRef = doc(collection(db, "users")); // Create a reference
//       const uid = userDocRef.id; // Get the generated ID

//       // Save the user data in Firestore
//       await addDoc(collection(db, "users"), {
//         uid, // Store the generated unique ID
//         name,
//         email,
//         password,
//         ownerEmail, // Link the user to the logged-in owner's email
//       });

//       const newUserWithId = { id: uid, name, email };
//       setUsers([...users, newUserWithId]);
//       setFilteredUsers([...users, newUserWithId]);

//       Swal.fire({
//         icon: "success",
//         title: "User Added",
//         text: `The new user ${name} has been successfully added!`,
//         confirmButtonColor: "#4caf50",
//       });

//       setNewUser({ name: "", email: "", password: "", confirmPassword: "" });
//     } catch (error) {
//       Swal.fire({
//         icon: "warning",
//         title: "Error",
//         text: "An error occurred while adding the user. Please try again.",
//         confirmButtonColor: "#e53935",
//       });
//       console.error("Error adding user:", error);
//     }
//   };

//   const deleteUser = async (id) => {
//     const confirmDelete = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action will permanently delete the user.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#e53935",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirmDelete.isConfirmed) {
//       try {
//         await deleteDoc(doc(db, "users", id));
//         const updatedUsers = users.filter((user) => user.id !== id);
//         setUsers(updatedUsers);
//         setFilteredUsers(updatedUsers);

//         Swal.fire({
//           icon: "success",
//           title: "Deleted",
//           text: "The user has been successfully deleted.",
//           confirmButtonColor: "#4caf50",
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: "warning",
//           title: "Error",
//           text: "An error occurred while deleting the user. Please try again.",
//           confirmButtonColor: "#e53935",
//         });
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (query) {
//       const filtered = users.filter((user) =>
//         user.name.toLowerCase().includes(query) ||
//         user.email.toLowerCase().includes(query)
//       );
//       setFilteredUsers(filtered);
//     } else {
//       setFilteredUsers(users);
//     }
//   };

//   const handleAddInvoice = (user) => {
//     // Navigate to the CreateInvoice page with the user's data
//     navigate("/owner/create-invoice", { state: { user } });
//   };

//   return (
//     <div className="user-managements">
//       <h1 className="headerss">Manage Users</h1>

//       {/* Add User Section */}
//       <div className="add-owner-sectionss">
//         <input
//           type="text"
//           className="input-fieldss"
//           placeholder="Name"
//           value={newUser.name}
//           maxLength={20}
//           onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//         />
//         <input
//           type="email"
//           className="input-fieldss"
//           placeholder="Email"
//           value={newUser.email}
//           onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//         />
//         <input
//           type="password"
//           className="input-fieldss"
//           placeholder="Password"
//           value={newUser.password}
//           onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//         />
//         <input
//           type="password"
//           className="input-fieldss"
//           placeholder="Confirm Password"
//           value={newUser.confirmPassword}
//           onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
//         />
//         <button className="add-buttonss" onClick={addUser}>Add User</button>
//       </div>

//       {/* Search Section */}
//       <div className="search-sectionss">
//         <input
//           type="text"
//           className="search-barss"
//           placeholder="Search by name or email"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>

//       {/* Registered Users */}
//       <h2 className="sub-headerss">Registered Users</h2>
//       <table className="owner-tabless">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <button
//                     className="add-invoice-buttonss"
//                     onClick={() => handleAddInvoice(user)}
//                   >
//                     Add Invoice
//                   </button>
//                   <button className="delete-buttonss" onClick={() => deleteUser(user.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="no-resultss">No users match your search.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserManagement;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, addDoc, deleteDoc, getDocs, doc, query, where } from "firebase/firestore";
import Swal from "sweetalert2";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const ownerEmail = localStorage.getItem("email"); // Get logged-in owner's email
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    if (!ownerEmail) return;

    // Fetch users created by the logged-in owner
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("ownerEmail", "==", ownerEmail)); // Filter by ownerEmail
      const usersSnapshot = await getDocs(q);
      const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
      setFilteredUsers(usersData);
    };

    fetchUsers();
  }, [ownerEmail]);

  const validateFields = () => {
    const nameRegex = /^[A-Za-z\s]{2,20}$/; // Letters and spaces, 2-50 characters
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[^\s@]+\.[^\s@]+$/; // Valid email format
    const passwordRegex = /^.{8,}$/; // At least 8 characters

    if (!nameRegex.test(newUser.name)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Name",
        text: "Name should only contain letters and spaces, and be 2-20 characters long.",
        confirmButtonColor: "#e53935",
      });
      return false;
    }

    if (!emailRegex.test(newUser.email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#e53935",
      });
      return false;
    }

    if (!passwordRegex.test(newUser.password)) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 8 characters long.",
        confirmButtonColor: "#e53935",
      });
      return false;
    }

    if (newUser.password !== newUser.confirmPassword) {
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

  const addUser = async () => {
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }

    try {
      const { name, email, password } = newUser; // Save only relevant fields

      // Generate a unique ID for the user using Firestore's `doc().id`
      const userDocRef = doc(collection(db, "users")); // Create a reference
      const uid = userDocRef.id; // Get the generated ID

      // Save the user data in Firestore
      await addDoc(collection(db, "users"), {
        uid, // Store the generated unique ID
        name,
        email,
        password,
        ownerEmail, // Link the user to the logged-in owner's email
      });

      const newUserWithId = { id: uid, name, email };
      setUsers([...users, newUserWithId]);
      setFilteredUsers([...users, newUserWithId]);

      Swal.fire({
        icon: "success",
        title: "User Added",
        text: `The new user ${name} has been successfully added!`,
        confirmButtonColor: "#4caf50",
      });

      setNewUser({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "An error occurred while adding the user. Please try again.",
        confirmButtonColor: "#e53935",
      });
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53935",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await deleteDoc(doc(db, "users", id));
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "The user has been successfully deleted.",
          confirmButtonColor: "#4caf50",
        });
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: "An error occurred while deleting the user. Please try again.",
          confirmButtonColor: "#e53935",
        });
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleAddInvoice = (user) => {
    navigate("/owner/create-invoice", { state: { user } });
  };

  const handleViewInvoices = (user) => {
    navigate("/owner/view-all-invoice", { state: { user } });
  };

  return (
    <div className="user-managements">
      <h1 className="headerss">Manage Users</h1>

      {/* Add User Section */}
      <div className="add-owner-sectionss">
        <input
          type="text"
          className="input-fieldss"
          placeholder="Name"
          value={newUser.name}
          maxLength={20}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          className="input-fieldss"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          className="input-fieldss"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <input
          type="password"
          className="input-fieldss"
          placeholder="Confirm Password"
          value={newUser.confirmPassword}
          onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
        />
        <button className="add-buttonss" onClick={addUser}>Add User</button>
      </div>

      {/* Search Section */}
      <div className="search-sectionss">
        <input
          type="text"
          className="search-barss"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Registered Users */}
      <h2 className="sub-headerss">Registered Users</h2>
      <table className="owner-tabless">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="view-invoices-buttonss"
                    onClick={() => handleViewInvoices(user)}
                  >
                    View
                  </button>
                  <button
                    className="add-invoice-buttonss"
                    onClick={() => handleAddInvoice(user)}
                  >
                    Add Invoice
                  </button>
                  <button
                    className="delete-buttonss"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-resultss">No users match your search.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;

