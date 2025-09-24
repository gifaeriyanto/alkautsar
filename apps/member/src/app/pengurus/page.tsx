/* eslint-disable react/no-array-index-key */
'use client'

import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FaPlay, FaUserGraduate, FaUsers, FaYoutube } from 'react-icons/fa'
import Footer from '../../_components/Footer'
import Navigation from '../../_components/Navigation'

interface PengurusRole {
  name: string
  position: string
  photo?: string
  description?: string
}

interface SeksiData {
  name: string
  description: string
  icon: any
  leader: PengurusRole
  members: PengurusRole[]
}

const pengurusInti: PengurusRole[] = [
  {
    name: 'Dr. Taufan Kurniawan, S.E., M.M.',
    position: 'Ketua Umum',
    photo: '/images/ketua-taufan.jpeg',
    description: 'Memimpin dan mengelola operasional masjid secara keseluruhan',
  },
  {
    name: 'dr. Imam Nurjaya, Sp.P',
    position: 'Wakil Ketua',
    photo: '/images/imam-waka.jpeg',
    description: 'Membantu ketua dalam menjalankan tugas kepemimpinan',
  },
  {
    name: 'Ardiansyah, S.E., M.Si.',
    position: 'Sekretaris',
    photo: '/images/ardi-sek.jpeg',
    description: 'Mengelola administrasi dan dokumentasi masjid',
  },
  {
    name: 'Akbar, S.P., M.Si.',
    position: 'Wakil Sekretaris',
    photo: '/images/akbar-wasek.jpeg',
    description: 'Membantu sekretaris dalam tugas administrasi',
  },
  {
    name: 'Hj. Andi Erni Novianty',
    position: 'Bendahara',
    photo: '/images/erni-bend.jpeg',
    description: 'Mengelola keuangan dan administrasi masjid',
  },
  {
    name: 'Gifa Eriyanto, S.Kom.',
    position: 'Wakil Bendahara',
    photo: '/images/gifa-wabend.jpeg',
    description: 'Membantu bendahara dalam pengelolaan keuangan',
  },
]

const penasehat: PengurusRole[] = [
  {
    name: 'Ir. H. Nasrul Nawang',
    position: 'Penasehat',
    photo: '/images/nas-advisor.jpeg',
    description: 'Memberikan arahan strategis dalam pengembangan masjid',
  },
  {
    name: 'Dr. Ir. H. Achmar Manring, M.S.',
    position: 'Penasehat',
    photo: '/images/ahmar-advisor.jpeg',
    description: 'Memberikan bimbingan teknis dan manajemen',
  },
  {
    name: 'H. M. Thamrin',
    position: 'Penasehat',
    photo: '/images/tamrin-advisor.jpeg',
    description: 'Memberikan nasihat dalam pengembangan dakwah',
  },
  {
    name: 'Dr. Subhan Djaya Mappatunrung, S.I.P., S.E., S.H., M.Si., M.H.',
    position: 'Penasehat',
    description: 'Memberikan konsultasi hukum dan kebijakan',
  },
  {
    name: 'Prof. Dr. dr. Prihantono, Sp.B., Subsp.Onk (K), M.Kes.',
    position: 'Penasehat',
    description: 'Memberikan arahan dalam bidang kesehatan dan sosial',
  },
  {
    name: 'H. Ridwan Jamaluddin',
    position: 'Penasehat',
    photo: '/images/ridwan-advisor.jpeg',
    description: 'Memberikan bimbingan dalam pengembangan jamaah',
  },
  {
    name: 'Prof. Dr. Ir. H. Barahima Abbas, M.Si.',
    position: 'Penasehat',
    description: 'Memberikan arahan akademis dan penelitian',
  },
  {
    name: 'Prof. Ir. Muhammaad Suradi, M. Eng, S.T., Ph.D.',
    position: 'Penasehat',
    photo: '/images/suradi-advisor.jpeg',
    description: 'Memberikan bimbingan teknik dan teknologi',
  },
  {
    name: 'H. Andi Muhammad Ramdhani, S.H.',
    position: 'Penasehat',
    description: 'Memberikan konsultasi hukum dan legal',
  },
  {
    name: 'H. Andi Anto',
    position: 'Penasehat',
    description: 'Memberikan arahan dalam pengembangan organisasi',
  },
]

