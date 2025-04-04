"use client";
import React, { useState, useRef, useEffect } from "react";

import { RiErrorWarningLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import {
  DateRangeCalendar,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePickerDay } from "@mui/x-date-pickers-pro/DateRangePickerDay";
import ChooseQuantityPerson from "./ChooseQuantityPerson";

interface IProps {
  price: number;
}

const InforBookingContainer: React.FC<IProps> = ({ price }) => {
  const [showChoosePerson, setShowChoosePerson] = useState<boolean>(false);
  const [showDateRange, setShowDateRange] = useState<boolean>(false);
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([dayjs("2022-04-17"), dayjs("2022-04-21")]);
  const choosePersonRef = useRef<HTMLDivElement>(null);
  const [traveler, setTraveler] = useState<number>(2);
  const calendarRef = useRef<HTMLDivElement>(null);

  // handle click outside to close the calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowDateRange(false); // Ẩn lịch khi click ra ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowDateRange = () => {
    setShowDateRange(!showDateRange);
  };

  const handleCheckDate = (newValue: [Dayjs | null, Dayjs | null]) => {
    // Kiểm tra nếu khoảng thời gian hợp lệ
    const [startDate, endDate] = newValue;

    if (startDate && endDate) {
      const disabledDates = [
        dayjs("2022-04-20"),
        dayjs("2022-04-22"),
        dayjs("2022-04-25"),
      ];

      // Kiểm tra nếu bất kỳ ngày nào trong khoảng bị vô hiệu hóa
      const isRangeValid = !disabledDates.some(
        (disabledDate) =>
          disabledDate.isSame(startDate, "day") || // Kiểm tra nếu trùng với ngày bắt đầu
          disabledDate.isSame(endDate, "day") || // Kiểm tra nếu trùng với ngày kết thúc
          (disabledDate.isAfter(startDate, "day") &&
            disabledDate.isBefore(endDate, "day")) // Kiểm tra nếu nằm giữa khoảng
      );

      if (!isRangeValid) {
        alert("Khoảng thời gian bạn chọn có ngày không hợp lệ!");
        // console.log("Khoảng thời gian bạn chọn có ngày không hợp lệ!");
        return false; // Không cập nhật state nếu khoảng không hợp lệ
      }
    }
    return true;
  };

  const handleSubmit = () => {
    const check = handleCheckDate(selectedDateRange);

    if (check) {
      // console.log(selectedDateRange[0]);

      console.log("Start Date:", selectedDateRange[0]?.format("YYYY-MM-DD"));
      console.log("End Date:", selectedDateRange[1]?.format("YYYY-MM-DD"));
      handleShowDateRange();
    }
  };

  const handleShowChoosePerson = () => {
    setShowChoosePerson((prev) => !prev);
  };

  // Lắng nghe sự kiện click bên ngoài thẻ div
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        choosePersonRef.current &&
        !choosePersonRef.current.contains(event.target as Node)
      ) {
        setShowChoosePerson(false); // Đặt lại giá trị showChoosePerson
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSetTravelers = (adults: number, children: number) => {
    setTraveler(adults + children);
  };

  return (
    <div className="border-[1px] border-gray-300 rounded-xl p-5 shadow-sm">
      <p className="text-xl font-semibold flex items-center gap-1 pb-2">
        {Number(price).toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
        <span className="text-sm font-medium">mỗi đêm</span>
      </p>

      <div className="flex items-center gap-1 border-t-[1px] pt-3 text-sm text-green-700">
        <p>Đặt ngay hôm nay</p>

        <RiErrorWarningLine size={20} />
      </div>

      {/* <p className="text-[11px] mt-1">Before Wed, Apr 2</p> */}

      <div className="flex gap-2 items-center mt-2">
        <FaCheckCircle className="text-green-700" />
        <p className="text-sm">Hãy chọn ngày mong muốn của bạn</p>
      </div>

      <div className="flex gap-2 items-center mt-2">
        <div
          onClick={handleShowDateRange}
          className="flex items-center gap-2 rounded-md border-[1px] border-gray-500 p-1 px-3 mt-4 flex-1 cursor-pointer"
        >
          <AiOutlineCalendar size={25} />
          <div>
            <p className="text-[11px]">Start date</p>
            <p className="text-[16px]">
              {selectedDateRange[0]?.format("DD/MM/YYYY") || "Chọn ngày"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-md border-[1px] border-gray-500 p-1 px-3 mt-4 flex-1 cursor-pointer ralative">
          <AiOutlineCalendar size={25} />
          <div>
            <p className="text-[11px]">End date</p>
            <p className="text-[16px]">
              {selectedDateRange[1]?.format("DD/MM/YYYY") || "Chọn ngày"}
            </p>
          </div>

          {showDateRange && (
            <div
              ref={calendarRef}
              className="absolute top-100 right-[320px] bg-white rounded-md shadow-md z-10"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangeCalendar
                  defaultValue={selectedDateRange}
                  onChange={(newValue) => setSelectedDateRange(newValue)}
                  slots={{ day: DateRangePickerDay }}
                  shouldDisableDate={(date) => {
                    // Vô hiệu hóa các ngày cụ thể
                    const disabledDates = [
                      dayjs("2022-04-20"),
                      dayjs("2022-04-22"),
                      dayjs("2022-04-25"),
                    ];
                    return disabledDates.some((disabledDate) =>
                      date.isSame(disabledDate, "day")
                    );
                  }}
                />
              </LocalizationProvider>

              <div className="flex justify-end gap-2 items-center px-4 py-2 border-t-[1px] border-gray-300">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-8 font-semibold py-2 rounded-3xl mt-2"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        onClick={() => handleShowChoosePerson()}
        className="ralative border-[1px] border-gray-500 p-1 px-3 mt-4 flex-1 cursor-pointer rounded-md"
      >
        <p className="text-[11px]">Travelrs</p>
        <p className="text-md">{traveler} travelers</p>

        {showChoosePerson && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-[-200px] right-[340px]"
            ref={choosePersonRef}
          >
            <ChooseQuantityPerson
              onShowChoosePerson={setShowChoosePerson}
              onChangeTraveler={handleSetTravelers}
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="font-semibold">Thành tiền: </p>
        <p className="text-blue-600 font-semibold">
          {selectedDateRange[0] && selectedDateRange[1]
            ? Number(
                price *
                  Math.abs(
                    selectedDateRange[1].diff(selectedDateRange[0], "day")
                  )
              ).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            : "0 VND"}
        </p>
      </div>

      <button className="w-full bg-blue-600 text-md font-semibold text-white py-2 mt-4 rounded-3xl">
        Check availability
      </button>
    </div>
  );
};

export default InforBookingContainer;
