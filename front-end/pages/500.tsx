import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { BsEmojiDizzyFill } from "react-icons/bs";
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
 * 500 에러 페이지
 * @returns
 */
const Custom500: NextPage = () => {
  const router = useRouter();

  return (
    <WholeWrapper>
      {/* <Wrapper padding={`150px 0px 0px`}>
        <Wrapper width={`500px`} padding={`100px 0px 50px`}>
          <Image src="/images/500.png" alt="500 에러" />
        </Wrapper>
        <Wrapper>
          <Text
            fontSize={`24px`}
            fontWeight={`400`}
            color={`#314FA5`}
            padding={`0px 0px 10px`}
          >
            죄송합니다. 알 수 없는 오류가 발생하였습니다
          </Text>
          <Text fontSize={`18px`} padding={`0px 0px 10px`} fontWeight={`300`}>
            자세한 사항은 고객센터를 통해 문의해주시길 바랍니다.
          </Text>
          <Text fontSize={`18px`} fontWeight={`300`} padding={`0px 0px 10px`}>
            감사합니다.
          </Text>
          <Wrapper borderBottom={`1px solid #ccc`} width={`500px`}></Wrapper>
        </Wrapper>
        <Text fontSize={`24px`} fontWeight={`400`} padding={`10px 0px 0px`}>
          1644-3486
        </Text>
        <Text fontSize={`20px`} fontWeight={`300`} padding={`0px 0px 10px`}>
          평일:09:00~18:00
          <br />
          주말 및 공휴일 휴무
        </Text>
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
      </Wrapper> */}
      <RsWrapper>
        <Wrapper padding={`50px 50px 0px`} dr={`row`}>
          <Wrapper width={`auto`}>
            <Wrapper>
              <Text
                fontSize={`114px`}
                fontWeight={`800`}
                color={`#f0f0f0`}
                padding={`0px`}
              >
                <BsEmojiDizzyFill />
              </Text>
              <Text
                fontSize={`80px`}
                fontWeight={`800`}
                color={`#f0f0f0`}
                padding={`0px 0px 10px`}
                margin={`-30px 0px 0px`}
              >
                500 ERROR!
              </Text>
              <Text
                fontSize={`26px`}
                fontWeight={`600`}
                color={`#314FA5`}
                padding={`50px 0px 10px`}
                margin={`-120px 0px 0px`}
              >
                죄송합니다. <br />알 수 없는 오류가 발생하였습니다
              </Text>
              <Text
                fontSize={`18px`}
                padding={`0px 0px 10px`}
                fontWeight={`300`}
              >
                자세한 사항은 고객센터를 통해 문의해주시길 바랍니다.
              </Text>
              <Text
                fontSize={`18px`}
                fontWeight={`300`}
                padding={`0px 0px 10px`}
              >
                감사합니다.
              </Text>
              <Text
                fontSize={`24px`}
                fontWeight={`400`}
                padding={`10px 0px 0px`}
                color={`#314FA5`}
              >
                1644-3486
              </Text>
              <Text
                fontSize={`20px`}
                fontWeight={`300`}
                padding={`0px 0px 10px`}
              >
                평일:09:00~18:00
                <br />
                주말 및 공휴일 휴무
              </Text>
            </Wrapper>
            <Wrapper padding={`50px 0px 0px`}>
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
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default Custom500;
