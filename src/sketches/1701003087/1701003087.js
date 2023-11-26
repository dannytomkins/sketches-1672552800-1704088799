import P5Wrapper from '../../components/P5Wrapper/P5Wrapper';

export const Sketch = () => {
  const sketch = (p) => {
    let t;

    p.setup = function () {
      p.createCanvas(1080, 1080);
      p.background(255, 255, 255);
      p.stroke(60, 40, 5, 5); // Modified stroke color
      p.noFill();
      t = 0;
    };

    p.draw = function () {
      // Draw in the first quadrant
      drawQuadrant(p.width / 4, p.height / 4, 0.005);

      // Draw in the second quadrant
      drawQuadrant(-p.width / 4, p.height / 4, -0.005);

      // Draw in the third quadrant
      drawQuadrant(-p.width / 4, -p.height / 4, 0.005);

      // Draw in the fourth quadrant
      drawQuadrant(p.width / 4, -p.height / 4, -0.005);
    };

    function drawQuadrant(xOffset, yOffset, rotationSpeed) {
      p.push(); // Save the current transformation state

      // Translate to the center of the quadrant
      p.translate(p.width / 2 + xOffset, p.height / 2 + yOffset);

      // Rotate based on the frame count and the specified rotation speed
      p.rotate(p.frameCount * rotationSpeed);

      // Draw the shape
      p.beginShape();
      for (let i = 0; i < 350; i++) {
        const ang = p.map(i, 0, 350, 0, p.TWO_PI);
        const rad = 350 * p.noise(i * 0.01, t * 0.01);
        const x = rad * p.cos(ang);
        const y = rad * p.sin(ang);
        p.curveVertex(x, y);
      }
      p.stroke(60, 40, 5, 5); // Modified stroke color
      p.endShape(p.CLOSE);

      p.pop(); // Restore the previous transformation state

      t += 0.1; // Adjust the increment to make it slower

      // Clear the background every 1200 frames using mod (%) operator
      if (p.frameCount % 1200 === 0) {
        p.background(255, 255, 255);
      }
    }
  };

  return (
    <div>
      <P5Wrapper sketch={sketch} />
    </div>
  );
};
