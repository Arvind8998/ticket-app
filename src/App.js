import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "./Axios";
import Tickets from "./Tickets";
import Pagination from "./Pagination";

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ticketsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  //Get current Page Tickets
  const lastTicketIndex = currentPage * ticketsPerPage;
  const firstTicketIndex = lastTicketIndex - ticketsPerPage;
  const currentTickets = tickets.slice(firstTicketIndex, lastTicketIndex);

  const paginate = (page) => setCurrentPage(page);

  useEffect(() => {
    const getTickets = async () => {
      setLoading(true);
      const response = await axios.get("/get-tickets");
      if (response.status === 200) {
        setTickets(response?.data);
        setLoading(false);
      } else {
        console.log("Error in fetching tickets");
      }
    };
    getTickets();
  }, []);

  return (
    <div className="App">
      <Tickets tickets={currentTickets} loading={loading} />
      <Pagination
        ticketsPerPage={ticketsPerPage}
        totalTickets={tickets.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
