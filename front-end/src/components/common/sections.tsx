import { NextPage } from "next";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ThemeColors } from "../../../styles/Theme";
import { _pFindDocs } from "../../configure/_pProps.entity";
import { Pagenation, PagenationWrapper } from "../styles/CommonComponents";

export const PagenationSection: NextPage<_pFindDocs<any>> = (props) => {
  const pagenationBtn = () => {
    const result = [];

    const cPage = props.findResult.currentPage;
    var sPage: number, lPage: number;
    sPage =
      cPage % 10 == 0
        ? Math.round(cPage / 10) * 10 - 9
        : Math.floor(cPage / 10) * 10 + 1;

    lPage = sPage + 9;
    if (lPage > props.findResult.lastPage) lPage = props.findResult.lastPage;
    if (props.findResult) {
      for (let i = sPage; i <= lPage; i++) {
        result.push(
          <Pagenation
            key={i}
            theme={{
              basicTheme_C:
                cPage === i ? ThemeColors.white_C : ThemeColors.basicTheme_C,
              white_C:
                cPage === i ? ThemeColors.basicTheme_C : ThemeColors.white_C,
            }}
            border={
              cPage === i
                ? `1px solid ${ThemeColors.white_C}`
                : `1px solid ${ThemeColors.basicTheme_C}`
            }
            type="button"
            onClick={() => {
              if (props.findResult.currentPage != i) {
                props.findDocHandler(i);
              }
            }}
          >
            {i}
          </Pagenation>
        );
      }
      return result;
    }
  };

  return (
    <PagenationWrapper>
      <Pagenation
        type="button"
        onClick={() => {
          if (props.findResult.currentPage < 10) {
            props.findDocHandler(1);
          } else {
            props.findDocHandler(props.findResult.currentPage - 10);
          }
        }}
      >
        <BsChevronDoubleLeft />
      </Pagenation>
      <Pagenation
        type="button"
        onClick={() => {
          if (props.findResult.currentPage != 1) {
            props.findDocHandler(props.findResult.currentPage - 1);
          }
        }}
      >
        <IoIosArrowBack />
      </Pagenation>

      {pagenationBtn()}

      <Pagenation
        type="button"
        onClick={() => {
          if (props.findResult.currentPage != props.findResult.lastPage) {
            props.findDocHandler(props.findResult.currentPage + 1);
          }
        }}
      >
        <IoIosArrowForward />
      </Pagenation>
      <Pagenation
        type="button"
        onClick={() => {
          if (props.findResult.currentPage + 10 > props.findResult.lastPage) {
            props.findDocHandler(props.findResult.lastPage);
          } else {
            props.findDocHandler(props.findResult.currentPage + 10);
          }
        }}
      >
        <BsChevronDoubleRight />
      </Pagenation>
    </PagenationWrapper>
  );
};
