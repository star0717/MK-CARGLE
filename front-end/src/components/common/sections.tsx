import { NextPage } from "next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ThemeColors } from "../../../styles/Theme";
import { Pagenation, PagenationWrapper } from "../styles/CommonComponents";

export const PagenationSection: NextPage<any> = (props) => {
  const pagenationBtn = () => {
    const result = [];

    const cPage = props.findResult.currentPage;
    var sPage: number, lPage: number;
    sPage =
      cPage % 10 == 0
        ? Math.round(cPage / 10) * 10 - 9
        : Math.round(cPage / 10) * 10 + 1;

    lPage = sPage + 9;
    if (lPage > props.findResult.lastPage) lPage = props.findResult.lastPage;

    if (props.findResult) {
      for (
        let i = Math.ceil(props.findResult.currentPage / 10);
        i <= lPage;
        i++
      ) {
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
            onClick={() => props.findWorksHandler(i)}
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
      <Pagenation>
        <IoIosArrowBack />
      </Pagenation>
      {pagenationBtn()}
      <Pagenation>
        <IoIosArrowForward />
      </Pagenation>
    </PagenationWrapper>
  );
};
