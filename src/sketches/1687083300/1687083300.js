/* global p5 */
//@TODO sound no longer changes while clicked down and dragged

import React from 'react';
import 'p5';
import 'p5/lib/addons/p5.sound';
import imageLayer1 from './25-A-layer-1.jpg';
import imageLayer2 from './25-A-layer-2.png';
import imageLayer3 from './25-A-layer-3.png';
import P5Wrapper from '../../components/P5Wrapper/P5Wrapper';

export const Sketch = () => {
  const sketch = (p) => {
    let img1, img2, img3;
    let xOffset = 0;
    let yOffset = 0;
    let oscillator;
    let isDragging = false; // Track if the mouse is being dragged

    p.preload = function () {
      img1 = p.loadImage(imageLayer1);
      img2 = p.loadImage(imageLayer2);
      img3 = p.loadImage(imageLayer3);
    };

    p.setup = () => {
      p.createCanvas(1080, 1080);
      oscillator = new p5.Oscillator();
      oscillator.setType('sine');
      oscillator.freq(440); // Set the initial frequency
      oscillator.amp(0); // Set the initial amplitude to 0
      oscillator.start();
    };

    p.draw = () => {
      p.background(255);

      const canvasSize = 1080;

      // Calculate offsets for imageLayer1
      const img1Size = 3240;
      const img1Offset = (canvasSize - img1Size) / 2;

      // Calculate offsets for imageLayer2
      const img2Size = 1080;
      const img2Offset = (canvasSize - img2Size) / 2;

      // Update the position of img1 using Perlin noise
      xOffset += 0.002; // Adjust the speed of movement
      yOffset += 0.001; // Adjust the speed of movement
      const noiseX = p.noise(xOffset) * 1000 - 500; // Map noise value to a range (-50, 50)
      const noiseY = p.noise(yOffset) * 1000 - 500; // Map noise value to a range (-50, 50)

      // Draw imageLayer1 centered with Perlin noise movement
      p.blendMode(p.BLEND); // Set blend mode for img1
      p.image(img1, img1Offset + noiseX, img1Offset + noiseY);

      // Draw imageLayer2 centered with blend mode
      p.blendMode(p.DIFFERENCE); // Set blend mode for img2
      p.image(img2, img2Offset, img2Offset);

      // Draw imageLayer3 centered with blend mode
      p.blendMode(p.OVERLAY); // Set blend mode for img3
      p.image(img3, img2Offset, img2Offset);
    };

    p.mousePressed = () => {
      const rectX = 72;
      const rectY = 864;
      const rectWidth = 935;
      const rectHeight = 144;
      if (p.mouseX >= rectX && p.mouseX <= rectX + rectWidth && p.mouseY >= rectY && p.mouseY <= rectY + rectHeight) {
        isDragging = true; // Start tracking mouse dragging
        updateOscillator(); // Update oscillator immediately
      }
    };

    p.mouseReleased = () => {
      isDragging = false; // Stop tracking mouse dragging
      if (oscillator) {
        oscillator.amp(0); // Set the amplitude to stop the tone
      }
    };

    p.mouseDragged = () => {
      if (isDragging) {
        updateOscillator();
      }
    };

    // Helper function to update the oscillator frequency and amplitude
    const updateOscillator = () => {
      const rectX = 72;
      const rectY = 864;
      const rectWidth = 935;
      const rectHeight = 144;
      const normalizedX = p.map(p.mouseX, rectX, rectX + rectWidth, -1, 1); // Map mouseX to pitch range
      const normalizedY = p.map(p.mouseY, rectY, rectY + rectHeight, 1, 0); // Map mouseY to volume range
      const freq = p.map(normalizedX, -1, 1, 220, 880); // Map normalizedX to frequency range (220Hz - 880Hz)
      const amp = p.map(normalizedY, 0, 1, 0.2, 1); // Map normalizedY to amplitude range (0.2 - 1)
      oscillator.freq(freq); // Set the frequency
      oscillator.amp(amp); // Set the amplitude to play the tone
    };

  };

  return (
    <div>
      <P5Wrapper sketch={sketch} />
    </div>
  );
};