import React from 'react';

export default function LineSvg() {
  let id=0;
  const generergrille = () => {
    const dots = [];
    for (let x = -300; x <= 2000; x += 60) {
      for (let y = -200; y <= 1000; y += 60) {
        id+=1;
        dots.push(
          <use key={id} href="#point" transform={`translate(${x},${y})`} /> //WEIRD KEY, mais sinon pas unique
        );
      }
    }
    return dots;
  };

  return (
    <svg className="linesvg" width="100%" height="580">
      <defs>
        <circle id="point" cx="200" cy="200" r="3" fill="#79a7f3ff" transformOrigin="200 200" >
          <animateTransform
            attributeName="transform"
            type="scale"
            values="0.5;0.4;0.1;0.4;0.5"
            keyTimes="0;0.1;0.5;0.6;1"
            dur="2s"
            repeatCount="indefinite"

          />
        </circle>
      </defs>

      {generergrille()}
    </svg>
  );
}
