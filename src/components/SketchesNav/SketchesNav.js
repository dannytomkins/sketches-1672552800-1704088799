import React from 'react';
import { NavLink } from 'react-router-dom';
import { sketchData } from '../../data/sketchData';
import './SketchesNav.css';

const SketchesNav = () => {

  return (
    <nav>
      <ul>
        {sketchData.map(sketch => (
          <li key={sketch.id}>
            <NavLink to={`/${sketch.id}`}>
              {sketch.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SketchesNav;