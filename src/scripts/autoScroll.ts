// Auto-scroll functionality based on smooth scrolling pattern
export function initAutoScroll(): void {
  setTimeout(() => {
    const fps = 100;
    const speedFactor = 0.002;
    const minDelta = 0.5;
    let autoScrollSpeed = 10;
    let autoScrollTimer: ReturnType<typeof setInterval> | null = null;
    let restartTimer: ReturnType<typeof setTimeout> | null = null;
    let isScrolling = false;
    let prevPos = 0;
    let currentPos = 0;
    let currentTime = Date.now();
    let prevTime: number | null = null;

    window.addEventListener('scroll', () => {
      currentPos = window.scrollY || window.pageYOffset;
    });

    window.addEventListener('wheel', handleManualScroll);
    window.addEventListener('touchmove', handleManualScroll);

    function handleManualScroll() {
      currentPos = window.scrollY || window.pageYOffset;
      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
      }
      if (restartTimer) {
        clearTimeout(restartTimer);
      }
      restartTimer = setTimeout(() => {
        prevTime = null;
        setAutoScroll();
      }, 50);
    }

    function setAutoScroll(newValue?: number) {
      if (newValue) {
        autoScrollSpeed = speedFactor * newValue;
      }
      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
      }
      autoScrollTimer = setInterval(() => {
        currentTime = Date.now();
        if (prevTime) {
          if (!isScrolling) {
            const timeDiff = currentTime - prevTime;
            currentPos += autoScrollSpeed * timeDiff;
            if (Math.abs(currentPos - prevPos) >= minDelta) {
              isScrolling = true;
              window.scrollTo(0, currentPos);
              isScrolling = false;
              prevPos = currentPos;
              prevTime = currentTime;
            }
          }
        } else {
          prevTime = currentTime;
        }
      }, 1000 / fps);
    }

    setAutoScroll(20);
  }, 1000);
}
