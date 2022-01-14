import styled from "styled-components";
import { appearAnimation } from "./AnimationCommon";

interface Propsinterface {
  width: Number;
}

/** Wrapper */

export const WholeWrapper = styled.div<any>`
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height || `auto`};
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
  margin: ${(props) => props.margin || `0px`};
  padding: ${(props) => props.padding || `0px`};
  animation: ${appearAnimation} 1s forwards;
  min-height: ${(props) => props.minHeight || ``};
  min-width: ${(props) => props.minWidth || ``};
  box-shadow: ${(props) => props.shadow};
`;

export const RsWrapper = styled.div<any>`
  width: 1200px;
  height: ${(props) => props.height || `100%`};
  min-height: ${(props) => props.minHeight || `100%`};
  color: ${(props) => props.color};
  display: flex;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => props.wrap || `wrap`};
  backdrop-filter: ${(props) => props.filter};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding || ``};
  border-bottom: ${(props) => props.borderBottom};
  border: ${(props) => props.border};
  font-size: ${(props) => props.fontSize};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
}

${(props) => props.kindOf === `RsWrapper2` && `padding:120px 0px 120px`}

`;

// export const CommonTitleWrapper = styled.div<any>`
//   width: ${(props) => props.width || `100%`};
//   display: ${(props) => props.display || `flex`};
//   flex-direction: ${(props) => props.dr || `column`};
//   position: ${(props) => (props.isAbsolute ? `absolute` : `relatuve`)};
//   top: 80px;
//   margin: ${(props) => props.margin || `0px 0px 80px`};
//   margintop: ${(props) => props.marginTop};
//   padding: ${(props) => props.padding || `50px 0px 30px`};
//   padding-bottom: ${(props) => props.paddingBottom};
//   font-size: 34px;
//   font-weight: 800;
//   color: ${(props) => props.color};
//   text-align: ${(props) => props.textAlign || `center`};
//   background-color: #292929;
// `;

// @media (max-width: 1500px) {
//   width: 1350px;
// }
// @media (max-width: 1350px) {
//   width: 1280px;
// }
// @media (max-width: 1350px) {
//   width: 1100px;
// }
// @media (max-width: 1100px) {
//   width: 900px;
// }
// @media (max-width: 900px) {
//   width: 800px;
// }
// @media (max-width: 800px) {
//   width: 700px;
// }
// @media (max-width: 700px) {
//   width: 100%;
//   padding-left: 10px;
//   padding-right: 10px;
// }

export const Wrapper = styled.div<any>`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  display: ${(props) => props.display || `flex`};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => props.wrap || `no-wrap`};
  background: ${(props) => props.white_C};
  color: ${(props) => props.color};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isFixed ? `fixed` : ``)};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  z-index: ${(props) => props.zIndex};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom};
  border-top: ${(props) => props.borderTop};
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
  border-radius: ${(props) => props.radius};
  box-shadow: ${(props) => props.shadow};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  overflow: ${(props) => (props.isOverflow ? `auto` : props.overflow || ``)};
  background-image: ${(props) => props.bgImg};
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: ${(props) => props.attachment || `fixed`};
  background-position: center;
  background-color: ${(props) => props.bgColor};
  transition: 0.5s;
  cursor: ${(props) => props.cursor};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.textAlign};
  animation: ${appearAnimation} 1s forwards;

  &.active div {
    color: ${(props) => props.theme.black_C};
    font-weight: 700;
    text-decoration: underline;
  }

  & .react-reveal {
    width: inherit;
    z-index: 1;
  }

  & pre {
    white-space: pre-wrap;
    line-height: 1.4;
    color: #6f6f6f;
    font-size: 14px;
  }

  &.faqBoard:last-child {
    border-bottom: 1px solid #3c3c3c;
  }

  &:hover {
    font-weight: ${(props) => (props.isHeaderHover ? `800` : ``)};
  }

  @media (max-width: 700px) {
    font-size: 14px;

    & svg {
      font-size: 20px;
    }
  }
`;

