/**
 *
 * @param func 函数
 * @param delay 延时时间
 */
export function throttle(func: () => void, delay: number): (...args: any[]) => void {
    let start = 0
    return function (...args: any[]) {
        let now = +new Date() // 通过 + 号转化为时间戳
        if (now - start > delay) {
            // @ts-ignore
            func.apply(this, args)
            start = now
        }
    }
}
//	let throttledHandleWheel = throttle(handleWheel, 500);