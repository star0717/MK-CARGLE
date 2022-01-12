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
  Table,
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
    <Wrapper width={`100%`} bgColor={`skyblue`}>
      <Table>
        <thead>
          <tr>
            <th>ddd</th>
            <th>sss</th>
            <th>fff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>티디</td>
            <td>티디</td>
            <td>티디</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2</td>
            <td>2</td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>

          <tr>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default ByeolTest;
