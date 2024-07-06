'use client'

import React from 'react'
// import Heading from './Heading'
import { useRouter } from 'next/navigation'
import Buttons from './Buttons'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyState = ({
  title = "일치하는 것이 없습니다.",
  subtitle = "일부 필터를 변경하거나 제거해 주십시오.",
  showReset
}: EmptyStateProps) => {

  const router = useRouter()
  return (
    <div className='
      h-[60]
      flex
      flex-col
      gap-2
      justify-center
      items-center      
      '
    >
      {/* <Heading 
        center
        title={title}
        subtitle={subtitle}        
      /> */}
      <div className='w-48 mt-4'>
        {showReset &&
          <Buttons            
            label='모든 필터 제거'
            onclick={() => router.push('/')}
          />
        }
      </div>
    </div>
  )
}

export default EmptyState