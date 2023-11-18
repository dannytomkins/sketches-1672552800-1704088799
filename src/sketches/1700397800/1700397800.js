import vessel1 from '../1690108450/vessel-1.png';
import vessel2 from '../1690108450/vessel-2.png';
import vessel3 from '../1690108450/vessel-3.png';
import vessel4 from '../1690108450/vessel-4.png';
import vessel5 from '../1690108450/vessel-5.png';
import vessel6 from '../1690108450/vessel-6.png';
import vessel7 from './vessel-7.png';
import vessel8 from './vessel-8.png';
import vessel9 from './vessel-9.png';
import vessel10 from './vessel-10.png';
import vessel11 from './vessel-11.png';
import vessel12 from './vessel-12.png';
import arrangement1 from '../1690108450/arrangement-1.png';
import arrangement2 from '../1690108450/arrangement-2.png';
import arrangement3 from '../1690108450/arrangement-3.png';
import arrangement4 from '../1690108450/arrangement-4.png';
import arrangement5 from '../1690108450/arrangement-5.png';
import arrangement6 from '../1690108450/arrangement-6.png';
import arrangement7 from './arrangement-7.png';
import arrangement8 from './arrangement-8.png';
import arrangement9 from './arrangement-9.png';
import arrangement10 from './arrangement-10.png';
import arrangement11 from './arrangement-11.png';
import arrangement12 from './arrangement-12.png';

// ... (imports)

import P5Wrapper from '../../components/P5Wrapper/P5Wrapper';

export const Sketch = () => {
  let t = 0; // Time variable for the trigonometric function
  let opacity = 255; // Initial opacity for the white layer set to fully opaque
  let vesselImg; // Variable to hold the vessel image instance
  let arrangementImg; // Variable to hold the arrangement image instance
  let vesselImagesArray; // Array to store all the vessel image paths
  let arrangementImagesArray; // Array to store all the arrangement image paths



  const sketch = (p) => {
      // Variables to store the interval IDs
  let vesselIntervalId;
  let arrangementIntervalId;
    p.preload = function () {
      // Add all the vessel image paths to the array
      vesselImagesArray = [vessel1, vessel2, vessel3, vessel4, vessel5, vessel6, vessel7, vessel8, vessel9, vessel10, vessel11, vessel12];

      // Add all the arrangement image paths to the array
      arrangementImagesArray = [arrangement1, arrangement2, arrangement3, arrangement4, arrangement5, arrangement6, arrangement7, arrangement8, arrangement9, arrangement10, arrangement11, arrangement12];
    };

    // Function to change vessel image
    const changeVesselImage = function () {
      // Load new random vessel image
      let randomVesselImagePath = p.random(vesselImagesArray);
      vesselImg = p.loadImage(randomVesselImagePath);
    };

    // Function to change arrangement image
    const changeArrangementImage = function () {
      // Load new random arrangement image
      let randomArrangementImagePath = p.random(arrangementImagesArray);
      arrangementImg = p.loadImage(randomArrangementImagePath);
    };

    p.setup = function () {
      p.createCanvas(1080, 1080);

      // Load initial vessel image
      let randomVesselImagePath = p.random(vesselImagesArray);
      vesselImg = p.loadImage(randomVesselImagePath);

      // Load initial arrangement image
      let randomArrangementImagePath = p.random(arrangementImagesArray);
      arrangementImg = p.loadImage(randomArrangementImagePath);

      // Call the changeVesselImage function with a random interval between 1 and 8 seconds
      vesselIntervalId = setInterval(changeVesselImage, p.random(1000, 8000));

      // Call the changeArrangementImage function with a random interval between 1 and 8 seconds
      arrangementIntervalId = setInterval(changeArrangementImage, p.random(1000, 8000));
    };

    p.draw = function () {
      // Loop through every pixel on the canvas
      for (let y = 0; y < p.height; y++) {
        // Map the vertical position to the range [0, 1]
        let yOffset = p.map(y, 0, p.height, 0, 1);

        // Using noise function to determine the RGB values for the background color
        let r = p.noise(t + 0, yOffset) * 255;
        let g = p.noise(t + 1, yOffset) * 255;
        let b = p.noise(t + 2, yOffset) * 255;

        // Creating a pastel color
        let pastelColor = p.color(r, g, b, 100);

        // Setting the background color for each row of pixels
        p.stroke(pastelColor);
        p.line(0, y, p.width, y);
      }

      // Incrementing the time variable for smooth color transition
      t += 0.005;

      // Calculate opacity using a sine function to create a continuous cycle
      opacity = p.map(p.sin(t), -1, 1, 0, 255);

      // Switch to MULTIPLY blend mode
      p.blendMode(p.BLEND);

      // Draw a white layer on top with the calculated opacity
      p.fill(255, opacity);
      p.noStroke();
      p.rect(0, 0, p.width, p.height);

      p.blendMode(p.MULTIPLY);

      // Draw the vessel image on top of the white layer
      p.image(vesselImg, 0, 0, p.width, p.height);

      // Draw the arrangement image on top of the white layer
      p.image(arrangementImg, 0, 0, p.width, p.height);

      // Reset to default blend mode
      p.blendMode(p.BLEND);
    };
  };

  return (
    <div>
      <P5Wrapper sketch={sketch} />
    </div>
  );
};