export const CommonForm = styled.form<any>`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  display: ${(props) => props.display || `flex`};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => props.wrap || `wrap`};
  background: ${(props) => props.white_C};
  color: ${(props) => props.color};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  z-index: ${(props) => props.zIndex};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom};
  border-top: ${(props) => props.borderTop};
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
  border-radius: ${(props) => props.radius};
  box-shadow: ${(props) => props.shadow};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  overflow: ${(props) => (props.isOverflow ? `auto` : props.overflow || ``)};
  background-image: ${(props) => props.bgImg};
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: ${(props) => props.attachment || `fixed`};
  background-position: center;
  background-color: ${(props) => props.bgColor};

  transition: 0.5s;
  cursor: ${(props) => props.cursor};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.textAlign};
  animation: ${appearAnimation} 1s forwards;

  &.active div {
    color: ${(props) => props.theme.black_C};
    font-weight: 700;
    text-decoration: underline;
  }

  & .react-reveal {
    width: inherit;
    z-index: 1;
  }

  & pre {
    white-space: pre-wrap;
    line-height: 1.4;
    color: #6f6f6f;
    font-size: 14px;
  }

  &.faqBoard:last-child {
    border-bottom: 1px solid #3c3c3c;
  }

  &:hover {
    font-weight: ${(props) => (props.isHeaderHover ? `800` : ``)};
  }

  @media (max-width: 700px) {
    font-size: 14px;

    & svg {
      font-size: 20px;
    }
  }
`;

/**text */

export const CommonTitleWrapper = styled.div<any>`
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height || `150px`};
  display: ${(props) => props.display || `flex`};
  flex-direction: ${(props) => props.dr || `column`};
  margin: ${(props) => props.margin || `0px`};
  font-size: 34px;
  font-weight: 800;
  color: ${(props) => props.color};
  text-align: ${(props) => props.textAlign || `center`};
  background-color: #eee;
`;

export const CommonTitle = styled.h2<any>`
  width: ${(props) => props.width};
  display: ${(props) => props.display};
  margin: ${(props) => props.margin || `0px`};
  padding: ${(props) => props.padding || ` 0px 0px`};
  font-size: 34px;
  font-weight: 800;
  color: ${(props) => props.color || `#343a40`};
  text-align: ${(props) => props.textAlign || `center`};
  @media (max-width: 1439px) {
    font-size: 32px;
  }
  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

export const CommonSubTitle = styled.h2<any>`
  width: ${(props) => props.width};
  display: ${(props) => props.display};
  position: relative;
  margin: ${(props) => props.margin || `0px`};
  font-size: 22px;
  color: ${(props) => props.color || `#343a40`};
  font-weight: ${(props) => props.fontWeight || `400`};
  text-align: ${(props) => props.textAlign || `center`};
`;

export const CommonSmallTitle = styled.h2<any>`
  width: ${(props) => props.width};
  position: relative;
  margin: 30px 0px;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.color};

  &:before {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 50%;
    margin-left: -20px;
    width: 30px;
    height: 100%;
    border-bottom: 6px solid ${(props) => props.theme.basicTheme_C};
  }
`;

export const Text = styled.p<any>`
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
  padding: ${(props) => props.padding};
  background: ${(props) => props.bgColor};
  text-align: ${(props) => props.textAlign || `center`};
  transition: 0.5s;
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
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
  letter-spacing: ${(props) => props.letterSpacing || `0px`};

  & svg {
    color: ${(props) => props.color};
    margin-top: ${(props) => props.marginTop || `4px`};
    margin-bottom: ${(props) => props.marginBottom};
    margin-right: ${(props) => props.marginRight};
    font-size: ${(props) => props.fontSize || `18px`};
  }

  & span {
    font-weight: 700;
    margin-top: 4px;
  }

  &:hover {
    text-decoration: ${(props) => props.decoration};
  }
