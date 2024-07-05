// 'use client';

// import { useState } from 'react';
// import styled from 'styled-components';
// import DatePicker from 'react-datepicker';
// import Link from 'next/link';
// import 'react-datepicker/dist/react-datepicker.css';
// import Buttons from './Buttons';
// import ImageModal from './ImageModal';
// import IconsImport from './IconsImport';

// interface SelectRoomProps {
//   title: string;
//   MaxCount: number;
//   fee: number;
//   images: string[];
//   icons: {
//     bath: string;
//     hometheater: string;
//     aircondition: string;
//     tv: string;
//     pc: string;
//     cable: string;
//     internet: string;
//     refrigerator: string;
//     toiletries: string;
//     sofa: string;
//     cook: string;
//     table: string;
//     hairdryer: string;
//   };
// }

// const SelectRoom = ({
//   title,
//   MaxCount,
//   fee,
//   images,
//   icons,
// }: SelectRoomProps) => {
//   const [startDate, setStartDate] = useState<Date>(new Date());
//   const [endDate, setEndDate] = useState<Date>(new Date());
//   const [selectPerson, setSelectPerson] = useState<number>(2);
//   const [ModalOpen, setModalOpen] = useState<boolean>(false);
//   const [currentPrice, setcurrentPrice] = useState<number>(fee);

//   const handlePlus = () => {
//     if (selectPerson < MaxCount) {
//       setSelectPerson(selectPerson + 1);
//       setcurrentPrice(currentPrice + 50000);
//     }
//   };

//   const handleMinus = () => {
//     if (selectPerson > 2) {
//       setSelectPerson(selectPerson - 1);
//       setcurrentPrice(currentPrice - 50000);
//     }
//   };

//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   return (
//     <Container>
//       <ImageContainer>
//         {images.slice(0, 3).map((image, index) => (
//           <StyledImage key={index} image={image} blur={false} />
//         ))}
//         <BlurImageContainer onClick={handleModalOpen}>
//           <StyledImage image={images[3]} blur />
//           <PlusBox>
//             <PlusSign>+</PlusSign>
//           </PlusBox>
//         </BlurImageContainer>
//       </ImageContainer>

//       <Content>
//         <Title>{title}</Title>
//         <Subtitle>2인 기준, 최대 {MaxCount}인</Subtitle>
//         <Description>기준 인원 초과 시 1인 50,000원 추가</Description>
//         <Amenities>
//           편의시설:
//           <IconsImport icons={icons} />
//         </Amenities>
//       </Content>
//       <PriceSection>
//         <Price>{currentPrice.toLocaleString()}원</Price>
//         <DateSelection>
//           <StyledDatePicker
//             selected={startDate}
//             onChange={(date: Date | null) => setStartDate(date || new Date())}
//             selectsStart
//             startDate={startDate}
//             endDate={endDate}
//             dateFormat="yy년 MM월 dd일"
//           />
//           <span>~</span>
//           <StyledDatePicker
//             selected={endDate}
//             onChange={(date: Date | null) => setEndDate(date || new Date())}
//             selectsEnd
//             startDate={startDate}
//             endDate={endDate}
//             minDate={startDate}
//             dateFormat="yy년 MM월 dd일"
//           />
//         </DateSelection>
//         <GuestSelection>
//           <GuestCounter>
//             <Button onClick={handleMinus}>-</Button>
//             <GuestCount>{selectPerson} 인</GuestCount>
//             <Button onClick={handlePlus}>+</Button>
//           </GuestCounter>
//         </GuestSelection>
//         <PaymentButtonContainer>
//           <Link href="/detail">
//             <Buttons label="예약하기" fullWidth={false} />
//           </Link>
//         </PaymentButtonContainer>
//       </PriceSection>
//       <ImageModal
//         isOpen={ModalOpen}
//         onClose={handleModalClose}
//         images={images}
//       />
//     </Container>
//   );
// };

// export default SelectRoom;

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   border: 1px solid #7d7d7d;
//   box-shadow: 5px 5px 10px 0 #e5e5ec;
//   padding: 10px;
//   width: 1680px;
//   margin: 40px;
// `;

// const ImageContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-template-rows: repeat(2, 1fr);
//   gap: 10px;
//   padding: 10px;
// `;

// const BlurImageContainer = styled.div`
//   position: relative;
//   width: 250px;
//   height: 130px;
//   cursor: pointer;
// `;

// interface StyledImageProps {
//   image: string;
//   blur: boolean;
// }

