import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export const Send = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const firstName = searchParams
    .get("firstname")
    .replace(/^\w/, (c) => c.toUpperCase());
  const lastName = searchParams
    .get("lastname")
    .replace(/^\w/, (c) => c.toUpperCase());
  const [amount, setAmount] = useState(0);

  const handleTransfer = async () => {
    if (amount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          amount: amount,
          to: id,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log("Transfer successful:", response.data);
      alert("Transfer successful!");
    } catch (error) {
      console.error("Error initiating transfer:", error);
      alert("Transfer failed. Please try again.");
    }
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[23vw] h-[40vh] shadow-xl rounded-lg border border-blue-200 p-5 flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold mb-6">Send Money</div>
          <div className="flex items-center">
            <div className="flex justify-center items-center rounded-full bg-green-600 w-12 h-12 text-white">
              {firstName[0]}
              {lastName[0]}
            </div>
            <div className="text-2xl font-semibold pl-3">
              {firstName} {lastName}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Amount (in Rs)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-4"
            placeholder="Enter amount"
          />
        </div>

        <button
          className="bg-green-600 text-white rounded-lg p-3 font-medium hover:bg-slate-400 hover:text-black focus:ring w-full"
          onClick={handleTransfer}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};
