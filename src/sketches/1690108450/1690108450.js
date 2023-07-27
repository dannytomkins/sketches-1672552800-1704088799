import vessel1 from './vessel-1.png';
import vessel2 from './vessel-2.png';
import vessel3 from './vessel-3.png';
import vessel4 from './vessel-4.png';
import vessel5 from './vessel-5.png';
import vessel6 from './vessel-6.png';
import arrangement1 from './arrangement-1.png';
import arrangement2 from './arrangement-2.png';
import arrangement3 from './arrangement-3.png';
import arrangement4 from './arrangement-4.png';
import arrangement5 from './arrangement-5.png';
import arrangement6 from './arrangement-6.png';

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
      vesselImagesArray = [vessel1, vessel2, vessel3, vessel4, vessel5, vessel6];

      // Add all the arrangement image paths to the array
      arrangementImagesArray = [arrangement1, arrangement2, arrangement3, arrangement4, arrangement5, arrangement6];
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