`;

/**button */

export const CommonButtonWrapper = styled.div<any>`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin || ``};
  padding: ${(props) => props.padding || `40px 0px 0px`};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `space-between`};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  cursor: pointer;
  border: none;

  ${(props) => props.kindOf === `column` && `flex-direction : column;`}
  ${(props) => props.kindOf === `column` && `padding : 40px 0px 0px;`}
`;

export const CommonButton = styled.button<any>`
  width: ${(props) => props.width || `500px`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `60px`};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin || `4px`};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.radius || `4px`};
  font-size: ${(props) => props.fontSize || `18px`};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  cursor: ${(props) => props.cursor || `pointer`};
  color: #fff;
  border: 0px;

  ${(props) => !props.kindOf && `background : ${props.theme.basicTheme_C};`}
  ${(props) =>
    props.kindOf === `white` && `background : ${props.theme.white_C};`}
  ${(props) =>
    props.kindOf === `white` && `color : ${props.theme.basicTheme_C};`}
      ${(props) =>
    props.kindOf === `white` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}

    ${(props) =>
    props.kindOf === `circleWhite` && `background : ${props.theme.white_C};`}
    ${(props) =>
    props.kindOf === `circleWhite` && `color : ${props.theme.basicTheme_C};`}
        ${(props) =>
    props.kindOf === `circleWhite` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}
      ${(props) => props.kindOf === `circleWhite` && `border-radius : 100px;`}

      ${(props) =>
    props.kindOf === `circleTheme` &&
    `background : ${props.theme.basicTheme_C};`}
        ${(props) =>
    props.kindOf === `circleTheme` && `color : ${props.theme.white_C};`}
            ${(props) =>
    props.kindOf === `circleTheme` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}
          ${(props) =>
    props.kindOf === `circleTheme` && `border-radius : 100px;`}


     ${(props) =>
    props.kindOf === `black` && `background : ${props.theme.darkGrey_C};`}
  ${(props) => props.kindOf === `black` && `color : ${props.theme.white_C};`}
  
    ${(props) =>
    props.kindOf === `subTheme` && `background : ${props.theme.white_C};`}
  ${(props) => props.kindOf === `subTheme` && `color : ${props.theme.black_C};`}

  
    ${(props) =>
    props.kindOf === `grey` && `background : ${props.theme.white_C};`}
  ${(props) => props.kindOf === `grey` && `color : ${props.theme.grey_C};`}
      ${(props) =>
    props.kindOf === `grey` && `border : 1px solid ${props.theme.grey_C};`}
  
      ${(props) =>
    props.kindOf === `default` && `background : ${props.theme.grey_C};`}
    ${(props) => props.kindOf === `naver` && `border : 1px solid #1CC020;`}
      ${(props) =>
    props.kindOf === `naver` && `color : ${props.theme.black_C};`}
         ${(props) =>
    props.kindOf === `naver` && `background : ${props.theme.white_C};`}
      

  & svg {
    font-size: 25px;
  }

  &:hover {
    background: #fff;
    color: ${(props) => props.theme.white_C};
    box-shadow: ${(props) => props.theme.boxShadow};
    ${(props) => !props.kindOf && `background ${props.theme.darkTheme_C};`}
    ${(props) =>
      props.kindOf === `white` && `background ${props.theme.darkTheme_C};`}
         ${(props) =>
      props.kindOf === `white` && `color ${props.theme.white_C};`}

${(props) => props.kindOf === `black` && `background : ${props.theme.white_C};`}
  ${(props) => props.kindOf === `black` && `color : ${props.theme.black_C};`}
  ${(props) =>
      props.kindOf === `black` &&
      `border : 1px solid ${props.theme.darkGrey_C};`}

        ${(props) =>
      props.kindOf === `subTheme` && `color ${props.theme.white_C};`}
      
      ${(props) => props.kindOf === `grey` && `color ${props.theme.white_C};`}
          ${(props) =>
      props.kindOf === `grey` && `background ${props.theme.grey_C};`}


${(props) => props.kindOf === `naver` && `background : #1CC020;`}
        ${(props) =>
      props.kindOf === `naver` && `color : ${props.theme.white_C};`}
        ${(props) => props.kindOf === `naver` && `border : none;`}

        ${(props) =>
      props.kindOf === `circleWhite` &&
      `background : ${props.theme.darkTheme_C};`}
          ${(props) =>
      props.kindOf === `circleWhite` && `color : ${props.theme.white_C};`}
            ${(props) =>
      props.kindOf === `circleWhite` && `border-radius : 100px;`}

      ${(props) =>
      props.kindOf === `circleTheme` &&
      `background : ${props.theme.darkTheme_C};`}
            ${(props) =>
      props.kindOf === `circleTheme` && `color : ${props.theme.white_C};`}
              ${(props) =>
      props.kindOf === `circleTheme` && `border-radius : 100px;`}
  }

  // @media (max-width: 1439px) {
  //   font-size: 18px;
  //   width: 400px;
  // }

  // @media (max-width: 500px) {
  //   font-size: 18px;
  //   width: 300px;
  // }
