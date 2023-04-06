/**
 *
 * @param canvas 画布元素
 * @param points 绘制点
 * @param color 线条颜色
 * @param alpha 不透明度
 */
export function drawCurve(canvas: HTMLCanvasElement, points: number[][], color: string = "black", alpha: number = 1, lineWidth: number = 4) {
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    let t = 0;
    let n = points.length - 1;
    let curvePoints: number[][] = [];

    function animate() {
        t += 0.0032;

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

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            // 重新绘制一遍线条
            // ctx.strokeStyle = `${color}`;
            // ctx.lineWidth = lineWidth;
            // ctx.beginPath();
            // ctx.moveTo(curvePoints[0][0], curvePoints[0][1]);
            //
            // for (let i = 1; i < curvePoints.length; i++) {
            //     ctx.lineTo(curvePoints[i][0], curvePoints[i][1]);
            // }
            //
            // ctx.stroke();
        }
    }

    animate();

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


