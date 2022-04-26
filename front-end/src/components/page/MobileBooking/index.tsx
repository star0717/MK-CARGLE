import React, { useState } from "react";
import { NextPage } from "next";
import {
  CommonButton,
  MoTextInput,
  MoWrapper,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { MobileRoute } from "src/configure/router.entity";
import { useRouter } from "next/router";
import theme from "styles/theme";
import Image from "next/image";
import { Agency } from "src/models/agency.entity";
import { SubmitHandler, useForm } from "react-hook-form";
import { formRegEx } from "src/validation/regEx";
import { FindParameters } from "src/models/base.entity";
import { BookingState } from "src/constants/booking.const";
import dayjs from "dayjs";
import { BookingFindOptions } from "src/models/booking.entity";
import { MainCar } from "src/models/maintenance.entity";
import { Company } from "src/models/company.entity";

const MobileCarSelect: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  /**
   * 차량 접수 handler
   * @param data
   */

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [reciptCarNum, setReciptCarNum] = useState<string>("");
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
    <WholeWrapper>
      <MoWrapper bgColor={theme.subWhite_C} ju={`flex-start`}>
        <Wrapper al={`flex-start`} margin={`80px 0px 20px 0px`}>
          <Image
            src="/images/mainLogo.png"
            alt="Cargle Logo"
            width={120}
            height={36}
            priority
          />
          <Text
            textAlign={`left`}
            fontSize={`24px`}
            color={theme.black_C}
            margin={`20px 0px 0px`}
          >
            안녕하세요
            <br />
            000입니다.
            <br />
            차량번호를 입력해주세요.
          </Text>
        </Wrapper>
        <Wrapper width={`100%`}>
          <form style={{ width: "100%" }}>
            <MoTextInput
              bgColor={theme.subWhite_C}
              margin={`30px 0px 0px 0px`}
              placeholder="123가1234"
              fontSize={`20px`}
              value={reciptCarNum}
              {...register("reciptCarNum", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setReciptCarNum(e.target.value);
                },
                required: {
                  value: true,
                  message: "차량번호를 입력하세요.",
                },
                pattern: {
                  value: formRegEx.CAR_NUM,
                  message: "형식에 맞게 입력하세요.",
                },
              })}
            />
            {(errors.reciptCarNum?.type === "required" ||
              errors.reciptCarNum?.type === "pattern") && (
              <Text
                width={`100%`}
                color={`#d6263b`}
                al={`flex-start`}
                fontSize={`14px`}
                textAlign={`left`}
              >
                {errors.reciptCarNum.message}
              </Text>
            )}
          </form>
        </Wrapper>
        <CommonButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            router.push(MobileRoute.m_car_info);
          }}
          width={`100%`}
          margin={`20px 0px 0px`}
          height={`50px`}
        >
          확인
        </CommonButton>
      </MoWrapper>
    </WholeWrapper>
  );
};

export default MobileCarSelect;
