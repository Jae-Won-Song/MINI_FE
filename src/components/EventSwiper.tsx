import React from 'react'
import SlideButtons from './SlideButtons'

const EventSwiper = () => {
  return (
    <div>
      <SlideButtons arrowDirection="left" size="smallCircle" active={true} />
      <SlideButtons arrowDirection="right" size="smallCircle" active={true} />
    </div>
  )
}

export default EventSwiper
