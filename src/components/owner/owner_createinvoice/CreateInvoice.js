// import React, { useState } from "react";
// import "./CreateInvoice.css";
// import { db } from "../../../firebase";
// import { addDoc, collection, Timestamp } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const CreateInvoice = () => {
//   const [from, setFrom] = useState("");
//   const [shopEmail, setShopEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [qty, setQty] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [product, setProduct] = useState([]);

//   const navigation = useNavigate();

//   const validateShopName = () => {
//     const shopNameRegex = /^[a-zA-Z]{3}[a-zA-Z0-9]*$/;
//     if (!shopNameRegex.test(from)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Shop Name",
//         text: "Shop name should start with 3 alphabetic characters and can only contain alphanumeric characters.",
//       });
//       return false;
//     }
//     return true;
//   };

//   const validateShopAddress = () => {
//     const addressRegex = /^[a-zA-Z][a-zA-Z0-9, #]*$/;
//     if (!addressRegex.test(address)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Shop Address",
//         text: "Shop address should start with an alphabet and can only contain alphanumeric characters, spaces, commas, and #.",
//       });
//       return false;
//     }
//     return true;
//   };

//   const validateProductName = () => {
//     const productNameRegex = /^[a-zA-Z]{3}[A-Za-z0-9\s]+$/;
//     if (!productNameRegex.test(name)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Product Name",
//         text: "Product name start with 3 alphabetic character should only contain letters, numbers, and spaces. No special characters allowed.",
//       });
//       return false;
//     }
//     return true;
//   };

//   // shope validation
//   const validateShopEmail = () => {
//     const emailRegex = /^[a-zA-Z]{3}[a-zA-Z0-9]*@gmail\.(com|in)$/;
//     if (!emailRegex.test(shopEmail)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Email",
//         text: "Please enter a valid email address no leading space ex :- (ram123@gmail.com).",
//       });
//       return false;
//     }
//     return true;
//   };

//   // Add Product function
//   const addProduct = () => {
//     if (!validateShopName() || !validateShopEmail() || !validateShopAddress() || !validateProductName()) return;

//     if (isNaN(price) || price <= 0 || price >= 50000000) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Price",
//         text: "Price must be a positive number and should not exceed ₹5 crore.",
//       });
//       return;
//     }
//     if (isNaN(qty) || qty <= 0 || qty >= 50000) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Quantity",
//         text: "Quantity must be a positive number and should not exceed 50,000.",
//       });
//       return;
//     }

//     const productTotal = qty * price;
//     if (total + productTotal > 50000000) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invoice Limit Exceeded",
//         text: "Total invoice amount cannot exceed ₹5 crore.",
//       });
//       return;
//     }

//     setProduct([
//       ...product,
//       { id: product.length, name: name, price: parseFloat(price), qty: parseInt(qty) },
//     ]);
//     setTotal(total + productTotal);

//     Swal.fire({
//       icon: "success",
//       title: "Product Added",
//       text: `Added ${name} (Qty: ${qty}, Price: ₹${price}) to the invoice.`,
//     });

//     setName("");
//     setPrice("");
//     setQty(1);
//   };

//   // Save Data function
//   const saveData = async () => {
//     if (!validateShopName() || !validateShopAddress() || !validateShopEmail() || !validateProductName()) return; // Ensure validation before saving

//     try {
//       const invoiceRef = collection(db, "invoices");

//       await addDoc(invoiceRef, {
//         from: from,
//         shopEmail: shopEmail,
//         address: address,
//         product: product,
//         total: total,
//         uid: localStorage.getItem("uid"),
//         date: Timestamp.fromDate(new Date()),
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Invoice Saved",
//         text: "Your invoice has been successfully saved!",
//       }).then(() => {
//         navigation("/user-dashboard/invoice");
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "warning",
//         title: "Error Saving Invoice",
//         text: "An error occurred while saving the invoice. Please try again.",
//       });
//       console.error("Error saving invoice:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="header-row">
//         <p className="user-new-invoice-heading">New Invoice</p>
//         <button onClick={saveData} className="new-invoice-btn" type="button">
//           Save
//         </button>
//       </div>
//       <form className="user-new-invoice-form">
//         <div className="first-row">
//           <input
//             onChange={(e) => setFrom(e.target.value)}
//             placeholder="Shop Name"
//             value={from}
//             maxLength={20}
//           />
//           <input
//             onChange={(e) => setShopEmail(e.target.value)}
//             placeholder="Shop Email"
//             value={shopEmail}
//           />
//           <input
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="Shop Address"
//             value={address}
//           />
//         </div>