// const StyledImage = styled.div<StyledImageProps>`
//   width: 250px;
//   height: 130px;
//   background-image: url(${(props) => props.image});
//   background-size: cover;
//   background-position: center;
//   filter: ${(props) => (props.blur ? 'blur(1px)' : 'none')};
// `;

// const PlusBox = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 80px;
//   height: 60px;
//   background-color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid black;
//   border-radius: 8px;
//   & :hover {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: #f85b2b;
//   }
// `;

// const PlusSign = styled.div`
//   font-size: 48px;
//   color: #000;
// `;

// const Content = styled.div`
//   flex: 1;
//   padding: 10px;
// `;

// const Title = styled.h2`
//   margin: 0;
// `;

// const Subtitle = styled.h3`
//   margin: 5px 0;
// `;

// const Description = styled.p`
//   margin: 5px 0;
// `;

// const Amenities = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
//   font-size: 20px;
//   line-height: 50px;
// `;

// const PriceSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   padding: 10px;
// `;

// const Price = styled.div`
//   font-size: 24px;
//   font-weight: bold;
//   margin-bottom: 10px;
// `;

// const DateSelection = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;

//   .react-datepicker-wrapper {
//     width: auto;
//   }
// `;

// const GuestSelection = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const PaymentButtonContainer = styled.div`
//   margin: 10px;
// `;

// const GuestCounter = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: 10px;
// `;

// const Button = styled.button`
//   width: 45px;
//   height: 30px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
//   margin: 0 10px;
//   padding: 5px 10px;
//   &:hover {
//     background-color: #0070f3;
//     color: white;
//   }
// `;

// const GuestCount = styled.div`
//   width: 200px;
//   height: 30px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
//   margin: 0 10px;
//   padding: 0 10px;
//   align-items: center;
//   justify-content: center;
//   display: flex;
// `;

// const StyledDatePicker = styled(DatePicker)`
//   width: 150px;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
//   margin: 0 10px;
//   cursor: pointer;

//   .react-datepicker__input-container input {
//     width: 100%;
//     border: none;
//   }

//   .react-datepicker {
//     font-size: 16px;
//   }

//   .react-datepicker__header {
//     background-color: #f85b2b;
//     border-bottom: none;
//   }

//   .react-datepicker__current-month {
//     color: white;
//   }

//   .react-datepicker__day--selected {
//     background-color: #f85b2b;
//   }

//   .react-datepicker__day--keyboard-selected {
//     background-color: #f85b2b;
//   }
// `;



// import { useState } from 'react';
// import styled from 'styled-components';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Link from 'next/link';
// import Buttons from './Buttons';
// import ImageModal from './ImageModal';
// import IconsImport from './IconsImport';
// import MiniCalendarStart from './MiniCalendarStart'; // Import MiniCalendarStart component

// interface SelectRoomProps {
//   title: string;
//   MaxCount: number;
//   fee: number;
//   images: string[];
//   icons: {
//     bath: string;
//     hometheater: string;
//     aircondition: string;
//     tv: string;
//     pc: string;
//     cable: string;
//     internet: string;
//     refrigerator: string;
//     toiletries: string;
//     sofa: string;
//     cook: string;
//     table: string;
//     hairdryer: string;
//   };
// }

// const SelectRoom = ({
//   title,
//   MaxCount,
//   fee,
//   images,
//   icons,
// }: SelectRoomProps) => {
//   const [selectPerson, setSelectPerson] = useState<number>(2);
//   const [ModalOpen, setModalOpen] = useState<boolean>(false);
//   const [currentPrice, setcurrentPrice] = useState<number>(fee);
//   const [startDate, setStartDate] = useState<Date>(new Date());
//   const [endDate, setEndDate] = useState<Date>(new Date());

//   const handlePlus = () => {
//     if (selectPerson < MaxCount) {
//       setSelectPerson(selectPerson + 1);
//       setcurrentPrice(currentPrice + 50000);
//     }
//   };

//   const handleMinus = () => {
//     if (selectPerson > 2) {
//       setSelectPerson(selectPerson - 1);
//       setcurrentPrice(currentPrice - 50000);
//     }
//   };

//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   const handleDayClick = (day: Date) => {
//     // Logic to handle selected date
//     console.log('Selected day:', day);
//     setStartDate(day); // Example: Setting the start date
//   };

//   return (
//     <Container>
//       <ImageContainer>
//         {images.slice(0, 3).map((image, index) => (
//           <StyledImage key={index} image={image} blur={false} />
//         ))}
//         <BlurImageContainer onClick={handleModalOpen}>
//           <StyledImage image={images[3]} blur />
//           <PlusBox>
//             <PlusSign>+</PlusSign>
//           </PlusBox>
//         </BlurImageContainer>
//       </ImageContainer>

