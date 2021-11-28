import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function TicketModal({ handleClose, selectedTicket }) {
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {selectedTicket.subject}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ m: 0.4 }}>
            <Stack direction="row" spacing={3} mb={3}>
              <Item>
                <Typography gutterBottom variant="body1">
                  Status
                </Typography>
                <Chip
                  label={selectedTicket.status}
                  color={selectedTicket.status === "open" ? "primary" : "error"}
                />
              </Item>

              <Item>
                <Typography gutterBottom variant="body1">
                  Priority
                </Typography>
                <Chip
                  label={
                    selectedTicket.priority ? selectedTicket.priority : "N/A"
                  }
                  color={
                    selectedTicket.priority === "normal" ? "success" : "error"
                  }
                />
              </Item>
            </Stack>
          </Box>

          <Typography gutterBottom>{selectedTicket.description}</Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
