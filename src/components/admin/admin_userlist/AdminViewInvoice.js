import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../../firebase"; // Update this to match your project setup
import { doc, getDoc } from "firebase/firestore";
import "./AdminViewInvoice.css";

const AdminViewInvoice = () => {
  const location = useLocation();
  const { uid, ...invoiceData } = location.state || {}; // Extract UID and invoice data from state
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!uid) {
          console.error("No UID provided in state");
          navigate(-1); // Navigate back if no UID is provided
          return;
        }

        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", uid); // Adjust collection name as per your Firestore setup
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          console.warn("No user found with UID:", uid);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid, navigate]);

  const printInvoice = () => {
    const input = document.getElementById("invoice");
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imageData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 792],
      });
      pdf.internal.scaleFactor = 1;
      const imageProps = pdf.getImageProperties(imageData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;

      pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice" + new Date());
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-view-invoice">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div id="invoice" className="view-invoice-wrappers">
        <div className="view-invoice-headers">
          <div className="customer-detailss">
            <img
              className="view-images"
              src={userData.photoURL || "https://via.placeholder.com/150"}
              alt="Customer"
            />
            <div className="customer-name-emails">
              <p className="customer-names">{userData.displayName || "Name Unavailable"}</p>
              <p>{userData.email || "Email Unavailable"}</p>
            </div>
          </div>

          <div className="shop-detailss">
            <h1>Invoice</h1>
            <p>Shop Name: {invoiceData.from || "Shop Name Unavailable"}</p>
            <p>Shop Email: {invoiceData.shopEmail || "Shop Email Unavailable"}</p>
            <p>Address: {invoiceData.address || "Address Unavailable"}</p>
          </div>
        </div>
        <table className="product-tables">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.product && invoiceData.product.length > 0 ? (
              invoiceData.product.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name || "N/A"}</td>
                  <td>{product.price || "N/A"}</td>
                  <td>{product.qty || "N/A"}</td>
                  <td>₹ {product.qty * product.price || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No products available</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Total</td>
              <td>₹ {invoiceData.total || 0}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <button onClick={printInvoice} className="print-invoices">
        Print Invoice
      </button>
    </div>
  );
};

export default AdminViewInvoice;









