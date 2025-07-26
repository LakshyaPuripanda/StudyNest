import React, { useEffect } from "react";
import axios from "axios";

const Check = () => {
  useEffect(() => {
    console.log("Check component mounted");
    axios.get("http://localhost:8080/api/v1/user/profile", { withCredentials: true })
      .then(response => {
        console.log("API response:", response.data);
      })
      .catch(error => {
        console.error("API error:", error);
      });
  }, []);

  return <h1>Check Component Loaded</h1>;
};

export default Check;