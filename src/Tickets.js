import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import TicketModal from "./TicketModal";
import CircularProgress from "@mui/material/CircularProgress";

const headCells = [
  {
    id: "Subject",
    label: "Subject",
  },
  {
    id: "Description",
    label: "Description",
  },
  {
    id: "Created On",
    label: "Created On",
  },
  {
    id: "Status",
    label: "Status",
  },
  {
    id: "Open to Public",
    label: "Open to Public",
  },
  {
    id: "Priority",
    label: "Priority",
  },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={"left"} padding={"normal"}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  tickets: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default function Tickets({ tickets, loading, totalTickets }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [isTicketDialogOpen, setTicketDialogState] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  if (loading) {
    return <CircularProgress color="success" />;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (row) => {
    setSelectedTicket(row);
    setTicketDialogState(true);
  };

  const handleClose = () => {
    setTicketDialogState(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tickets.length) : 0;

  return (
    <>
      <Box sx={{ width: "97%", ml: 2.5 }}>
        <Typography variant="subtitle1" mt={3} mb={2}>
          Total Tickets: {totalTickets}
        </Typography>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead rowCount={tickets.length} />
              <TableBody>
                {tickets
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleRowClick(row)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="normal"
                        >
                          {row.subject}
                        </TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="left">
                          {new Date(row.created_at).toDateString()}
                        </TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                        <TableCell align="left">
                          {row.is_public ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="left">{row.priority}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tickets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      {isTicketDialogOpen && (
        <TicketModal
          open={isTicketDialogOpen}
          handleClose={handleClose}
          selectedTicket={selectedTicket}
        />
      )}
    </>
  );
}
