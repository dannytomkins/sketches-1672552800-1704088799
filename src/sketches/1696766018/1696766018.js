import backgroundImage from './41-C-background.jpg';
import P5Wrapper from '../../components/P5Wrapper/P5Wrapper';

export const Sketch = () => {
  let bgImage;
  let x1, y1; // Position of the first ellipse
  let x2, y2; // Position of the second ellipse
  let t = 0; // Time variable for Perlin noise

  const sketch = (p) => {
    p.preload = function () {
      bgImage = p.loadImage(backgroundImage);
    };

    p.setup = function () {
      p.createCanvas(1080, 1080);
      p.background(255);
      x1 = p.width / 2;
      y1 = p.height / 2;
      x2 = p.width / 2;
      y2 = p.height / 2;
    };

    p.draw = function () {
      // Move the first ellipse using Perlin noise
      const noiseX1 = p.noise(t) * p.width;
      const noiseY1 = p.noise(t + 1000) * p.height;
      x1 = p.lerp(x1, noiseX1, 0.05); // Smoothly interpolate x1 position
      y1 = p.lerp(y1, noiseY1, 0.05); // Smoothly interpolate y1 position

      // Move the second ellipse using Perlin noise
      const noiseX2 = p.noise(t + 2000) * p.width;
      const noiseY2 = p.noise(t + 3000) * p.height;
      x2 = p.lerp(x2, noiseX2, 0.05); // Smoothly interpolate x2 position
      y2 = p.lerp(y2, noiseY2, 0.05); // Smoothly interpolate y2 position

      p.blendMode(p.ADD);
      p.background(bgImage); // Clear the canvas
      p.blendMode(p.ADD);

      // Calculate the gradient colors for the first ellipse
      const xRadius1 = 100; // Adjust the size of the first ellipse
      const yRadius1 = 100; // Adjust the size of the first ellipse
      const gradient1 = p.drawingContext.createRadialGradient(
        x1, y1, 0, x1, y1, xRadius1
      );
      gradient1.addColorStop(0, 'white'); // Center color (blue)
      gradient1.addColorStop(1, 'blue'); // Circumference color (blue)

      // Calculate the gradient colors for the second ellipse
      const xRadius2 = 50; // Adjust the size of the second ellipse
      const yRadius2 = 50; // Adjust the size of the second ellipse
      const gradient2 = p.drawingContext.createRadialGradient(
        x2, y2, 0, x2, y2, xRadius2
      );
      gradient2.addColorStop(0, 'white'); // Center color (red)
      gradient2.addColorStop(1, 'blue'); // Circumference color (red)

      // Apply the gradient fill for the first ellipse
      p.drawingContext.fillStyle = gradient1;
      p.drawingContext.save();
      p.drawingContext.scale(1, yRadius1 / xRadius1);
      p.ellipse(x1, y1, xRadius1 * 2, xRadius1 * 2);
      p.drawingContext.restore();

      // Apply the gradient fill for the second ellipse
      p.drawingContext.fillStyle = gradient2;
      p.drawingContext.save();
      p.drawingContext.scale(1, yRadius2 / xRadius2);
      p.ellipse(x2, y2, xRadius2 * 2, xRadius2 * 2);
      p.drawingContext.restore();

      t += 0.01; // Increment time for Perlin noise
    };
  };

  return (
    <div>
      <P5Wrapper sketch={sketch} />
    </div>
  );
};
