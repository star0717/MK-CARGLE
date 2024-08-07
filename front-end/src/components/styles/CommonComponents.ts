import styled, { asdasd, css } from "styled-components";
import { appearAnimation } from "./AnimationCommon";

interface Propsinterface {
  width: Number;
}

/** Wrapper */
export const Wwrapper = styled.div<asdasd>`
  width: ${(props) => props.Width || `100%`};
  height: ${(props) => props.Height || `100%`};
  color: ${(props) => props.Color || `red`};
`;

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
  overflow: ${(props) => props.overflow || ``};
`;

// 컨텐츠가 짧을 때는 short로 감싸주세요
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
  flex-wrap: ${(props) => props.wrap || `no-wrap`};
  backdrop-filter: ${(props) => props.filter};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding || `50px 0px`};
  border-bottom: ${(props) => props.borderBottom};
  border: ${(props) => props.border};
  font-size: ${(props) => props.fontSize};
  position: ${(props) => (props.isRelative ? `relative` : ``)};

  @media (max-width: 1200px) {
    width: 100%;
  }

  ${(props) => props.kindOf === `short` && `padding:0px 0px 120px 0px`}
`;

export const MoWrapper = styled.div<any>`
  width: 100%;
  height: ${(props) => props.height || `100%`};
  min-height: ${(props) => props.minHeight || `100vh`};
  color: ${(props) => props.color};
  display: flex;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => props.wrap || `no-wrap`};
  backdrop-filter: ${(props) => props.filter};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding || `40px`};
  border-bottom: ${(props) => props.borderBottom};
  border: ${(props) => props.border};
  font-size: ${(props) => props.fontSize};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
`;

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
  background: ${(props) => props.background || ``};
  color: ${(props) => props.color};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isFixed ? `fixed` : ``)};
  position: ${(props) => (props.isSticky ? `sticky` : ``)};
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
  transition: ${(props) => props.transition || `0.5s`};
  cursor: ${(props) => props.cursor};
  transform: ${(props) => props.transform};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.textAlign};
  opacity: ${(props) => props.opacity};
  page-break-after: ${(props) => props.pageBreakAfter};

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
    ${(props) =>
      props.kindOf === `hoverWrap` &&
      `background-color: #f5f5f5;
      color: #343a40;
      cursor: pointer`}
  }

  &:focus {
    ${(props) =>
      props.kindOf === `hoverWrap` &&
      `background-color: #8DAFCE;
      color: #343a40;
      cursor: pointer;
      outline-style:none;`}
  }

  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

/**text */

export const CommonTitleWrapper = styled.div<any>`
  width: ${(props) => props.width || `100%`};
  display: ${(props) => props.display || `flex`};
  flex-direction: ${(props) => props.dr || `column`};
  padding: ${(props) => props.padding || `0px 0px 50px 0px`};
  margin: ${(props) => props.margin || ``};
  padding-bottom: ${(props) => props.paddingBottom};
  color: ${(props) => props.color};
  text-align: ${(props) => props.textAlign || `center`};
`;

export const CommonTitle = styled.h2<any>`
  width: ${(props) => props.width};
  position: relative;
  margin: 20px 0px 10px;
  padding-bottom: 10px;
  font-size: 34px;
  font-weight: 600;
  background: linear-gradient(
    360deg,
    hsla(224, 54%, 42%, 1) 0%,
    hsla(216, 100%, 63%, 1) 100%
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
`;

export const CommonSubTitle = styled.h2<any>`
  width: ${(props) => props.width};
  position: relative;
  margin: 0px 0px 10px;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.color || `#9d9d9d`};

  &:before {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 50%;
    margin-left: -14px;
    width: 30px;
    height: 8px;
    border-bottom: 6px solid transparent;
    background: linear-gradient(
      360deg,
      hsla(230, 38%, 62%, 1) 0%,
      hsla(224, 54%, 42%, 1) 50%,
      hsla(225, 55%, 28%, 1) 100%
    );
    background-origin: border-box;
    background-clip: content-box, border-box;
  }

  ${(props) =>
    props.kindOf === `sub` &&
    `&:before {
      border-bottom: none;
      background: none;
    }`}
