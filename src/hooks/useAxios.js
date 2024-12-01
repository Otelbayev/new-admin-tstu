import { useState } from "react";
import axios from "axios";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = async (config) => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios(config);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(true);
      throw error;
    }
  };

  return {
    loading,
    error,
    sendRequest,
  };
};

export default useAxios;