const seksiSeksi: SeksiData[] = [
  {
    name: 'Ibadah dan Dakwah',
    description: 'Mengelola program ibadah, kajian, dan dakwah untuk jamaah',
    icon: FaUserGraduate,
    leader: {
      name: 'H. Irwan, S.E., M.M.',
      position: 'Koordinator',
    },
    members: [
      { name: 'Muhammad Jabir, S.E.', position: 'Wakil' },
      { name: 'Reski Eka Darmawan', position: 'Anggota' },
      { name: 'Fujo Lustianto, A.Md.Tra., ANT III', position: 'Anggota' },
      { name: 'Rey Dharmawan', position: 'Anggota' },
      { name: 'Hairil Anwar, S.Si.', position: 'Anggota' },
      { name: 'H. Hamzah', position: 'Anggota' },
      { name: 'Dr. Fahruddin, S.Si., M.T.', position: 'Anggota' },
      { name: 'H. Bahtiar, S.I.P.,M.M', position: 'Anggota' },
    ],
  },
  {
    name: 'Pendidikan',
    description: 'Mengelola program pendidikan dan pengembangan SDM',
    icon: FaUserGraduate,
    leader: {
      name: 'Wahyuni Amiruddin, S.Kom.',
      position: 'Koordinator',
      photo:
        'https://images.unsplash.com/photo-1494790108755-2616b612b776?w=400&h=400&fit=crop&crop=face',
    },
    members: [
      { name: 'Kumala Dewi', position: 'Wakil' },
      { name: 'Abdul Haris, M.Pd., Ph.D.', position: 'Anggota' },
      { name: 'Apt. Nur Aslamah Hamka, S.Farm.', position: 'Anggota' },
      { name: 'drg. Hj. Ros Indrawati, M.M., M.Kes.', position: 'Anggota' },
      { name: 'Dr. Indira Basalamah, S.E., M.Si.', position: 'Anggota' },
      { name: 'Hj. Marlina', position: 'Anggota' },
      { name: 'Avanti Artputri, S.E.', position: 'Anggota' },
      { name: 'Yulmi Handayani, S.Pd.,M.Pd', position: 'Anggota' },
    ],
  },
  {
    name: 'Sosial',
    description:
      'Mengatur kegiatan sosial, bakti sosial, dan hubungan kemasyarakatan',
    icon: FaUsers,
    leader: {
      name: 'drg. Mohammad Gazali, MARS, Sp.BMM., Subsp TM, TMJ(K)',
      position: 'Koordinator',
      photo:
        'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face',
    },
    members: [
      {
        name: 'drg. A. Arfandi Ariffuddin, Sp.BMM., Subsp C.O.M (K)',
        position: 'Wakil',
      },
      { name: 'Jenny Asri, S.P., M.M.', position: 'Anggota' },
      { name: 'Seniwati, Ph.D.', position: 'Anggota' },
      { name: 'dr. Azis Beru Gani, Sp.B.', position: 'Anggota' },
      { name: 'dr. Zulham Effendy Mandar, Sp.B.', position: 'Anggota' },
      { name: 'dr. A. Adil, Sp.A.', position: 'Anggota' },
      { name: 'dr. Cahya Ramdhani Sila', position: 'Anggota' },
      { name: 'Dr. Arfan Sanusi, Sp.PD.,FINASIM', position: 'Anggota' },
    ],
  },
  {
    name: 'Pembinaan Pemuda dan Media',
    description: 'Membina pemuda dan mengelola media komunikasi masjid',
    icon: FaUsers,
    leader: {
      name: 'apt. Fathul Kahar, S.Farm.',
      position: 'Koordinator',
    },
    members: [
      { name: 'Muhammad Fajrul Imam', position: 'Wakil' },
      { name: 'Muhammad Ichwanul Taqwa', position: 'Anggota' },
      { name: 'Rifar Juniver R P', position: 'Anggota' },
      { name: 'Saldy Fidyawan, S.T., M.M., M.B.A.', position: 'Anggota' },
      { name: 'Syahran Satria Ramadhan', position: 'Anggota' },
      { name: 'Sakila Putri Nandila', position: 'Anggota' },
      { name: 'Murniati', position: 'Anggota' },
      { name: 'Lily Susiana, S.M', position: 'Anggota' },
    ],
  },
  {
    name: 'Dana dan Unit Pengumpul Zakat (UPZ)',
    description: 'Mengelola pengumpulan dan penyaluran zakat, infaq, dan sedekah',
    icon: FaUsers,
    leader: {
      name: 'A. Irdiansyah Achmad, S.I.Kom',
      position: 'Koordinator',
    },
    members: [
      { name: 'H. Abdul Rauf Kamil, S.H', position: 'Wakil' },
      { name: 'H. Bahtiar, S.E.,M.H', position: 'Anggota' },
      { name: 'H. Usman Mustamin', position: 'Anggota' },
      { name: 'Achmad Maulana Ibrahim, S.T', position: 'Anggota' },
      { name: 'dr. Nur Surya Wirawan, Sp.An', position: 'Anggota' },
      { name: 'Haryawan', position: 'Anggota' },
      { name: 'H. Abdul Azis', position: 'Anggota' },
      { name: 'Muh. Arsyad, S.H', position: 'Anggota' },
      { name: 'Muhammad Ilyas Toha', position: 'Anggota' },
    ],
  },
  {
    name: 'Pembangunan dan Pemeliharaan Masjid',
    description: 'Mengelola pembangunan dan pemeliharaan fasilitas masjid',
    icon: FaUsers,
    leader: {
      name: 'H. Andi Muisdinillah Syam, S.E.,M.M',
      position: 'Koordinator',
    },
    members: [
      { name: 'H. Jamaluddin', position: 'Wakil' },
      { name: 'Ir. Hasan Basri, M.T', position: 'Anggota' },
      { name: 'Januar Arie Mahmuda, S.T.,M.T', position: 'Anggota' },
      { name: 'H. Herianto', position: 'Anggota' },
      { name: 'Zainal', position: 'Anggota' },
      { name: 'Dian Apriadie (CLTC)', position: 'Anggota' },
      { name: 'Ahmad Nur (CLTC)', position: 'Anggota' },
      { name: 'Darmayanto (CLTC)', position: 'Anggota' },
    ],
  },
  {
    name: 'Perayaan Hari Besar Islam (PHBI)',
    description: 'Menyelenggarakan perayaan dan peringatan hari-hari besar Islam',
    icon: FaUsers,
    leader: {
      name: 'dr. A. Irwansyah Achmad, Sp.B',
      position: 'Koordinator',
    },
    members: [
      { name: 'H. Muhammad Agus, S.T.,M.H', position: 'Wakil' },
      { name: 'dr. Alauddin Jusuf, Sp.An.,M.Kes', position: 'Anggota' },
      { name: 'Syamsuddin Suaebu', position: 'Anggota' },
      { name: 'Hj. Rahmatia, S.E', position: 'Anggota' },
      { name: 'drg. Siti Magfirah Ali Polanunu, Sp.Pros', position: 'Anggota' },
      { name: 'dr. Yusfiana', position: 'Anggota' },
      { name: 'Feratamy Tenri Ampa, S.I.Kom', position: 'Anggota' },
      { name: 'Nur Samsu, S.P.,M.Si', position: 'Anggota' },
    ],
  },
  {
    name: "Pemberdayaan Wanita dan Majelis Ta'lim",
    description: 'Memberdayakan jamaah wanita dan mengelola majelis taklim',
    icon: FaUsers,
    leader: {
      name: 'drg. Hermiyanti, M.Kes.',
      position: 'Koordinator',
    },
    members: [
      { name: 'Hj. Andi Ida Jamilah, S.T.P., M.Si.', position: 'Wakil' },
      { name: 'Hj. Nur Alang, S.Pt.', position: 'Anggota' },
      { name: 'Hj. Juharni, S.K.M.', position: 'Anggota' },
      { name: 'Shanty Halim, S.S., M.Hum.', position: 'Anggota' },
      { name: 'Nengsih', position: 'Anggota' },
      { name: 'Widyasrini Anas, S.E.', position: 'Anggota' },
      { name: 'drg. Husnah Husein, M.K.G.', position: 'Anggota' },
      { name: 'dr. Ferawati Amra', position: 'Anggota' },
      { name: 'Lindah', position: 'Anggota' },
    ],
  },
]