`;

export const SmallButton = styled.button<any>`
  width: ${(props) => props.width || `80px`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `40px`};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
  color: #fff;
  cursor: pointer;

  ${(props) =>
    props.kindOf === `default` && `background ${props.theme.subWhite_C};`}
  ${(props) =>
    props.kindOf === `default` && `color ${props.theme.basicTheme_C};`}
  ${(props) =>
    props.kindOf === `default` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}

    ${(props) =>
    props.kindOf === `cancle` && `background ${props.theme.subWhite_C};`}
    ${(props) => props.kindOf === `cancle` && `color ${props.theme.red_C};`}
    ${(props) =>
    props.kindOf === `cancle` && `border : 1px solid ${props.theme.red_C};`}
  

  ${(props) => props.kindOf === `ghost` && `background ${props.theme.grey_C};`}
  ${(props) => props.kindOf === `ghost` && `color ${props.theme.white_C};`}
  ${(props) => props.kindOf === `ghost` && `cursor : default;`}
  ${(props) => props.kindOf === `ghost` && `border : none;`}
  

  & svg {
    font-size: 25px;
    color: #fff;
  }

  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow};
    ${(props) =>
      props.kindOf === `default` && `background ${props.theme.basicTheme_C};`}
    ${(props) => props.kindOf === `default` && `color ${props.theme.white_C};`}

    ${(props) =>
      props.kindOf === `cancle` && `background ${props.theme.red_C};`}
    ${(props) => props.kindOf === `cancle` && `color ${props.theme.white_C};`}
  }
`;

export const FocusButton = styled.button<any>`
  width: ${(props) => props.width || `80px`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `40px`};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
  color: #fff;
  cursor: pointer;

  ${(props) =>
    props.kindOf === `default` && `background ${props.theme.subWhite_C};`}
  ${(props) =>
    props.kindOf === `default` && `color ${props.theme.basicTheme_C};`}
  ${(props) =>
    props.kindOf === `default` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}
    
    ${(props) =>
    props.kindOf === `true` && `background ${props.theme.basicTheme_C};`}
    ${(props) => props.kindOf === `true` && `color ${props.theme.white_C};`}
    ${(props) =>
    props.kindOf === `true` && `border : 1px solid ${props.theme.white_C};`}
`;

export const LabelButton = styled.label<any>`
  width: ${(props) => props.width || `80px`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `40px`};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
  color: #fff;
  cursor: pointer;

  ${(props) =>
    props.kindOf === `default` && `background ${props.theme.subWhite_C};`}
  ${(props) =>
    props.kindOf === `default` && `color ${props.theme.basicTheme_C};`}
  ${(props) =>
    props.kindOf === `default` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}
  

  ${(props) => props.kindOf === `ghost` && `background ${props.theme.grey_C};`}
  ${(props) => props.kindOf === `ghost` && `color ${props.theme.white_C};`}
  ${(props) => props.kindOf === `ghost` && `cursor : default;`}
  ${(props) => props.kindOf === `ghost` && `border : none;`}
  

  & svg {
    font-size: 25px;
    color: #fff;
  }

  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow};
    ${(props) =>
      props.kindOf === `default` && `background ${props.theme.basicTheme_C};`}
    ${(props) => props.kindOf === `default` && `color ${props.theme.white_C};`}
  }