`;

// export const CommonBigTitle = styled.h2<any>`
//   width: ${(props) => props.width};
//   position: relative;
//   margin: 30px 0px 0px;
//   font-size: 34px;
//   font-weight: 600;
//   background: linear-gradient(
//     360deg,
//     hsla(224, 54%, 42%, 1) 0%,
//     hsla(216, 100%, 63%, 1) 100%
//   );
//   -webkit-text-fill-color: transparent;
//   -webkit-background-clip: text;
// `;

// export const CommonBigSubTitle = styled.h2<any>`
//   width: ${(props) => props.width};
//   position: relative;
//   margin: 20px 0px 30px;
//   padding-bottom: 10px;
//   font-size: 22px;
//   font-weight: 500;
//   color: #000;

//   &:before {
//     content: "";
//     position: absolute;
//     bottom: -10px;
//     left: 50%;
//     margin-left: -14px;
//     width: 30px;
//     height: 100%;
//     border-bottom: 6px solid ${(props) => props.theme.black_C};
//   }
// `;

export const CommonSmallTitle = styled.h2<any>`
  width: ${(props) => props.width};
  position: relative;
  margin: ${(props) => props.margin || `30px 0px`};
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.color};
  text-align: ${(props) => props.textAlign || `center`};
`;

export const Text = styled.p<any>`
  overflow: ${(props) => props.overflow};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-width: ${(props) => props.maxWidth};
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
  background: ${(props) => props.background};
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
  white-space: ${(props) => props.whiteSpace || `pre-wrap`};
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
  letter-spacing: ${(props) => props.letterSpacing || `0px`};
  text-decoration: ${(props) => props.decoration};
  text-overflow: ${(props) => props.textOverflow || ``};
  text-shadow: ${(props) => props.textShadow || ``} & svg {
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

  ${(props) =>
    props.kindOf === `gradient` &&
    `background : linear-gradient(180deg, hsla(224, 54%, 42%, 1) 0%, hsla(216, 100%, 63%, 1) 100%);`}

  ${(props) => props.kindOf === `gradient` && ` -webkit-background-clip: text;`}
  ${(props) =>
    props.kindOf === `gradient` && ` -webkit-text-fill-color: transparent;`}
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
  animation: ${(props) =>
    props.notAnimate
      ? ``
      : css`
          ${appearAnimation} 1s forwards
        `};

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
  animation: ${(props) =>
    props.notAnimate
      ? ``
      : css`
          ${appearAnimation} 1s forwards
        `};

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
    ${(props) => props.kindOf === `circleWhite` && `width : 400px;`}
      ${(props) => props.kindOf === `circleWhite` && `height : 50px;`}
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
    ${(props) => props.kindOf === `circleTheme` && `width : 400px;`}
      ${(props) => props.kindOf === `circleTheme` && `height : 50px;`}


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
  border-radius: ${(props) => props.radius || `5px`};
  font-size: ${(props) => props.fontSize || `16px`};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  background-color: ${(props) => props.bgColor};
  color: #fff;
  cursor: ${(props) => props.cursor || `pointer`};
  vertical-align: unset;
  box-shadow: ${(props) => props.shadow || ``};
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
    ${(props) =>
    props.kindOf === `ghost` && `background ${props.theme.grey_C};`}
    ${(props) => props.kindOf === `ghost` && `color ${props.theme.white_C};`}
    ${(props) => props.kindOf === `ghost` && `cursor : default;`}
    ${(props) => props.kindOf === `ghost` && `border : none;`}
    ${(props) =>
    props.kindOf === `black` && `background : rgba(255,255,255,0.7);`}
    ${(props) => props.kindOf === `black` && `color ${props.theme.black_C};`}
    ${(props) => props.kindOf === `black` && `border : 1px solid #343a40;`}
    ${(props) =>
    props.kindOf === `fillDefault` && `background ${props.theme.basicTheme_C};`}
    ${(props) =>
    props.kindOf === `fillDefault` && `color ${props.theme.white_C};`}
    ${(props) => props.kindOf === `fillDefault` && `border : none;`}
    ${(props) =>
    props.kindOf === `input` && `background ${props.theme.white_C};`}
    ${(props) => props.kindOf === `input` && `border ${props.theme.border};`}
    ${(props) => props.kindOf === `input` && `color ${props.theme.black_C};`}
    ${(props) => props.kindOf === `input` && `justify-content : flex-start;`} &
    svg {
  }

  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow};
    ${(props) =>
      props.kindOf === `default` && `background ${props.theme.basicTheme_C};`}
    ${(props) => props.kindOf === `default` && `color ${props.theme.white_C};`}
    ${(props) =>
      props.kindOf === `default` &&
      `border : 1px solid ${props.theme.black_C};`}

    ${(props) =>
      props.kindOf === `cancle` && `background ${props.theme.red_C};`}
    ${(props) => props.kindOf === `cancle` && `color ${props.theme.white_C};`}

    ${(props) =>
      props.kindOf === `fillDefault` &&
      `background ${props.theme.darkTheme_C};`}
    ${(props) =>
      props.kindOf === `fillDefault` && `color ${props.theme.white_C};`}
    ${(props) => props.kindOf === `fillDefault` && `border : none;`}

    ${(props) => props.kindOf === `ghost` && `box-shadow : none;`}

    ${(props) => props.kindOf === `input` && `box-shadow : none;`}
  }

  &:focus {
    ${(props) => props.kindOf === `input` && `out-line : none;`}
  }

  & svg {
    font-size: 24px;
    margin: 0px;
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
  position: ${(props) => (props.isFixed ? `fixed` : ``)};

  & svg {
    color: ${(props) => props.color || props.black_C};
    font-size: ${(props) => props.fontSize || `28px`};
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
  display: ${(props) => (props.isDisplayNone ? `none` : ``)};
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `flex-end`};
  justify-content: ${(props) => props.ju || `center`};
  background-color: ${(props) => props.bgColor || `#fff`};
  color: ${(props) => props.color || props.basicTheme_C};
  cursor: pointer;
  border: ${(props) => props.border || `none`};
  border-radius: ${(props) => props.radius || props.theme.radius};
  box-shadow: ${(props) => props.shadow || props.theme.boxShadow};
  z-index: ${(props) => props.zIndex};

  & svg {
    color: ${(props) => props.color || props.basicTheme_C};
    font-size: ${(props) => props.fontSize || `28px`};
  }

  ${(props) => props.kindOf === `hover` && `background-color : #f5f5f5;`}
  ${(props) => props.kindOf === `hover` && `color : #314fa5;`}
  ${(props) => props.kindOf === `hover` && `border : 1px solid #314fa5;`}

  &:hover {
    background-color: ${(props) =>
      props.kindOf === `hover` && `background-color : #314FA5;`};
    color: ${(props) => props.kindOf === `hover` && `color : #fff;`};
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
  padding: ${(props) => props.paddding || props.theme.inputPadding};
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
  display: ${(props) => props.display};
  width: ${(props) => props.width};
  height: ${(props) => props.height || `40px`};
  border: ${(props) => props.border || props.theme.border};
  padding: ${(props) => props.padding || props.theme.inputPadding};
  border-radius: ${(props) => props.theme.radius};
  transition: ${(props) => props.transition || props.theme.transition};
  font-size: 16px;
  align-items: ${(props) => props.al || ``};
  justify-content: ${(props) => props.ju || ``};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bgColor};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.textAlign};
  vertical-align: ${(props) => props.vertical};

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.basicTheme_C};
    background-color: #edf2ff;
  }

  &:read-only:focus {
    box-shadow: none;
    border: ${(props) => props.theme.border};
  }

  &:read-only {
    box-shadow: none;
    border: ${(props) => props.border || props.theme.border};
    background-color: #f5f5f5;
    cursor: default;
  }
