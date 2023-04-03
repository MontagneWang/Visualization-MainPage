let flag
let lastScrollPosition = 0
export function judgeScrollDirection() {
    let scrollPosition = window.scrollY || window.pageYOffset;
    flag = scrollPosition > lastScrollPosition
    lastScrollPosition = scrollPosition
    return flag
}