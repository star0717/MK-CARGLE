import styled from "styled-components";
import { appearAnimation } from "./AnimationCommon";

// -----------PageWrapper----------- //

export const PageWrapper = styled.div<any>`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: ${(props) => props.dr || `column`};
`;

// -----------Head----------- //

export const HeaderWrapper = styled.div<any>`
  width: ${(props) => props.width || `100%`};
  color: ${(props) => props.color};
  display: flex;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.theme.black_C};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `flex-start`};
  background-image: ${(props) => props.bgImg};
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  box-shadow: ${(props) => props.shadow};
  z-index: ${(props) => props.index};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isFixed ? `fixed` : ``)};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding || `0px`};
  animation: ${appearAnimation} 1s forwards;
  overflow-x: hidden;
  box-shadow: ${(props) => props.shadow};
`;

export const HeaderHover = styled.div<any>`
  display: none;
  transition: 0.5s;
  flex-direction: ${(props) => props.dr};
  box-shadow: ${(props) => props.shadow};
  position: absolute;
  flex-direction: ${(props) => props.dr};
`;

export const HeaderFixed = styled.div<any>`
  width: ${(props) => props.width || ``};
  height: 80px;
  display: flex;
  align-items: center;

  &:hover ${HeaderHover} {
    display: ${(props) => props.display || `block`};
    top: 55px;
    left: 0;
    width: 100%;
    animation: ${appearAnimation} 0.5s forwards;
    padding: 20px 0px;
    background-color: #fafafa;
    height: 150px;
    position: absolute;
    transition: 0.5s;
    flex-direction: ${(props) => props.dr};
  }
`;

export const HeaderText = styled.p<any>`
  overflow: ${(props) => props.overflow};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.dr};
  align-items: ${(props) => props.al};
  justify-content: ${(props) => props.ju};
  font-size: ${(props) => props.fontSize || `16px`};
  font-weight: ${(props) => props.fontWeight || `500`};
  line-height: ${(props) => props.lineHeight || `1.6`};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin || `0px`};
  padding: ${(props) => props.padding || `20px 0px`};
  background: ${(props) => props.bgColor};
  text-align: ${(props) => props.textAlign || `center`};
  transition: 0.5s;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  font-style: ${(props) => props.fontStyle};
  cursor: ${(props) => props.cursor};
  z-index: 1;
  white-space: pre-wrap;
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};

  & span {
    font-weight: 700;
  }

  &:hover {
    text-decoration: ${(props) => props.decoration};
    color: #314fa5;
  }
`;

export const HeaderIconButton = styled.button<any>`
  width: ${(props) => props.width || `34px`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `34px`};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin || `0px`};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize || `28px`};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `flex-end`};
  justify-content: ${(props) => props.ju || `center`};
  background-color: ${(props) => props.bgColor || `#fff`};
  color: ${(props) => props.color || props.basicTheme_C};
  cursor: pointer;
  border: ${(props) => props.border || `none`};
  border-radius: ${(props) => props.radius || props.theme.radius};
  box-shadow: ${(props) => props.shadow || props.theme.boxShadow};

  &:hover {
    color: #314fa5;
    border: 1px solid #314fa5;
  }
`;

export const HeaderIconAlarmWrapper = styled.div<any>`
  position: absolute;
  z-index: 9998;
  top: 50px;
  left: -230px;
`;

export const HeaderIconAlarm = styled.div<any>`
  width: ${(props) => props.width || `300px`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `100px`};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin || `0px`};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize || `16px`};
  display: flex;
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  background-color: ${(props) => props.bgColor || `#fff`};
  color: ${(props) => props.color || props.basicTheme_C};
  cursor: pointer;
  border: ${(props) => props.border || `1px solid #314FA5`};
  border-radius: ${(props) => props.radius || props.theme.radius};
  box-shadow: ${(props) => props.shadow || props.theme.boxShadow};
  padding: 0px 20px;
  margin: 5px 0px;
  opacity: 0.8;

  ${(props) => props.kindOf === `confirm` && `background-color : #f5f5f5;`}
  ${(props) => props.kindOf === `confirm` && `color : #9d9d9d;`}
  ${(props) => props.kindOf === `confirm` && `border : 1px solid #9d9d9d;`}

  &:hover {
  }
`;

// -----------Body----------- //

export const BodyWrapper = styled.div<any>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.padding || `80px 0px 150px`};

  ${(props) =>
    props.kindOf === `NoneTitleBodyWrapper` && `justify-content:center`}
`;

// -----------Footer----------- //

export const FooterWrapper = styled.div<any>`
  width: 100%;
  height: 150px;
  position: absolute;
  bottom: 0;
  left: 0;
`;
