import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
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

export default useStyles;
