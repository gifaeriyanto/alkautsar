import { Box, VStack, Text, keyframes, Fade } from '@chakra-ui/react'
import type { PrayerTime } from '../types'

const pulseAnimation = keyframes`
  0% { 
    box-shadow: 0 0 20px rgba(255,165,0,0.3), 0 0 40px rgba(255,165,0,0.2), 0 0 80px rgba(255,165,0,0.1);
    background: linear-gradient(135deg, rgba(255,165,0,0.15) 0%, rgba(255,140,0,0.1) 50%, rgba(255,69,0,0.05) 100%);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255,165,0,0.5), 0 0 60px rgba(255,165,0,0.3), 0 0 100px rgba(255,165,0,0.15);
    background: linear-gradient(135deg, rgba(255,165,0,0.25) 0%, rgba(255,140,0,0.2) 50%, rgba(255,69,0,0.1) 100%);
  }
  100% { 
    box-shadow: 0 0 20px rgba(255,165,0,0.3), 0 0 40px rgba(255,165,0,0.2), 0 0 80px rgba(255,165,0,0.1);
    background: linear-gradient(135deg, rgba(255,165,0,0.15) 0%, rgba(255,140,0,0.1) 50%, rgba(255,69,0,0.05) 100%);
  }
`

interface FullscreenSyuruqForbiddenTimeProps {
  isVisible: boolean
  syuruqTime: PrayerTime | null
  countdown: {
    minutes: number
    seconds: number
  } | null
}

export const FullscreenSyuruqForbiddenTime = ({
  isVisible,
  syuruqTime,
  countdown,
}: FullscreenSyuruqForbiddenTimeProps) => {
  if (!syuruqTime || !countdown) return null

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
          bg: 'rgba(0, 0, 0, 0.4)',
          zIndex: 0,
        }}
      >
        <VStack spacing={12} align="center" position="relative" zIndex={1}>
          {/* Glassy Blur Container with Orange Theme */}
          <Box
            backdropFilter="blur(20px) saturate(150%)"
            borderRadius="24px"
            border="2px solid rgba(255, 165, 0, 0.3)"
            px={32}
            py={24}
            position="relative"
            animation={`${pulseAnimation} 3s ease-in-out infinite`}
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
                'linear-gradient(135deg, rgba(255, 165, 0, 0.1) 0%, transparent 50%, rgba(255, 140, 0, 0.05) 100%)',
              zIndex: -1,
            }}
          >
            <VStack spacing={16} align="center">
              {/* Forbidden Time Label */}
              <Box
                fontSize="24px"
                textAlign="center"
                letterSpacing="wide"
                color="rgba(255, 255, 255, 0.95)"
                textShadow="0 0 25px rgba(255, 165, 0, 0.8), 0 0 50px rgba(255, 140, 0, 0.5)"
                pos="absolute"
                top="-61px"
                bgColor="rgba(255, 69, 0, 0.8)"
                px="30px"
                py="8px"
                borderTopRadius="24px"
                fontWeight="bold"
                border="1px solid rgba(255, 165, 0, 0.5)"
              >
                WAKTU TERLARANG SHALAT
              </Box>

              {/* Countdown Numbers */}
              <Text
                fontSize="180px"
                fontWeight="900"
                fontFamily="'JetBrains Mono', monospace"
                lineHeight="0.75"
                textAlign="center"
                letterSpacing="0.01em"
                color="orange.200"
                textShadow="0 0 50px rgba(255, 0, 0, 0.9), 0 0 100px rgba(220, 0, 0, 0.7), 0 0 150px rgba(180, 0, 0, 0.5)"
              >
                {String(countdown.minutes).padStart(2, '0')}:
                {String(countdown.seconds).padStart(2, '0')}
              </Text>

              {/* Warning Message */}
              <Text
                fontSize="18px"
                textAlign="center"
                color="rgba(255, 255, 255, 0.9)"
                textShadow="0 0 20px rgba(255, 165, 0, 0.6)"
                fontWeight="semibold"
                maxW="600px"
                lineHeight="1.5"
                pos="absolute"
                bottom="-80px"
              >
                Masa larangan shalat setelah Syuruq berlangsung selama 15 menit
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Fade>
  )
}
