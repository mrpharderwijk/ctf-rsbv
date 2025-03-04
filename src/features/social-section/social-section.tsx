import { ReactElement } from 'react'
import { FaXTwitter } from 'react-icons/fa6'
import { ImFacebook, ImInstagram, ImLinkedin2 } from 'react-icons/im'

import { Box } from '@/components/atoms/layout/box/box'
import { Heading } from '@/components/atoms/typography/heading/heading'

export function SocialSection(): ReactElement {
  return (
    <Box display="flex" flex-direction="col" align-items="center" gap-y={6}>
      <header className="text-center">
        <Heading tag="h2" like="h3" font-weight="semibold">
          Follow Airbnb for news and travel inspiration
        </Heading>
      </header>

      <Box tag="ul" display="flex" flex-wrap="nowrap" gap-x={4}>
        <Box tag="li">
          <div className="rounded-full border-b-text-black border w-10 h-10 flex items-center justify-center">
            <FaXTwitter fontSize={20} />
          </div>
        </Box>
        <Box tag="li">
          <div className="rounded-full border-b-text-black border w-10 h-10 flex items-center justify-center">
            <ImInstagram fontSize={18} />
          </div>
        </Box>
        <Box tag="li">
          <div className="rounded-full border-b-text-black border w-10 h-10 flex items-center justify-center">
            <ImLinkedin2 fontSize={16} />
          </div>
        </Box>
        <Box tag="li">
          <div className="rounded-full border-b-text-black border w-10 h-10 flex items-center justify-center">
            <ImFacebook fontSize={18} />
          </div>
        </Box>
      </Box>
    </Box>
  )
}
