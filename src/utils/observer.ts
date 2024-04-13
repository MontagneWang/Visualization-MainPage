export default function createObserver(
  targetElement: HTMLDivElement,
  callback: Function,
  callbackOut?: Function
) {
  const observer = new IntersectionObserver(entries => {
    /**
     * callback 元素进入可视页面时执行的回调
     * callbackOut 元素离开时执行的回调
     * 使用 异步 与 Promise 来解决 setTimeout 的嵌套问题
     * 通过在添加	animation-delay 实现延迟，而不是 setTimeOut（会存在系统与性能误差）
     */
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback();
      } else {
        if (callbackOut) {
          callbackOut();
        }
      }
    });
  });
  observer.observe(targetElement);
}
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
