import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dayjs } from 'dayjs';

interface RoomAvailabilityProps {
  accommodationId: number;
  roomId: number;
  checkInDate: Dayjs | null;
  checkOutDate: Dayjs | null;
  onAvailabilityCheck: (isAvailable: boolean) => void;
}

interface RoomAvailabilityResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    reservable: boolean;
  };
}

const RoomAvailability = ({
  accommodationId,
  roomId,
  checkInDate,
  checkOutDate,
  onAvailabilityCheck,
}: RoomAvailabilityProps) => {
  const url = `https://yusuengdo.ddns.net/open-api/accommodation/${accommodationId}/room/${roomId}/is-reservable`;
  const body = {
    checkIn: checkInDate,
    checkOut: checkOutDate,
  };

  const [responseData, setResponseData] =
    useState<RoomAvailabilityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post<RoomAvailabilityResponse>(url, body, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setResponseData(response.data);
        onAvailabilityCheck(
          response.data.resultCode === 200 &&
            response.data.data.reservable === true,
        );
      } catch (error) {
        setError(error.message);
        onAvailabilityCheck(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (checkInDate && checkOutDate) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkInDate, checkOutDate]); // Re-run when dates change

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>예약이 불가능합니다</div>;
  if (!responseData) return null;

  return (
    <div>
      {responseData.resultCode === 200 && responseData.data.reservable
        ? '예약이 가능합니다'
        : '예약이 불가능합니다'}
    </div>
  );
};

export default RoomAvailability;
