import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useResizeDetector } from "react-resize-detector";
import { WholeWrapper } from "../../../styles/CommonComponents";

const AdminReviewCompaniesModal: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  console.log(props);

  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return <WholeWrapper ref={ref}></WholeWrapper>;
};

export default AdminReviewCompaniesModal;
