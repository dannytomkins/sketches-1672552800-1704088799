import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';

const P5Wrapper = ({ sketch }) => {
  const canvasRef = useRef(null);
  let canvasInstance = null;

  useEffect(() => {
    // Create a new p5.js instance when the component mounts
    canvasInstance = new p5(sketch, canvasRef.current);

    // Return a cleanup function to remove the p5.js sketch when the component unmounts
    return () => {
      canvasInstance.remove();
    };
  }, [sketch]);

  return <div ref={canvasRef}></div>;
};

P5Wrapper.propTypes = {
  sketch: PropTypes.func.isRequired,
};

export default P5Wrapper;
