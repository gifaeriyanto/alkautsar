'use client'

import {
  Box,
  Card,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Badge,
  HStack,
  Icon,
  Button,
} from '@chakra-ui/react'
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa'

const BlogNews = () => {
  const articles = [
    {
      id: 1,
      title: 'Peringatan Maulid Nabi Muhammad SAW 1446 H',
      excerpt:
        'Masjid Al-Kautsar mengadakan peringatan Maulid Nabi Muhammad SAW dengan kajian dan santunan anak yatim.',
      image:
        'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&h=400&fit=crop',
      category: 'Kegiatan',
      date: '15 September 2024',
      author: 'Panitia Maulid',
    },
    {
      id: 2,
      title: 'Program Tahfiz Quran untuk Anak-Anak',
      excerpt:
        'Dibuka pendaftaran program tahfiz Al-Quran untuk anak usia 7-15 tahun dengan metode pembelajaran yang menyenangkan.',
      image:
        'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop',
      category: 'Program',
      date: '10 September 2024',
      author: 'Ustadz Naldi',
    },
    {
      id: 3,
      title: 'Renovasi Ruang Wudhu Selesai',
      excerpt:
        'Alhamdulillah renovasi ruang wudhu telah selesai dengan fasilitas yang lebih nyaman dan modern.',
      image:
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop',
      category: 'Pengumuman',
      date: '5 September 2024',
      author: 'Pengurus Masjid',
    },
    {
      id: 4,
      title: 'Kajian Rutin Setiap Jumat Malam',
      excerpt:
        "Kajian rutin setiap Jumat malam ba'da Maghrib dengan tema Akhlak Mulia dalam Kehidupan Sehari-hari.",
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
      category: 'Kajian',
      date: '1 September 2024',
      author: 'Ustadz Mahmud',
    },
    {
      id: 5,
      title: 'Penyaluran Zakat Fitrah 1445 H',
      excerpt:
        'Laporan penyaluran zakat fitrah kepada 150 mustahiq di sekitar wilayah masjid Al-Kautsar.',
      image:
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
      category: 'Zakat',
      date: '25 Agustus 2024',
      author: 'Amil Zakat',
    },
    {
      id: 6,
      title: 'Pelatihan Manasik Haji dan Umrah',
      excerpt:
        'Diadakan pelatihan manasik haji dan umrah untuk calon jamaah dengan materi lengkap dan praktis.',
      image:
        'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop',
      category: 'Pelatihan',
      date: '20 Agustus 2024',
      author: 'Tim Haji',
    },
  ]

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Kegiatan: 'green',
      Program: 'blue',
      Pengumuman: 'orange',
      Kajian: 'purple',
      Zakat: 'teal',
      Pelatihan: 'red',
    }
    return colors[category] || 'gray'
  }

  return (
    <Box
      position="relative"
      py={32}
      px={{ base: 6, md: 12, lg: 16 }}
      bg="linear-gradient(to bottom, rgba(249, 250, 251, 1) 0%, rgba(243, 244, 246, 1) 100%)"
      data-section="blog-news"
    >
      <Container maxW="8xl">
        <VStack spacing={20}>
          {/* Section Header */}
          <VStack spacing={6} textAlign="center" maxW="3xl">
            <Text
              fontSize="sm"
              fontWeight="700"
              letterSpacing="wider"
              color="gray.600"
              textTransform="uppercase"
            >
              Berita & Kegiatan
            </Text>
            <VStack spacing={2}>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="800"
                lineHeight="1.2"
                color="gray.900"
              >
                Berita Terbaru
              </Heading>
              <Heading
                as="h3"
                fontSize={{ base: '2xl', md: '4xl' }}
                fontWeight="800"
                lineHeight="1.2"
                color="gray.700"
              >
                & Kegiatan Masjid
              </Heading>
            </VStack>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="gray.600"
              lineHeight="1.8"
              maxW="2xl"
            >
              Ikuti perkembangan terbaru kegiatan, program, dan pengumuman dari
              Masjid Al-Kautsar
            </Text>
          </VStack>

          {/* Articles Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
            {articles.map((article) => (
              <Card
                key={article.id}
                bg="white"
                border="1px solid rgba(0, 0, 0, 0.08)"
                borderRadius="2xl"
                overflow="hidden"
                _hover={{
                  transform: 'translateY(-8px)',
                  shadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                }}
                transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                position="relative"
                cursor="pointer"
              >
                {/* Image Section */}
                <Box position="relative" h="200px" overflow="hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    w="full"
                    h="full"
                    objectFit="cover"
                    transition="transform 0.5s ease"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                  <Badge
                    position="absolute"
                    top="4"
                    left="4"
                    colorScheme={getCategoryColor(article.category)}
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="600"
                    textTransform="uppercase"
                  >
                    {article.category}
                  </Badge>
                </Box>

                {/* Content Section */}
                <VStack spacing={4} p={6} align="start">
                  <VStack spacing={3} align="start" w="full">
                    <Heading
                      as="h3"
                      fontSize="lg"
                      fontWeight="700"
                      color="gray.900"
                      letterSpacing="tight"
                      lineHeight="1.3"
                      noOfLines={2}
                    >
                      {article.title}
                    </Heading>

                    <Text
                      fontSize="sm"
                      color="gray.600"
                      lineHeight="1.6"
                      noOfLines={3}
                    >
                      {article.excerpt}
                    </Text>
                  </VStack>

                  {/* Meta Info */}
                  <VStack spacing={3} w="full">
                    <HStack spacing={4} w="full" fontSize="xs" color="gray.500">
                      <HStack spacing={1}>
                        <Icon as={FaCalendarAlt} />
                        <Text>{article.date}</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={FaUser} />
                        <Text>{article.author}</Text>
                      </HStack>
                    </HStack>

                    <Button
                      size="sm"
                      variant="ghost"
                      color="orange.600"
                      fontWeight="600"
                      rightIcon={<FaArrowRight size={12} />}
                      _hover={{
                        bg: 'orange.50',
                        color: 'orange.700',
                      }}
                      alignSelf="start"
                      px={0}
                    >
                      Baca Selengkapnya
                    </Button>
                  </VStack>
                </VStack>
              </Card>
            ))}
          </SimpleGrid>

          {/* View All Button */}
          <Box>
            <Button
              size="lg"
              bg="linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
              color="white"
              _hover={{
                bg: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
                transform: 'translateY(-2px)',
                shadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
              }}
              borderRadius="xl"
              fontWeight="600"
              px={12}
              py={6}
              rightIcon={<FaArrowRight size={16} />}
              transition="all 0.3s ease"
            >
              Lihat Semua Berita
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default BlogNews