`;

export const MoTextInput = styled.input<any>`
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height || `60px`};
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.basicTheme_C};
  background-color: ${(props) => props.bgColor || props.theme.subWhite_C};
  padding: ${(props) => props.paddding || props.theme.inputPadding};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
  font-size: 24px;
  color: ${(props) => props.theme.basicTheme_C};
  position: relative;
  letter-spacing: 0px;
  &:focus {
    background: none;
    outline: none;
    box-shadow: ${(props) => props.theme.boxShadowV2};
    border-bottom: 2px solid ${(props) => props.theme.darkTheme_C};
  }
  &::placeholder {
    color: #ccc;
  }
`;

export const TextArea = styled.textarea<any>`
  width: ${(props) => props.width};
  height: ${(props) => props.height || `40px`};
  border: ${(props) => props.border || props.theme.border};
  padding: ${(props) => props.padding || props.theme.inputPadding};
  border-radius: ${(props) => props.theme.radius};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => props.fontSize || `16px`};
  align-items: ${(props) => props.al || ``};
  justify-content: ${(props) => props.ju || ``};
  width: ${(props) => props.width};
  height: ${(props) => props.height || `40px`};
  padding: ${(props) => props.padding || `8px`};
  border-radius: ${(props) => props.theme.radius};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bgColor};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.textAlign};
  vertical-align: ${(props) => props.vertical};
  resize: none;
  box-shadow: ${(props) => props.shadow};

  &:focus {
    outline: none;
    border: ${(props) =>
      props.border || `1px solid ${props.theme.basicTheme_C}`};
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
  text-align: ${(props) => props.textAlign || `center`};

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
  justify-content: ${(props) => props.ju || `center`};
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

// Table

export const TableWrapper = styled.div<any>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${(props) => props.margin || `0px`};
  padding: ${(props) => props.padding || `0px`};
  min-height: ${(props) => props.minHeight || `400px`};
  overflow: ${(props) => props.overflow || ``};
  overflow-y: ${(props) => props.overflowY || ``};
  border-radius: ${(props) => props.radius || `8px 8px 0px 0px`};

  ${(props) => props.kindOf === `list` && `min-height : 500px;`}
`;

export const TableHead = styled.ul<any>`
  width: 100%;
  height: ${(props) => props.height || `50px`};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(props) => props.shadow};
  margin: ${(props) => props.margin || `0px`};
  border-radius: ${(props) => props.radius || `8px 8px 0px 0px`};
  border-top: ${(props) => props.borderTop || ``};
  background-color: ${(props) => props.bgColor || `${props.theme.black_C}`};
  color: #fff;
  padding: ${(props) => props.padding || `0px 20px`};
  font-size: ${(props) => props.fontSize || `16px`};
  min-height: 50px;
  position: ${(props) => (props.isFixed ? `fixed` : ``)};
  position: ${(props) => (props.isSticky ? `sticky` : ``)};
