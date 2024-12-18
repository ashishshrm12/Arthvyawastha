import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import './UserHome.css';
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const [total, setTotal] = useState(0);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [totalMonthCollection, setTotalMonthCollection] = useState(0);
  const [invoice, setInvoice] = useState([]);
  const chartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (invoice.length > 0) {
      getOverallTotal(invoice);
      getMonthTotal(invoice);
    }
  }, [invoice]);

  const getData = async () => {
    const q = query(
      collection(db, "invoices"),
      where("uid", "==", localStorage.getItem("uid"))
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const sortedData = data.sort((a, b) => b.date.toDate() - a.date.toDate());

    setInvoice(sortedData);
    setTotalInvoice(sortedData.length);
    monthWiseCollection(sortedData);
  };

  const getOverallTotal = (invoiceList) => {
    const totalAmount = invoiceList.reduce((acc, curr) => acc + curr.total, 0);
    setTotal(totalAmount);
  };

  const getMonthTotal = (invoiceList) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthTotal = invoiceList.reduce((acc, curr) => {
      const invoiceDate = curr.date.toDate();
      if (
        invoiceDate.getMonth() === currentMonth &&
        invoiceDate.getFullYear() === currentYear
      ) {
        return acc + curr.total;
      }
      return acc;
    }, 0);

    setTotalMonthCollection(monthTotal);
  };

  const monthWiseCollection = (data) => {
    const chartData = {
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

    data.forEach((d) => {
      const invoiceDate = d.date.toDate();
      if (invoiceDate.getFullYear() === new Date().getFullYear()) {
        const month = invoiceDate.toLocaleString("default", { month: "short" });
        chartData[month] += d.total;
      }
    });

    createChart(chartData);
  };

  const createChart = (chartData) => {
    const ctx = document.getElementById("myChart");

    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(chartData),
          datasets: [
            {
              label: "Monthly Spent",
              data: Object.values(chartData),
              borderWidth: 1,
              backgroundColor: "#3498db",
              borderColor: "#1b73b7",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "#ffffff",
              },
            },
            x: {
              ticks: {
                color: "#ffffff",
              },
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

  return (
    <div className="user-home-dashboard">
      <div className="user-home-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back, {localStorage.getItem("userName")}! Here's a summary of your activities.</p>
      </div>

      <div className="user-home-first-row">
        <div className="user-home-box box-1">
          <h1 className="user-box-header">₹ {total}</h1>
          <p className="user-home-box-para">Overall</p>
        </div>
        <div className="user-home-box box-2">
          <h1 className="user-box-header">{totalInvoice}</h1>
          <p className="user-home-box-para">Invoices</p>
        </div>
        <div className="user-home-box box-3">
          <h1 className="user-box-header">₹ {totalMonthCollection}</h1>
          <p className="user-home-box-para">This Month</p>
        </div>
      </div>

      <div className="user-home-second-row">
        <div className="user-home-chart-box">
          <canvas id="myChart"></canvas>
        </div>
        <div className="user-recent-invoice-list">
          <h1 className="user-recent-invoice-heading">Recent Invoice List</h1>
          <div className="user-recent-invoice-list-heading">
            <p>Shop Name</p>
            <p>Date</p>
            <p>Total</p>
          </div>
          <div className="recent-list-boxes">
            {invoice.slice(0, 5).map((data) => (
              <div
                onClick={() =>
                  navigate("/user-dashboard/view-invoice", { state: data })
                }
                className="user-recent-data"
                key={data.id}
              >
                <p>{data.from}</p>
                <p className="invoice-date">{formatDate(data.date)}</p>
                <p>₹ {data.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

