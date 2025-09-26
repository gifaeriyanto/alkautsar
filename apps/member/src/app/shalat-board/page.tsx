'use client'

import { usePrayerTimes } from './hooks/usePrayerTimes'
import { useDevMode } from './hooks/useDevMode'
import { useIqamahTimer } from './hooks/useIqamahTimer'
import { ShalatBoard } from './components/ShalatBoard'
import { DevControls } from './components/DevControls'
import { IqamahTimer } from './components/IqamahTimer'
import { FullscreenIqamahCountdown } from './components/FullscreenIqamahCountdown'
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
        onPreviousPrayer={handlePreviousPrayer}
        onNextPrayer={handleNextPrayer}
        onToggleFridayMock={handleToggleFridayMock}
        onToggleIqamahTimer={toggleIqamahMode}
        onResetToRealTime={handleResetToRealTime}
        isDevMode={isDevMode}
      />
      <IqamahTimer
        isVisible={Boolean(isIqamahMode && isDevMode && !shouldShowFullscreen)}
        currentPrayer={currentPrayerWithIqamah}
        countdown={iqamahCountdown}
      />
      <FullscreenIqamahCountdown
        isVisible={Boolean(shouldShowFullscreen && currentPrayerWithIqamah)}
        currentPrayer={currentPrayerWithIqamah}
        countdown={iqamahCountdown}
      />
    </>
  )
}

export default ShalatBoardPage
