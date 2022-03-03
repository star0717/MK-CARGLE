import React, { forwardRef } from "react";
import { NextPage } from "next";

const StatementFile: NextPage<any> = forwardRef<HTMLDivElement>(
  (props, ref) => {
    /*********************************************************************
     * 1. Init Libs
     *********************************************************************/

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
    return (
      <div
        ref={ref}
        className="stl_02"
        style={{
          height: "70.08334em",
          fontSize: "1em",
          margin: "0 auto",
          lineHeight: "0.0em",
          display: "block",
          borderStyle: "none",
          width: "49.58333em",
        }}
      >
        <div className="stl_03" style={{ position: "relative" }}>
          <img
            src="data:image/png;base64,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KwVHN9R3MqZN0kumbabP23vTvL12m6kzd+7cuT/Na2u3mfWxdowxPc/Nmzd/d3Z29r3dNgqOzsulips+b17ygZdLHcDaATrn5VKkEhnF2SgRREY7awfonMgglcgozkaJIDLaWTtA50QGqURGcTZKBJHRztoBOicySCUyirNRIoiMdtYO0DmRQSqRUZyNEkFktLN2gM6JDFKJjOJslAgio521A3ROZJBKZBRno0QQGe2sHaBzIoNUIqM4GyWCyGhn7QCdExmkEhnF2SgRREY7awfonMgglcgozkaJIDLaWTtA50QGqURGcTZKBJHRztoBOicySCUyirNRIoiMdtYO0DmRQSqRUZyNEkFktLN2gM6JDFKJjOJslAgio521A3ROZJBKZBRno0QQGe2sHaBzIoNUIqM4GyWCyGhn7QCdExmkEhnF2SgRREY7awfonMgglcgozkaJIDLaWTtA50QGqURGcTZKBJHRztoBOicySCUyirNRIoiMdtYO0DmRQSqRUZyNEkFktLN2gM6JDFKJjOJslAgio521A3ROZJBKZBRno0QQGe2sHaBzIoNUIqM4GyWCyGhn7QCdExmkEhnF2SgRREY7awfonMgglcgozkaJIDLaWTtA50QGqURGcTZKBJHRztoBOicySCUyirNRIoiMdtYO0DmRQSqRUZyNEkFktLN2gM6JDFKJjOJslAgio521A3ROZJBKZBRno0QQGe2sHaBzIoNUIqM4GyWCyGhn7QCdExmkEhnF2SgRREY7awfonMgglcgozkaJIDLaWTtA50QGqURGcTZKBJHRztoBOicySCUyirNRIoiMdtYO0DmRQSqRUZyNEkFktLN2gM6JDFKJjOJslAgio521A3ROZJBKZBRno0QQGe2sHaBzIoNUIqM4GyWCyGhn7QCdExmkEhnF2SgRREY7awfonMgglcgozkaJIDLaWTtA50QGqURGcTZKBJHRztoBOicySCUyirNRIoiMdtYO0DmRQSqRUZyNEkFktLN2gM6JDFKJjOJslAgio521A3ROZJBKZBRno0QQGe2sHaBzIoNUIqM4GyWCyGhn7QCdExmkEhnF2SgRREY7awfonMgg1RAb82lzdBaRYYwxxhhjrp5nn3324QsvvPCT3VYKjs53MoqbPm++GovvZBzA2jktHo/DTev/rZjdb6nDdzJIJTKK88RMEBnt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"
            alt=""
            className="stl_04"
            style={{
              width: "100%",
              clip: "rect(5.022751em,44.63271em,58.85234em,4.181042em)",
              position: "absolute",
              pointerEvents: "none",
            }}
          />
        </div>
        <div
          className="stl_view"
          style={{
            fontSize: "10em",
            transform: "scale(0.1)",
            MozTransition: "scale(0.1)",
            WebkitTransform: "scale(0.1)",
            MozTransformOrigin: "top left",
            WebkitTransformOrigin: "top left",
          }}
        >
          <div
            className="stl_05 stl_06"
            style={{
              position: "relative",
              width: "49.58333em",
              height: "7.008333em",
            }}
          >
            <div
              className="stl_01 stl_07"
              style={{
                top: "5.0591em",
                left: "4.5975em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8035645)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_08 stl_09"
                style={{
                  fontSize: "0.67em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.014602em",
                  letterSpacing: "-0.01em",
                }}
              >
                ■
              </span>
            </div>
            <div
              className="stl_01 stl_07"
              style={{
                top: "5.0591em",
                left: "5.597em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8035645)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_08 stl_09"
                style={{
                  wordSpacing: "-0.03em",
                  fontSize: "0.67em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.014602em",
                  letterSpacing: "-0.01em",
                }}
              >
                자동차관리법 시행규칙 [별지 제89호의2 서식]{" "}
              </span>
              <span
                className="stl_10 stl_09"
                style={{
                  wordSpacing: "-0.03em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.67em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#0000FF",
                  lineHeight: "1.014602em",
                }}
              >
                &lt;개정 2014.10.6.&gt; &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_11"
              style={{
                top: "6.201em",
                left: "23.7371em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.595136)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_12 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "1.33em",
                  fontFamily: '"RITEHK+Dotum", "Times New Roman"',
                  color: "#000000",
                  lineHeight: "1.00703em",
                }}
              >
                ㆍ
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "8.5878em",
                left: "8.3355em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                등록번
                <span className="stl_15" style={{ letterSpacing: "0em" }}>
                  호 &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "8.5878em",
                left: "20.8987em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                차명(차
                <span className="stl_15" style={{ letterSpacing: "0em" }}>
                  종) &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "8.5878em",
                left: "32.1726em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                (
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "8.5878em",
                left: "34.2614em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14"
                style={{
                  wordSpacing: "0.23em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                ) 주행거리 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "8.5878em",
                left: "43.3765em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                ㎞
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "8.8675em",
                left: "5.1272em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                차량 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "10.5157em",
                left: "20.8987em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_15"
                style={{
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                  letterSpacing: "0em",
                }}
              >
                점검ㆍ정
                <span className="stl_09" style={{ letterSpacing: "-0.01em" }}>
                  비 &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_16"
              style={{
                top: "11.6045em",
                left: "21.3185em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.3)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                의뢰일
                <span className="stl_15" style={{ letterSpacing: "0em" }}>
                  자 &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "10.7854em",
                left: "4.7074em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14"
                style={{
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                소유자 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "11.0551em",
                left: "7.9257em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                등록연월일 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "13.033em",
                left: "7.9257em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                사업자등록 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_16"
              style={{
                top: "14.1917em",
                left: "9.175em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.3)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                번호 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "13.0729em",
                left: "20.8987em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_15"
                style={{
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                  letterSpacing: "0em",
                }}
              >
                정비업등
                <span className="stl_09" style={{ letterSpacing: "-0.01em" }}>
                  록 &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_17"
              style={{
                top: "14.1517em",
                left: "22.148em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.2)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14"
                style={{
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                번호 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "15.5302em",
                left: "5.1272em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                정비 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "15.9198em",
                left: "8.7553em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14"
                style={{
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                업체명 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "16.4592em",
                left: "22.148em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14"
                style={{
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                주소 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "17.0772em",
                left: "8.5054em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                (대표자) &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "17.4481em",
                left: "4.7074em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14"
                style={{
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                사업자 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "17.4182em",
                left: "17.8303em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                (
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "17.4182em",
                left: "19.9192em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                )
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "17.4369em",
                left: "35.6007em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                (전화번호: &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_20"
              style={{
                top: "19.3361em",
                left: "32.0326em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-2.3)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                정비책임자 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "17.4369em",
                left: "43.8362em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                )
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "18.7467em",
                left: "7.9257em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                점검ㆍ정비 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_21"
              style={{
                top: "19.9154em",
                left: "8.3355em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.4)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                완료일
                <span className="stl_15" style={{ letterSpacing: "0em" }}>
                  자 &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "19.3361em",
                left: "21.3185em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                출고일
                <span className="stl_15" style={{ letterSpacing: "0em" }}>
                  자 &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_07"
              style={{
                top: "20.1126em",
                left: "39.5486em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8035645)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_22 stl_09"
                style={{
                  wordSpacing: "-0.02em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.67em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#7F7F7F",
                  lineHeight: "1.014602em",
                }}
              >
                (서명 또는 인) &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "21.4538em",
                left: "5.497em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                점검ㆍ정비내
                <span className="stl_15" style={{ letterSpacing: "0em" }}>
                  역 &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "21.4538em",
                left: "23.7571em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                추가정비동의여
                <span className="stl_15" style={{ letterSpacing: "0em" }}>
                  부 &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_23"
              style={{
                top: "22.8722em",
                left: "29.9238em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.7)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14"
                style={{
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                부품 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "21.4538em",
                left: "32.3625em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  wordSpacing: "0.02em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                [ ]
              </span>
              <span
                className="stl_14 stl_09"
                style={{
                  wordSpacing: "0em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                &nbsp;동의
              </span>
              <span
                className="stl_14 stl_09"
                style={{
                  wordSpacing: "0.52em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                &nbsp;[
              </span>
              <span
                className="stl_14 stl_09"
                style={{
                  wordSpacing: "0em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                &nbsp;]
              </span>
              <span
                className="stl_14 stl_09"
                style={{
                  wordSpacing: "0.01em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                &nbsp;부동의 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "23.5315em",
                left: "12.1634em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                작업내
                <span className="stl_15" style={{ letterSpacing: "0em" }}>
                  용 &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "23.5315em",
                left: "40.5081em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                공임 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "24.1808em",
                left: "24.4667em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                구분 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "24.1808em",
                left: "28.2647em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                수량 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "24.1808em",
                left: "31.9427em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14"
                style={{
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                단가 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "24.1808em",
                left: "36.0405em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                계
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "34.3597em",
                left: "28.7044em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                부가가
                <span className="stl_15" style={{ letterSpacing: "0em" }}>
                  치 &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_24"
              style={{
                top: "36.2676em",
                left: "29.9538em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-2.2)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                세
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "35.3086em",
                left: "5.537em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                부품 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "35.3086em",
                left: "13.5327em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14"
                style={{
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                공임 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "35.3086em",
                left: "21.5383em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                소계 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "35.3086em",
                left: "37.5397em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14"
                style={{
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                총계 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_25"
              style={{
                top: "37.5689em",
                left: "5.9668em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.103402)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_26 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.92em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.010441em",
                }}
              >
                「
              </span>
            </div>
            <div
              className="stl_01 stl_25"
              style={{
                top: "37.5689em",
                left: "6.8863em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.103402)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_26 stl_09"
                style={{
                  wordSpacing: "-0.08em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.92em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.010441em",
                }}
              >
                자동차관리법」 제58조제4항 및 같은 법 시행규칙 제134조제2항에
                따라 위와 같이 발급합 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_25"
              style={{
                top: "38.9474em",
                left: "4.5975em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.103402)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_26 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.92em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.010441em",
                }}
              >
                니다. &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "40.3218em",
                left: "37.8595em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                년
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "40.3218em",
                left: "40.8479em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                월
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "40.3218em",
                left: "43.4565em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                일
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "41.9214em",
                left: "24.9665em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14"
                style={{
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                작성자 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_07"
              style={{
                top: "42.0586em",
                left: "39.5486em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8035645)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_22 stl_09"
                style={{
                  wordSpacing: "-0.02em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.67em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#7F7F7F",
                  lineHeight: "1.014602em",
                }}
              >
                (서명 또는 인) &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_21"
              style={{
                top: "43.3073em",
                left: "39.5486em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.4)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_22 stl_09"
                style={{
                  wordSpacing: "-0.02em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.67em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#7F7F7F",
                  lineHeight: "1.014602em",
                }}
              >
                (서명 또는 인) &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "43.17em",
                left: "24.1369em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                대표이
                <span className="stl_15" style={{ letterSpacing: "0em" }}>
                  사 &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_13"
              style={{
                top: "44.9081em",
                left: "22.7377em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.9954605)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_14 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.83em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.011647em",
                }}
              >
                안내사
                <span className="stl_15" style={{ letterSpacing: "0em" }}>
                  항 &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_16"
              style={{
                top: "46.0955em",
                left: "4.9768em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.3)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19"
                style={{
                  wordSpacing: "-0.1em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                . 정비업자가 점검ㆍ정비의 잘못으로 다음 구분에 따른 기간중
                발생하는 고장 등에 대하여는 무상점검ㆍ정비를 합 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "46.0955em",
                left: "4.5975em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                1
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "47.0745em",
                left: "5.7969em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  wordSpacing: "0em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                니다(「자동차관리법 시행규칙」 제134조제1항제2호)
                <span className="stl_27" style={{ letterSpacing: "-0.02em" }}>
                  . &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "48.0434em",
                left: "5.3471em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19"
                style={{
                  wordSpacing: "-0.05em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                가. 차령 1년 미만 또는 주행거리 2만킬로미터 이내의 자동차:
                점검ㆍ정비일부터 90일 이내 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_28"
              style={{
                top: "49.0223em",
                left: "5.3471em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.1)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19"
                style={{
                  wordSpacing: "-0.05em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                나. 차령 3년 미만 또는 주행거리 6만킬로미터 이내의 자동차:
                점검ㆍ정비일부터 60일 이내 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_28"
              style={{
                top: "50.0013em",
                left: "5.3471em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.1)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19"
                style={{
                  wordSpacing: "-0.05em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                다. 차령 3년 이상 또는 주행거리 6만킬로미터 이상의 자동차:
                점검ㆍ정비일부터 30일 이내 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_28"
              style={{
                top: "50.9702em",
                left: "4.9678em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.1)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_29"
                style={{
                  wordSpacing: "-0.07em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                  letterSpacing: "-0.03em",
                }}
              >
                . 이 내역서는 2부를 작성, 정비의뢰자에게 1부를 교부하고,
                정비사업자는 1부를 1년간 문서 또는 전산자료로 보관하 &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_28"
              style={{
                top: "51.9491em",
                left: "5.7269em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.1)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_29"
                style={{
                  wordSpacing: "0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                  letterSpacing: "-0.03em",
                }}
              >
                여야 합니다. &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "50.9702em",
                left: "4.5975em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                2
              </span>
            </div>
            <div
              className="stl_01 stl_20"
              style={{
                top: "52.9281em",
                left: "4.5975em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-2.3)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                3
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "52.9281em",
                left: "4.9768em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  wordSpacing: "0em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                . 부품란의 구분란에는 다음에 따라 기재하여야 합
                <span className="stl_27" style={{ letterSpacing: "-0.02em" }}>
                  니다. &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_28"
              style={{
                top: "53.897em",
                left: "6.0967em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.1)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_30"
                style={{
                  wordSpacing: "0.07em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                  letterSpacing: "-0.06em",
                }}
              >
                가. 자동차
              </span>
              <span
                className="stl_19 stl_31"
                style={{
                  wordSpacing: "0.03em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                  letterSpacing: "-0.07em",
                }}
              >
                &nbsp;제작사 및
              </span>
              <span
                className="stl_19 stl_30"
                style={{
                  wordSpacing: "-0.04em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                  letterSpacing: "-0.06em",
                }}
              >
                &nbsp;부품업체가
              </span>
              <span
                className="stl_19 stl_30"
                style={{
                  wordSpacing: "-0.02em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                  letterSpacing: "-0.06em",
                }}
              >
                &nbsp;공급하는
              </span>
              <span
                className="stl_19 stl_30"
                style={{
                  wordSpacing: "-0.04em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                  letterSpacing: "-0.06em",
                }}
              >
                &nbsp;신품(자동차 제작사의 경우에는
              </span>
              <span
                className="stl_19 stl_30"
                style={{
                  wordSpacing: "-0.03em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                  letterSpacing: "-0.06em",
                }}
              >
                &nbsp;사후관리용
              </span>
              <span
                className="stl_19 stl_30"
                style={{
                  wordSpacing: "-0.05em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                  letterSpacing: "-0.06em",
                }}
              >
                &nbsp;보증부품을 포함합니다):
              </span>
              <span
                className="stl_19 stl_31"
                style={{
                  wordSpacing: "0.02em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                  letterSpacing: "-0.07em",
                }}
              >
                &nbsp;A &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_28"
              style={{
                top: "54.8759em",
                left: "6.0967em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.1)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19"
                style={{
                  wordSpacing: "-0.04em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                나. 재제조품: B &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "55.8549em",
                left: "6.0967em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  wordSpacing: "0em",
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                다. 중고품(재생품을 포함합니다):
                <span className="stl_27" style={{ letterSpacing: "-0.02em" }}>
                  &nbsp;C &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_28"
              style={{
                top: "56.8238em",
                left: "6.0967em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-1.1)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19"
                style={{
                  wordSpacing: "-0.04em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                라. 수입부품: F &nbsp;
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "57.8027em",
                left: "4.5975em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_09"
                style={{
                  letterSpacing: "-0.01em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                }}
              >
                ※
              </span>
            </div>
            <div
              className="stl_01 stl_18"
              style={{
                top: "57.8027em",
                left: "5.7269em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8995125)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_19 stl_31"
                style={{
                  wordSpacing: "0.02em",
                  fontSize: "0.75em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.012964em",
                  letterSpacing: "-0.07em",
                }}
              >
                재생정비한 원동기를 부품으로 사용한 경우에는 별지 제92호서식의
                원동기재생정비사실확
                <span className="stl_32" style={{ letterSpacing: "-0.08em" }}>
                  인서를 첨부하여야 합니다. &nbsp;
                </span>
              </span>
            </div>
            <div
              className="stl_01 stl_07"
              style={{
                top: "59.4896em",
                left: "35.2109em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8035645)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_08 stl_09"
                style={{
                  fontSize: "0.67em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.014602em",
                  letterSpacing: "-0.01em",
                }}
              >
                2
              </span>
            </div>
            <div
              className="stl_01 stl_07"
              style={{
                top: "59.4896em",
                left: "35.5504em",
                position: "absolute",
                whiteSpace: "nowrap",
                msTransform: "matrix(1,0,0,0.9994497,0,-0.8035645)",
                MozTransition: "scale(1,0.9994497)",
                WebkitTransform: "scale(1,0.9994497)",
                transform: "scale(1,0.9994497)",
                OTransform: "scale(1,0.9994497)",
              }}
            >
              <span
                className="stl_08 stl_09"
                style={{
                  wordSpacing: "-0.05em",
                  fontSize: "0.67em",
                  fontFamily: '"NSEIUC+DotumChe"',
                  color: "#000000",
                  lineHeight: "1.014602em",
                  letterSpacing: "-0.01em",
                }}
              >
                10mm×297mm[백상지 80g/㎡] &nbsp;
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default StatementFile;
