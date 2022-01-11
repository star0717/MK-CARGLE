import { NextPage } from "next";
import Button from "@mui/material/Button";
import {
  CloseButton,
  RsWrapper,
  Text,
  SmallButton,
  TextInput2,
  WholeWrapper,
  Wrapper,
  Image,
  Combo,
  CommonTitleWrapper,
  CommonTitle,
  IconButton,
  CommonSmallTitle,
  CommonButtonWrapper,
  CommonButton,
} from "../src/components/styles/CommonComponents";
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
    <Wrapper>
      <Text fontSize={`100px`}>What The Fucking Tuesday</Text>
    </Wrapper>
  );
};

export default ByeolTest;