`;

export const CloseButton = styled.button<any>`
  width: ${(props) => props.width || `auto`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `auto`};
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
  color: ${(props) => props.color || props.black_C};
  cursor: pointer;
  border: none;

  & svg {
    color: ${(props) => props.color || props.black_C};
    font-size: 28px;
  }
`;

export const IconButton = styled.button<any>`
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

  & svg {
    color: ${(props) => props.color || props.basicTheme_C};
    font-size: 28px;
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
  z-index: 9999;
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

/** Input */

export const TextInput = styled.input<any>`
  width: ${(props) => props.width || `378px`};
  height: ${(props) => props.height || `60px`};
  border: 1px solid ${(props) => props.theme.grey_C};
  border-radius: ${(props) => props.theme.radius};
  background-color: ${(props) => props.bgColor};
  padding: ${(props) => props.padding || props.theme.inputPadding};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
  font-size: 16px;
  position: relative;
  letter-spacing: 0px;
  &:focus {
    outline: none;
    box-shadow: ${(props) => props.theme.boxShadow};
  }

  @media (max-width: 500px) {
    height: 40px;
  }
`;

export const TextInput2 = styled.input<any>`
  width: ${(props) => props.width};
  height: ${(props) => props.height || `40px`};
  border: ${(props) => props.theme.border};
  padding: ${(props) => props.padding || props.theme.inputPadding};
  border-radius: ${(props) => props.theme.radius};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bgColor};
  font-size: 16px;

  width: ${(props) => props.width};
  height: ${(props) => props.height || `40px`};
  border: ${(props) => props.theme.border};
  padding: ${(props) => props.padding || props.theme.inputPadding};
  border-radius: ${(props) => props.theme.radius};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bgColor};

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.basicTheme_C};
  }

  &:read-only:focus {
    box-shadow: none;
    border: ${(props) => props.theme.border};
  }

  &:read-only {
    box-shadow: none;
    border: ${(props) => props.theme.border};
    background-color: #f5f5f5;
    cursor: default;
  }
`;

export const SearchInputWrapper = styled.div<any>`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  display: ${(props) => props.display || `flex`};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => props.wrap || `no-wrap`};
  background: ${(props) => props.white_C};
  color: ${(props) => props.color};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isFixed ? `fixed` : ``)};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  z-index: ${(props) => props.zIndex};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom || `1px solid #000`};
  border-top: ${(props) => props.borderTop};
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
  border-radius: ${(props) => props.radius};
  box-shadow: ${(props) => props.shadow};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  overflow: ${(props) => (props.isOverflow ? `auto` : props.overflow || ``)};
  background-image: ${(props) => props.bgImg};
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: ${(props) => props.attachment || `fixed`};
  background-position: center;
  background-color: ${(props) => props.bgColor};
  transition: 0.5s;
  cursor: ${(props) => props.cursor};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.textAlign};
  animation: ${appearAnimation} 1s forwards;

  &:focus {
    border-bottom: 1px solid #0066ff;
  }
`;

export const SearchInput = styled.input<any>`
  width: ${(props) => props.width || `378px`};
  height: ${(props) => props.height || `46px`};
  border: none;
  background-color: ${(props) => props.bgColor};
  padding: ${(props) => props.padding || props.theme.inputPadding};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
  font-size: 18px;
  position: relative;
  outline: none;
  display: flex;

  &:focus {
    outline: none;
  }

  & svg {
    font-size: ${(props) => props.fontSize || `15px`};
    cursor: pointer;
    text-align: center;
    width: 30px;
    height: 30px;
    padding: 4px;
    position: absolute;
    right: 0;
    top: 0;
  }

  @media (max-width: 500px) {
    height: 40px;
  }
