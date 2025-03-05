'use client'

import { PropsWithChildren, ReactElement, useCallback, useRef } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { PropsWithTestId } from '@/types'

type SliderProps = PropsWithChildren<PropsWithTestId>

export function Slider({
  children,
  'data-testid': dataTestId,
}: SliderProps): ReactElement {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleNext = useCallback(() => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const currentScroll = container.scrollLeft
    const containerRect = container.getBoundingClientRect()

    // Find the current centered slide and the next one
    const slides = Array.from(container.children)
    const currentSlideIndex = slides.findIndex((slide) => {
      const slideRect = slide.getBoundingClientRect()
      const slideCenter = slideRect.left + slideRect.width / 2
      const containerCenter = containerRect.left + containerRect.width / 2
      return Math.abs(slideCenter - containerCenter) < slideRect.width / 2
    })

    if (currentSlideIndex < slides.length - 1) {
      const nextSlide = slides[currentSlideIndex + 1]
      const nextSlideRect = nextSlide.getBoundingClientRect()
      const scrollOffset =
        nextSlideRect.left -
        containerRect.left +
        container.scrollLeft -
        (containerRect.width - nextSlideRect.width) / 2

      container.scrollTo({
        left: scrollOffset,
        behavior: 'smooth',
      })
    }
  }, [])

  const handlePrevious = useCallback(() => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const currentScroll = container.scrollLeft
    const containerRect = container.getBoundingClientRect()

    // Find the current centered slide and the previous one
    const slides = Array.from(container.children)
    const currentSlideIndex = slides.findIndex((slide) => {
      const slideRect = slide.getBoundingClientRect()
      const slideCenter = slideRect.left + slideRect.width / 2
      const containerCenter = containerRect.left + containerRect.width / 2
      return Math.abs(slideCenter - containerCenter) < slideRect.width / 2
    })

    if (currentSlideIndex > 0) {
      const prevSlide = slides[currentSlideIndex - 1]
      const prevSlideRect = prevSlide.getBoundingClientRect()
      const scrollOffset =
        prevSlideRect.left -
        containerRect.left +
        container.scrollLeft -
        (containerRect.width - prevSlideRect.width) / 2

      container.scrollTo({
        left: scrollOffset,
        behavior: 'smooth',
      })
    } else {
      // If at the start, scroll to the beginning with padding
      container.scrollTo({
        left: 0,
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    <Box
      position="relative"
      bg-color="gray-lightest"
      display="flex"
      flex-direction="col"
      align-items="start"
      justify-content="center"
      width="full"
      overflow-x="hidden"
      data-testid={dataTestId}
    >
      <button
        onClick={handlePrevious}
        aria-label="Previous slide"
        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
      >
        ←
      </button>
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
      >
        →
      </button>
      <Box
        ref={scrollContainerRef}
        display="flex"
        overflow-x="scroll"
        snap="x"
        snap-type="mandatory"
        width="full"
        gap={6}
        padding-x={6}
        padding-x-md={10}
        padding-x-xl={20}
        scroll-behavior="smooth"
      >
        {children}
      </Box>
    </Box>
  )
}
