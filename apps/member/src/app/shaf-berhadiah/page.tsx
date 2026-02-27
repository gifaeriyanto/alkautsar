'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Button, HStack, Heading, VStack } from '@chakra-ui/react'

const MAX_SHAF = 18
const MAX_PER_SHAF = 24
const MAX_DISPLAY_URUTAN = 12
const SARUNG_RESULT_COUNT = 5
const SEJADAH_RESULT_COUNT = 7
const COUNTDOWN_SECONDS = 8
const MAX_GENERATED_URUTAN = Math.min(MAX_PER_SHAF, MAX_DISPLAY_URUTAN)

type Direction = 'dari kiri' | 'dari kanan'
type Phase = 'idle' | 'loading' | 'result'
type PrizePhase = 'sarung' | 'sejadah'

interface LuckyShaf {
  shaf: number
  urutan: number
  direction: Direction
}

interface ConfettiPiece {
  id: string
  left: number
  delay: number
  duration: number
  color: string
  drift: number
  rotate: number
  size: number
}

const CONFETTI_COLORS = ['#FFFFFF', '#FBBF24', '#F97316', '#FED7AA']

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const getResultCountByPhase = (phase: PrizePhase) =>
  phase === 'sarung' ? SARUNG_RESULT_COUNT : SEJADAH_RESULT_COUNT

const toSelectionKey = ({ shaf, urutan, direction }: LuckyShaf) =>
  `${shaf}-${urutan}-${direction}`

const generateLuckyShaf = (count: number, excludedKeys: Set<string> = new Set()): LuckyShaf[] => {
  const generated = new Set<string>()
  const results: LuckyShaf[] = []
  let attempts = 0
  const maxAttempts = 10000

  while (results.length < count && attempts < maxAttempts) {
    attempts += 1
    const shaf = getRandomInt(1, MAX_SHAF)
    const direction: Direction = Math.random() > 0.5 ? 'dari kiri' : 'dari kanan'
    const urutan = getRandomInt(1, MAX_GENERATED_URUTAN)
    const key = `${shaf}-${urutan}-${direction}`

    if (excludedKeys.has(key) || generated.has(key)) continue
    generated.add(key)
    results.push({ shaf, urutan, direction })
  }

  return results
}

const getStripeBackground = (index: number) => {
  const colors = [
    'rgba(234, 88, 12, 0.92)',
    'rgba(194, 65, 12, 0.9)',
    'rgba(159, 54, 18, 0.9)',
    'rgba(194, 65, 12, 0.9)',
    'rgba(234, 88, 12, 0.92)',
  ]

  return colors[index] ?? 'rgba(194, 65, 12, 0.9)'
}

const formatShafLabel = (shaf: number) =>
  shaf >= 13 ? `Shaf ${shaf - 12} Lt. 2` : `Shaf ${shaf}`

const createConfetti = (seed: number): ConfettiPiece[] =>
  Array.from({ length: 90 }, (_, i) => ({
    id: `${seed}-${i}-${Math.random().toString(36).slice(2, 8)}`,
    left: Math.random() * 100,
    delay: Math.random() * 0.45,
    duration: 2.2 + Math.random() * 1.2,
    color: CONFETTI_COLORS[getRandomInt(0, CONFETTI_COLORS.length - 1)] ?? '#FFFFFF',
    drift: -60 + Math.random() * 120,
    rotate: Math.random() * 360,
    size: 6 + Math.random() * 8,
  }))

