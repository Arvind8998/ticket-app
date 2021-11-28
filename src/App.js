import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "./Axios/Axios";
import Pagination from "./Pagination/Pagination";
import Tickets from "./Tickets/Tickets";

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ticketsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  //Get current Page Tickets
  const lastTicketIndex = currentPage * ticketsPerPage;
  const firstTicketIndex = lastTicketIndex - ticketsPerPage;
  const currentTickets = tickets.slice(firstTicketIndex, lastTicketIndex);

  const paginate = (page) => setCurrentPage(page);

  useEffect(() => {
    const getTickets = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/get-tickets");
        if (response?.status === 200) {
          setTickets(response.data);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        console.log(e.message);
      }
    };
    getTickets();
  }, []);

  return (
    <div className="App">
      <Tickets
        tickets={currentTickets}
        totalTickets={tickets.length}
        loading={loading}
      />
      <Pagination
        ticketsPerPage={ticketsPerPage}
        totalTickets={tickets.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
