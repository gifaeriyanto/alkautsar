import { Box, VStack, Text, keyframes, Fade } from '@chakra-ui/react'
import type { PrayerTime } from '../types'

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 20px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.1), 0 0 80px rgba(255,255,255,0.05); }
  50% { box-shadow: 0 0 30px rgba(255,255,255,0.2), 0 0 60px rgba(255,255,255,0.15), 0 0 100px rgba(255,255,255,0.1); }
  100% { box-shadow: 0 0 20px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.1), 0 0 80px rgba(255,255,255,0.05); }
`

interface FullscreenIqamahCountdownProps {
  isVisible: boolean
  currentPrayer: PrayerTime | null
  countdown: {
    minutes: number
    seconds: number
  } | null
}

export const FullscreenIqamahCountdown = ({
  isVisible,
  currentPrayer,
  countdown,
}: FullscreenIqamahCountdownProps) => {
  if (!currentPrayer || !countdown) return null

  return (
    <Fade
      in={isVisible}
      transition={{ enter: { duration: 0.5 }, exit: { duration: 0.3 } }}
    >
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={9000}
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundImage="url('https://images.unsplash.com/photo-1519944159858-806d435dc86d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backdropFilter="blur(10px) saturate(150%)"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'rgba(0, 0, 0, 0.3)',
          zIndex: 0,
        }}
      >
        <VStack spacing={12} align="center" position="relative" zIndex={1}>
          {/* Glassy Blur Container */}
          <Box
            bg="linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%)"
            backdropFilter="blur(20px) saturate(150%)"
            borderRadius="24px"
            border="1px solid rgba(255, 255, 255, 0.2)"
            px={32}
            py={24}
            position="relative"
            animation={`${glowAnimation} 4s ease-in-out infinite`}
            transform="scale(1)"
            transition="transform 0.3s ease-out"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '24px',
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)',
              zIndex: -1,
            }}
          >
            <VStack spacing={16} align="center">
              {/* Iqomah Label */}
              <Box
                fontSize="30px"
                textAlign="center"
                letterSpacing="wide"
                color="rgba(255, 255, 255, 0.95)"
                textShadow="0 0 25px rgba(255, 255, 255, 0.5), 0 0 50px rgba(255, 255, 255, 0.3)"
                pos="absolute"
                top="-55px"
                bgColor="rgba(0, 0, 0, 0.5)"
                px="30px"
                borderTopRadius="24px"
                fontWeight="bold"
              >
                IQOMAH
              </Box>

              {/* Countdown Numbers */}
              <Text
                fontSize="240px"
                fontWeight="900"
                fontFamily="'JetBrains Mono', monospace"
                lineHeight="0.75"
                textAlign="center"
                letterSpacing="0.01em"
                color="white"
                textShadow="0 0 50px rgba(255, 255, 255, 0.9), 0 0 100px rgba(255, 255, 255, 0.7), 0 0 150px rgba(255, 255, 255, 0.5)"
              >
                {String(countdown.minutes).padStart(2, '0')}:
                {String(countdown.seconds).padStart(2, '0')}
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Fade>
  )
}