`;

export const SearchButton = styled.button<any>`
  width: ${(props) => props.width || `80px`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `40px`};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin || `0px`};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize || `22px`};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  cursor: pointer;
  border: none;
  background-color: #fff;
`;

export const Combo = styled.select<any>`
  width: ${(props) => props.width};
  height: ${(props) => props.height || `40px`};
  border: ${(props) => props.border || props.theme.border};
  padding: 0px 8px;
  color: ${(props) => props.color};
  border-radius: ${(props) => props.theme.radius};
  margin: ${(props) => props.margin || `0px 5px`};
  font-size: 16px;

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.basicTheme_C};
  }
`;

export const Label = styled.label<any>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.fontSize || `16px`};
  font-weight: ${(props) => props.fontWeight || `600`};
  cursor: pointer;
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
`;

export const Image = styled.img<any>`
  display: ${(props) => props.display};
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `auto`};
  margin: ${(props) => props.margin};
  object-fit: ${(props) => props.objectFit || `cover`};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  box-shadow: ${(props) => props.shadow};
  border-radius: ${(props) => props.radius};
  z-index: ${(props) => props.zIndex};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  transition: 0.3s;
  padding: ${(props) => props.padding};
  align-items: center;
  opacity: ${(props) => props.opacity};

  filter: ${(props) => (props.isFilter ? `brightness(30%) opacity(0.4)` : ` `)};

  filter: ${(props) => (props.isTransparency ? ` opacity(0)` : ` `)};

  &:hover {
    filter: ${(props) => (props.isHover ? `brightness(100%) opacity(1)` : ` `)};
  }
`;

/* start test */

// export const TestWrapper = styled.div<any>`
//   display: none;
//   height: 0px;
// `;

export const Test = styled.li<any>`
  width: ${(props) => props.width || `100px`};
  padding: 0px;
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
    display: block;
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
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
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

  & svg {
    color: ${(props) => props.color};
    margin-top: ${(props) => props.marginTop};
    margin-bottom: ${(props) => props.marginBottom};
    margin-right: ${(props) => props.marginRight};
    font-size: ${(props) => props.fontSize || `18px`};
  }

  & span {
    font-weight: 700;
  }

  &:hover {
    text-decoration: ${(props) => props.decoration};
    color: #314fa5;
  }
`;

/* end test */

export const UlWrapper = styled.ul<any>`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `flex-start`};
  flex-wrap: ${(props) => (props.isWrap ? `wrap` : ``)};
  position: ${(props) => props.isRelative};
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
  border-bottom: ${(props) => props.borderBottom};
  border-top: ${(props) => props.borderTop};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  overflow: ${(props) => (props.ishidden ? `hidden` : ``)};
  transition: 0.3s;
  list-style: none;
  padding-left: 0px;

  & .react-reveal {
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const LiWrapper = styled.li<any>`
  width: ${(props) => props.width};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  display: flex;
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `flex-start`};
  flex-wrap: ${(props) => (props.isWrap ? `wrap` : ``)};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  border-right: ${(props) => props.borderRight};
  border-top: ${(props) => props.borderTop};
  border-left: ${(props) => props.borderLeft};
  border-bottom: ${(props) => props.borderBottom};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  text-align: ${(props) => props.textAlign};
  line-height: ${(props) => props.lineHeight};
  box-shadow: ${(props) => props.shadow};
  cursor: ${(props) => props.cursor};
  transition: 0.4s;
  z-index: ${(props) => props.zIndex};

  @media (max-width: 700px) {
    font-size: 15px;
  }

  @media (max-width: 500px) {
    font-size: 13px;
  }

  & .headerIcon {
    color: #fff;
    margin-bottom: 10px;
  }

  &:hover {
    background: ${(props) =>
      props.isTabHover ? `${props.theme.basicTheme_C}` : ``};
    color: ${(props) => (props.isTabHover ? `${props.theme.white_C}` : ``)};
  }
