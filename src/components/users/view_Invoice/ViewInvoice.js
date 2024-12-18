import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import "./viewInvoice.css";

const ViewInvoice = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state);

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

  return (
    <div className="view-invoice">
      <div id="invoice" className="view-invoice-wrapper">
        <div className="view-invoice-header">
          <div className="customer-details">
            <img
              className="view-image"
              src={localStorage.getItem("photoURL")}
              alt="err"
            />
            <div className="customer-name-email">
              <p className="customer-name">
                {localStorage.getItem("userName")}
              </p>
              <p>{localStorage.getItem("email")}</p>
            </div>
          </div>

          <div className="shop-details">
            <h1>Invoice</h1>
            <p>Shop Name:- {data.from}</p>
            <p>Email:- {data.shopEmail}</p>
            <p>Address:- {data.address}</p>
          </div>
        </div>
        <table className="product-table">
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
            {data.product.map((product, index) => (
              <tr key={product.id}>
                <th>{index + 1}</th>
                <th>{product.name}</th>
                <th>{product.price}</th>
                <th>{product.qty}</th>
                <th>₹ {product.qty * product.price}</th>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Total</td>
              <td>₹ {data.total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <button onClick={printInvoice} className="print-invoice">
        Print Invoice
      </button>
    </div>
  );
};

export default ViewInvoice;
