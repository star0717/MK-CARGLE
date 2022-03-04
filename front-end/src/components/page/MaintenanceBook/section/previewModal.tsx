import React, { useRef, useState } from "react";
import { NextPage } from "next";
import {
  IconButton,
  SmallButton,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { _pPreviewModalProps } from "src/configure/_pProps.entity";
import EstimateFile from "../../FileHTML/estimateFile";
import StatementFile from "../../FileHTML/statementFile";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PreviewModal: NextPage<_pPreviewModalProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [docBool, setDocBool] = useState<boolean>(true);

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**pdf저장 */
  const onSavePdf = () => {
    html2canvas(document.getElementById("estimate")).then((canvas) => {
      let imgData = canvas.toDataURL("image/png");
      let margin = 10;
      let imgWidth = 210 - 10 * 2;
      let pageHeight = imgWidth * 1.414;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let doc = new jsPDF("p", "mm", "a4");
      let position = margin;

      doc.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 20) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save(`${props.propMtInfo.car.regNumber}_견적서.pdf`);
    });
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      {props.fileCheck.eCheck && props.fileCheck.sCheck && (
        <Wrapper>
          <Wrapper isFixed top={`370px`} left={`-520px`} zIndex={`9999`}>
            <IconButton
              type="button"
              shadow={`none`}
              width={`100px`}
              height={`100px`}
              fontSize={`100px`}
              padding={`0px`}
              color={`#314FA5`}
              onClick={() => {
                setDocBool(!docBool);
              }}
            >
              <AiOutlineCaretLeft />
            </IconButton>
          </Wrapper>
          {docBool ? <EstimateFile /> : <StatementFile />}
          <Wrapper isFixed top={`370px`} left={`520px`} zIndex={`9999`}>
            <IconButton
              type="button"
              shadow={`none`}
              width={`100px`}
              height={`100px`}
              fontSize={`100px`}
              padding={`0px`}
              color={`#314FA5`}
              onClick={() => {
                setDocBool(!docBool);
              }}
            >
              <AiOutlineCaretRight fontSize={`100`} />
            </IconButton>
          </Wrapper>
        </Wrapper>
      )}
      {props.fileCheck.eCheck && !props.fileCheck.sCheck && (
        <Wrapper>
          <EstimateFile />
        </Wrapper>
      )}
      {!props.fileCheck.eCheck && props.fileCheck.sCheck && (
        <Wrapper>
          <StatementFile />
        </Wrapper>
      )}
      <Wrapper dr={`row`} ju={`center`}>
        <SmallButton
          type="button"
          kindOf={`default`}
          margin={`0px 20px`}
          onClick={onSavePdf}
        >
          PDF저장
        </SmallButton>
        <SmallButton
          type="button"
          kindOf={`default`}
          margin={`0px 20px`}
          onClick={() => {
            props.setModal2Open(false);
          }}
        >
          닫기
        </SmallButton>
      </Wrapper>
    </WholeWrapper>
  );
};

export default PreviewModal;
