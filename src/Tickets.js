import React from "react";

const Tickets = ({ tickets, loading }) => {
  if (loading) {
    return <h2> Loading .....</h2>;
  }
  return (
    <ul>
      {tickets.map((ticket) => (
        <li key={ticket.id} className="ticket">
            {ticket.raw_subject}
        </li>
      ))}
    </ul>
  );
};

export default Tickets;