//         <div className="second-row">
//           <input
//             onChange={(e) => setName(e.target.value.replace(/[^A-Za-z0-9\s]/g, ""))}
//             placeholder="Product Name"
//             value={name}
//             maxLength={15}
//           />
//           <input
//             onChange={(e) => {
//               const value = e.target.value;
//               setPrice(value === "" || isNaN(value) ? "" : Math.max(0, parseFloat(value)));
//             }}
//             placeholder="Price (₹)"
//             value={price}
//           />
//           <input
//             onChange={(e) => {
//               const value = e.target.value;
//               setQty(value === "" || isNaN(value) ? "" : Math.max(1, parseInt(value)));
//             }}
//             type="number"
//             placeholder="Quantity"
//             value={qty}
//           />
//         </div>

//         <button onClick={addProduct} className="new-invoice-btn" type="button">
//           Add Product
//         </button>
//       </form>

//       {product.length > 0 && (
//         <div className="user-product-wrapper">
//           <div className="product-list">
//             <p>Sr. No.</p>
//             <p>Product Name</p>
//             <p>Price</p>
//             <p>Quantity</p>
//             <p>Total Price</p>
//           </div>
//           {product.map((data, index) => (
//             <div className="product-list" key={index}>
//               <p>{index + 1}</p>
//               <p>{data.name}</p>
//               <p>{data.price}</p>
//               <p>{data.qty}</p>
//               <p>₹ {data.qty * data.price}</p>
//             </div>
//           ))}
//           <div className="total-wrapper">
//             <p>Total: ₹ {total}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateInvoice;

// import React, { useState, useEffect } from "react";
// import "./CreateInvoice.css";
// import { db } from "../../../firebase";
// import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";

// const CreateInvoice = () => {
//   const [selectedUser, setSelectedUser] = useState(""); // Selected user ID
//   const [users, setUsers] = useState([]); // List of users created by the owner
//   const [shopEmail, setShopEmail] = useState(""); // Email of selected user
//   const [shopName, setShopName] = useState(""); // Shop name of selected user
//   const [address, setAddress] = useState("");
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [qty, setQty] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [product, setProduct] = useState([]);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const ownerEmail = localStorage.getItem("email"); // Logged-in owner's email

//   // Fetch users created by the logged-in owner
//   useEffect(() => {
//     if (!ownerEmail) {
//       Swal.fire({
//         icon: "error",
//         title: "Unauthorized",
//         text: "Please log in as an owner to create invoices.",
//       }).then(() => navigate("/owner-login"));
//       return;
//     }

//     const fetchUsers = async () => {
//       try {
//         const usersQuery = query(collection(db, "users"), where("ownerEmail", "==", ownerEmail));
//         const usersSnapshot = await getDocs(usersQuery);
//         const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setUsers(usersList);

//         // Preselect user if navigated from UserManagement
//         const passedUser = location.state?.user;
//         if (passedUser) {
//           setSelectedUser(passedUser.id);
//           setShopEmail(passedUser.email);
//           setShopName(passedUser.name);
//         }
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Error Fetching Users",
//           text: "An error occurred while fetching users. Please try again later.",
//         });
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [ownerEmail, navigate, location]);

//   // Handle user selection from the dropdown
//   const handleUserSelection = (userId) => {
//     const selectedUserData = users.find((user) => user.id === userId);
//     if (selectedUserData) {
//       setSelectedUser(userId);
//       setShopEmail(selectedUserData.email);
//       setShopName(selectedUserData.name);
//     } else {
//       setSelectedUser("");
//       setShopEmail("");
//       setShopName("");
//     }
//   };

//   const validateShopAddress = () => {
//     const addressRegex = /^[a-zA-Z][a-zA-Z0-9, #]*$/;
//     if (!addressRegex.test(address)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Shop Address",
//         text: "Shop address should start with an alphabet and can only contain alphanumeric characters, spaces, commas, and #.",
//       });
//       return false;
//     }
//     return true;
//   };

//   const validateProductName = () => {
//     const productNameRegex = /^[a-zA-Z]{3}[A-Za-z0-9\s]+$/;
//     if (!productNameRegex.test(name)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Product Name",
//         text: "Product name should start with 3 alphabetic characters and contain only letters, numbers, and spaces. No special characters allowed.",
//       });
//       return false;
//     }
//     return true;
//   };

//   // Add Product function
//   const addProduct = () => {
//     if (!validateShopAddress() || !validateProductName()) return;

//     if (isNaN(price) || price <= 0 || price >= 50000000) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Price",
//         text: "Price must be a positive number and should not exceed ₹5 crore.",
//       });
//       return;
//     }
//     if (isNaN(qty) || qty <= 0 || qty >= 50000) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Quantity",
//         text: "Quantity must be a positive number and should not exceed 50,000.",
//       });
//       return;
//     }

//     const productTotal = qty * price;
//     if (total + productTotal > 50000000) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invoice Limit Exceeded",
//         text: "Total invoice amount cannot exceed ₹5 crore.",
//       });
//       return;
//     }

