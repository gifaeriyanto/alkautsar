'use client'

import { Box } from '@chakra-ui/react'
import BlogNews from '../_components/BlogNews'
import Features from '../_components/Features'
import Footer from '../_components/Footer'
import Hero from '../_components/Hero'
import Imams from '../_components/Imams'
import LeaderQuote from '../_components/LeaderQuote'
import Navigation from '../_components/Navigation'

const Page = () => {
  return (
    <Box minH="100vh" color="gray.800" overflow="hidden">
      <Navigation />
      <Hero />
      <Features />
      <Imams />
      <LeaderQuote />
      <BlogNews />
      <Footer />
    </Box>
  )
}

export default Page
