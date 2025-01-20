import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]); // Holds the user data
  const [filter, setFilter] = useState(""); // Holds the search query

  // Fetch users whenever the `filter` changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/bulk?filter=${filter}`
        );
        console.log("Response from backend:", response.data); // Debugging the response
        setUsers(response.data.users || []); // Set users or fallback to an empty array
      } catch (error) {
        console.error("Error fetching users:", error); // Debugging errors
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, [filter]);

  return (
    <>
      <div className="text-2xl font-semibold py-6">Users</div>
      <div>
        <input
          type="text"
          placeholder="Search Users..."
          className="border w-full p-2 rounded-lg"
          onChange={(e) => setFilter(e.target.value)} // Update the filter state on input change
        />
      </div>
      <User users={users}></User>
    </>
  );
};

// User Component
function User({ users }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {users.length > 0 ? (
        users.map((user, index) => (
          <div
            key={index}
            className="p-4 hover:bg-gray-100 flex items-center"
          >
            <div className="flex justify-center items-center rounded-full bg-gray-500 w-12 h-12">
              {user.firstName[0].toUpperCase()}
              {user.lastName[0].toUpperCase()}
            </div>
            <div className="px-3 font-medium">
              {user.firstName.replace(/^\w/, (c) => c.toUpperCase())} {user.lastName.replace(/^\w/, (c) => c.toUpperCase())}
            </div>
            <div className="ml-auto">
              <button
                onClick={() =>
                  navigate(
                    `/send?id=${user._id}&firstname=${user.firstName}&lastname=${user.lastName}`
                  )
                }
                className="bg-black text-white rounded-lg p-3 font-medium hover:bg-slate-400 hover:text-black focus:ring"
              >
                Send Money
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No users found</div> // Handle case when no users are returned
      )}
    </div>
  );
}