const PengurusCard = ({
  pengurus,
  showDescription = false,
}: {
  pengurus: PengurusRole
  showDescription?: boolean
}) => (
  <Card
    bg="white"
    border="1px solid rgba(0, 0, 0, 0.08)"
    borderRadius="2xl"
    overflow="hidden"
    _hover={{
      transform: 'translateY(-4px)',
      shadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(245, 158, 11, 0.2)',
    }}
    transition="all 0.3s ease"
    position="relative"
  >
    {/* Content Section */}
    <VStack spacing={4} p={6} align="center">
      {/* Avatar */}
      <Avatar
        size="xl"
        src={pengurus.photo}
        name={pengurus.name}
        bg="orange.500"
        color="white"
        border="3px solid"
        borderColor="orange.100"
      />

      {/* Name and Position */}
      <VStack spacing={2} align="center" textAlign="center">
        <Heading
          as="h3"
          fontSize="md"
          fontWeight="700"
          color="gray.800"
          lineHeight="1.5"
        >
          {pengurus.name}
        </Heading>
        <Badge
          colorScheme="orange"
          px={3}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="600"
        >
          {pengurus.position}
        </Badge>
      </VStack>

      {/* Description Section */}
      {showDescription && pengurus.description ? (
        <Text
          fontSize="xs"
          color="gray.600"
          lineHeight="1.5"
          textAlign="center"
        >
          {pengurus.description}
        </Text>
      ) : null}
    </VStack>
  </Card>
)

