import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

interface KakaoMapRenderProps {
  latitude: number;
  longitude: number;
}

function KakaoMapRender({ latitude, longitude, mapLevel }: KakaoMapRenderProps) {
  const mapCenter = { lat: latitude, lng: longitude };
  return (
    <MapWrapper>
      <Map
        center={mapCenter}
        style={{ width: '100%', height: '100%' }}
        level={mapLevel}
      >
        <MapMarker position={mapCenter} />
      </Map>
    </MapWrapper>
  );
}

export default KakaoMapRender;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