`;

export const TableHeadLIST = styled.li<any>`
  width: ${(props) => props.width};
  height: 100%;
  display: ${(props) => props.display || `flex`};
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => props.ju || `flex-start`};
  text-align: start;
  font-size: ${(props) => props.fontSize || `16px`};
  color: ${(props) => props.color || ``};
  padding: ${(props) => props.padding || ``};
`;

export const TableBody = styled.div<any>`
  width: 100%;
  height: ${(props) => props.height || `auto`};
  margin: ${(props) => props.margin || `0px`};
  overflow: ${(props) => props.overflow || ``};
  font-size: ${(props) => props.fontSize || `16px`};
  min-height: ${(props) => props.minHeight || ``};
`;
export const TableRow = styled.ul<any>`
  width: 100%;
  height: ${(props) => props.height || `45px`};
  padding: ${(props) => props.padding || `0px`};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => props.ju || `space-between`};
  border-bottom: ${(props) => props.borderBottom || `1px solid #eee`};
  transition: 0.5s;
  cursor: pointer;
  padding: ${(props) => props.padding || `0px 20px`};
  min-height: 45px;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};

  ${(props) => !props.kindOf && `background : ${props.theme.White_C};`}

  ${(props) => props.kindOf === `focus` && `background : #f5f5f5;`}
  ${(props) => props.kindOf === `focus` && `font-weight : 600;`}
  ${(props) => props.kindOf === `focus` && `color : #314FA5;`}
  


  &:hover {
    background-color: #f5f5f5;
    ${(props) => props.kindOf === `focus` && `background : #f5f5f5;`}
    color: #314fa5;
    ${(props) => props.kindOf === `focus` && `color : #314FA5;`}
    text-decoration: underline;
    ${(props) => props.kindOf === `focus` && `text-decoration : none;`}
  }

  ${(props) =>
    props.kindOf === `selectClass` &&
    `background: #8DAFCE; color: #fff; &:hover {background: #8DAFCE; color: #fff; text-decoration: none;}`}
  ${(props) =>
    props.kindOf === `noSelectClass` && `background: #fff; color: #343a40;`}
    ${(props) =>
    props.kindOf === `noHover` &&
    `&:hover {background: inherit; color: inherit; text-decoration: none; cursor: default;}`}
