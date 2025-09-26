import {
  Box,
  HStack,
  VStack,
  Button,
  Text,
  Switch,
  FormControl,
  FormLabel,
  Badge,
  IconButton,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react'
import {
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiMinimize2,
  FiMaximize2,
  FiSettings,
} from 'react-icons/fi'

interface DevControlsProps {
  currentActiveIndex: number
  totalPrayers: number
  isFridayMocked: boolean
  isIqamahMode: boolean
  hasIqamahTime: boolean
  onPreviousPrayer: () => void
  onNextPrayer: () => void
  onToggleFridayMock: () => void
  onToggleIqamahTimer: () => void
  onResetToRealTime: () => void
  isDevMode: boolean
}

export const DevControls = ({
  currentActiveIndex,
  totalPrayers,
  isFridayMocked,
  isIqamahMode,
  hasIqamahTime,
  onPreviousPrayer,
  onNextPrayer,
  onToggleFridayMock,
  onToggleIqamahTimer,
  onResetToRealTime,
  isDevMode,
}: DevControlsProps) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  if (!isDevMode) return null

  return (
    <Box
      position="fixed"
      bottom={4}
      left="50%"
      transform="translateX(-50%)"
      zIndex={10000} // Higher than iqamah screen (which is 9999)
      w={isOpen ? 'auto' : 'auto'}
      transition="all 0.3s ease"
    >
      {/* Minimized State */}
      {!isOpen && (
        <Box
          bg="linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)"
          backdropFilter="blur(20px) saturate(150%)"
          borderRadius="16px"
          border="1px solid rgba(255, 255, 255, 0.1)"
          p={3}
          cursor="pointer"
          onClick={onToggle}
          _hover={{
            bg: 'linear-gradient(135deg, rgba(40, 40, 40, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)',
            transform: 'scale(1.02)',
          }}
          transition="all 0.2s ease"
          boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
        >
          <HStack spacing={2}>
            <FiSettings color="orange" size={16} />
            <Badge
              colorScheme="red"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="6px"
            >
              DEV
            </Badge>
            <Text fontSize="xs" color="gray.300">
              ({currentActiveIndex + 1}/{totalPrayers})
            </Text>
            {isIqamahMode && (
              <Badge
                colorScheme="green"
                fontSize="xs"
                px={2}
                py={1}
                borderRadius="6px"
              >
                IQAMAH
              </Badge>
            )}
          </HStack>
        </Box>
      )}

      {/* Expanded State - Single Line */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          bg="linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)"
          backdropFilter="blur(20px) saturate(150%)"
          borderRadius="20px"
          border="1px solid rgba(255, 255, 255, 0.15)"
          px={6}
          py={4}
          color="white"
          boxShadow="0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '20px',
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)',
            zIndex: -1,
          }}
          position="relative"
        >
          <HStack spacing={6} align="center">
            {/* Dev Mode Badge */}
            <HStack spacing={2}>
              <FiSettings color="orange" size={16} />
              <Badge
                colorScheme="red"
                fontSize="xs"
                px={2}
                py={1}
                borderRadius="6px"
                fontWeight="bold"
              >
                DEV
              </Badge>
            </HStack>

            {/* Prayer Navigation */}
            <HStack spacing={2}>
              <Text fontSize="xs" color="gray.300">
                ({currentActiveIndex + 1}/{totalPrayers})
              </Text>
              <Button
                leftIcon={<FiChevronLeft />}
                onClick={onPreviousPrayer}
                size="xs"
                variant="outline"
                isDisabled={currentActiveIndex === 0}
                color="white"
                borderColor="rgba(255, 255, 255, 0.3)"
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                }}
                _disabled={{
                  opacity: 0.4,
                  cursor: 'not-allowed',
                  color: 'gray.400',
                }}
              >
                Prev
              </Button>
              <Button
                rightIcon={<FiChevronRight />}
                onClick={onNextPrayer}
                size="xs"
                variant="outline"
                isDisabled={currentActiveIndex === totalPrayers - 1}
                color="white"
                borderColor="rgba(255, 255, 255, 0.3)"
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                }}
                _disabled={{
                  opacity: 0.4,
                  cursor: 'not-allowed',
                  color: 'gray.400',
                }}
              >
                Next
              </Button>
            </HStack>

            {/* Iqamah Timer */}
            <Button
              leftIcon={<FiClock />}
              onClick={onToggleIqamahTimer}
              size="xs"
              variant={isIqamahMode ? 'solid' : 'outline'}
              isDisabled={!hasIqamahTime}
              bg={isIqamahMode ? 'green.500' : 'transparent'}
              color={isIqamahMode ? 'white' : 'white'}
              borderColor={
                isIqamahMode ? 'green.500' : 'rgba(255, 255, 255, 0.3)'
              }
              _hover={{
                bg: isIqamahMode ? 'green.600' : 'rgba(255, 255, 255, 0.2)',
                borderColor: isIqamahMode
                  ? 'green.600'
                  : 'rgba(255, 255, 255, 0.5)',
                color: 'white',
              }}
              _disabled={{
                opacity: 0.4,
                cursor: 'not-allowed',
                color: 'gray.400',
              }}
            >
              {isIqamahMode ? 'Hide' : 'Iqamah'}
            </Button>

            {/* Friday Mock */}
            <HStack spacing={2}>
              <FiCalendar color="orange" size={14} />
              <Text fontSize="xs" color="gray.300">
                Friday
              </Text>
              <Switch
                isChecked={isFridayMocked}
                onChange={onToggleFridayMock}
                colorScheme="orange"
                size="sm"
              />
            </HStack>

            {/* Controls */}
            <HStack spacing={1} ml="auto">
              <Button
                size="xs"
                variant="ghost"
                onClick={onResetToRealTime}
                fontSize="xs"
                px={2}
                color="white"
                _hover={{
                  bg: 'rgba(255, 165, 0, 0.2)',
                  color: 'white',
                }}
              >
                Reset
              </Button>
              <IconButton
                aria-label="Minimize"
                icon={<FiMinimize2 />}
                size="xs"
                variant="ghost"
                onClick={onToggle}
                color="white"
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                }}
              />
            </HStack>
          </HStack>
        </Box>
      </Collapse>
    </Box>
  )
}
