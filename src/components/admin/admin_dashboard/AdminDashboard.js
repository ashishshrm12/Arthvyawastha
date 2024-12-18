// import React, { useEffect, useState, useRef } from "react";
// import Chart from "chart.js/auto";
// import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
// import { db } from "../../../firebase";
// import "./AdminDashboard.css";

// const AdminDashboard = () => {
//   const [totalOwners, setTotalOwners] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [overallAmount, setOverallAmount] = useState(0);
//   const [recentInvoices, setRecentInvoices] = useState([]);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       // Fetch owners count
//       const ownersSnapshot = await getDocs(collection(db, "owners"));
//       setTotalOwners(ownersSnapshot.size);

//       // Fetch users count
//       const usersSnapshot = await getDocs(collection(db, "users"));
//       setTotalUsers(usersSnapshot.size);

//       // Fetch invoices and calculate overall amount
//       const invoicesSnapshot = await getDocs(collection(db, "invoices"));
//       const invoices = invoicesSnapshot.docs.map((doc) => doc.data());
//       const amount = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
//       setOverallAmount(amount);

//       // Fetch top 5 recent invoices
//       const recentInvoicesQuery = query(
//         collection(db, "invoices"),
//         orderBy("date", "desc"),
//         limit(5)
//       );
//       const recentInvoicesSnapshot = await getDocs(recentInvoicesQuery);
//       setRecentInvoices(
//         recentInvoicesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//       );

//       // Create chart data (monthly amount data)
//       const monthlyAmountData = await calculateMonthlyAmount(invoices);
//       createChart(monthlyAmountData);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     }
//   };

//   // Function to calculate total amount per month
//   const calculateMonthlyAmount = (invoices) => {
//     const monthlyData = {
//       Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
//       Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0,
//     };

//     invoices.forEach((invoice) => {
//       if (invoice.date) {
//         const invoiceDate = invoice.date.toDate();
//         const month = invoiceDate.toLocaleString("default", { month: "short" });
//         monthlyData[month] += invoice.total; // Accumulate total amount per month
//       }
//     });

//     return monthlyData;
//   };

//   // Function to create the chart
//   const createChart = (chartData) => {
//     const ctx = document.getElementById("monthlyAmountChart");
//     if (ctx) {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }

//       chartRef.current = new Chart(ctx, {
//         type: "line", // Line chart
//         data: {
//           labels: Object.keys(chartData), // Months
//           datasets: [
//             {
//               label: "Total Amount per Month",
//               data: Object.values(chartData), // Amount data for each month
//               borderColor: "#4caf50",
//               backgroundColor: "rgba(76, 175, 80, 0.2)",
//               borderWidth: 2,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//               ticks: { color: "#ffffff" },
//             },
//             x: {
//               ticks: { color: "#ffffff" },
//             },
//           },
//         },
//       });
//     }
//   };

//   const formatDate = (timestamp) => {
//     const date = timestamp.toDate();
//     return date.toLocaleDateString("en-GB");
//   };

//   return (
//     <div className="admin-dashboards">
//       <div className="dashboard-headers">
//         <h2>Admin Dashboard</h2>
//         <p>Overview of platform activity and metrics.</p>
//       </div>

//       <div className="dashboard-metricss">
//         <div className="metric-boxs">
//           <h1>{totalOwners}</h1>
//           <p>Total Owners</p>
//         </div>
//         <div className="metric-boxs">
//           <h1>{totalUsers}</h1>
//           <p>Total Users</p>
//         </div>
//         <div className="metric-boxs">
//           <h1>₹ {overallAmount}</h1>
//           <p>Overall Amount</p>
//         </div>
//       </div>

//       <div className="dashboard-visualss">
//         <div className="chart-containers">
//           <canvas id="monthlyAmountChart"></canvas>
//         </div>

