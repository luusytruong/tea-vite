import React from "react";
import { API_URL } from "~/context/AuthContext";

const useFetch = () => {
  const fetchPost = async (enpoint, formData) => {
    try {
      const response = await fetch(`${API_URL}${enpoint}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const fetchGet = async (enpoint) => {
    try {
      const response = await fetch(`${API_URL}${enpoint}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  return { fetchPost, fetchGet };
};

export default useFetch;