`;

/** pagenation */

export const PagenationWrapper = styled.div<any>`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom};
  border-radius: ${(props) => props.radius};
  box-shadow: ${(props) => props.shadow};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin || `20px 0px 20px`};
  padding: ${(props) => props.padding};
`;

export const Pagenation = styled.button<any>`
  width: 35px;
  height: 35px;
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  cursor: pointer;
  padding-top: 3px;
  background-color: ${(props) => props.bgColor || props.theme.white_C};
  color: ${(props) => props.color || props.theme.basicTheme_C};
  border: ${(props) => props.border || `1px solid #314FA5`};
  border-radius: 0px;
  margin: 0px 3px;

  &.active {
    border-radius: 30px;
    box-shadow: 0px 10px 15px rgba(220, 220, 220, 1);
    border: none;
  }

  &:first-child,
  &:nth-child(2),
  &:nth-last-child(2),
  &:last-child {
    background-color: ${(props) => props.theme.subWhite_C};
    border: 1px solid #ddd;
    color: ${(props) => props.theme.basicTheme_C};
  }
`;

// export const PagenationBtn = styled.div<any>`
//   text-align: center;
//   font-size: 18px;
//   width: 25px;
//   height: 25px;
//   color: ${(props) => props.color || `#fff`};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   border-radius: 25px;
//   margin: 0px 3px;
//   background-color: ${(props) => props.theme.basicTheme_C};
//   border: 1px solid #ddd;

//   &:first-child,
//   &:last-child {
//     background-color: ${(props) => props.theme.subWhite_C};
//     border: 1px solid #ddd;
//     color: ${(props) => props.theme.black_C};
//   }

//   &:hover {
//     box-shadow: 0px 10px 15px rgba(220, 220, 220, 1);
//   }
// `;

/** 회원가입 */

export const JoinFirstStepSelect = styled.div<any>`
  width: ${(props) => props.width || `480px`};
  height: ${(props) => props.height || `380px`};
  color: ${(props) => props.color || props.theme.basicTheme_C};
  background-color: ${(props) => props.bgColor || `#f5f5f5`};
  border: ${(props) => props.border || `1px solid #c4c4c4`};
  align-items: ${(props) => props.al || `center`};
  border-radius: ${(props) => props.radius || `5px`};
  transition: ${(props) => props.transition || props.theme.transition};
  filter: grayscale(100%);
  justify-content: ${(props) => props.ju || `center`};
  display: flex;
  flex-direction: ${(props) => props.dr || `column`};
  cursor: pointer;
  padding-bottom: ${(props) => props.paddingBottom || `40px`};

  &:hover {
    box-shadow: 0px 10px 15px rgba(220, 220, 220, 1);
    border: 1px solid ${(props) => props.theme.basicTheme_C};
    background-color: #fff;
    filter: grayscale(0%);
  }
