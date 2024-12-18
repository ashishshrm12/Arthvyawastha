// import React, { useEffect, useState } from "react";
// import { db } from "../../../firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { useLocation, useNavigate } from "react-router-dom";
// import './ViewAll.css';

// const ViewAll = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [filteredInvoices, setFilteredInvoices] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const location = useLocation();
//   const { userId } = location.state;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const invoicesSnapshot = await getDocs(
//           query(collection(db, "invoices"), where("uid", "==", userId))
//         );
//         const invoicesData = invoicesSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setInvoices(invoicesData);
//         setFilteredInvoices(invoicesData); // Initialize filtered invoices
//       } catch (error) {
//         console.error("Error fetching invoices:", error);
//       }
//     };

//     fetchInvoices();
//   }, [userId]);

//   const formatDate = (timestamp) => {
//     const date = timestamp.toDate();
//     return date.toLocaleDateString("en-GB");
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (query) {
//       const filtered = invoices.filter((invoice) =>
//         invoice.from.toLowerCase().includes(query) ||
//         formatDate(invoice.date).includes(query) ||
//         String(invoice.total).includes(query)
//       );
//       setFilteredInvoices(filtered);
//     } else {
//       setFilteredInvoices(invoices); // Reset to full list if search is cleared
//     }
//   };

//   return (
//     <div className="admin-view-user-main">
//     <div className="admin-view-user">
//       <button className="back-button" onClick={() => navigate(-1)}>
//         ← Back
//       </button>
//       <h1 className="page-title">Invoices for User</h1>
//       <div className="search-sections">
//         <input
//           type="text"
//           className="search-bars"
//           placeholder="Search invoices (From, Date, Total)"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>
//       <ul className="invoice-list">
//         {filteredInvoices.length > 0 ? (
//           filteredInvoices.map((invoice) => (
//             <li key={invoice.id} className="invoice-item">
//               <div className="invoice-details">
//                 <div className="invoice-detail">
//                   <strong>Shop Name:</strong> {invoice.from}
//                 </div>
//                 <div className="invoice-detail">
//                   <strong>Date:</strong> {formatDate(invoice.date)}
//                 </div>
//                 <div className="invoice-detail">
//                   <strong>Total:</strong> ₹{invoice.total}
//                 </div>
//               </div>
//               <button
//                 className="view-invoice-btn"
//                 onClick={() =>
//                   navigate("/admin/view-invoice", { state: invoice })
//                 }
//               >
//                 View
//               </button>
//             </li>
//           ))
//         ) : (
//           <p className="no-invoices">No invoices match your search.</p>
//         )}
//       </ul>
//     </div>
//     </div>
//   );
// };

// export default ViewAll;

import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewAll.css";

const ViewAll = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { userId } = location.state; // Get the selected user's ID from navigation state
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    // Realtime listener for invoices of the specific user
    const fetchInvoices = () => {
      const invoicesQuery = query(collection(db, "invoices"), where("uid", "==", userId));
      const unsubscribe = onSnapshot(invoicesQuery, (snapshot) => {
        const invoicesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInvoices(invoicesData);
        setFilteredInvoices(invoicesData); // Initialize filtered invoices
      });

      return unsubscribe; // Cleanup listener on unmount
    };

    const unsubscribe = fetchInvoices();
    return () => unsubscribe();
  }, [userId]);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = invoices.filter((invoice) =>
        invoice.from.toLowerCase().includes(query) ||
        formatDate(invoice.date).includes(query) ||
        String(invoice.total).includes(query)
      );
      setFilteredInvoices(filtered);
    } else {
      setFilteredInvoices(invoices); // Reset to full list if search is cleared
    }
  };

  return (
    <div className="admin-view-user-mains">
      <div className="admin-view-users">
        <button className="back-buttons" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="page-titles">Invoices for User</h1>
        <div className="search-sectionss">
          <input
            type="text"
            className="search-barss"
            placeholder="Search invoices (From, Date, Total)"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <ul className="invoice-lists">
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice) => (
              <li key={invoice.id} className="invoice-items">
                <div className="invoice-detailss">
                  <div className="invoice-details">
                    <strong>Shop Name:</strong> {invoice.from}
                  </div>
                  <div className="invoice-details">
                    <strong>Date:</strong> {formatDate(invoice.date)}
                  </div>
                  <div className="invoice-details">
                    <strong>Total:</strong> ₹{invoice.total}
                  </div>
                </div>
                <button
                  className="view-invoice-btnssss"
                  onClick={() =>
                    navigate("/admin/view-invoice", { state: invoice })
                  }
                >
                  View
                </button>
              </li>
            ))
          ) : (
            <p className="no-invoicess">No invoices match your search.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ViewAll;

