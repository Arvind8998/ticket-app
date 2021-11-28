import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Testing", () => {
  test("should render count of total number of pages", () => {
    render(
      <Pagination ticketsPerPage={25} totalTickets={51} paginate={() => {}} />
    );
    const pageNumberContainer = screen.getAllByTestId("pageNumberContainer");
    expect(pageNumberContainer.length).toBe(3);
  });
});
