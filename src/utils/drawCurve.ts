/**
 *
 * @param canvas 画布元素
 * @param points 绘制点
 * @param color 线条颜色
 * @param alpha 不透明度
 * @param lineWidth 线条宽度
 * @param duration 绘制曲线的总时间（单位：毫秒）
 * todo 可优化该画线算法
 */
export function drawCurve(canvas: HTMLCanvasElement,
                          points: number[][],
                          color: string = "black",
                          alpha: number = 1,
                          lineWidth: number = 4,
                          duration: number = 1000) {
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    let startTime = 0; // 记录动画开始时间
    let n = points.length - 1;
    let curvePoints: number[][] = [];

    function animate(timestamp: number) {
        if (!startTime) {
            startTime = timestamp; // 初始化动画开始时间
        }

        let elapsed = timestamp - startTime; // 计算已经经过的时间
        let t = elapsed / duration; // 计算当前的 t 值

        if (t > 1) {
            t = 1; // 如果已经超过了绘制时间，就将 t 值设为 1
        } else {
            requestAnimationFrame(animate); // 如果还没有超过绘制时间，就继续请求下一帧动画
        }

        let x = 0;
        let y = 0;

        for (let i = 0; i <= n; i++) {
            let b = binomialCoefficient(n, i);
            let k = b * Math.pow(1 - t, n - i) * Math.pow(t, i);

            x += k * points[i][0];
            y += k * points[i][1];
        }

        // 绘制点的颜色
        ctx.fillStyle = `${color}`;
        ctx.globalAlpha = alpha; // 设置不透明度
        curvePoints.push([x, y]);
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI);
        ctx.fill();

        if (curvePoints.length > 1) {
            ctx.strokeStyle = `${color}`; // 设置颜色
            ctx.lineWidth = lineWidth; // 设置线条宽度
            ctx.beginPath();
            ctx.moveTo(curvePoints[curvePoints.length - 2][0], curvePoints[curvePoints.length - 2][1]);
            ctx.lineTo(curvePoints[curvePoints.length - 1][0], curvePoints[curvePoints.length - 1][1]);
            ctx.stroke();
        }

        if (t >= 1) {
            // 重新绘制一遍线条
            ctx.strokeStyle = `${color}`;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(curvePoints[0][0], curvePoints[0][1]);

            for (let i = 1; i < curvePoints.length; i++) {
                ctx.lineTo(curvePoints[i][0], curvePoints[i][1]);
            }

            ctx.stroke();
        }
    }

    animate(0);

    function binomialCoefficient(n: number, k: number) {
        let coefficient = 1;
        for (let i = n - k + 1; i <= n; i++) {
            coefficient *= i;
        }
        for (let i = 1; i <= k; i++) {
            coefficient /= i;
        }
        return coefficient;
    }
}