`;

export const TableRowLIST = styled.li<any>`
  width: ${(props) => props.width};
  height: ${(props) => props.height || `100%`};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  display: ${(props) => props.display || `flex`};
  color: ${(props) => props.color || ``};
  font-size: ${(props) => props.fontSize || `16px`};
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `flex-start`};
  padding: ${(props) => props.padding || ``};
  line-height: ${(props) => props.lineHeight || `1.2`};
  border: ${(props) => props.border || `0px 1px 0px 0px solid #ddd`};
  text-align: start;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: ${(props) => props.overflow || `hidden`};
  letter-spacing: 0px;
`;

export const Comment = styled.div<any>`
  display: none;
  position: absolute;
  width: 100px;
  padding: 8px;
  left: 0;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  background: #333;
  color: #fff;
  font-size: 14px;

  &:after {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border: solid transparent;
    border-color: rgba(51, 51, 51, 0);
    border-bottom-color: #333;
    border-width: 10px;
    pointer-events: none;
    content: " ";
  }

  &span {
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
  margin: ${(props) => props.margin || `50px 0px 20px`};
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
  padding: ${(props) => props.padding || `0px 0px 100px 0px`};
  flex-direction: row;
`;

export const JoinStepBar = styled.p<any>`
  display: flex;
  justify-content: ${(props) => props.ju || `center`};
  align-items: ${(props) => props.al || `center`};
  text-align: center;
  font-size: 32px;
  margin: 0px;
  padding: 0px;
  width: ${(props) => props.width || `64px`};
  height: ${(props) => props.height || `64px`};
  border-radius: ${(props) => props.radius || `64px`};
  color: ${(props) => props.color || ``};
  background-color: ${(props) => props.bgColor || `#314FA5`};

  ${(props) => props.kindOf === `line` && `height : 1px;`}
  ${(props) => props.kindOf === `line` && `border-radius : 0px;`}
  ${(props) =>
    props.kindOf === `line` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}
  
  ${(props) => props.kindOf === `line2` && `height : 1px;`}
  ${(props) => props.kindOf === `line2` && `border-radius : 0px;`}
  ${(props) =>
    props.kindOf === `line2` && `border : 1px solid ${props.theme.grey_C};`}
  
  ${(props) =>
    props.kindOf === `before` && `background ${props.theme.white_C};`}
  ${(props) =>
    props.kindOf === `before` && `color ${props.theme.basicTheme_C};`}
  ${(props) =>
    props.kindOf === `before` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}
  
  ${(props) =>
    props.kindOf === `progress` &&
    `background: linear-gradient(125deg, hsla(224, 54%, 42%, 1) 0%, hsla(216, 100%, 63%, 1) 100%);`}
  ${(props) => props.kindOf === `progress` && `color ${props.theme.white_C};`}
  ${(props) =>
    props.kindOf === `progress` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}

    ${(props) =>
    props.kindOf === `complete` &&
    `background: linear-gradient(125deg, hsla(224, 54%, 42%, 1) 0%, hsla(216, 100%, 63%, 1) 100%);`}
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

// export const CheckBox = styled.button<any>`
//   font-size: 12px;
//   width: 20px;
//   height: 20px;
//   color: #314fa5;
//   padding: 4px 2px 2px;
//   margin: 5px;
//   border: 1px solid #314fa5;
//   background-color: #fff;
//   cursor: pointer;
//   transition: 0.4s;
//   border-radius: 2px;

//   ${(props) => props.kindOf === `false` && `color:#fff;`}
//   ${(props) => props.kindOf === `true` && `color:#fff;`}
//   ${(props) => props.kindOf === `true` && `background-color:#314fa5;`}
// `;

// export const Switch = styled.div<any>`
//   width: auto;
//   height: auto;
//   font-size: 56px;
//   color: #ccc;
//   background-color: #fff;
//   padding: 0px;
//   margin: 0px;
//   borer: none;
//   outline: none;
//   transition: 0.4s;

//   ${(props) => props.kindOf === `on` && `color:#314fa5;`}
//   ${(props) => props.kindOf === `on` && `transition: 0.4s;`}
// `;

// export const CheckboxContainer = styled.div<any>`
//   display: flex;
//   align-items: center;
// `;

// export const CheckBoxLine = styled.label<any>`
//   display: inline-block;
//   margin: 12px 8px 12px 0px;
//   width: 24px;
//   height: 24px;
//   background-color: ${(props) => props.bgColor || `#314fa5`};
//   border-radius: 2px;
//   cursor: pointer;
//   border: 1px solid #314fa5;
//   transition: 0.4s;

//   & > svg {
//     position: absolute;
//   }

//   ${(props) => props.kindOf === true && `background-color:#314fa5;`}
//   ${(props) => props.kindOf === false && `background-color:#fff;`}
// `;

// export const HiddenCheckbox = styled.input<any>`
//   border: 0;
//   clip: rect(0 0 0 0);
//   height: 1px;
//   margin: 0;
//   padding: 0;
//   overflow: hidden;
//   position: absolute;
//   white-space: nowrap;
//   width: 1px;
// `;
// export const CheckBoxIcon = styled.p<any>`
//   font-size: 16px;
//   color: #fff;
//   text-align: ${(props) => props.textAlign || `center`};
//   line-height: 1.6;
// `;

// export const Label1 = styled.label<any>`
//   display: inline-block;
//   line-height: 16px;
//   padding-left: 4px;
//   cursor: pointer;
// `;

// check-box and switch

export const Switch = styled.label<any>`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
`;

export const SwitchSlider = styled.span<any>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 5px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const SwitchInput = styled.input<any>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${SwitchSlider} {
    background-color: #314fa5;
  }

  &:focus + ${SwitchSlider} {
    box-shadow: 0 0 1px #2196f3;
  }

  &:checked + ${SwitchSlider}:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

//---------------------------------------//
export const CheckMark = styled.span<any>`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #ddd;
  border-radius: 4px;
  transition: 0.2s;
  cursor: ${(props) => props.cursor || `pointer`};

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const CheckInput = styled.input<any>`
  position: absolute;
  opacity: 0;
  cursor: ${(props) => props.cursor || `pointer`};
  height: 0;
  width: 0;
`;

export const Checkbox = styled.label<any>`
  display: block;
  position: relative;
  padding-left: 30px;
  margin: ${(props) => props.margin || `10px 0px`};
  width: ${(props) => props.width};
  cursor: ${(props) => props.cursor || `pointer`};
  font-size: 16px;
  line-height: 1.6;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${(props) => props.kindOf === `TableCheckBox` && `margin : 0px 0px 26px 0px;`}

  ${CheckInput}:checked ~ ${CheckMark} {
    background-color: #314fa5;
    ${(props) =>
      props.kindOf === `TableCheckBox` && `background-color: #8DAFCE;`}
  }

  ${CheckInput}:checked ~ ${CheckMark}:after {
    display: block;
  }
`;

export const ToolTipWrapper = styled.div<any>`
  display: ${(props) => props.display || `block`};
  font-size: ${(props) => props.fontSize || `16px`};
  font-weight: ${(props) => props.fontWeight || `500`};
  margin: ${(props) => props.margin || `0px`};
  text-align: ${(props) => props.textAlign || `center`};
  transition: 0.5s;
  position: relative;
  letter-spacing: ${(props) => props.letterSpacing || `0px`};
  word-break: break-all;

  & svg {
  }

  & span {
  }

  &:hover {
  }
`;
export const ToolTipText = styled.div<any>`
  display: none;
  position: absolute;
  z-index: 9999;
  width: ${(props) => props.width || `280px`};
  max-width: ${(props) => props.maxWidth || `280px`};
  max-height: ${(props) => props.maxHeight || `100px`};
  overflow: auto;
  white-space: pre-line;
  border: 1px solid;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  color: #fff;
  background: #343a40;
  text-align: start;
  padding: 10px 20px;

  & svg {
  }

  & span {
  }

  &:hover {
  }
`;

export const ToolTip = styled.div<any>`
  overflow: ${(props) => props.overflow || `hidden`};
  width: ${(props) => props.width || `260px`};
  max-height: ${(props) => props.maxWidth || `260px`};
  font-size: ${(props) => props.fontSize || `16px`};
  font-weight: ${(props) => props.fontWeight || `500`};
  line-height: ${(props) => props.lineHeight || `1.6`};
  margin: ${(props) => props.margin || `0px`};
  text-align: ${(props) => props.textAlign || `start`};
  transition: 0.5s;
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  z-index: 0;
  letter-spacing: ${(props) => props.letterSpacing || `0px`};
  text-overflow: ${(props) => props.textOverflow || `ellipsis`};
  white-space: nowrap;

  &:hover ${ToolTipText} {
    display: ${(props) => props.display || `block`};
    z-index: 9999;
  }

  &:hover {
    ${(props) => props.kindOf === `focus` && `background : #f5f5f5;`}
    color: #314fa5;
    ${(props) => props.kindOf === `focus` && `color : #314FA5;`}
    text-decoration: underline;
    ${(props) => props.kindOf === `focus` && `text-decoration : none;`}
  }
`;

// &:hover ${CheckInput} ~ ${CheckMark} {
//   background-color: #edeeff;
// }

export const StampWrapper = styled.div<any>`
  width: ${(props) => props.width || ``};
  height: ${(props) => props.height || ``};
  margin: ${(props) => props.margin || ``};
  display: flex;
  background-color: #ffffff;
  opacity: 0.8;
  background-image: repeating-linear-gradient(
      45deg,
      #c1c1c1 25%,
      transparent 25%,
      transparent 75%,
      #c1c1c1 75%,
      #c1c1c1
    ),
    repeating-linear-gradient(
      45deg,
      #c1c1c1 25%,
      #ffffff 25%,
      #ffffff 75%,
      #c1c1c1 75%,
      #c1c1c1
    );
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
`;

export const ColorSpan = styled.span<any>`
  color: ${(props) => props.color};
  margin: ${(props) => props.margin || `0px`};
  font-size: ${(props) => props.fontSize || `16px`};
  font-weight: ${(props) => props.fontWeight || ``};
  text-shadow: ${(props) => props.textShadow || ``};
`;

export const SpeechBubbleLeft = styled.div<any>`
  position: relative;
  background: #343a40;
  border-radius: 0.4em;
  width: auto;
  padding: 14px 20px;
  color: #fff;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-top-color: #343a40;
    border-bottom: 0;
    border-right: 0;
    margin-left: -7.5px;
    margin-bottom: -15px;
  }
