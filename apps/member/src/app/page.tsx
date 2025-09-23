'use client'

import { Box } from '@chakra-ui/react'
import Features from '../_components/Features'
import Footer from '../_components/Footer'
import Hero from '../_components/Hero'
import Navigation from '../_components/Navigation'
import Stats from '../_components/Stats'

const Page = () => {
  return (
    <Box minH="100vh" color="gray.800" overflow="hidden">
      <Navigation />
      <Hero />
      <Features />
      <Stats />
      <Footer />
    </Box>
  )
}

export default Page