const SeksiSection = ({ seksi }: { seksi: SeksiData }) => (
  <Card
    bg="white"
    border="1px solid rgba(0, 0, 0, 0.08)"
    borderRadius="2xl"
    overflow="hidden"
    _hover={{
      transform: 'translateY(-4px)',
      shadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(245, 158, 11, 0.2)',
    }}
    transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
  >
    {/* Header */}
    <Box
      bg="linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
      color="white"
      py={6}
      px={8}
    >
      <VStack spacing={4}>
        <Box
          w="60px"
          h="60px"
          bg="white"
          borderRadius="xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={seksi.icon} boxSize={8} color="orange.500" />
        </Box>
        <VStack spacing={2} textAlign="center">
          <Heading size="md" textShadow="0 1px 2px rgba(0,0,0,0.1)">
            Seksi {seksi.name}
          </Heading>
          <Text fontSize="sm" opacity="0.9" lineHeight="1.5">
            {seksi.description}
          </Text>
        </VStack>
      </VStack>
    </Box>

    {/* Content */}
    <VStack
      spacing={{ base: 8, md: 10 }}
      p={{ base: 6, md: 8 }}
      w="full"
      align="stretch"
    >
      {/* Leader */}
      <HStack spacing={4} align="flex-start">
        <Avatar
          size="lg"
          src={seksi.leader.photo}
          name={seksi.leader.name}
          bg="orange.500"
          color="white"
          border="3px solid"
          borderColor="orange.100"
          flexShrink={0}
        />
        <VStack spacing={2} align="start" flex="1" mt={1}>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.900"
            fontWeight="600"
            lineHeight="1.4"
          >
            {seksi.leader.name}
          </Text>
          <Badge
            colorScheme="orange"
            size="md"
            borderRadius="full"
            fontSize="sm"
            fontWeight="600"
          >
            {seksi.leader.position}
          </Badge>
        </VStack>
      </HStack>

      {/* Members */}
      <VStack spacing={3} align="stretch" w="full">
        {seksi.members.map((member, index) => (
          <HStack key={index} spacing={3} align="flex-start">
            <Box
              w="6px"
              h="6px"
              bg="orange.400"
              borderRadius="full"
              flexShrink={0}
              mt={2}
            />
            <VStack spacing={1} align="start" flex="1">
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                color="gray.800"
                fontWeight="500"
                lineHeight="1.4"
              >
                {member.name}
              </Text>
              <Badge
                colorScheme="orange"
                size="sm"
                borderRadius="full"
                fontSize="xs"
              >
                {member.position}
              </Badge>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  </Card>
)

const PengurusPage = () => {
  return (
    <Box
      minH="100vh"
      bg="linear-gradient(to bottom, rgba(249, 250, 251, 1) 0%, rgba(243, 244, 246, 1) 100%)"
      color="gray.800"
    >
      <Navigation />

      {/* Hero Section with Group Photo */}
      <Box position="relative" overflow="hidden">
        <Container maxW="8xl">
          <Box
            position="relative"
            borderRadius="3xl"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.200"
            h={{ base: '460px', md: '500px', lg: '600px' }}
          >
            {/* Background YouTube Video Thumbnail */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgImage="url('https://img.youtube.com/vi/MvkOCKE-H34/maxresdefault.jpg')"
              bgSize="cover"
              bgPosition="center"
              bgRepeat="no-repeat"
            />

            {/* Overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="blackAlpha.500"
              backdropFilter="blur(0.5px)"
            />

            {/* Hero Content */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex={2}
              textAlign="center"
              w="full"
              maxW="4xl"
              px={6}
            >
              <VStack spacing={6}>
                <Text
                  fontSize="sm"
                  fontWeight="700"
                  letterSpacing="wider"
                  color="whiteAlpha.800"
                  textTransform="uppercase"
                >
                  Struktur Organisasi
                </Text>
                <VStack spacing={2}>
                  <Heading
                    as="h1"
                    fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
                    fontWeight="800"
                    lineHeight="1.2"
                    color="white"
                    textShadow="0 2px 4px rgba(0,0,0,0.3)"
                  >
                    Pengurus Masjid
                  </Heading>
                  <Heading
                    as="h2"
                    fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                    fontWeight="800"
                    lineHeight="1.2"
                    color="orange.200"
                    textShadow="0 2px 4px rgba(0,0,0,0.3)"
                  >
                    Al-Kautsar
                  </Heading>
                </VStack>
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color="whiteAlpha.900"
                  lineHeight="1.8"
                  maxW="3xl"
                  textShadow="0 1px 2px rgba(0,0,0,0.2)"
                >
                  Struktur organisasi masjid yang terdiri dari pengurus inti,
                  dewan penasehat, dan bidang-bidang yang bekerja sama untuk
                  kemajuan dan kesejahteraan umat
                </Text>

                {/* Play Button */}
                <Box mt={8}>
                  <Link
                    href="https://www.youtube.com/watch?v=MvkOCKE-H34"
                    isExternal
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Button
                      size="lg"
                      bg="linear-gradient(135deg, #DC2626 0%, #EF4444 100%)"
                      color="white"
                      _hover={{
                        bg: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)',
                        transform: 'translateY(-2px) scale(1.05)',
                        shadow: '0 10px 40px rgba(220, 38, 38, 0.4)',
                        _before: {
                          transform: 'translateX(100%)',
                        },
                      }}
                      transition="all 0.3s ease"
                      borderRadius="full"
                      px={8}
                      py={6}
                      h="auto"
                      fontWeight="600"
                      fontSize="lg"
                      leftIcon={<FaPlay size={16} />}
                      rightIcon={<FaYoutube size={20} />}
                      position="relative"
                      overflow="hidden"
                      _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.6s ease',
                      }}
                    >
                      Tonton Video Pelantikan
                    </Button>
                  </Link>
                </Box>
              </VStack>
            </Box>

            {/* Decorative Elements */}
            <Box
              position="absolute"
              top="20%"
              left="10%"
              w="3px"
              h="3px"
              bg="whiteAlpha.600"
              borderRadius="full"
              sx={{
                '@keyframes float1': {
                  '0%, 100%': { transform: 'translateY(0px) scale(1)' },
                  '50%': { transform: 'translateY(-20px) scale(1.2)' },
                },
                animation: 'float1 4s ease-in-out infinite',
              }}
            />
            <Box
              position="absolute"
              top="30%"
              right="15%"
              w="2px"
              h="2px"
              bg="whiteAlpha.400"
              borderRadius="full"
              sx={{
                '@keyframes float2': {
                  '0%, 100%': { transform: 'translateY(0px) scale(1)' },
                  '50%': { transform: 'translateY(-15px) scale(1.5)' },
                },
                animation: 'float2 3s ease-in-out infinite 1s',
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Pengurus Inti Section */}
      <Box py={20} px={{ base: 6, md: 12, lg: 16 }}>
        <Container maxW="8xl">
          <VStack spacing={20}>
            {/* Section Header */}
            <VStack spacing={6} textAlign="center" maxW="3xl">
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="800"
                lineHeight="1.2"
                color="gray.900"
              >
                Pengurus Inti
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.600"
                lineHeight="1.8"
                maxW="2xl"
              >
                Pengurus harian yang menjalankan operasional masjid dengan
                dedikasi dan komitmen tinggi
              </Text>
            </VStack>

            {/* Pengurus Grid */}
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={8}
              w="full"
            >
              {pengurusInti.map((pengurus, index) => (
                <PengurusCard key={index} pengurus={pengurus} showDescription />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Penasehat Section */}
      <Box py={20} px={{ base: 6, md: 12, lg: 16 }}>
        <Container maxW="8xl">
          <VStack spacing={20}>
            {/* Section Header */}
            <VStack spacing={6} textAlign="center" maxW="3xl">
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="800"
                lineHeight="1.2"
                color="gray.900"
              >
                Dewan Penasehat
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.600"
                lineHeight="1.8"
                maxW="2xl"
              >
                Dewan yang memberikan arahan spiritual, syariah, dan hukum dalam
                pengembangan masjid
              </Text>
            </VStack>

            {/* Penasehat Grid */}
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={8}
              w="full"
              justifyItems="center"
            >
              {penasehat.map((pengurus, index) => (
                <Box key={index} w="full" maxW="350px">
                  <PengurusCard pengurus={pengurus} />
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Seksi-Seksi Section */}
      <Box py={20} px={{ base: 6, md: 12, lg: 16 }}>
        <Container maxW="8xl">
          <VStack spacing={20}>
            {/* Section Header */}
            <VStack spacing={6} textAlign="center" maxW="3xl">
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="800"
                lineHeight="1.2"
                color="gray.900"
              >
                Bidang-Bidang
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.600"
                lineHeight="1.8"
                maxW="2xl"
              >
                Divisi-divisi yang menangani berbagai kegiatan dan program
                masjid untuk melayani jamaah
              </Text>
            </VStack>

            {/* Seksi Grid */}
            <SimpleGrid
              columns={{ base: 1, xl: 2 }}
              spacing={{ base: 8, md: 12, lg: 16 }}
              w="full"
              maxW="8xl"
            >
              {seksiSeksi.map((seksi, index) => (
                <SeksiSection key={index} seksi={seksi} />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default PengurusPage