`;

export const SpeechBubblecenter = styled.div<any>`
  position: relative;
  background: #343a40;
  border-radius: 0.4em;
  width: auto;
  padding: 14px 20px;
  color: #fff;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-top-color: #383838;
    border-bottom: 0;
    margin-left: -15px;
    margin-bottom: -15px;
  }
`;

export const SpeechBubbleRight = styled.div<any>`
  position: relative;
  background: #343a40;
  border-radius: 0.4em;
  width: auto;
  padding: 14px 20px;
  color: #fff;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-top-color: #343a40;
    border-bottom: 0;
    border-left: 0;
    margin-left: -7.5px;
    margin-bottom: -15px;
  }
`;

export const CommonForm = styled.form<any>`
  width: ${(props) => props.width || `100%`};
  display: ${(props) => props.display || `inherit`};
  flex-direction: ${(props) => props.dr || `inherit`};
  align-items: ${(props) => props.al || `inherit`};
  justify-content: ${(props) => props.ju || `inherit`};
`;

export const ProgressBar = styled.progress<any>`
  width: 300px;
  height: 34px;
  padding: 4px;
  -webkit-appearance: none;

  &::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 40px;
    padding: 4px;
    box-shadow: 0px 3px 6px rgba(120, 120, 120, 0.4);
  }

  &::-webkit-progress-value {
    background-color: #8dafce;
    border-radius: 40px;
  }
