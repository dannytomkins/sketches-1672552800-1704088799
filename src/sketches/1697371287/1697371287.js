import React, { useState, useEffect } from 'react';
import backgroundImage from './42-C-background.jpg';
import P5Wrapper from '../../components/P5Wrapper/P5Wrapper';

export const Sketch = () => {
  let bgImage;
  const [R, setR] = useState(1); // Default
  const [r, setr] = useState(2.5); // Default
  const [d, setd] = useState(5); // Default current date

  let t1, t2, t3, t4;

  const sketch = (p) => {
    p.preload = function () {
      bgImage = p.loadImage(backgroundImage);
    };

    p.setup = function () {
      p.createCanvas(1080, 1080);
      p.background(bgImage); // Set the background to black
      p.noFill();
      p.stroke(255, 50); // Set the stroke (point and line) color to white with reduced opacity (50)
      
      t1 = p.random(p.TWO_PI); // Random starting position for point 1
      t2 = p.random(p.TWO_PI); // Random starting position for point 2
      t3 = p.random(p.TWO_PI); // Random starting position for point 3
      t4 = p.random(p.TWO_PI); // Random starting position for point 4
    
    };

    p.draw = function () {
      p.translate(p.width / 2, p.height / 2);

      // Calculate angles for each point, ensuring they are evenly spaced
      let angleStep = p.PI / 2; // 90 degrees or PI/2 radians
      t1 += 0.01;
      t2 = t1 + angleStep;
      t3 = t2 + angleStep;
      t4 = t3 + angleStep;
    
      // Calculate the positions of the points using the updated angles
      let x1 = (R - r) * p.cos(t1) + d * p.cos((R - r) * t1 / r);
      let y1 = (R - r) * p.sin(t1) - d * p.sin((R - r) * t1 / r);
    
      let x2 = (R - r) * p.cos(t2) + d * p.cos((R - r) * t2 / r);
      let y2 = (R - r) * p.sin(t2) - d * p.sin((R - r) * t2 / r);
    
      let x3 = (R - r) * p.cos(t3) + d * p.cos((R - r) * t3 / r);
      let y3 = (R - r) * p.sin(t3) - d * p.sin((R - r) * t3 / r);
    
      let x4 = (R - r) * p.cos(t4) + d * p.cos((R - r) * t4 / r);
      let y4 = (R - r) * p.sin(t4) - d * p.sin((R - r) * t4 / r);
      
      // Center the animation on the canvas
      let mappedX1 = p.map(x1, -8, 8, -p.width / 2, p.width / 2);
      let mappedY1 = p.map(y1, -8, 8, -p.height / 2, p.height / 2);
      
      let mappedX2 = p.map(x2, -8, 8, -p.width / 2, p.width / 2);
      let mappedY2 = p.map(y2, -8, 8, -p.height / 2, p.height / 2);
      
      let mappedX3 = p.map(x3, -8, 8, -p.width / 2, p.width / 2);
      let mappedY3 = p.map(y3, -8, 8, -p.height / 2, p.height / 2);
      
      let mappedX4 = p.map(x4, -8, 8, -p.width / 2, p.width / 2);
      let mappedY4 = p.map(y4, -8, 8, -p.height / 2, p.height / 2);
      
      // Draw points with reduced opacity
      p.stroke(255, 50);
      p.point(mappedX1, mappedY1);
      p.point(mappedX2, mappedY2);
      p.point(mappedX3, mappedY3);
      p.point(mappedX4, mappedY4);
      
      // Draw lines connecting the points with reduced opacity
      p.line(mappedX1, mappedY1, mappedX2, mappedY2);
      p.line(mappedX2, mappedY2, mappedX3, mappedY3);
      p.line(mappedX3, mappedY3, mappedX4, mappedY4);
      p.line(mappedX4, mappedY4, mappedX1, mappedY1);
      
      t1 += 0.01; // You can adjust the speed of animation by changing this value
      t2 += 0.01;
      t3 += 0.01;
      t4 += 0.01;    
    };
  };
  const handleRChange = (event) => {
    setR(event.target.value);
  };

  const handlerChange = (event) => {
    setr(event.target.value);
  };

  const handledChange = (event) => {
    setd(event.target.value);
  };

  return (
    <div>
      <P5Wrapper sketch={sketch} />
      <div>
        R:
        <input type="text" value={R} onChange={handleRChange} />
      </div>
      <div>
        r:
        <input type="text" value={r} onChange={handlerChange} />
      </div>
      <div>
        d:
        <input type="text" value={d} onChange={handledChange} />
      </div>
    </div>    
  );
};