//         <div className="recent-invoicess">
//           <h3>Top 5 Recent Invoices</h3>
//           <table className="recent-invoices-tables">
//             <thead>
//               <tr>
//                 <th>Shop Name</th>
//                 <th>Date</th>
//                 <th>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentInvoices.map((invoice) => (
//                 <tr key={invoice.id}>
//                   <td>{invoice.from}</td>
//                   <td>{formatDate(invoice.date)}</td>
//                   <td>₹ {invoice.total}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [totalOwners, setTotalOwners] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [overallAmount, setOverallAmount] = useState(0);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const chartRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch owners count
      const ownersSnapshot = await getDocs(collection(db, "owners"));
      setTotalOwners(ownersSnapshot.size);

      // Fetch users count
      const usersSnapshot = await getDocs(collection(db, "users"));
      setTotalUsers(usersSnapshot.size);

      // Fetch invoices and calculate overall amount
      const invoicesSnapshot = await getDocs(collection(db, "invoices"));
      const invoices = invoicesSnapshot.docs.map((doc) => doc.data());
      const amount = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
      setOverallAmount(amount);

      // Fetch top 5 recent invoices
      const recentInvoicesQuery = query(
        collection(db, "invoices"),
        orderBy("date", "desc"),
        limit(10)
      );
      const recentInvoicesSnapshot = await getDocs(recentInvoicesQuery);
      setRecentInvoices(
        recentInvoicesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      // Create chart data (monthly amount data)
      const monthlyAmountData = await calculateMonthlyAmount(invoices);
      createChart(monthlyAmountData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Function to calculate total amount per month
  const calculateMonthlyAmount = (invoices) => {
    const monthlyData = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    invoices.forEach((invoice) => {
      if (invoice.date) {
        const invoiceDate = invoice.date.toDate();
        const month = invoiceDate.toLocaleString("default", { month: "short" });
        monthlyData[month] += invoice.total; // Accumulate total amount per month
      }
    });

    return monthlyData;
  };

  // Function to create the chart
  const createChart = (chartData) => {
    const ctx = document.getElementById("monthlyAmountChart");
    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: "line", // Line chart
        data: {
          labels: Object.keys(chartData), // Months
          datasets: [
            {
              label: "Total Amount per Month",
              data: Object.values(chartData), // Amount data for each month
              borderColor: "#4caf50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: "#ffffff" },
            },
            x: {
              ticks: { color: "#ffffff" },
            },
          },
        },
      });
    }
  };

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-GB");
  };

  // Handle navigation to AdminViewInvoice page
  const viewInvoice = (invoice) => {
    navigate("/admin/view-invoice", { state: invoice }); // Pass invoice data as state
  };

  return (
    <div className="admin-dashboards">
      <div className="dashboard-headers">
        <h2>Admin Dashboard</h2>
        <p>Overview of platform activity and metrics.</p>
      </div>

      <div className="dashboard-metricss">
        <div className="metric-boxs">
          <h1>{totalOwners}</h1>
          <p>Total Owners</p>
        </div>
        <div className="metric-boxs">
          <h1>{totalUsers}</h1>
          <p>Total Users</p>
        </div>
        <div className="metric-boxs">
          <h1>₹ {overallAmount}</h1>
          <p>Overall Amount</p>
        </div>
      </div>

      <div className="dashboard-visualss">
        <div className="chart-containers">
          <canvas id="monthlyAmountChart"></canvas>
        </div>

        <div className="user-recent-invoice-lists">
          <h1 className="user-recent-invoice-headings">Recent Invoice List</h1>
          <div className="user-recent-invoice-list-headings">
            <p>Shop Name</p>
            <p>Date</p>
            <p>Total</p>
          </div>
          <div className="recent-list-boxess">
            {recentInvoices.map((invoice) => (
              <div
                onClick={() => viewInvoice(invoice)}
                className="user-recent-datas"
                key={invoice.id}
              >
                <p>{invoice.from}</p>
                <p className="invoice-dates">{formatDate(invoice.date)}</p>
                <p>₹ {invoice.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