`;

export const SelectDays = styled.button<any>`
  width: auto;
  height: 40px;
  padding: 0px 40px;
  border-radius: 4px;
  border: 1px solid #314fa5;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  background-color: ${(props) => props.theme.white_C};
  margin: 0px 8px 0px 0px;

  ${(props) =>
    props.kindOf === `hollyDay` && `background-color : ${props.theme.white_C};`}
  ${(props) =>
    props.kindOf === `hollyDay` && `border : 1px solid ${props.theme.red_C};`}
    ${(props) => props.kindOf === `hollyDay` && `color : ${props.theme.red_C};`}

    ${(props) =>
    props.kindOf === `workingHour` &&
    `background-color : ${props.theme.white_C};`}
    ${(props) =>
    props.kindOf === `workingHour` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}
      ${(props) =>
    props.kindOf === `workingHour` && `color : ${props.theme.basicTheme_C};`}

  ${(props) =>
    props.kindOf === `ghost` && `background-color : ${props.theme.white_C};`}
`;
// &:hover {
//   background-color: ${(props) => props.theme.red_C};
//   color: ${(props) => props.theme.white_C};
// }

export const Hr = styled.hr<any>`
  width: ${(props) => props.width || `100%`};
  color: ${(props) => props.width || `#c4c4c4`};
`;
