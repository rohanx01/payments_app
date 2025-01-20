import { useEffect, useState } from "react";
import axios from "axios";
import { Users } from "../components/Users";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate()

  // Fetch the token from session storage
  const token = sessionStorage.getItem("token");
  console.log(token)

 

  // Fetch user data on component mount
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    
    // Redirect to signup if token doesn't exist
    if (!token) {
      console.error("No token found in session storage. Redirecting to signup.");
      navigate("/signup");
      return;
    }
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set the fetched data in state
        const { balance, firstName, lastName } = response.data;
        setBalance(balance);
        setFirstName(firstName);
        setLastName(lastName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div className="py-6 px-6">
      {/* Header Section */}
      <div className="flex justify-between px-6 -mx-6 border-b pb-6">
        <div className="font-bold text-4xl">Payments App</div>
        <div className="text-lg flex items-center">
          {/* Display user's full name */}
          Hello,{" "}
          {firstName && lastName
            ? `${firstName[0].toUpperCase() + firstName.slice(1)} ${
                lastName[0].toUpperCase() + lastName.slice(1)
              }`
            : "User"}
          <span className="flex justify-center items-center rounded-full bg-gray-500 w-12 h-12 ml-2">
            {/* Display initials */}
            {firstName[0]?.toUpperCase() || ""}{lastName[0]?.toUpperCase() || ""}
          </span>
        </div>
      </div>

      {/* Balance Section */}
      <div className="font-medium text-xl py-4">
        <span className="text-2xl font-semibold">Your Balance: </span>INR {balance}
      </div>

      {/* Users Component */}
      <Users />
    </div>
  );
};
