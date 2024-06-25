// 'use client';

// import { useState } from 'react';
// import styled from 'styled-components';
// import Image from 'next/image';
// import DatePicker from 'react-datepicker';
// import src from '../../public/images/mainBannerImage.jpg';
// import 'react-datepicker/dist/react-datepicker.css';
// import ImageModal from './ImageModal';

// // eslint-disable-next-line react/function-component-definition
// const SelectRoom = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [selectPerson, setSelectPerson] = useState(1);
//   const [ModalOpen, setModalOpen] = useState<boolean>(false);

//   const handlePlus = () => {
//     if (selectPerson < 10) {
//       setSelectPerson(selectPerson + 1);
//     }
//   };

//   const handleMinus = () => {
//     if (selectPerson > 1) {
//       setSelectPerson(selectPerson - 1);
//     }
//   };
  
//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };
//   return (
//     <Container>
//       <ImageContainer> 
//         <StyledImage src={src} alt="임시 이미지" />
//         <StyledImage src={src} alt="임시 이미지" />
//         <StyledImage src={src} alt="임시 이미지" />
//         <BlurImageContainer>
//           <StyledImage src={src} alt="임시 이미지"/>
//           <PlusBox>
//             <PlusSign>+</PlusSign>
//           </PlusBox>
//         </BlurImageContainer>
//       </ImageContainer>
//       <Content>
//         <Title>게스트하우스</Title>
//         <Subtitle>2인 기준, 최대 10인</Subtitle>
//         <Description>기준 인원 초과 시 1인 50,000원 추가</Description>
//         <Amenities>
//           <span>(아이콘) Wi-Fi (무료)</span>
//           <span>(아이콘) 객실 내 안전 금고</span>
//           <span>(아이콘) 거실</span>
//           <span>(아이콘) 금연</span>
//           <span>(아이콘) 냉장고</span>
//         </Amenities>
//       </Content>
//       <PriceSection>
//         <Price>500,000원</Price>
//         <DateSelection>
//           <StyledDatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             selectsStart
//             startDate={startDate}
//             endDate={endDate}
//             dateFormat="yyyy.MM.dd"
//           />
//           <span>~</span>
//           <StyledDatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             selectsEnd
//             startDate={startDate}
//             endDate={endDate}
//             minDate={startDate}
//             dateFormat="yyyy.MM.dd"
//           />
//         </DateSelection>
//         <GuestSelection>
//           <span>(아이콘)</span>
//           <GuestCounter>
//             <Button onClick={handleMinus}>-</Button>
//             <GuestCount>{selectPerson}</GuestCount>
//             <Button onClick={handlePlus}>+</Button>
//           </GuestCounter>
//         </GuestSelection>
//       </PriceSection>
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

// const StyledImage = styled(Image)`
//   width: 250px;
//   height: 130px;
//   filter: blur(1px);
// `;

// const PlusBox = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 100px;
//   height: 80px;
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

//   .react-datepicker__input-container input {
//     width: 100%;
//     border: none;
//   }

//   .react-datepicker {
//     font-size: 16px;
//   }

//   .react-datepicker__header {
//     background-color: #f0f0f0;
//   }

//   .react-datepicker__day--selected {
//     background-color: #0052cc;
//     color: white;
//   }

//   .react-datepicker__day--keyboard-selected {
//     background-color: #0052cc;
//     color: white;
//   }
// `;
'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import src from '../../public/images/mainBannerImage.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import ImageModal from './ImageModal';

// eslint-disable-next-line react/function-component-definition
const SelectRoom = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectPerson, setSelectPerson] = useState(1);
  const [ModalOpen, setModalOpen] = useState<boolean>(false);

  const handlePlus = () => {
    if (selectPerson < 10) {
      setSelectPerson(selectPerson + 1);
    }
  };

  const handleMinus = () => {
    if (selectPerson > 1) {
      setSelectPerson(selectPerson - 1);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <ImageContainer>
        <StyledImage src={src} alt="임시 이미지" />
        <StyledImage src={src} alt="임시 이미지" />
        <StyledImage src={src} alt="임시 이미지" />
        <BlurImageContainer onClick={handleModalOpen}>
          <StyledImage src={src} alt="임시 이미지" />
          <PlusBox>
            <PlusSign>+</PlusSign>
          </PlusBox>
        </BlurImageContainer>
      </ImageContainer>
      <Content>
        <Title>게스트하우스</Title>
        <Subtitle>2인 기준, 최대 10인</Subtitle>
        <Description>기준 인원 초과 시 1인 50,000원 추가</Description>
        <Amenities>
          <span>(아이콘) Wi-Fi (무료)</span>
          <span>(아이콘) 객실 내 안전 금고</span>
          <span>(아이콘) 거실</span>
          <span>(아이콘) 금연</span>
          <span>(아이콘) 냉장고</span>
        </Amenities>
      </Content>
      <PriceSection>
        <Price>500,000원</Price>
        <DateSelection>
          <StyledDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy.MM.dd"
          />
          <span>~</span>
          <StyledDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy.MM.dd"
          />
        </DateSelection>
        <GuestSelection>
          <span>(아이콘)</span>
          <GuestCounter>
            <Button onClick={handleMinus}>-</Button>
            <GuestCount>{selectPerson}</GuestCount>
            <Button onClick={handlePlus}>+</Button>
          </GuestCounter>
        </GuestSelection>
      </PriceSection>
      <ImageModal isOpen={ModalOpen} onClose={handleModalClose} src={src} />
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

const StyledImage = styled(Image)`
  width: 250px;
  height: 130px;
  filter: blur(1px);
`;

const PlusBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 80px;
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

const DateSelection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .react-datepicker-wrapper {
    width: auto;
  }
`;

const GuestSelection = styled.div`
  display: flex;
  align-items: center;
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

const StyledDatePicker = styled(DatePicker)`
  width: 150px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin: 0 10px;

  .react-datepicker__input-container input {
    width: 100%;
    border: none;
  }

  .react-datepicker {
    font-size: 16px;
  }

  .react-datepicker__header {
    background-color: #f85b2b;
    border-bottom: none;
  }

  .react-datepicker__current-month {
    color: white;
  }

  .react-datepicker__day--selected {
    background-color: #f85b2b;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #f85b2b;
  }
`;
