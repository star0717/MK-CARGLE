import React, { forwardRef } from "react";
import { NextPage } from "next";

const EstimateFile: NextPage<any> = forwardRef<HTMLDivElement>((props, ref) => {
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
          src="data:image/png;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJfhscf+L3CiFpaAWplSAAAAAElFTkSuQmCC"
          alt=""
          className="stl_04"
          style={{
            width: "100%",
            clip: "rect(4.912918em,45.02246em,55.9855em,4.650792em)",
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
              top: "4.9392em",
              left: "4.9573em",
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
                fontFamily: '"QNGMIB+DotumChe"',
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
              top: "4.9392em",
              left: "5.9568em",
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
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.014602em",
                letterSpacing: "-0.01em",
              }}
            >
              자동차관리법 시행규칙 [별지 제89호의3 서식]{" "}
            </span>
            <span
              className="stl_10 stl_09"
              style={{
                wordSpacing: "-0.02em",
                letterSpacing: "-0.01em",
                fontSize: "0.67em",
                fontFamily: '"QNGMIB+DotumChe"',
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
              top: "7.7887em",
              left: "35.9405em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              일련번호
              <span className="stl_13" style={{ letterSpacing: "0em" }}>
                : &nbsp;
              </span>
            </span>
          </div>
          <div
            className="stl_01 stl_14"
            style={{
              top: "10.1561em",
              left: "34.8811em",
              position: "absolute",
              whiteSpace: "nowrap",
              msTransform: "matrix(1,0,0,0.9994497,0,-2.8)",
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
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              주행거
              <span className="stl_13" style={{ letterSpacing: "0em" }}>
                리 &nbsp;
              </span>
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "9.6167em",
              left: "24.1269em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              차명 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "10.1561em",
              left: "8.8052em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              등록번
              <span className="stl_13" style={{ letterSpacing: "0em" }}>
                호 &nbsp;
              </span>
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "10.1561em",
              left: "43.6064em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              km &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "10.7055em",
              left: "23.7072em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              (
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "10.7055em",
              left: "24.1269em",
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
              className="stl_12"
              style={{
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              차종) &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "11.0152em",
              left: "5.7069em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              차량 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "12.9331em",
              left: "5.2871em",
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
              className="stl_12"
              style={{
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              소유자 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "13.7821em",
              left: "8.3855em",
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
              className="stl_12 stl_13"
              style={{
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
                letterSpacing: "0em",
              }}
            >
              등록년월
              <span className="stl_09" style={{ letterSpacing: "-0.01em" }}>
                일 &nbsp;
              </span>
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "13.7821em",
              left: "23.2974em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              차대번
              <span className="stl_13" style={{ letterSpacing: "0em" }}>
                호 &nbsp;
              </span>
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "16.4193em",
              left: "9.225em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              사업자 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "16.9587em",
              left: "23.4273em",
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
              className="stl_12"
              style={{
                wordSpacing: "-0.06em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              정비업 등록번호 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "17.4981em",
              left: "8.8052em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              등록번
              <span className="stl_13" style={{ letterSpacing: "0em" }}>
                호 &nbsp;
              </span>
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "18.9665em",
              left: "8.5953em",
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
              className="stl_12"
              style={{
                wordSpacing: "-0.02em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              업체명 및 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_15"
            style={{
              top: "20.0453em",
              left: "9.225em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              대표자 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "19.5858em",
              left: "5.7069em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              정비 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_07"
            style={{
              top: "19.6431em",
              left: "31.5629em",
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
              className="stl_16 stl_09"
              style={{
                wordSpacing: "-0.02em",
                letterSpacing: "-0.01em",
                fontSize: "0.67em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#7F7F7F",
                lineHeight: "1.014602em",
              }}
            >
              (서명 또는 인) &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "21.5037em",
              left: "5.2871em",
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
              className="stl_12"
              style={{
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              사업자 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "21.9432em",
              left: "9.6348em",
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
              className="stl_12"
              style={{
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              주소 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_17"
            style={{
              top: "22.5213em",
              left: "34.6312em",
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
              className="stl_18 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              (전화번
              <span className="stl_19" style={{ letterSpacing: "-0.02em" }}>
                호 &nbsp;
              </span>
            </span>
          </div>
          <div
            className="stl_01 stl_17"
            style={{
              top: "22.5213em",
              left: "44.346em",
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
              className="stl_18 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              )
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "24.2607em",
              left: "8.8052em",
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
              className="stl_12"
              style={{
                wordSpacing: "0.8em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              견적구분 [
            </span>
            <span
              className="stl_12"
              style={{
                wordSpacing: "0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              &nbsp;]
            </span>
            <span
              className="stl_12"
              style={{
                wordSpacing: "-0.02em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              &nbsp;보험 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "24.2607em",
              left: "18.2301em",
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
              className="stl_12"
              style={{
                wordSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              [ ] 일반 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_20"
            style={{
              top: "26.0514em",
              left: "5.2472em",
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
              className="stl_21 stl_09"
              style={{
                wordSpacing: "-0.02em",
                letterSpacing: "-0.01em",
                fontSize: "0.92em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.010441em",
              }}
            >
              아래와 같이 견적합니다 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_22"
            style={{
              top: "27.8568em",
              left: "10.1745em",
              position: "absolute",
              whiteSpace: "nowrap",
              msTransform: "matrix(1,0,0,0.9994497,0,-2)",
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
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              견적내
              <span className="stl_13" style={{ letterSpacing: "0em" }}>
                용 &nbsp;
              </span>
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "27.3174em",
              left: "25.0664em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              부품내역
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "27.8568em",
              left: "36.1904em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              공임 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "27.8568em",
              left: "41.3076em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              합계 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "28.3862em",
              left: "20.0791em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              코드 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "28.3862em",
              left: "24.077em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              수량 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "28.3862em",
              left: "27.9549em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              단가 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "28.3862em",
              left: "32.2525em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              계
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "37.2665em",
              left: "5.4371em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              구분(보험ㆍ
              <span className="stl_13" style={{ letterSpacing: "0em" }}>
                일반) &nbsp;
              </span>
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "37.2665em",
              left: "14.9819em",
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
              className="stl_12"
              style={{
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              부품 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "37.2665em",
              left: "21.0886em",
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
              className="stl_12"
              style={{
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              공임 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "37.2665em",
              left: "27.8449em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              계
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "37.2665em",
              left: "32.8622em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              부가가치세 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "37.2665em",
              left: "40.7279em",
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
              className="stl_12"
              style={{
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              총액 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_20"
            style={{
              top: "39.7465em",
              left: "5.4071em",
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
              className="stl_21 stl_23"
              style={{
                wordSpacing: "-0.02em",
                fontSize: "0.92em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.010441em",
                letterSpacing: "-0.06em",
              }}
            >
              「자동차관리법」 제58조제4항 및 같은 법 시행규칙 제134조제2항에
              따라 위와
            </span>
            <span
              className="stl_21 stl_23"
              style={{
                wordSpacing: "0.48em",
                fontSize: "0.92em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.010441em",
                letterSpacing: "-0.06em",
              }}
            >
              &nbsp;같이
            </span>
            <span
              className="stl_21 stl_23"
              style={{
                wordSpacing: "-0.02em",
                fontSize: "0.92em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.010441em",
                letterSpacing: "-0.06em",
              }}
            >
              &nbsp;발급합니다. &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_17"
            style={{
              top: "41.8602em",
              left: "38.3692em",
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
              className="stl_18 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              년
            </span>
          </div>
          <div
            className="stl_01 stl_17"
            style={{
              top: "41.8602em",
              left: "41.3576em",
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
              className="stl_18 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              월
            </span>
          </div>
          <div
            className="stl_01 stl_17"
            style={{
              top: "41.8602em",
              left: "43.9762em",
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
              className="stl_18 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              일
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "44.1789em",
              left: "25.4862em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
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
              top: "44.3162em",
              left: "40.0583em",
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
              className="stl_16 stl_09"
              style={{
                wordSpacing: "-0.02em",
                letterSpacing: "-0.01em",
                fontSize: "0.67em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#7F7F7F",
                lineHeight: "1.014602em",
              }}
            >
              (서명 또는 인) &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_24"
            style={{
              top: "45.5648em",
              left: "40.0583em",
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
              className="stl_16 stl_09"
              style={{
                wordSpacing: "-0.02em",
                letterSpacing: "-0.01em",
                fontSize: "0.67em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#7F7F7F",
                lineHeight: "1.014602em",
              }}
            >
              (서명 또는 인) &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "45.4276em",
              left: "24.6466em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              대표이
              <span className="stl_13" style={{ letterSpacing: "0em" }}>
                사 &nbsp;
              </span>
            </span>
          </div>
          <div
            className="stl_01 stl_11"
            style={{
              top: "46.5863em",
              left: "23.1674em",
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
              className="stl_12 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.83em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.011647em",
              }}
            >
              안내사
              <span className="stl_13" style={{ letterSpacing: "0em" }}>
                항 &nbsp;
              </span>
            </span>
          </div>
          <div
            className="stl_01 stl_15"
            style={{
              top: "47.6838em",
              left: "5.7064em",
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
              className="stl_18"
              style={{
                wordSpacing: "-0.05em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              . 견적요금은 교통사고 등의 처리를 목적으로 견적서를 발행한 경우에
              청구가 가능합니다. &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_15"
            style={{
              top: "48.7327em",
              left: "5.7064em",
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
              className="stl_18 stl_09"
              style={{
                wordSpacing: "0em",
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              . 본 견적서는 교부일로부터 1개월간 유효합
              <span className="stl_19" style={{ letterSpacing: "-0.02em" }}>
                니다. &nbsp;
              </span>
            </span>
          </div>
          <div
            className="stl_01 stl_17"
            style={{
              top: "47.6838em",
              left: "5.3271em",
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
              className="stl_18 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              1
            </span>
          </div>
          <div
            className="stl_01 stl_15"
            style={{
              top: "48.7327em",
              left: "5.3271em",
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
              className="stl_18 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              2
            </span>
          </div>
          <div
            className="stl_01 stl_15"
            style={{
              top: "49.7815em",
              left: "5.3271em",
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
              className="stl_18 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              3
            </span>
          </div>
          <div
            className="stl_01 stl_17"
            style={{
              top: "49.7815em",
              left: "5.7064em",
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
              className="stl_18"
              style={{
                wordSpacing: "-0.07em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              . 본 견적서에 포함되지 아니한 부품을 추가 시에는 소비자의 동의를
              받아야 하며, 정비의뢰자는 동의한 부품 및 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_17"
            style={{
              top: "50.8304em",
              left: "6.5065em",
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
              className="stl_18 stl_09"
              style={{
                wordSpacing: "-0.01em",
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              작업부분만 금액을 지불합니다. &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_17"
            style={{
              top: "51.8792em",
              left: "5.3271em",
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
              className="stl_18 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              4
            </span>
          </div>
          <div
            className="stl_01 stl_15"
            style={{
              top: "52.9281em",
              left: "5.3271em",
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
              className="stl_18 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              5
            </span>
          </div>
          <div
            className="stl_01 stl_15"
            style={{
              top: "53.9769em",
              left: "5.3271em",
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
              className="stl_18 stl_09"
              style={{
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              6
            </span>
          </div>
          <div
            className="stl_01 stl_17"
            style={{
              top: "51.8792em",
              left: "5.7064em",
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
              className="stl_18"
              style={{
                wordSpacing: "-0.05em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              . 공급자의 직인이 없는 것은 무효로 합니다. &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_17"
            style={{
              top: "52.9281em",
              left: "5.7064em",
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
              className="stl_18"
              style={{
                wordSpacing: "-0.07em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              . 부품가는 견적일자 기준입니다. &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_17"
            style={{
              top: "53.9769em",
              left: "5.7064em",
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
              className="stl_18 stl_09"
              style={{
                wordSpacing: "-0.11em",
                letterSpacing: "-0.01em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              . 본 견적서는 2부를 작성, 정비의뢰자에게 1부를 교부하고,
              정비업자는 1부를 1년간 문서 또는 전산자료로 보관하 &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_15"
            style={{
              top: "55.0258em",
              left: "6.4765em",
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
              className="stl_18"
              style={{
                wordSpacing: "-0.06em",
                fontSize: "0.75em",
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.012964em",
              }}
            >
              여야 합니다. &nbsp;
            </span>
          </div>
          <div
            className="stl_01 stl_07"
            style={{
              top: "56.5029em",
              left: "35.7306em",
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
                fontFamily: '"QNGMIB+DotumChe"',
                color: "#000000",
                lineHeight: "1.014602em",
                letterSpacing: "-0.01em",
              }}
            >
              210mm×297mm[백상지 80g/㎡] &nbsp;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default EstimateFile;
