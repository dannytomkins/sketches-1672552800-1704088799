import React from 'react';
import backgroundImage from './19-C-background.jpg';
import P5Wrapper from '../../components/P5Wrapper/P5Wrapper';

export const Sketch = () => {
  let bgImage;

  const sketch = (p) => {
    let ellipses = [];

    p.preload = function() {
      bgImage = p.loadImage(backgroundImage);
    };

    p.setup = function() {
      p.createCanvas(1080, 1080);
      p.noStroke();
      for (let i = 0; i < 15; i++) {
        let size = p.random(100, 400);
        let x = p.random(-p.width/2, p.width/2);
        let y = p.random(-p.height, p.height);
        let fillColor = p.color(p.random(255), 255, p.random(255));
        let gradientColor = p.color(p.random(255), 255, p.random(255));
        let ellipseObj = new Ellipse(x, y, size, fillColor, gradientColor);
        ellipses.push(ellipseObj);
      }
    };

    p.draw = function() {
      p.background(bgImage);
      p.translate(p.width/2, p.height/2);
      for (let i = 0; i < ellipses.length; i++) {
        let ellipseObj = ellipses[i];
        ellipseObj.move();
        ellipseObj.display();
      }
    };

    class Ellipse {
      constructor(x, y, size, fillColor, gradientColor) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.fillColor = fillColor;
        this.gradientColor = gradientColor;
        this.t = p.random(1000);
        this.speed = 0.5;
      }
    
      move() {
        let xoff = p.map(p.noise(this.t), 0, 1, -this.speed, this.speed);
        let yoff = p.map(p.noise(this.t + 1000), 0, 1, -this.speed, this.speed);
        this.x += xoff;
        this.y += yoff;
        this.t += 0.01;
        if (this.x < -p.width/2 || this.x > p.width/2) {
          this.x = p.constrain(this.x, -p.width/2, p.width/2);
        }
        if (this.y < -p.height/2 || this.y > p.height/2) {
          this.y = p.constrain(this.y, -p.height/2, p.height/2);
        }
        
        // adjust the size using Perlin noise
        let sizeNoise = (p.noise(this.t + 20000) - 0.5) * 2; // centered around zero, multiplied by 2
        let sizeChange = sizeNoise * 1; // maximum size change is 1 pixels
        this.size += sizeChange;
        this.size = p.constrain(this.size, 50, 800); // constrain the size within a certain range
      }
      
    
      // display method remains the same
      display() {
        let xRadius = this.size / 2;
        let yRadius = this.size / 4;
        let gradient = p.drawingContext.createRadialGradient(
          this.x, this.y, 0, this.x, this.y, xRadius
        );
        gradient.addColorStop(0, this.fillColor);
        gradient.addColorStop(1, p.color(p.red(this.gradientColor), p.green(this.gradientColor), p.blue(this.gradientColor), 0));
        p.drawingContext.fillStyle = gradient;
        p.drawingContext.save();
        p.drawingContext.scale(1, yRadius / xRadius);
        p.ellipse(this.x, this.y, xRadius * 2, xRadius * 2);
        p.drawingContext.restore();
      }
    }      
  };

  return (
    <div>
      <P5Wrapper sketch={sketch} />
    </div>
  );
};
