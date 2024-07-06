'use client';

<<<<<<< HEAD
import dynamic from 'next/dynamic';
import './search.scss';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import DateRegionDropdown from '../../components/DateRegionDropdown';

const Page = () => {
=======
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import './search.scss';
import Navbar from '../../components/Navbar/Navbar';

function Page() {
  const { watch } = useForm({
    defaultValues: {
      latitude: 33.5563,
      longitude: 126.79581,
    },
  });

  const [accommodations, setAccommodations] = useState([
    {
      id: 1,
      title: '숙소명 1',
      rating: 4.5,
      description: '숙소 설명 1',
      price: '$100',
      imageUrl:
        'https://a0.muscache.com/im/pictures/miso/Hosting-1069973180436354015/original/6efa2246-7fe8-4f78-8b3a-7fcefde7a880.jpeg?im_w=720',
    },
  ]);

>>>>>>> cbbf9b5 (fix: merge conflict)
  const KakaoMap = dynamic(() => import('../../components/KakaoMap/KakaoMap'), {
    ssr: false,
  });

<<<<<<< HEAD
  const handleClose = () => {
    console.log('Dropdown closed');
=======
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  const addAccommodation = () => {
    const newId = accommodations.length + 1;
    const newAccommodation = {
      id: newId,
      title: `숙소명 ${newId}`,
      rating: 4.3,
      description: `숙소 설명 ${newId}`,
      price: `$${100 + newId}`,
      imageUrl:
        'https://a0.muscache.com/im/pictures/miso/Hosting-1069973180436354015/original/6efa2246-7fe8-4f78-8b3a-7fcefde7a880.jpeg?im_w=720',
    };
    setAccommodations([...accommodations, newAccommodation]);
>>>>>>> cbbf9b5 (fix: merge conflict)
  };

  return (
    <>
      <Navbar />
<<<<<<< HEAD
      <div className="search-wrapper">
        <li className="togo-dropdown">
          <DateRegionDropdown onClose={handleClose} />
        </li>
      </div>
      <div>
        <KakaoMap />
      </div>
      <Footer />
    </>
  );
};
=======
      <div className="searchbox">
        <li>서울</li>
        <li>6월18일 ~ 6월 20일</li>
        <li>인원 7 명</li>
      </div>
      <div className="main-wrapper">
        <div>
          숙소들
          <section className="accommodation">
            {accommodations.map((accommodation) => (
              <div key={accommodation.id}>
                <img
                  src={accommodation.imageUrl}
                  alt={`숙소${accommodation.id}`}
                />
                <div className="accommodation-title">
                  <p>{accommodation.title}</p>
                  <p>평점: {accommodation.rating}</p>
                </div>
                <p>{accommodation.description}</p>
                <p>{accommodation.price}</p>
              </div>
            ))}
          </section>
          <button onClick={addAccommodation}>숙소 추가</button>
        </div>
        <div className="map">
          <KakaoMap latitude={latitude} longitude={longitude} />
        </div>
      </div>
    </>
  );
}
>>>>>>> cbbf9b5 (fix: merge conflict)

export default Page;
