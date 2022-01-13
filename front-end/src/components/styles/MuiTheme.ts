import { TableCell, tableCellClasses, TableRow } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";

export const useStyles = makeStyles({
  hi: {
    width: "200px",
    backgroundColor: "#314FA5",
    border: "1px",
    borderRadius: "3px",
  },

  IOSSwitch: {
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#314FA5",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: "#ddd",
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: "0.7",
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#c4c4c4",
      opacity: 1,
      transition: "0.2s",
    },
  },
});

export const StyledTableCell = styled(TableCell)(({ props }) => ({
  [`&.${tableCellClasses.head}`]: {
    width: (props) => props.width,
    height: (props) => props.height || `45px`,
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: 600,
    cursor: "default",
  },
  [`&.${tableCellClasses.body}`]: {
    width: (props) => props.width,
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)((props) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "gray",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "pink",
    cursor: "pointer",
  },
}));
