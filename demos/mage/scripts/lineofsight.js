// This code was taken from http://en.wikipedia.org/wiki/Midpoint_circle_algorithm, ported to JavaScript and modified
// to draw a filled circle.
function drawFilledCircle(centerX, centerY, radius) {
    var x = radius,
        y = 0,
        radiusError = 1 - x;

    while (x >= y) {
        drawLine(x + centerX, y + centerY, -x + centerX, y + centerY);
        drawLine(y + centerX, x + centerY, -y + centerX, x + centerY);
        drawLine(y + centerX, -x + centerY, -y + centerX, -x + centerY);
        drawLine(x + centerX, -y + centerY, -x + centerX, -y + centerY);

        y += 1;

        if (radiusError < 0) {
            radiusError += 2 * y + 1;
        } else {
            x--;
            radiusError += 2 * (y - x + 1);
        }
    }
}

// This code is based on an example taken from http://de.wikipedia.org/wiki/Bresenham-Algorithmus
function drawLine(fromX, fromY, toX, toY) {
    var deltaX = Math.abs(toX - fromX),
        deltaY = -Math.abs(toY - fromY),
        signX = fromX < toX ? 1 : -1,
        signY = fromY < toY ? 1 : -1,
        error = deltaX + deltaY;

    while (true) {
        drawPixel(fromX, fromY);

        if (fromX === toX && fromY === toY) {
            break;
        }

        if (error * 2 > deltaY) {
            error += deltaY;
            fromX += signX;
        }

        if (error * 2 < deltaX) {
            error += deltaX;
            fromY += signY;
        }
    }
}