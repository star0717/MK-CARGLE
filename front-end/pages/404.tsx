import {
  WholeWrapper,
  Wrapper,
  TextInput,
  Text,
  SmallButton,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  TableBody,
  TableBodyLIST,
  CommonForm,
  SearchInput,
  SearchInputWrapper,
  Pagenation,
  PagenationWrapper,
  PagenationBtn,
  Image,
  CommonButton,
} from "../../../n2server/front-end/src/components/styles/CommonComponents";

export default function Custom404() {
  return (
    <WholeWrapper>
      <Wrapper width={`500px`} padding={`200px 0px 50px`}>
        <Image src="/images/404.png" />
      </Wrapper>
      <Wrapper>
        <Text
          fontSize={`28px`}
          fontWeight={`300`}
          color={`#0066ff`}
          padding={`0px 0px 10px`}
        >
          죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.
        </Text>
        <Text
          fontSize={`20px`}
          padding={`0px 0px 10px`}
          fontWeight={`300`}
        >
          존재하지 않는 주소를 입력하셨거나,<br />
          요청하신 페이지의 주소가 변경 혹은 삭제되어 찾을 수 없습니다.<br />
          입력하신 주소가 정확한지 다시 확인해주시기 바랍니다.
        </Text>
        <Text
          fontSize={`20px`}
          fontWeight={`300`}
          padding={`0px 0px 10px`}
        >
          감사합니다.
        </Text>
      </Wrapper>
      <Wrapper padding={`10px 0px 0px`} dr={`row`}>
        <CommonButton margin={`0px 10px 0px`}>
          이전페이지
        </CommonButton>
        <CommonButton margin={`0px 10px 0px`}>
          홈으로 돌아가기
        </CommonButton>
      </Wrapper>
    </WholeWrapper >
  )
}