const ShafBerhadiahPage = () => {
  const [phase, setPhase] = useState<Phase>('idle')
  const [prizePhase, setPrizePhase] = useState<PrizePhase>('sarung')
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS)
  const [luckyShaf, setLuckyShaf] = useState<LuckyShaf[]>([])
  const [revealedCount, setRevealedCount] = useState(0)
  const [rollingShaf, setRollingShaf] = useState<LuckyShaf[]>(() =>
    generateLuckyShaf(SARUNG_RESULT_COUNT),
  )
  const [isConfettiVisible, setIsConfettiVisible] = useState(false)
  const [confettiSeed, setConfettiSeed] = useState(0)
  const pendingResultRef = useRef<LuckyShaf[]>([])
  const confettiPiecesRef = useRef<ConfettiPiece[]>([])
  const usedSelectionKeysRef = useRef<Set<string>>(new Set())
  const tickAudioRef = useRef<HTMLAudioElement | null>(null)

  const currentResultCount = getResultCountByPhase(prizePhase)

  const startDraw = (targetPrizePhase: PrizePhase, resetUsedKeys: boolean) => {
    if (phase === 'loading') return
    if (resetUsedKeys) {
      usedSelectionKeysRef.current = new Set()
    }

    const resultCount = getResultCountByPhase(targetPrizePhase)
    pendingResultRef.current = generateLuckyShaf(resultCount, usedSelectionKeysRef.current)
    setRollingShaf(generateLuckyShaf(resultCount, usedSelectionKeysRef.current))
    setCountdown(COUNTDOWN_SECONDS)
    setPrizePhase(targetPrizePhase)
    setPhase('loading')
  }

  const playTick = () => {
    const audio = tickAudioRef.current
    if (!audio) return

    audio.currentTime = 0
    void audio.play().catch((_error) => undefined)
  }

  const handleNextPhase = () => {
    if (phase !== 'result' || prizePhase !== 'sarung') return
    startDraw('sejadah', false)
  }

  useEffect(() => {
    if (phase !== 'loading') return undefined

    let remaining = COUNTDOWN_SECONDS
    setCountdown(remaining)
    playTick()

    const timer = window.setInterval(() => {
      remaining -= 1
      if (remaining <= 0) {
        window.clearInterval(timer)
        setLuckyShaf(pendingResultRef.current)
        pendingResultRef.current.forEach((item) => {
          usedSelectionKeysRef.current.add(toSelectionKey(item))
        })
        setPhase('result')
        setConfettiSeed((prev) => prev + 1)
        setIsConfettiVisible(true)
        return
      }
      playTick()
      setCountdown(remaining)
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [luckyShaf.length, phase])

  useEffect(() => {
    tickAudioRef.current = new Audio('/tick.mp3')
    tickAudioRef.current.preload = 'auto'

    return () => {
      if (!tickAudioRef.current) return
      tickAudioRef.current.pause()
      tickAudioRef.current = null
    }
  }, [])

  useEffect(() => {
    confettiPiecesRef.current = createConfetti(confettiSeed)
  }, [confettiSeed])

  useEffect(() => {
    if (!isConfettiVisible) return undefined

    const timer = window.setTimeout(() => {
      setIsConfettiVisible(false)
    }, 3300)

    return () => {
      window.clearTimeout(timer)
    }
  }, [isConfettiVisible])

  useEffect(() => {
    if (phase !== 'result') return undefined

    setRevealedCount(0)
    let nextCount = 0
    const revealTimer = window.setInterval(() => {
      nextCount += 1
      setRevealedCount(nextCount)

      if (nextCount >= luckyShaf.length) {
        window.clearInterval(revealTimer)
      }
    }, 380)

    return () => {
      window.clearInterval(revealTimer)
    }
  }, [luckyShaf.length, phase])

  useEffect(() => {
    if (phase !== 'loading') return undefined

    const rollingTimer = window.setInterval(() => {
      setRollingShaf(generateLuckyShaf(currentResultCount))
    }, 120)

    return () => {
      window.clearInterval(rollingTimer)
    }
  }, [currentResultCount, phase])

  return (
    <>
      <style>
        {`
          html, body {
            overflow: hidden !important;
            height: 100vh !important;
            width: 100vw !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #c05621 !important;
          }
          * {
            box-sizing: border-box;
          }
          @keyframes confettiFall {
            0% {
              transform: translate3d(0, -12vh, 0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translate3d(var(--drift), 110vh, 0) rotate(var(--rotate));
              opacity: 0;
            }
          }
          @keyframes countdownPulse {
            0%, 100% {
              transform: scale(1);
              text-shadow: 0 0 0 rgba(255, 255, 255, 0);
            }
            50% {
              transform: scale(1.06);
              text-shadow: 0 0 35px rgba(255, 255, 255, 0.35);
            }
          }
          @keyframes progressRun {
            from { width: 100%; }
            to { width: 0%; }
          }
          @keyframes rollingGlow {
            0%, 100% { opacity: 0.8; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-1px); }
          }
        `}
      </style>

      <Box
        h="100vh"
        w="100vw"
        position="fixed"
        top={0}
        left={0}
        bgImage="url('https://images.unsplash.com/photo-1479030574009-1e48577746e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        bgSize="cover"
        bgPosition="center"
      >
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(140deg, rgba(15,23,42,0.75) 0%, rgba(194,65,12,0.86) 100%)"
        />
        {isConfettiVisible ? (
          <Box position="absolute" inset={0} pointerEvents="none" zIndex={4}>
            {confettiPiecesRef.current.map((piece) => (
              <Box
                key={piece.id}
                position="absolute"
                top="-16px"
                left={`${piece.left}%`}
                w={`${piece.size}px`}
                h={`${piece.size * 0.58}px`}
                borderRadius="sm"
                bg={piece.color}
                style={
                  {
                    '--drift': `${piece.drift}px`,
                    '--rotate': `${piece.rotate}deg`,
                    animationName: 'confettiFall',
                    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
                    animationDuration: `${piece.duration}s`,
                    animationDelay: `${piece.delay}s`,
                    animationFillMode: 'forwards',
                  } as React.CSSProperties
                }
              />
            ))}
          </Box>
        ) : null}

        <VStack
          position="relative"
          zIndex={5}
          h="100%"
          justify="center"
          align={phase === 'result' ? 'stretch' : 'center'}
          spacing={phase === 'result' ? 0 : 8}
          color="white"
          px={phase === 'result' ? 0 : 6}
          textAlign="center"
        >
          {phase === 'idle' && (
            <VStack
              spacing={{ base: 6, md: 8 }}
              bg="rgba(15, 23, 42, 0.35)"
              border="1px solid rgba(255,255,255,0.25)"
              borderRadius="3xl"
              px={{ base: 8, md: 16 }}
              py={{ base: 10, md: 14 }}
              boxShadow="0 24px 64px rgba(0,0,0,0.3)"
              backdropFilter="blur(10px)"
            >
              <VStack spacing={2}>
                <Heading fontSize={{ base: '5xl', md: '7xl' }} fontWeight="800" lineHeight={1}>
                  Shaf Berhadiah
                </Heading>
                <Heading
                  as="h2"
                  fontSize={{ base: 'lg', md: '2xl' }}
                  fontWeight="600"
                  color="orange.100"
                  letterSpacing="wide"
                >
                  Lucky Draw 7 Shaf
                </Heading>
              </VStack>

              <Button
                onClick={() => {
                  startDraw('sarung', true)
                }}
                h={{ base: '74px', md: '96px' }}
                px={{ base: 16, md: 24 }}
                borderRadius="full"
                fontSize={{ base: '2xl', md: '4xl' }}
                fontWeight="800"
                color="white"
                bg="linear-gradient(120deg, #F97316 0%, #EA580C 100%)"
                _hover={{
                  bg: 'linear-gradient(120deg, #FB923C 0%, #F97316 100%)',
                  transform: 'translateY(-2px)',
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                boxShadow="0 20px 45px rgba(249, 115, 22, 0.45)"
              >
                Mulai
              </Button>
            </VStack>
          )}

          {phase === 'loading' && (
            <VStack
              spacing={5}
              w={{ base: '92%', md: '760px' }}
              bg="rgba(15, 23, 42, 0.38)"
              border="1px solid rgba(255,255,255,0.25)"
              borderRadius="3xl"
              p={{ base: 8, md: 12 }}
              boxShadow="0 24px 60px rgba(0,0,0,0.35)"
              backdropFilter="blur(10px)"
            >
              <Heading
                fontSize={{ base: 'xl', md: '3xl' }}
                fontWeight="800"
                color="orange.100"
                letterSpacing="wider"
                textTransform="uppercase"
              >
                Mengundi {prizePhase === 'sarung' ? 'Hadiah Sarung' : 'Hadiah Sejadah'}
              </Heading>
              <Heading
                fontSize={{ base: '8rem', md: '12rem' }}
                lineHeight={1}
                fontFamily="'JetBrains Mono', Consolas, monospace"
                fontWeight="700"
                sx={{ animation: 'countdownPulse 1s ease-in-out infinite' }}
              >
                {countdown}
              </Heading>
              <Box
                w="full"
                h={{ base: '12px', md: '16px' }}
                bg="whiteAlpha.300"
                borderRadius="full"
                overflow="hidden"
                border="1px solid rgba(255,255,255,0.3)"
              >
                <Box
                  h="100%"
                  bg="linear-gradient(90deg, #FDE68A 0%, #F97316 45%, #EA580C 100%)"
                  borderRadius="full"
                  sx={{ animation: `progressRun ${COUNTDOWN_SECONDS}s linear forwards` }}
                />
              </Box>
              <VStack
                w="full"
                spacing={2}
                mt={1}
                bg="rgba(0,0,0,0.2)"
                border="1px solid rgba(255,255,255,0.18)"
                borderRadius="2xl"
                px={{ base: 4, md: 6 }}
                py={{ base: 3, md: 4 }}
              >
                {rollingShaf.map((item) => (
                  <Heading
                    key={`rolling-${item.shaf}-${item.urutan}-${item.direction}`}
                    as="h3"
                    fontSize={{ base: 'lg', md: '2xl' }}
                    fontWeight="700"
                    fontFamily="'JetBrains Mono', Consolas, monospace"
                    color="orange.50"
                    letterSpacing="wide"
                    sx={{ animation: 'rollingGlow 0.5s ease-in-out infinite' }}
                  >
                    {formatShafLabel(item.shaf)} Urutan {item.urutan} {item.direction}
                  </Heading>
                ))}
              </VStack>
            </VStack>
          )}

          {phase === 'result' && (
            <VStack w="full" h="full" spacing={0} overflow="hidden">
              <HStack
                w="full"
                justify="space-between"
                px={{ base: 4, md: 6 }}
                py={{ base: 3, md: 4 }}
                bg="rgba(0,0,0,0.35)"
                borderBottom="1px solid rgba(255,255,255,0.18)"
              >
                <Heading size={{ base: 'md', md: 'lg' }} color="orange.100">
                  {prizePhase === 'sarung' ? 'Hadiah Sarung' : 'Hadiah Sejadah'}
                </Heading>
                {prizePhase === 'sarung' ? (
                  <Button
                    onClick={handleNextPhase}
                    size={{ base: 'sm', md: 'md' }}
                    bg="white"
                    color="orange.700"
                    fontWeight="800"
                    _hover={{ bg: 'orange.50' }}
                    borderRadius="full"
                  >
                    Next
                  </Button>
                ) : null}
              </HStack>
              {luckyShaf.map((item, index) => (
                <VStack
                  key={`${item.shaf}-${item.direction}-${item.urutan}`}
                  w="full"
                  flex={1}
                  justify="center"
                  spacing={{ base: 2, md: 3 }}
                  bg={getStripeBackground(index)}
                  borderBottom={index === luckyShaf.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.16)'}
                  opacity={index < revealedCount ? 1 : 0}
                  transform={index < revealedCount ? 'translateY(0)' : 'translateY(18px)'}
                  transition="opacity 0.45s ease, transform 0.45s ease"
                >
                  <HStack spacing={{ base: 3, md: 5 }} align="center">
                    <Box
                      minW={{ base: '40px', md: '56px' }}
                      h={{ base: '40px', md: '56px' }}
                      borderRadius="full"
                      bg="white"
                      color="orange.700"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontWeight="800"
                      fontSize={{ base: 'xl', md: '2xl' }}
                      boxShadow="0 8px 18px rgba(0,0,0,0.2)"
                    >
                      {index + 1}
                    </Box>
                    <Heading
                      fontSize={{ base: '2xl', md: '4xl' }}
                      fontWeight="700"
                      color="white"
                      fontFamily="'JetBrains Mono', Consolas, monospace"
                      lineHeight={1.1}
                    >
                      {formatShafLabel(item.shaf)} Urutan {item.urutan} {item.direction}
                    </Heading>
                  </HStack>
                </VStack>
              ))}
            </VStack>
          )}
        </VStack>
      </Box>
    </>
  )
}

export default ShafBerhadiahPage
