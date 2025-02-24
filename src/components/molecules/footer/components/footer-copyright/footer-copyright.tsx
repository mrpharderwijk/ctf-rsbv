import { ReactElement } from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { FaXTwitter } from 'react-icons/fa6'
import { ImInstagram } from 'react-icons/im'
import { ImFacebook2 } from 'react-icons/im'

import { Box } from '@/components/atoms/layout/box/box'
import { Body } from '@/components/atoms/typography/body/body'

export function FooterCopyright(): ReactElement {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      display="flex"
      flexDirection="col"
      flexDirection-lg="rowReverse"
      alignItems-lg="center"
      justifyContent-md="center"
      justifyContent-lg="between"
      padding-b={6}
      gap-y={3}
    >
      <Box
        display="flex"
        justifyContent="start"
        display-md="inlineFlex"
        justifyContent-md="center"
      >
        <ul className="inline-flex flex-row nowrap gap-3">
          <li>
            <FaXTwitter fontSize={20} />
          </li>
          <li>
            <ImInstagram fontSize={20} />
          </li>
          <li>
            <BsLinkedin fontSize={20} />
          </li>
          <li>
            <ImFacebook2 fontSize={20} />
          </li>
        </ul>
      </Box>

      <Box
        display="flex"
        justifyContent="start"
        display-md="inlineFlex"
        justifyContent-md="center"
      >
        <Box
          display="inlineFlex"
          flexDirection="col"
          flexDirection-lg="row"
          alignItems="start"
          alignItems-md="center"
          justifyContent="center"
          gap="0.5"
        >
          <Body tag="label" size="sm">
            &copy; {currentYear} Whatever, All Rights Reserved
          </Body>

          <ul className="flex flex-row nowrap">
            <li className="lg:before:content-['·'] lg:before:inline-block lg:before:text-center lg:before:w-5">
              Privacy
            </li>
            <li className="not-first:before:content-['·'] not-first:before:inline-block not-first:before:text-center not-first:before:w-5">
              Terms
            </li>
            <li className="not-first:before:content-['·'] not-first:before:inline-block not-first:before:text-center not-first:before:w-5">
              Sitemap
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  )
}
