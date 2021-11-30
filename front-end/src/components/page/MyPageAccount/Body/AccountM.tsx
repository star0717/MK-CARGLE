import type {NextPage} from "next";
import { WholeWrapper, Wrapper, Text } from "../../../styles/CommonComponents";

const AccountM: NextPage = () => {
    return(
        <WholeWrapper>
            <Wrapper>
                <Text>
                    마이페이지 `{'>'}` 계정관리
                </Text>
                
            </Wrapper>
        </WholeWrapper>
    );
}