//     setProduct([
//       ...product,
//       { id: product.length, name: name, price: parseFloat(price), qty: parseInt(qty) },
//     ]);
//     setTotal(total + productTotal);

//     Swal.fire({
//       icon: "success",
//       title: "Product Added",
//       text: `Added ${name} (Qty: ${qty}, Price: ₹${price}) to the invoice.`,
//     });

//     setName("");
//     setPrice("");
//     setQty(1);
//   };

//   // Save Data function
//   const saveData = async () => {
//     if (!selectedUser) {
//       Swal.fire({
//         icon: "warning",
//         title: "Select a User",
//         text: "Please select a user to create an invoice.",
//       });
//       return;
//     }

//     if (!validateShopAddress() || !validateProductName()) return; // Ensure validation before saving

//     try {
//       const invoiceRef = collection(db, "invoices");

//       await addDoc(invoiceRef, {
//         from: shopName, // Shop name from selected user
//         shopEmail: shopEmail, // Shop email from selected user
//         address: address,
//         product: product,
//         total: total,
//         ownerUid: localStorage.getItem("uid"), // Owner UID for reference
//         date: Timestamp.fromDate(new Date()),
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Invoice Saved",
//         text: "Your invoice has been successfully saved!",
//       }).then(() => {
//         navigate("/user-dashboard/invoice");
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "warning",
//         title: "Error Saving Invoice",
//         text: "An error occurred while saving the invoice. Please try again.",
//       });
//       console.error("Error saving invoice:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="header-rows">
//         <p className="user-new-invoice-headings">New Invoice</p>
//         <button onClick={saveData} className="new-invoice-btnsss" type="button">
//           Save
//         </button>
//       </div>

//       {/* Select User Section */}
//       <div className="user-select-sections">
//         <label htmlFor="userSelect">Select User:</label>
//         <select
//           id="userSelect"
//           value={selectedUser}
//           onChange={(e) => handleUserSelection(e.target.value)}
//         >
//           <option value="">-- Select a User --</option>
//           {users.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.name} ({user.email})
//             </option>
//           ))}
//         </select>
//       </div>

//       <form className="user-new-invoice-forms">
//         <div className="first-rows">
//           <input
//             value={shopName}
//             disabled
//             placeholder="User Name (Auto-filled)"
//           />
//           <input
//             value={shopEmail}
//             disabled
//             placeholder="User Email (Auto-filled)"
//           />
//           <input
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="Shop Address"
//             value={address}
//           />
//         </div>

//         <div className="second-rows">
//           <input
//             onChange={(e) => setName(e.target.value.replace(/[^A-Za-z0-9\s]/g, ""))}
//             placeholder="Product Name"
//             value={name}
//             maxLength={15}
//           />
//           <input
//             onChange={(e) => {
//               const value = e.target.value;
//               setPrice(value === "" || isNaN(value) ? "" : Math.max(0, parseFloat(value)));
//             }}
//             placeholder="Price (₹)"
//             value={price}
//           />
//           <input
//             onChange={(e) => {
//               const value = e.target.value;
//               setQty(value === "" || isNaN(value) ? "" : Math.max(1, parseInt(value)));
//             }}
//             type="number"
//             placeholder="Quantity"
//             value={qty}
//           />
//         </div>

//         <button onClick={addProduct} className="new-invoice-btnsss" type="button">
//           Add Product
//         </button>
//       </form>

//       {product.length > 0 && (
//         <div className="user-product-wrappers">
//           <div className="product-lists">
//             <p>Sr. No.</p>
//             <p>Product Name</p>
//             <p>Price</p>
//             <p>Quantity</p>
//             <p>Total Price</p>
//           </div>
//           {product.map((data, index) => (
//             <div className="product-lists" key={index}>
//               <p>{index + 1}</p>
//               <p>{data.name}</p>
//               <p>{data.price}</p>
//               <p>{data.qty}</p>
//               <p>₹ {data.qty * data.price}</p>
//             </div>
//           ))}
//           <div className="total-wrappers">
//             <p>Total: ₹ {total}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateInvoice;

