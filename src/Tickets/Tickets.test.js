import Tickets from "./Tickets";
import { render, screen } from "@testing-library/react";

test("should render count of total tickets as 51", () => {
  render(<Tickets totalTickets={51} loading={false} />);
  const totalTciketsElement = screen.getByTestId("totalTicketCount");
  expect(totalTciketsElement.textContent).toBe("Total Tickets: 51");
});

test("should render count of total ticket as 1", () => {
  render(<Tickets totalTickets={1} loading={false} />);
  const totalTciketsElement = screen.getByTestId("totalTicketCount");
  expect(totalTciketsElement.textContent).toBe("Total Ticket: 1");
});
