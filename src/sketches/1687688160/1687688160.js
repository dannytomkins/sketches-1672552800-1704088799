import React from 'react';
import backgroundImage from './26-C-background.jpg';
import P5Wrapper from '../../components/P5Wrapper/P5Wrapper';

export const Sketch = () => {
  let bgImage;

  const sketch = (p) => {
    let t;

    p.preload = function() {
      bgImage = p.loadImage(backgroundImage);
    };

    p.setup = function() {
      p.createCanvas(1080, 1080);
      // p.blendMode(p.NORMAL)
      p.background(bgImage);
      p.stroke(255, 255, 255, 25); // Modified stroke color
      p.noFill();
      t = 0;
    };

    p.draw = function() {
      // p.blendMode(p.HARD_LIGHT); 
      p.translate(p.width / 2, p.height / 2);
      p.rotate(p.frameCount * 0.01);
      p.beginShape();
      for (let i = 0; i < 500; i++) {
        const ang = p.map(i, 0, 500, 0, p.TWO_PI);
        const rad = 500 * p.noise(i * 0.01, t * 0.01);
        const x = rad * p.cos(ang);
        const y = rad * p.sin(ang);
        p.curveVertex(x, y);
      }
      p.stroke(255, 255, 255, 25); // Modified stroke color
      p.endShape(p.CLOSE);

      t += 1;

      // clear the background every 1200 frames using mod (%) operator
      if (p.frameCount % 1200 === 0) {
        p.background(bgImage);
      }
    };
  };

  return (
    <div>
      <P5Wrapper sketch={sketch} />
    </div>
  );
};
