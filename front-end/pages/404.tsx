import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import {
  WholeWrapper,
  Wrapper,
  Text,
  Image,
  CommonButton,
  RsWrapper,
} from "../../../n2server/front-end/src/components/styles/CommonComponents";
import { UseLink } from "../src/configure/router.entity";

/**
 * 404 에러 페이지
 * @returns
 */
const Custom404: NextPage = () => {
  const router = useRouter();
  return (
    <WholeWrapper>
      <Wrapper padding={`150px 0px 0px`}>
        <Wrapper width={`500px`}>
          <Image src="/images/404.png" />
        </Wrapper>
        <Wrapper>
          <Text
            fontSize={`24px`}
            fontWeight={`400`}
            color={`#314FA5`}
            padding={`50px 0px 10px`}
          >
            죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.
          </Text>
          <Text fontSize={`18px`} padding={`0px 0px 10px`} fontWeight={`300`}>
            존재하지 않는 주소를 입력하셨거나,
            <br />
            요청하신 페이지의 주소가 변경 혹은 삭제되어 찾을 수 없습니다.
            <br />
            입력하신 주소가 정확한지 다시 확인해주시기 바랍니다.
          </Text>
          <Text fontSize={`18px`} fontWeight={`300`} padding={`0px 0px 10px`}>
            감사합니다.
          </Text>
        </Wrapper>
        <Wrapper padding={`10px 0px 0px`}>
          <CommonButton
            type="button"
            margin={`10px`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              router.back();
            }}
            kindOf={`white`}
          >
            이전페이지
          </CommonButton>
          <CommonButton
            type="button"
            margin={` 10px`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              router.push(UseLink.MAIN);
            }}
          >
            홈으로 돌아가기
          </CommonButton>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Custom404;
