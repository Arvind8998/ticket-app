import React from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  cursor: "pointer",
  color: theme.palette.text.secondary,
}));

const Pagination = ({ ticketsPerPage, totalTickets, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTickets / ticketsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={0.5}
    >
      {pageNumbers.map((number, idx) => (
        <Item
          data-testid="pageNumberContainer"
          onClick={() => paginate(number)}
          key={"page" + idx}
        >
          {number}
        </Item>
      ))}
    </Stack>
  );
};

Pagination.propTypes = {
  ticketsPerPage: PropTypes.number.isRequired,
  totalTickets: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};
export default Pagination;