import React, { useState, useEffect } from "react";
import "./CreateInvoice.css";
import { db } from "../../../firebase";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const CreateInvoice = () => {
  const [selectedUser, setSelectedUser] = useState(""); // Selected user ID
  const [users, setUsers] = useState([]); // List of users created by the owner
  const [shopEmail, setShopEmail] = useState(""); // Email of selected user
  const [shopName, setShopName] = useState(""); // Shop name of selected user
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0);
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const ownerEmail = localStorage.getItem("email"); // Logged-in owner's email

  // Fetch users created by the logged-in owner
  useEffect(() => {
    if (!ownerEmail) {
      navigate("/owner-login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const usersQuery = query(collection(db, "users"), where("ownerEmail", "==", ownerEmail));
        const usersSnapshot = await getDocs(usersQuery);
        const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);

        // Preselect user if navigated from UserManagement
        const passedUser = location.state?.user;
        if (passedUser) {
          setSelectedUser(passedUser.id);
          setShopEmail(passedUser.email);
          setShopName(passedUser.name);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [ownerEmail, navigate, location]);

  // Handle user selection from the dropdown
  const handleUserSelection = (userId) => {
    const selectedUserData = users.find((user) => user.id === userId);
    if (selectedUserData) {
      setSelectedUser(userId);
      setShopEmail(selectedUserData.email);
      setShopName(selectedUserData.name);
    } else {
      setSelectedUser("");
      setShopEmail("");
      setShopName("");
    }
  };

  const validateShopAddress = () => {
    const addressRegex = /^[a-zA-Z][a-zA-Z0-9, #]*$/;
    return addressRegex.test(address);
  };

  const validateProductName = () => {
    const productNameRegex = /^[a-zA-Z]{3}[A-Za-z0-9\s]+$/;
    return productNameRegex.test(name);
  };

  // Add Product function
  const addProduct = () => {
    if (!validateShopAddress() || !validateProductName()) return;

    if (isNaN(price) || price <= 0 || price >= 50000000) {
      return; // Prevent adding product if price is invalid
    }
    if (isNaN(qty) || qty <= 0 || qty >= 50000) {
      return; // Prevent adding product if quantity is invalid
    }

    const productTotal = qty * price;
    if (total + productTotal > 50000000) {
      return; // Prevent adding product if total exceeds limit
    }

    setProduct([ ...product, { id: product.length, name: name, price: parseFloat(price), qty: parseInt(qty) } ]);
    setTotal(total + productTotal);

    setName("");
    setPrice("");
    setQty(1);
  };

  // Save Data function
  const saveData = async () => {
    if ( !validateShopAddress() ||  !validateProductName()) return; // Ensure validation before saving

    try {
      const invoiceRef = collection(db, "invoices");

      await addDoc(invoiceRef, {
        from: shopName,
        shopEmail: shopEmail,
        address: address,
        product: product,
        total: total,
        uid: localStorage.getItem("uid"),
        date: Timestamp.fromDate(new Date()),
      });

      Swal.fire({
        icon: "success",
        title: "Invoice Saved",
        text: "Your invoice has been successfully saved!",
      }).then(() => {
        navigate("/owner/view-invoice");
      });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Error Saving Invoice",
        text: "An error occurred while saving the invoice. Please try again.",
      });
      console.error("Error saving invoice:", error);
    }
  };
  

  return (
    <div>
      <div className="header-rows">
        <p className="user-new-invoice-headings">New Invoice</p>
        <button onClick={saveData} className="new-invoice-btnsss" type="button">
          Save
        </button>
      </div>

      {/* Select User Section */}
      <div className="user-select-sections">
        <label htmlFor="userSelect">Select User:</label>
        <select
          id="userSelect"
          value={selectedUser}
          onChange={(e) => handleUserSelection(e.target.value)}
        >
          <option value="">-- Select a User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <form className="user-new-invoice-forms">
        <div className="first-rows">
          <input
            value={shopName}
            disabled
            placeholder="User Name (Auto-filled)"
          />
          <input
            value={shopEmail}
            disabled
            placeholder="User Email (Auto-filled)"
          />
          <input
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Shop Address"
            value={address}
          />
        </div>

        <div className="second-rows">
          <input
            onChange={(e) => setName(e.target.value.replace(/[^A-Za-z0-9\s]/g, ""))}
            placeholder="Product Name"
            value={name}
            maxLength={15}
          />
          <input
            onChange={(e) => {
              const value = e.target.value;
              setPrice(value === "" || isNaN(value) ? "" : Math.max(0, parseFloat(value)));
            }}
            placeholder="Price (₹)"
            value={price}
          />
          <input
            onChange={(e) => {
              const value = e.target.value;
              setQty(value === "" || isNaN(value) ? "" : Math.max(1, parseInt(value)));
            }}
            type="number"
            placeholder="Quantity"
            value={qty}
          />
        </div>

        <button onClick={addProduct} className="new-invoice-btnsss" type="button">
          Add Product
        </button>
      </form>

      {product.length > 0 && (
        <div className="user-product-wrappers">
          <div className="product-lists">
            <p>Sr. No.</p>
            <p>Product Name</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total Price</p>
          </div>
          {product.map((data, index) => (
            <div className="product-lists" key={index}>
              <p>{index + 1}</p>
              <p>{data.name}</p>
              <p>{data.price}</p>
              <p>{data.qty}</p>
              <p>₹ {data.qty * data.price}</p>
            </div>
          ))}
          <div className="total-wrappers">
            <p>Total: ₹ {total}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;


