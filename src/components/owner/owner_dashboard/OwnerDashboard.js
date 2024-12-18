



// import React, { useEffect, useState, useRef } from "react";
// import Chart from "chart.js/auto";
// import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
// import { db } from "../../../firebase";
// import { useNavigate } from "react-router-dom";
// import "./OwnerDashboard.css";

// const OwnerDashboard = () => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [thisMonthAmount, setThisMonthAmount] = useState(0);
//   const [overallAmount, setOverallAmount] = useState(0);
//   const [recentInvoices, setRecentInvoices] = useState([]);
//   const chartRef = useRef(null);
//   const navigate = useNavigate();
//   const ownerEmail = localStorage.getItem("email"); // Owner's email from localStorage

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       if (!ownerEmail) {
//         console.error("Owner email not found!");
//         return;
//       }

//       // Fetch total users under this owner
//       const usersQuery = query(collection(db, "users"), where("ownerEmail", "==", ownerEmail));
//       const usersSnapshot = await getDocs(usersQuery);
//       setTotalUsers(usersSnapshot.size);

//       // Fetch invoices created by this owner
//       const invoicesQuery = query(collection(db, "invoices"), where("ownerEmail", "==", ownerEmail));
//       const invoicesSnapshot = await getDocs(invoicesQuery);
//       const invoices = invoicesSnapshot.docs.map((doc) => doc.data());

//       // Calculate overall amount
//       const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
//       setOverallAmount(totalAmount);

//       // Calculate this month's amount
//       const currentMonth = new Date().getMonth();
//       const currentYear = new Date().getFullYear();
//       const monthAmount = invoices.reduce((sum, invoice) => {
//         const invoiceDate = invoice.date.toDate();
//         if (invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear) {
//           return sum + invoice.total;
//         }
//         return sum;
//       }, 0);
//       setThisMonthAmount(monthAmount);

//       // Fetch top 5 recent invoices
//       const recentInvoicesQuery = query(
//         collection(db, "invoices"),
//         where("ownerEmail", "==", ownerEmail),
//         orderBy("date", "desc"),
//         limit(5)
//       );
//       const recentInvoicesSnapshot = await getDocs(recentInvoicesQuery);
//       setRecentInvoices(
//         recentInvoicesSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//       );

//       // Create chart data
//       const monthlyAmountData = calculateMonthlyAmount(invoices);
//       createChart(monthlyAmountData);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     }
//   };

//   const calculateMonthlyAmount = (invoices) => {
//     const monthlyData = {
//       Jan: 0,
//       Feb: 0,
//       Mar: 0,
//       Apr: 0,
//       May: 0,
//       Jun: 0,
//       Jul: 0,
//       Aug: 0,
//       Sep: 0,
//       Oct: 0,
//       Nov: 0,
//       Dec: 0,
//     };

//     invoices.forEach((invoice) => {
//       if (invoice.date) {
//         const invoiceDate = invoice.date.toDate();
//         const month = invoiceDate.toLocaleString("default", { month: "short" });
//         monthlyData[month] += invoice.total;
//       }
//     });

//     return monthlyData;
//   };

//   const createChart = (chartData) => {
//     const ctx = document.getElementById("monthlyAmountChart");
//     if (ctx) {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }

//       chartRef.current = new Chart(ctx, {
//         type: "line",
//         data: {
//           labels: Object.keys(chartData),
//           datasets: [
//             {
//               label: "Total Amount per Month",
//               data: Object.values(chartData),
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

//   const viewInvoice = (invoice) => {
//     navigate("/owner/view-invoice", { state: invoice });
//   };

//   return (
//     <div className="owner-dashboardss">
//       <div className="dashboard-headerss">
//         <h2>Owner Dashboard</h2>
//         <p>Overview of your activity and metrics.</p>
//       </div>

//       <div className="dashboard-metricsss">
//         <div className="metric-boxss">
//           <h1>{totalUsers}</h1>
//           <p>Total Users</p>
//         </div>
//         <div className="metric-boxss">
//           <h1>₹ {thisMonthAmount}</h1>
//           <p>This Month's Amount</p>
//         </div>
//         <div className="metric-boxss">
//           <h1>₹ {overallAmount}</h1>
//           <p>Overall Amount</p>
//         </div>
//       </div>

//       <div className="dashboard-visualsss">
//         <div className="chart-containerss">
//           <canvas id="monthlyAmountChart"></canvas>
//         </div>

//         <div className="user-recent-invoice-listss">
//           <h1 className="user-recent-invoice-headingss">Recent Invoice List</h1>
//           <div className="user-recent-invoice-list-headingss">
//             <p>Shop Name</p>
//             <p>Date</p>
//             <p>Total</p>
//           </div>
//           <div className="recent-list-boxesss">
//             {recentInvoices.map((invoice) => (
//               <div
//                 onClick={() => viewInvoice(invoice)}
//                 className="user-recent-datass"
//                 key={invoice.id}
//               >
//                 <p>{invoice.from}</p>
//                 <p className="invoice-datess">{formatDate(invoice.date)}</p>
//                 <p>₹ {invoice.total}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerDashboard;

// import React, { useEffect, useState, useRef } from "react";
// import Chart from "chart.js/auto";
// import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
// import { db } from "../../../firebase";
// import { useNavigate } from "react-router-dom";
// import "./OwnerDashboard.css";

// const OwnerDashboard = () => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [thisMonthAmount, setThisMonthAmount] = useState(0);
//   const [overallAmount, setOverallAmount] = useState(0);
//   const [recentInvoices, setRecentInvoices] = useState([]);
//   const chartRef = useRef(null);
//   const navigate = useNavigate();
//   const ownerEmail = localStorage.getItem("email"); // Owner's email from localStorage

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       if (!ownerEmail) {
//         console.error("Owner email not found!");
//         return;
//       }

//       // Fetch total users under this owner
//       const usersQuery = query(collection(db, "users"), where("ownerEmail", "==", ownerEmail));
//       const usersSnapshot = await getDocs(usersQuery);
//       setTotalUsers(usersSnapshot.size);

//       // Fetch invoices created by this owner
//       const invoicesQuery = query(collection(db, "invoices"), where("ownerEmail", "==", ownerEmail));
//       const invoicesSnapshot = await getDocs(invoicesQuery);
//       const invoices = invoicesSnapshot.docs.map((doc) => doc.data());

//       // Calculate overall amount
//       const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
//       setOverallAmount(totalAmount);

//       // Calculate this month's amount
//       const currentMonth = new Date().getMonth();
//       const currentYear = new Date().getFullYear();
//       const monthAmount = invoices.reduce((sum, invoice) => {
//         const invoiceDate = invoice.date.toDate();
//         if (invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear) {
//           return sum + invoice.total;
//         }
//         return sum;
//       }, 0);
//       setThisMonthAmount(monthAmount);

//       // Fetch top 5 recent invoices
//       const recentInvoicesQuery = query(
//         collection(db, "invoices"),
//         where("ownerEmail", "==", ownerEmail),
//         orderBy("date", "desc"),
//         limit(5)
//       );
//       const recentInvoicesSnapshot = await getDocs(recentInvoicesQuery);
//       setRecentInvoices(
//         recentInvoicesSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//       );

//       // Create chart data
//       const monthlyAmountData = calculateMonthlyAmount(invoices);
//       createChart(monthlyAmountData);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     }
//   };

//   const calculateMonthlyAmount = (invoices) => {
//     const monthlyData = {
//       Jan: 0,
//       Feb: 0,
//       Mar: 0,
//       Apr: 0,
//       May: 0,
//       Jun: 0,
//       Jul: 0,
//       Aug: 0,
//       Sep: 0,
//       Oct: 0,
//       Nov: 0,
//       Dec: 0,
//     };

//     invoices.forEach((invoice) => {
//       if (invoice.date) {
//         const invoiceDate = invoice.date.toDate();
//         const month = invoiceDate.toLocaleString("default", { month: "short" });
//         monthlyData[month] += invoice.total;
//       }
//     });

//     return monthlyData;
//   };

//   const createChart = (chartData) => {
//     const ctx = document.getElementById("monthlyAmountChart");
//     if (ctx) {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }

//       chartRef.current = new Chart(ctx, {
//         type: "line",
//         data: {
//           labels: Object.keys(chartData),
//           datasets: [
//             {
//               label: "Total Amount per Month",
//               data: Object.values(chartData),
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

//   const viewInvoice = (invoice) => {
//     navigate("/owner/view-invoice", { state: invoice });
//   };

//   return (
//     <div className="owner-dashboardss">
//       <div className="dashboard-headerss">
//         <h2>Owner Dashboard</h2>
//         <p>Overview of your activity and metrics.</p>
//       </div>

//       <div className="dashboard-metricsss">
//         <div className="metric-boxss">
//           <h1>{totalUsers}</h1>
//           <p>Total Users</p>
//         </div>
//         <div className="metric-boxss">
//           <h1>₹ {thisMonthAmount}</h1>
//           <p>This Month's Amount</p>
//         </div>
//         <div className="metric-boxss">
//           <h1>₹ {overallAmount}</h1>
//           <p>Overall Amount</p>
//         </div>
//       </div>

//       <div className="dashboard-visualsss">
//         <div className="chart-containerss">
//           <canvas id="monthlyAmountChart"></canvas>
//         </div>

//         <div className="user-recent-invoice-listss">
//           <h1 className="user-recent-invoice-headingss">Recent Invoice List</h1>
//           <div className="user-recent-invoice-list-headingss">
//             <p>Shop Name</p>
//             <p>Date</p>
//             <p>Total</p>
//           </div>
//           <div className="recent-list-boxesss">
//             {recentInvoices.map((invoice) => (
//               <div
//                 onClick={() => viewInvoice(invoice)}
//                 className="user-recent-datass"
//                 key={invoice.id}
//               >
//                 <p>{invoice.from}</p>
//                 <p className="invoice-datess">{formatDate(invoice.date)}</p>
//                 <p>₹ {invoice.total}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerDashboard;

import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import "./OwnerDashboard.css";

const OwnerDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [thisMonthAmount, setThisMonthAmount] = useState(0);
  const [overallAmount, setOverallAmount] = useState(0);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const chartRef = useRef(null);
  const navigate = useNavigate();
  const ownerEmail = localStorage.getItem("email"); // Owner's email from localStorage

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      if (!ownerEmail) {
        console.error("Owner email not found!");
        return;
      }

      // Fetch total users under this owner
      const usersQuery = query(collection(db, "users"), where("ownerEmail", "==", ownerEmail));
      const usersSnapshot = await getDocs(usersQuery);
      setTotalUsers(usersSnapshot.size);

      // Fetch invoices created by this owner
      const invoicesQuery = query(collection(db, "invoices"), where("ownerEmail", "==", ownerEmail));
      const invoicesSnapshot = await getDocs(invoicesQuery);
      const invoices = invoicesSnapshot.docs.map((doc) => doc.data());

      // Calculate overall amount
      const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
      setOverallAmount(totalAmount);

      // Calculate this month's amount
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthAmount = invoices.reduce((sum, invoice) => {
        const invoiceDate = invoice.date.toDate();
        if (invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear) {
          return sum + invoice.total;
        }
        return sum;
      }, 0);
      setThisMonthAmount(monthAmount);

      // Fetch top 5 recent invoices
      const recentInvoicesQuery = query(
        collection(db, "invoices"),
        where("ownerEmail", "==", ownerEmail),
        orderBy("date", "desc"),
        limit(5)
      );
      const recentInvoicesSnapshot = await getDocs(recentInvoicesQuery);
      setRecentInvoices(
        recentInvoicesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      // Create chart data
      const monthlyAmountData = await calculateMonthlyAmount(invoices);
      createChart(monthlyAmountData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const calculateMonthlyAmount = (invoices) => {
    const monthlyData = {
      Jan: 5160,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 1000,
      Jul: 456780,
      Aug: 16780,
      Sep: 0,
      Oct: 0,
      Nov: 1560,
      Dec: 5160,
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

  const createChart = (chartData) => {
    const ctx = document.getElementById("monthlyAmountChart");
    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: "line",
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

  const viewInvoice = (invoice) => {
    navigate("/owner/view-invoice", { state: invoice });
  };

  return (
    <div className="owner-dashboardss">
      <div className="dashboard-headerss">
        <h2>Owner Dashboard</h2>
        <p>Overview of your activity and metrics.</p>
      </div>

      <div className="dashboard-metricsss">
        <div className="metric-boxss">
          <h1>{totalUsers}</h1>
          <p>Total Users</p>
        </div>
        <div className="metric-boxss">
          <h1>₹ {thisMonthAmount}</h1>
          <p>This Month's Amount</p>
        </div>
        <div className="metric-boxss">
          <h1>₹ {overallAmount}</h1>
          <p>Overall Amount</p>
        </div>
      </div>

      <div className="dashboard-visualsss">
        <div className="chart-containerss">
          <canvas id="monthlyAmountChart"></canvas>
        </div>

        <div className="user-recent-invoice-listss">
          <h1 className="user-recent-invoice-headingss">Recent Invoice List</h1>
          <div className="user-recent-invoice-list-headingss">
            <p>Shop Name</p>
            <p>Date</p>
            <p>Total</p>
          </div>
          <div className="recent-list-boxesss">
            {recentInvoices.map((invoice) => (
              <div
                onClick={() => viewInvoice(invoice)}
                className="user-recent-datass"
                key={invoice.id}
              >
                <p>{invoice.from}</p>
                <p className="invoice-datess">{formatDate(invoice.date)}</p>
                <p>₹ {invoice.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;



