import React from "react";
import { useContext } from "react";
import { userContext } from "../../context/context";

function Dashboard() {
  const { userRole } = useContext(userContext);
  return (
    <div>
      <h1>My role is {userRole}</h1>
    </div>
  );
}

export default Dashboard;
