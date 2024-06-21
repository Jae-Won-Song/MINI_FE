import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
}

function KakaoMap({ latitude, longitude }: KakaoMapProps) {
  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: '100%', height: '100%' }}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }}>
        <div>map test</div>
      </MapMarker>
    </Map>
  );
}

export default KakaoMap;
