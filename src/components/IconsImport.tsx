'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import RoomBath from '../../public/icons/bath.png';
import RoomHometheater from '../../public/icons/hometheater.png';
import RoomAircondition from '../../public/icons/air-conditioner.png';
import RoomTv from '../../public/icons/tv.png';
import RoomPc from '../../public/icons/computer.png';
import RoomCable from '../../public/icons/cable.png';
import RoomInternet from '../../public/icons/ethernet.png';
import RoomRefrigerator from '../../public/icons/refrigerator.png';
import RoomToiletries from '../../public/icons/toiletries.png';
import RoomSofa from '../../public/icons/sofa.png';
import RoomCook from '../../public/icons/cooking.png';
import RoomTable from '../../public/icons/round-table.png';
import RoomHairdryer from '../../public/icons/hairdryer.png';

export interface IconsImportProps {
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
    [key: string]: string;
  };
}

const IconsImport = ({ icons }: IconsImportProps) => {
  const iconMapping = {
    bath: RoomBath,
    hometheater: RoomHometheater,
    aircondition: RoomAircondition,
    tv: RoomTv,
    pc: RoomPc,
    cable: RoomCable,
    internet: RoomInternet,
    refrigerator: RoomRefrigerator,
    toiletries: RoomToiletries,
    sofa: RoomSofa,
    cook: RoomCook,
    table: RoomTable,
    hairdryer: RoomHairdryer,
  };

  return (
    <IconsContainer>
      {Object.keys(icons).map(
        (key) =>
          icons[key] === 'Y' && (
            <IconWrapper key={key}>
              <StyledImage
                src={iconMapping[key as keyof typeof iconMapping]}
                alt={key}
                width={25}
                height={25}
              />
            </IconWrapper>
          ),
      )}
    </IconsContainer>
  );
};

export default IconsImport;

const IconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImage = styled(Image)`
  border-radius: 8px;
  margin: 10px auto;
`;
