import { NextPage } from "next";
import Button from "@mui/material/Button";
import { SmallButton } from "../src/components/styles/CommonComponents";
import { Alert, Checkbox } from "@mui/material";
import { pink } from "@mui/material/colors";
import useStyles from "../src/components/styles/MuiTheme";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

/**
 * 404 에러 페이지
 * @returns
 */
const ByeolTest: NextPage = () => {
  const classes = useStyles();

  return (
    <div>
      {/* <Button variant="contained" sx={{ background: "#000", width: "100px" }}>
        ddd
      </Button> */}
      <Button
        variant="contained"
        className={classes.hi}
        type="button"
        onClick={() => {
          alert(
            <Alert severity="success" color="warning">
              This is a success alert — check it out!
            </Alert>
          );
        }}
      >
        클래스
      </Button>
      <Button color="secondary">Secondary</Button>
      <Button variant="contained" color="success">
        hi
      </Button>
      <Button variant="outlined" color="error">
        hi
      </Button>
      {/* <Checkbox {...label} defaultChecked color="primary" /> */}
      <Checkbox {...label} defaultChecked color="primary" />
      {/* <Checkbox {...label} defaultChecked color="success" />
      <Checkbox {...label} defaultChecked color="default" />
      <Checkbox
        {...label}
        defaultChecked
        sx={{
          color: "primary.light",
          "&.Mui-checked": {
            color: pink[600],
          },
        }}
      /> */}
      <SmallButton kindOf={`default`}>hi</SmallButton>
    </div>
  );
};

export default ByeolTest;
