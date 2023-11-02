import foregroundImage from './cloud-21.png';
import P5Wrapper from '../../components/P5Wrapper/P5Wrapper';

export const Sketch = () => {
  let allWords = ["cumulus", "stratus", "cirrus", "nimbus", "puffy", "overcast", "sky", "meteorology", "atmosphere", "meteorologist", "forecast", "weather", "drift", "vapor", "horizon", "cirrostratus", "stratocumulus", "altostratus", "lenticular", "anvil", "vacant", "void", "deserted", "hollow", "bare", "unoccupied", "abandoned", "barren", "devoid", "blank", "unfilled", "clear", "unused", "idle", "vacuous", "hollowed", "available", "spare", "untouched", "barren", "curing", "restoration", "recovery", "rehabilitation", "mending", "amelioration", "restorative", "remedial", "soothing", "therapeutic", "healing", "nurturing", "regeneration", "comforting", "helping", "repairing", "alleviating", "healing", "palliative", "rehabilitating", "suffering", "anguish", "torment", "distress", "misery", "ache", "agony", "hurt", "discomfort", "torture", "throes", "wretchedness", "torturous", "pang", "disquiet", "worry", "trouble", "grief", "sadness", "heartache", "majestic", "exalted", "grand", "splendid", "glorious", "breathtaking", "superb", "magnificent", "dazzling", "transcendent", "exquisite", "heavenly", "elevated", "noble", "supreme", "transcendental", "ethereal", "divine", "wonderful", "enchanting", "intense", "crushing", "immense", "enormous", "powerful", "incredible", "unbearable", "inundating", "mind-boggling", "unbelievable", "devastating", "astonishing", "enveloping", "all-consuming", "oppressive", "exhausting", "daunting", "gigantic", "staggering", "tremendous", "steam", "mist", "fog", "smoke", "humidity", "condensation", "evaporation", "vaporous", "cloud", "vaporization", "aerosol", "nebula", "gas", "ethereal", "exhalation", "haze", "fume", "moisture", "dampness", "vapidity"];  let wordObjects = [];

  const sketch = (p) => {
    let fgImage;
    let xOffset = 0;
    let yOffset = 0;
    let imgX, imgY;

    p.preload = function () {
      fgImage = p.loadImage(foregroundImage);
    };

    p.setup = function () {
      p.createCanvas(1080, 1080);
      p.frameRate(60);

      // Calculate the position (x, y) to center the image on the canvas
      imgX = (p.width - fgImage.width) / 2;
      imgY = (p.height - fgImage.height) / 2;
    };

    p.draw = function () {
      p.blendMode(p.BLEND);
      p.background("#272822");
      p.blendMode(p.DODGE);

      // Check if it's time to add a new word
      if (p.random(1) < 0.2) {
        // With a 20% chance, add a new word
        let randomWord = getRandomWord();
        let x = p.random(p.width);
        let y = p.random(p.height);
        let duration = p.floor(p.random(60, 300)); // Random duration between 1-5 seconds
        let grayValue = p.floor(p.random(256)); // Generate a random grayscale value
        let textColor = p.color(grayValue, grayValue, grayValue, p.random(255)); // Gray text color with full opacity
                let fontSize = p.floor(p.random(12, 64)); // Random font size between 6 and 24
        wordObjects.push({ word: randomWord, x, y, duration, textColor, fontSize });
      }

      // Display and update wordObjects
      for (let i = wordObjects.length - 1; i >= 0; i--) {
        let wordObj = wordObjects[i];
        p.textSize(wordObj.fontSize); // Use the assigned font size
        p.textAlign(p.CENTER, p.CENTER);
        p.fill(wordObj.textColor); // Use the assigned text color
        p.text(wordObj.word, wordObj.x, wordObj.y);
        wordObj.duration--;

        if (wordObj.duration <= 0) {
          wordObjects.splice(i, 1); // Remove the word if its duration has expired
        }
      }

      // Display the foreground image at the centered position (imgX, imgY)
      p.blendMode(p.DODGE);

      // Update the position of img1 using Perlin noise
      xOffset += 0.002; // Adjust the speed of movement
      yOffset += 0.001; // Adjust the speed of movement
      const noiseX = p.noise(xOffset) * 100 - 50; // Map noise value to a range (-50, 50)
      const noiseY = p.noise(yOffset) * 100 - 50; // Map noise value to a range (-50, 50)

      // Calculate the new position
      const newX = imgX + noiseX;
      const newY = imgY + noiseY;

      p.image(fgImage, newX, newY);
    };

    function getRandomWord() {
      let randomIndex = p.floor(p.random(allWords.length));
      return allWords[randomIndex];
    }
  };

  return (
    <div>
      <P5Wrapper sketch={sketch} />
    </div>
  );
};
