'use client';

import React from 'react';
import { FaHotel } from 'react-icons/fa';
import {
  GiHouse,
  GiBlockHouse,
  GiFamilyHouse,
  GiCoffeeCup,
} from 'react-icons/gi';
import { BsBuildingsFill } from 'react-icons/bs';
import { MdOutlineVilla } from 'react-icons/md';
import { FaPeopleRoof } from 'react-icons/fa6';
import { PiBuildingApartmentFill } from 'react-icons/pi';
import Image from 'next/image';
import styled from 'styled-components';
import CategoryBox from './CategoryBox';
import hanok from '../../../public/svgs/Hanok.svg';
import hot from '../../../public/svgs/hot.svg';

const HanokIcon = () => (
  <Image src={hanok} alt="Hanok Icon" width={26} height={26} />
);
const HotIcon = () => <Image src={hot} alt="hot Icon" width={26} height={26} />;

export const categories = [
  {
    label: '전체 보기',
    path: '',
    icon: HotIcon,
    descriptioin: '전체 보기 카테고리입니다.',
  },
  {
    label: '관광호텔',
    path: '호텔',
    icon: FaHotel,
    descriptioin: '관광호텔 카테고리입니다.',
  },
  {
    label: '콘도미니엄',
    path: '콘도미니엄',
    icon: BsBuildingsFill,
    descriptioin: '콘도미니엄 카테고리입니다.',
  },
  {
    label: '유스호스텔',
    path: '유스호스텔',
    icon: MdOutlineVilla,
    descriptioin: '유스호스텔 카테고리입니다.',
  },
  {
    label: '펜션',
    path: '펜션',
    icon: GiBlockHouse,
    descriptioin: '펜션 카테고리입니다.',
  },
  {
    label: '모텔',
    path: '모텔',
    icon: PiBuildingApartmentFill,
    descriptioin: '모텔 카테고리입니다.',
  },
  {
    label: '리조트',
    path: '리조트',
    icon: GiHouse,
    descriptioin: '리조트 카테고리입니다.',
  },
  {
    label: '게스트하우스',
    path: '게스트하우스',
    icon: GiFamilyHouse,
    descriptioin: '게스트하우스 카테고리입니다.',
  },
  {
    label: '홈스테이',
    path: 'home-stay',
    icon: FaPeopleRoof,
    descriptioin: '홈스테이 카테고리입니다.',
  },
  {
    label: '레지던스',
    path: 'serviced-residence',
    icon: GiCoffeeCup,
    descriptioin: '레지던스 카테고리입니다.',
  },
  {
    label: '한옥',
    path: '한옥',
    icon: HanokIcon,
    descriptioin: '한옥 카테고리입니다.',
  },
];

interface CategoriesProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const Categories: React.FC<CategoriesProps> = ({
  onCategoryChange,
  selectedCategory,
}) => {
  return (
    <CategoryWrapper>
      {categories.map((item) => (
        <CategoryBox
          key={item.label}
          label={item.label}
          icon={item.icon}
          onClick={() => onCategoryChange(item.path)}
          selected={selectedCategory === item.path}
        />
      ))}
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  margin: auto;
`;

export default Categories;