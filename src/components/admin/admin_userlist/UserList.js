import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]); // Full list of users
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered list for search
  const [searchTerm, setSearchTerm] = useState(""); // Search term input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersWithInvoices = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch invoice counts for each user
      const usersWithInvoices = await Promise.all(
        usersData.map(async (user) => {
          const invoicesSnapshot = await getDocs(
            query(collection(db, "invoices"), where("uid", "==", user.id))
          );
          return { ...user, invoiceCount: invoicesSnapshot.size }; // Add invoice count
        })
      );

      setUsers(usersWithInvoices);
      setFilteredUsers(usersWithInvoices); // Initialize filtered users
    };

    fetchUsersWithInvoices();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the user and all their invoices!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53935",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        // Delete all invoices associated with the user
        const invoicesSnapshot = await getDocs(
          query(collection(db, "invoices"), where("uid", "==", id))
        );
        const deletePromises = invoicesSnapshot.docs.map((invoiceDoc) =>
          deleteDoc(doc(db, "invoices", invoiceDoc.id))
        );
        await Promise.all(deletePromises);

        // Delete the user
        await deleteDoc(doc(db, "users", id));
        setUsers(users.filter((user) => user.id !== id)); // Update UI
        setFilteredUsers(filteredUsers.filter((user) => user.id !== id)); // Update filtered list

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The user and their invoices have been deleted.",
          confirmButtonColor: "#4caf50",
        });
      } catch (error) {
        console.error("Error deleting user and invoices:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete the user. Please try again.",
          confirmButtonColor: "#e53935",
        });
      }
    }
  };

  const viewInvoices = (userId) => {
    // Navigate to the view invoices page for the selected user
    navigate("/admin/view-user", { state: { userId } });
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // const filtered = users.filter(
    //   (user) =>
    //     user.displayName.toLowerCase().includes(searchValue) ||
    //     user.email.toLowerCase().includes(searchValue)
    // );
    const filtered = users.filter(
      (user) =>
        (user.displayName && user.displayName.toLowerCase().includes(searchValue))
  );

    setFilteredUsers(filtered); // Update the filtered list
  };

  return (
    <div className="user-list-container">
      <h1 className="user-list-title">Registered Users</h1>
      <input
        type="text"
        className="user-list-search-bar"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="user-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Invoices</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.invoiceCount}</td>
                <td>
                  <button
                    className="user-action-button view-button"
                    onClick={() => viewInvoices(user.id)}
                  >
                    View
                  </button>
                  <button
                    className="user-action-button delete-button"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-users-message">
                No registered users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;






