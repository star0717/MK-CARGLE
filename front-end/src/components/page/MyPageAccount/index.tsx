import type {NextPage} from "next";
import { TextInput, WholeWrapper, Wrapper, Text } from "../../styles/CommonComponents";

const MyPageAccount: NextPage = () => {
    return (
       <WholeWrapper>
           <Wrapper>
               <Text>
                   계정 관리를 위해 비밀번호를 입력해주세요.
               </Text>
               
               <TextInput
               placeholder = "비밀번호를 입력하세요."
               />

               <button
               type = "submit" 
               >
               확인
               </button>
           </Wrapper>
       </WholeWrapper>
    );
}

export default MyPageAccount;