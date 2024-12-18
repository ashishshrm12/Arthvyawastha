import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./invoices.css"; 

const Invoices = () => {
  const [invoices, setInvoice] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const q= query(collection(db, "invoices"),where('uid',"==",localStorage.getItem('uid')))
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const sortedData = data.sort((a, b) => b.date.toDate() - a.date.toDate());

    setInvoice(sortedData);
    
  };

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-GB");
  };

  const deleteInvoice = async (id) => {
    const isSure = window.confirm("Are you sure you want to delete?");
    if (isSure) {
      try {
        await deleteDoc(doc(db, "invoices", id));
        getData();
      } catch {
        window.alert("Something went wrong");
      }
    }
  };

  return (
    <div className="user-invoice">
      <div className="user-invoice-header">
        <h1>All Invoices</h1>
        <p>Manage all your invoices easily with a few clicks.</p>
      </div>
      <div className="user-invoice-list">
        {invoices.map((data) => (
          <div className="user-invoice-card" key={data.id}>
            <div className="invoice-details">
              <p className="invoice-from">{data.from}</p>
              <p className="invoice-date">{formatDate(data.date)}</p>
              <p className="invoice-total">Total: ₹{data.total}</p>
            </div>
            <div className="invoice-actions">
              <button
                onClick={() => deleteInvoice(data.id)}
                className="user-invoice-delete-btn"
              ><i className="fa-solid fa-trash"></i>
               Delete
              </button>
              <button
                onClick={() =>
                  navigate("/user-dashboard/view-invoice", { state: data })
                }
                className="view-btn"
              ><i className="fa-solid fa-eye"></i>
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoices;

