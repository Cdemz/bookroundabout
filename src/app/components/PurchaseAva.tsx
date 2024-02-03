"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/api";

const PurchaseAva = () => {
  const [isPurchaseEnabled, setIsPurchaseEnabled] = useState(false);

  useEffect(() => {
    const fetchPurchaseAvailability = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const response = await axios.get(
          `${API_BASE_URL}/data?type=purchase_availability`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data && response.data.isBoolean) {
          setIsPurchaseEnabled(response.data.data === "true");
        }
      } catch (error) {
        console.error("Error fetching purchase availability:", error);
      }
    };

    fetchPurchaseAvailability();
  }, []);

  const handleToggleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPurchaseState = event.target.checked;

    setIsPurchaseEnabled(newPurchaseState);
    const token = localStorage.getItem("token");

    const payload = {
      data: newPurchaseState.toString(),
      type: "purchase_availability",
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(`${API_BASE_URL}/data`, payload, config);
      console.log("Purchase availability updated successfully");
    } catch (error) {
      console.error("Error updating purchase availability:", error);
      setIsPurchaseEnabled(!newPurchaseState);
    }
  };

  return (
    <div className="flex gap-3 text-black items-center text-center px-4 py-4">
      <p className="font-bold"> Users Purchase Ability:</p>
      <input
        type="checkbox"
        className="toggle-input"
        checked={isPurchaseEnabled}
        onChange={handleToggleChange}
      />
    </div>
  );
};

export default PurchaseAva;
