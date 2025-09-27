'use client'

import { usePrayerTimes } from './hooks/usePrayerTimes'
import { useDevMode } from './hooks/useDevMode'
import { useIqamahTimer } from './hooks/useIqamahTimer'
import { useSyuruqForbiddenTime } from './hooks/useSyuruqForbiddenTime'
import { ShalatBoard } from './components/ShalatBoard'
import { DevControls } from './components/DevControls'
import { FullscreenIqamahCountdown } from './components/FullscreenIqamahCountdown'
import { FullscreenSyuruqForbiddenTime } from './components/FullscreenSyuruqForbiddenTime'
import {
  ConfigurationLoading,
  PrayerTimesLoading,
  ErrorState,
} from './components/LoadingStates'
import { GlobalStyles } from './components/GlobalStyles'

const ShalatBoardPage = () => {
  const {
    prayerTimes: rawPrayerTimes,
    isLoading,
    error,
    currentTime,
  } = usePrayerTimes()

  // Dev mode hooks (now has access to prayer times)
  const {
    isDevMode,
    isFridayMocked,
    devActiveIndex,
    handlePreviousPrayer,
    handleNextPrayer,
    handleToggleFridayMock,
    handleResetToRealTime,
    applyDevModeToTimes,
  } = useDevMode(rawPrayerTimes)

  // Apply dev mode modifications to prayer times
  const prayerTimes = applyDevModeToTimes(rawPrayerTimes)

  // Iqamah timer hook
  const {
    isIqamahMode,
    iqamahCountdown,
    shouldShowFullscreen,
    toggleIqamahMode,
    currentPrayerWithIqamah,
  } = useIqamahTimer(prayerTimes, isDevMode)

  // Syuruq forbidden time hook
  const {
    isForbiddenTime,
    forbiddenCountdown,
    shouldShowFullscreen: shouldShowForbiddenFullscreen,
    syuruqTime,
    toggleForbiddenMode,
  } = useSyuruqForbiddenTime(prayerTimes, isDevMode)

  if (isLoading) {
    return prayerTimes.length === 0 ? (
      <ConfigurationLoading />
    ) : (
      <PrayerTimesLoading />
    )
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
    <>
      <GlobalStyles />
      <ShalatBoard prayerTimes={prayerTimes} currentTime={currentTime} />
      <DevControls
        currentActiveIndex={
          devActiveIndex ?? prayerTimes.findIndex((p) => p.isActive)
        }
        totalPrayers={prayerTimes.length}
        isFridayMocked={isFridayMocked}
        isIqamahMode={isIqamahMode}
        hasIqamahTime={Boolean(currentPrayerWithIqamah)}
        isSyuruqForbiddenMode={isForbiddenTime}
        hasSyuruqTime={Boolean(syuruqTime)}
        onPreviousPrayer={handlePreviousPrayer}
        onNextPrayer={handleNextPrayer}
        onToggleFridayMock={handleToggleFridayMock}
        onToggleIqamahTimer={toggleIqamahMode}
        onToggleSyuruqForbiddenTimer={toggleForbiddenMode}
        onResetToRealTime={handleResetToRealTime}
        isDevMode={isDevMode}
      />
      <FullscreenIqamahCountdown
        isVisible={Boolean(shouldShowFullscreen && currentPrayerWithIqamah)}
        currentPrayer={currentPrayerWithIqamah}
        countdown={iqamahCountdown}
      />
      <FullscreenSyuruqForbiddenTime
        isVisible={Boolean(shouldShowForbiddenFullscreen && isForbiddenTime)}
        syuruqTime={syuruqTime}
        countdown={forbiddenCountdown}
      />
    </>
  )
}

export default ShalatBoardPage
