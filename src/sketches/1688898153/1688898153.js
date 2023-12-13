import React, { useState, useEffect } from 'react';
import backgroundImage from './28-C-background.jpg';
import P5Wrapper from '../../components/P5Wrapper/P5Wrapper';

export const Sketch = () => {
  let bgImage;
  const [latitude, setLatitude] = useState('41.8594'); // Default latitude for Chicago, IL
  const [longitude, setLongitude] = useState('-87.6241'); // Default longitude for Chicago, IL
  const [date, setDate] = useState(new Date().toLocaleDateString()); // Default current date
  const [sunriseTime, setSunriseTime] = useState('');
  const [unixTimestamp, setUnixTimestamp] = useState('');

  const sketch = (p) => {
    p.preload = function () {
      bgImage = p.loadImage(backgroundImage);
    };

    p.setup = function () {
      p.createCanvas(1080, 1080);
      p.background(bgImage);
    };

    p.draw = function () {
      p.background(bgImage);
      // Use latitude, longitude, and date in your drawing logic
      p.blendMode(p.DODGE); // Set the blend mode
      p.textSize(50); // Increase the text size
      p.fill('#15153c'); // Set the text color
      p.text(`LAT: ${latitude}`, 10, 50);
      p.text(`LONG: ${longitude}`, 10, 80);
      p.text(`Date: ${date}`, 10, 110);
      p.text(`Sunrise Time: ${sunriseTime}  ${unixTimestamp} UTD`, 10, 140);
      p.blendMode(p.BLEND); // Reset the blend mode
    };
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    const fetchSunriseData = async () => {
      try {
        const response = await fetch(
          `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${date}&formatted=0`
        );
        const data = await response.json();
        const sunriseDateTime = new Date(data.results.sunrise);
        const formattedSunriseTime = sunriseDateTime.toLocaleTimeString();

        setSunriseTime(formattedSunriseTime);
        setUnixTimestamp(sunriseDateTime.getTime() / 1000);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSunriseData();
  }, [latitude, longitude, date]);

  return (
    <div className="s-container">
      <div className="left-section">
        <P5Wrapper sketch={sketch} />
      </div>
      <div className="right-section">
        <div>
        {"Latitude:\u00A0"}
          <input type="text" value={latitude} onChange={handleLatitudeChange} />
        </div>
        <div>
          Longitude:
          <input type="text" value={longitude} onChange={handleLongitudeChange} />
        </div>
        <div>
        {"Date: \u00A0 \u00A0 "}
          <input type="text" value={date} onChange={handleDateChange} />
        </div>
      </div>
    </div>
  );
  
};