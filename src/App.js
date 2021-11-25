import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "./Axios";

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      const tickets = axios.get("/get-tickets");
      setTickets(tickets);
      console.log("Tickets are ======>", tickets);
    };
    getTickets();
  }, []);

  return (
    <div className="App">
      <h1>Hi There</h1>
    </div>
  );
}

export default App;