//       <Content>
//         <Title>{title}</Title>
//         <Subtitle>2인 기준, 최대 {MaxCount}인</Subtitle>
//         <Description>기준 인원 초과 시 1인 50,000원 추가</Description>
//         <Amenities>
//           편의시설:
//           <IconsImport icons={icons} />
//         </Amenities>
//       </Content>
//       <PriceSection>
//         <Price>{currentPrice.toLocaleString()}원</Price>

//         {/* Render MiniCalendarStart here */}
//         <MiniCalendarStart
//           onDayClick={handleDayClick}
//           setMiniStartOpen={() => {}} // Replace with actual open handler if needed
//         />

//         <GuestSelection>
//           <GuestCounter>
//             <Button onClick={handleMinus}>-</Button>
//             <GuestCount>{selectPerson} 인</GuestCount>
//             <Button onClick={handlePlus}>+</Button>
//           </GuestCounter>
//         </GuestSelection>
//         <PaymentButtonContainer>
//           <Link href="/detail">
//             <Buttons label="예약하기" fullWidth={false} />
//           </Link>
//         </PaymentButtonContainer>
//       </PriceSection>
//       <ImageModal
//         isOpen={ModalOpen}
//         onClose={handleModalClose}
//         images={images}
//       />
//     </Container>
//   );
// };

// export default SelectRoom;

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   border: 1px solid #7d7d7d;
//   box-shadow: 5px 5px 10px 0 #e5e5ec;
//   padding: 10px;
//   width: 1680px;
//   margin: 40px;
// `;

// const ImageContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-template-rows: repeat(2, 1fr);
//   gap: 10px;
//   padding: 10px;
// `;

// const BlurImageContainer = styled.div`
//   position: relative;
//   width: 250px;
//   height: 130px;
//   cursor: pointer;
// `;

// interface StyledImageProps {
//   image: string;
//   blur: boolean;
// }

// const StyledImage = styled.div<StyledImageProps>`
//   width: 250px;
//   height: 130px;
//   background-image: url(${(props) => props.image});
//   background-size: cover;
//   background-position: center;
//   filter: ${(props) => (props.blur ? 'blur(1px)' : 'none')};
// `;

// const PlusBox = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 80px;
//   height: 60px;
//   background-color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid black;
//   border-radius: 8px;
//   & :hover {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: #f85b2b;
//   }
// `;

// const PlusSign = styled.div`
//   font-size: 48px;
//   color: #000;
// `;

// const Content = styled.div`
//   flex: 1;
//   padding: 10px;
// `;

// const Title = styled.h2`
//   margin: 0;
// `;

// const Subtitle = styled.h3`
//   margin: 5px 0;
// `;

// const Description = styled.p`
//   margin: 5px 0;
// `;

// const Amenities = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
//   font-size: 20px;
//   line-height: 50px;
// `;

// const PriceSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   padding: 10px;
// `;

// const Price = styled.div`
//   font-size: 24px;
//   font-weight: bold;
//   margin-bottom: 10px;
// `;

// const DateSelection = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;

//   .react-datepicker-wrapper {
//     width: auto;
//   }
// `;

// const GuestSelection = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const PaymentButtonContainer = styled.div`
//   margin: 10px;
// `;

// const GuestCounter = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: 10px;
// `;

// const Button = styled.button`
//   width: 45px;
//   height: 30px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
//   margin: 0 10px;
//   padding: 5px 10px;
//   &:hover {
//     background-color: #0070f3;
//     color: white;
//   }
// `;

// const GuestCount = styled.div`
//   width: 200px;
//   height: 30px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
//   margin: 0 10px;
//   padding: 0 10px;
//   align-items: center;
//   justify-content: center;
//   display: flex;
// `;

// const StyledDatePicker = styled(DatePicker)`
//   width: 150px;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
//   margin: 0 10px;
//   cursor: pointer;

//   .react-datepicker__input-container input {
//     width: 100%;
//     border: none;
//   }

//   .react-datepicker {
//     font-size: 16px;
//   }

//   .react-datepicker__header {
//     background-color: #f85b2b;
//     border-bottom: none;
//   }

//   .react-datepicker__current-month {
//     color: white;
//   }

//   .react-datepicker__day--selected {
//     background-color: #f85b2b;
//   }

//   .react-datepicker__day--keyboard-selected {
//     background-color: #f85b2b;
//   }
// `;



import { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';
import Buttons from './Buttons';
import ImageModal from './ImageModal';
import IconsImport from './IconsImport';
import MiniCalendarStart from './MiniCalendarStart'; // Import MiniCalendarStart component

interface SelectRoomProps {
  title: string;
  MaxCount: number;
  fee: number;
  images: string[];
  icons: {
    bath: string;
    hometheater: string;
    aircondition: string;
    tv: string;
    pc: string;
    cable: string;
    internet: string;
    refrigerator: string;
    toiletries: string;
    sofa: string;
    cook: string;
    table: string;
    hairdryer: string;
  };
}

const SelectRoom = ({
  title,
  MaxCount,
  fee,
  images,
  icons,
}: SelectRoomProps) => {
  const [selectPerson, setSelectPerson] = useState<number>(2);
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [currentPrice, setcurrentPrice] = useState<number>(fee);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handlePlus = () => {
    if (selectPerson < MaxCount) {
      setSelectPerson(selectPerson + 1);
      setcurrentPrice(currentPrice + 50000);
    }
  };

  const handleMinus = () => {
    if (selectPerson > 2) {
      setSelectPerson(selectPerson - 1);
      setcurrentPrice(currentPrice - 50000);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDayClick = (day: Date) => {
    // Logic to handle selected date
    console.log('Selected day:', day);
    setStartDate(day); // Example: Setting the start date
  };

  return (
    <Container>
      <ImageContainer>
        {images.slice(0, 3).map((image, index) => (
          <StyledImage key={index} image={image} blur={false} />
        ))}
        <BlurImageContainer onClick={handleModalOpen}>
          <StyledImage image={images[3]} blur />
          <PlusBox>
            <PlusSign>+</PlusSign>
          </PlusBox>
        </BlurImageContainer>
      </ImageContainer>

      <Content>
        <Title>{title}</Title>
        <Subtitle>2인 기준, 최대 {MaxCount}인</Subtitle>
        <Description>기준 인원 초과 시 1인 50,000원 추가</Description>
        <Amenities>
          편의시설:
          <IconsImport icons={icons} />
        </Amenities>
      </Content>
      <PriceSection>
        <Price>{currentPrice.toLocaleString()}원</Price>

        {/* Render MiniCalendarStart here */}
        <MiniCalendarStart
          onDayClick={handleDayClick}
          setMiniStartOpen={() => {}} // Replace with actual open handler if needed
        />

        <GuestSelection>
          <GuestCounter>
            <Button onClick={handleMinus}>-</Button>
            <GuestCount>{selectPerson} 인</GuestCount>
            <Button onClick={handlePlus}>+</Button>
          </GuestCounter>
        </GuestSelection>
        <PaymentButtonContainer>
          <Link href="/detail">
            <Buttons label="예약하기" fullWidth={false} />
          </Link>
        </PaymentButtonContainer>
      </PriceSection>
      <ImageModal
        isOpen={ModalOpen}
        onClose={handleModalClose}
        images={images}
      />
    </Container>
  );
};

export default SelectRoom;

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #7d7d7d;
  box-shadow: 5px 5px 10px 0 #e5e5ec;
  padding: 10px;
  width: 1680px;
  margin: 40px;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  padding: 10px;
`;

const BlurImageContainer = styled.div`
  position: relative;
  width: 250px;
  height: 130px;
  cursor: pointer;
`;

interface StyledImageProps {
  image: string;
  blur: boolean;
}

const StyledImage = styled.div<StyledImageProps>`
  width: 250px;
  height: 130px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  filter: ${(props) => (props.blur ? 'blur(1px)' : 'none')};
`;

const PlusBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 8px;
  & :hover {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f85b2b;
  }
`;

const PlusSign = styled.div`
  font-size: 48px;
  color: #000;
`;

const Content = styled.div`
  flex: 1;
  padding: 10px;
`;

const Title = styled.h2`
  margin: 0;
`;

const Subtitle = styled.h3`
  margin: 5px 0;
`;

const Description = styled.p`
  margin: 5px 0;
`;

const Amenities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 20px;
  line-height: 50px;
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;


const GuestSelection = styled.div`
  display: flex;
  align-items: center;
`;

const PaymentButtonContainer = styled.div`
  margin: 10px;
`;

const GuestCounter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Button = styled.button`
  width: 45px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin: 0 10px;
  padding: 5px 10px;
  &:hover {
    background-color: #0070f3;
    color: white;
  }
`;

const GuestCount = styled.div`
  width: 200px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin: 0 10px;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  display: flex;
`;
