/**
 *
 * @param mode 滚动模式（默认 0 为系统滚动，1 为自己设置的平滑滚动）
 * @param targetPosition 目标位置
 * @param duration 持续时长
 */
export function smoothScroll(targetPosition: number, duration: number = 500, mode: number = 0) {
    switch (mode) {
        case 0:
            // 使用scrollTo方法实现平滑滚动
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            break
        case 1:
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime: number = -1;

        function animation(currentTime: number) {
            if (startTime === -1) {
                startTime = currentTime;
            }
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        function ease(t: number, b: number, c: number, d: number) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

            requestAnimationFrame(animation);
            break
        default:
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            break
    }
}