`;

export const JoinFirstStepSelectText = styled.p<any>`
  color: ${(props) => props.color || `#9d9d9d`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  text-align: center;
  font-size: 18px;
  margin: 0px;
`;

export const JoinStepBarWrapper = styled.div<any>`
  display: flex;
  width: 100%;
  justify-content: ${(props) => props.ju || `center`};
  align-items: ${(props) => props.al || `center`};
  text-align: center;
  font-size: 18px;
  margin: 0px;
  padding: 80px 0px 0px 0px;
  flex-direction: row;
`;

export const JoinStepBar = styled.p<any>`
  display: flex;
  justify-content: ${(props) => props.ju || `center`};
  align-items: ${(props) => props.al || `center`};
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  margin: 0px;
  padding: 0px;
  width: ${(props) => props.width || `32px`};
  height: ${(props) => props.height || `32px`};
  border-radius: ${(props) => props.radius || `32px`};
  background-color: ${(props) => props.bgColor || `32px`};

  ${(props) => props.kindOf === `line` && `height : 1px;`}
  ${(props) => props.kindOf === `line` && `border-radius : 0px;`}
  ${(props) =>
    props.kindOf === `line` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}
  
  ${(props) => props.kindOf === `line2` && `height : 1px;`}
  ${(props) => props.kindOf === `line2` && `border-radius : 0px;`}
  ${(props) =>
    props.kindOf === `line2` && `border : 1px solid ${props.theme.darkGrey_C};`}
  
  ${(props) =>
    props.kindOf === `before` && `background ${props.theme.subWhite_C};`}
  ${(props) => props.kindOf === `before` && `color ${props.theme.darkGrey_C};`}
  ${(props) =>
    props.kindOf === `before` &&
    `border : 1px solid ${props.theme.darkGrey_C};`}
  
  ${(props) => props.kindOf === `progress` && `background : #fff;`}
  ${(props) =>
    props.kindOf === `progress` && `color ${props.theme.basicTheme_C};`}
  ${(props) =>
    props.kindOf === `progress` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}

    ${(props) =>
    props.kindOf === `complete` && `background ${props.theme.basicTheme_C};`}
  ${(props) => props.kindOf === `complete` && `color ${props.theme.white_C};`}
`;

/*Header */

export const NavWrap = styled.div<any>`
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height || `200px`};
  position: ${(props) => props.position || `absolute`};
  z-index: ${(props) => props.zIndex || `100`};
  transition: all 0.3s;
`;

export const NavAll = styled.div<any>`
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height || `90px`};
  overflow: ${(props) => props.overflow || `hiedden`};
  position: ${(props) => props.position || `relative`};
  text-decoration: none;
  background-color: ${(props) => props.bgColor || `#fff`};
  transition: all 0.3s;
  clear: both;
`;

// export const CheckBox = styled.label<any>`
//   display: block;
//   position: relative;
//   padding-left: 35px;
//   margin-bottom: 12px;
//   cursor: pointer;
//   font-size: 18px;

//   &:input {
//     position: absolute;
//     opacity: 0;
//     cursor: pointer;
//     height: 0;
//     width: 0;
//   }

//   &:hover input ~ .checkmark {
//     background-color: #ccc;
//   }

//   input:checked ~ .checkmark {
//     background-color: #e91b00;
//   }
// `;

// export const CheckMark = styled.span<any>`
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 25px;
//   width: 25px;
//   background-color: #eee;
// `;

// export const NavUl = styled.ul<any>`
//   position: ${(props) => props.position || `relative`};
//   float: left;
//   font-size: ${(props) => props.fontSize || `16px`};
//   list-style: none;
//   text-decoration: none;
// `;

// export const NavLi = styled.li<any>`
//   height: ${(props) => props.height || `30px`};

//   &:hover {
//     font-weight: bold;
//   }
// `;

export const CheckBox = styled.button<any>`
  font-size: 12px;
  width: 20px;
  height: 20px;
  color: #314fa5;
  padding: 4px 2px 2px;
  margin: 5px;
  border: 1px solid #314fa5;
  background-color: #fff;
  cursor: pointer;
  transition: 0.4s;
  border-radius: 2px;

  ${(props) => props.kindOf === `false` && `color:#fff;`}
  ${(props) => props.kindOf === `true` && `color:#fff;`}
  ${(props) => props.kindOf === `true` && `background-color:#314fa5;`}
`;

export const Switch = styled.div<any>`
  width: auto;
  height: auto;
  font-size: 56px;
  color: #ccc;
  background-color: #fff;
  padding: 0px;
  margin: 0px;
  borer: none;
  outline: none;
  transition: 0.4s;

  ${(props) => props.kindOf === `on` && `color:#314fa5;`}
  ${(props) => props.kindOf === `on` && `transition: 0.4s;`}
`;
