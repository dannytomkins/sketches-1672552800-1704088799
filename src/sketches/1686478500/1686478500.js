import React from 'react';
import backgroundImage from './24-B-background.jpg';
import P5Wrapper from '../../components/P5Wrapper/P5Wrapper';

export const Sketch = () => {
  let bgImage;
  let nodeList = [];
  let maxLevel = 4;
  let minDist = 60;
  let distThreshold = 120;

  const dist = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  };

  const generateNodes = (x, y, level) => {
    let node = {
      x: x,
      y: y
    };
    nodeList.push(node);

    if (level < maxLevel) {
      let numNodes = Math.floor(Math.random() * 3) + 2;
      let angleStep = Math.PI * 2 / numNodes;
      for (let i = 0; i < numNodes; i++) {
        let angle = angleStep * i;
        let newX = x + Math.cos(angle) * (Math.random() * (distThreshold - minDist) + minDist);
        let newY = y + Math.sin(angle) * (Math.random() * (distThreshold - minDist) + minDist);
        generateNodes(newX, newY, level + 1);
      }
    }
  };

  const sketch = (p) => {
    p.preload = () => {
      bgImage = p.loadImage(backgroundImage);
    };

    p.setup = () => {
      p.createCanvas(1080, 1080);
      // Generate the fractal network
      generateNodes(p.width / 2, p.height / 2, 0);
    };

    p.draw = () => {
      p.background(bgImage);
      p.noStroke();

      // Draw enclosed networks with semi-transparent fill
      for (let i = 0; i < nodeList.length; i++) {
        p.fill(255, 30); // Set fill color with transparency
        p.beginShape();
        for (let j = 0; j < nodeList.length; j++) {
          let d = dist(nodeList[i].x, nodeList[i].y, nodeList[j].x, nodeList[j].y);
          if (d < distThreshold) {
            p.vertex(nodeList[j].x, nodeList[j].y);
          }
        }
        p.endShape(p.CLOSE);
      }

      // Move the nodes randomly
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].x += p.random(-5, 5); // Increase the range of movement
        nodeList[i].y += p.random(-5, 5); // Increase the range of movement
      }
    };
  };

  return (
    <div>
      <P5Wrapper sketch={sketch} />
    </div>
  );
};
