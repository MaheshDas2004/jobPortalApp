import { useState } from "react";
import axios from "axios";

const UseFetch = ({ url, method = "GET", headers = {} }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (body = null) => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        method,
        data: body,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      setData(response.data);
      return response.data;

    } catch (err) {
      // Handle different error formats
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        // Handle validation errors array
        const errorMessage = err.response.data.errors.map(error => error.msg).join(', ');
        setError(errorMessage);
      } else if (err.response?.data?.message) {
        // Handle single message errors
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
      return null;
    }

    finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};

export default UseFetch;
