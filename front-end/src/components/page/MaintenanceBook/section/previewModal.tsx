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

const PreviewModal: NextPage<_pPreviewModalProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const estimateRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [docBool, setDocBool] = useState<boolean>(true);

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**pdf저장 */
  // const onSavePdf = async () => {
  // domtoimage
  //   .toPng(estimateRef.current)
  //   .then(function (dataUrl) {
  //     console.log(dataUrl);
  //     // var img = new Image();
  //     // img.src = dataUrl;
  //     // document.body.appendChild(img);
  //   })
  //   .catch(function (error) {
  //     console.error("oops, something went wrong!", error);
  //   });
  // html2canvas(document.getElementById("estimate")).then((canvas) => {
  //   document.getElementById("test").appendChild(canvas);
  //   // let imgData = canvas.toDataURL("image/jpeg", 1.0);
  //   // let imgWidth = 210;
  //   // let pageHeight = imgWidth * 1.414;
  //   // let imgHeight = (canvas.height * imgWidth) / canvas.width;
  //   // let heightLeft = imgHeight;
  //   // let doc = new jsPDF("p", "mm", "a4");
  //   // let position = 0;
  //   // doc.addImage(imgData, "jpeg", 0, position, imgWidth, imgHeight);
  //   // heightLeft -= pageHeight;
  //   // while (heightLeft >= 20) {
  //   //   position = heightLeft - imgHeight;
  //   //   doc.addPage();
  //   //   doc.addImage(imgData, "jpeg", 0, position, imgWidth, imgHeight);
  //   //   heightLeft -= pageHeight;
  //   // }
  //   // doc.save(
  //   //   `${props.propMtInfo.car.regNumber}_견적서_${dayjs(Date.now()).format(
  //   //     "YYYY-MM-DD"
  //   //   )}.pdf`
  //   // );
  // });
  // };

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
          {docBool ? (
            <EstimateFile {...props} ref={estimateRef} />
          ) : (
            <StatementFile {...props} ref={statementRef} />
          )}
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
          <EstimateFile {...props} ref={estimateRef} />
        </Wrapper>
      )}
      {!props.fileCheck.eCheck && props.fileCheck.sCheck && (
        <Wrapper>
          <StatementFile {...props} ref={statementRef} />
        </Wrapper>
      )}
      <Wrapper dr={`row`} ju={`center`}>
        {/* <SmallButton
          type="button"
          kindOf={`default`}
          margin={`0px 20px`}
          onClick={onSavePdf}
        >
          PDF저장
        </SmallButton> */}
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
