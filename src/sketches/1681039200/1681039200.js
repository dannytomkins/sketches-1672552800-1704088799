import React from 'react';
import P5Wrapper from '../../components/P5Wrapper/P5Wrapper';
import backgroundImage from './15-B-background.jpg';
import foregroundImage from './15-B-foreground.png';
import runningRabbitGif from './running-rabbit-animate-400w.gif';

export const Sketch = () => {

  const sketch = (p) => {
    let bgImg;
    let fgImg;
    let rabbitGif;
    let rabbitX;
    let rabbitY;

    p.preload = function() {
        bgImg = p.loadImage(backgroundImage);
        fgImg = p.loadImage(foregroundImage);
        rabbitGif = p.loadImage(runningRabbitGif);
      };
      

    p.setup = function() {
      p.createCanvas(1080, 1080);
      rabbitX = p.width/2;
      rabbitY = p.height/2;
      p.background(bgImg);
    };

    p.draw = function() {
        p.blendMode(p.DIFFERENCE);

        p.image(fgImg, 0, 0, p.width, p.height);

        // calculate new position for the rabbit based on cursor position
        rabbitX += (p.mouseX - rabbitX) * 0.01;
        rabbitY += (p.mouseY - rabbitY) * 0.01;

        // flip the rabbit gif if the cursor is to the left of the gif
        if (p.mouseX < rabbitX) {
            p.push();
            p.scale(-1, 1);
            p.image(rabbitGif, -rabbitX-150, rabbitY-112.5, 300, 196);
            p.pop();
        } else {
            p.image(rabbitGif, rabbitX-150, rabbitY-112.5, 300, 196);
        }
      };
      
  };

  return (
    <div>
      <P5Wrapper sketch={sketch} />
    </div>
  );
};
