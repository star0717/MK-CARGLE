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
import {
  Alert,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import {
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "../src/components/styles/MuiTheme";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

/**
 * 404 에러 페이지
 * @returns
 */
const ByeolTest: NextPage = () => {
  const classes = useStyles();

  return (
    <Wrapper width={`100%`} bgColor={`skyblue`}>
      <TableContainer
        component={Paper}
        sx={{
          width: `90%`,
          maxHeight: 440,
        }}
      >
        <Table
          stickyHeader
          sx={{
            borderRadius: `4px 4px 0px 0px`,
            textAlign: `left`,
          }}
        >
          <TableHead>
            <StyledTableRow>
              <StyledTableCell width={`60%`}>aaa</StyledTableCell>
              <StyledTableCell width={`30%`}>bbb</StyledTableCell>
              <StyledTableCell width={`10%`}>ccc</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>111</StyledTableCell>
              <StyledTableCell>222</StyledTableCell>
              <StyledTableCell>333</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>ㅁㅁㅁ</StyledTableCell>
              <StyledTableCell>ㄴㄴㄴ</StyledTableCell>
              <StyledTableCell>ㅇㅇㅇ</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>a1</StyledTableCell>
              <StyledTableCell>s2</StyledTableCell>
              <StyledTableCell>d3</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>111</StyledTableCell>
              <StyledTableCell>222</StyledTableCell>
              <StyledTableCell>333</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>ㅁㅁㅁ</StyledTableCell>
              <StyledTableCell>ㄴㄴㄴ</StyledTableCell>
              <StyledTableCell>ㅇㅇㅇ</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>a1</StyledTableCell>
              <StyledTableCell>s2</StyledTableCell>
              <StyledTableCell>d3</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>111</StyledTableCell>
              <StyledTableCell>222</StyledTableCell>
              <StyledTableCell>333</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>ㅁㅁㅁ</StyledTableCell>
              <StyledTableCell>ㄴㄴㄴ</StyledTableCell>
              <StyledTableCell>ㅇㅇㅇ</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>a1</StyledTableCell>
              <StyledTableCell>s2</StyledTableCell>
              <StyledTableCell>d3</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default ByeolTest;
