import React from 'react';

export default function CircleSvg() {

  return (

    <svg width="180" height="180" viewBox="0 0 180 180">

      <circle
        cx="90" cy="90" r="50" fill="none" stroke="red" strokeWidth="6" strokeLinecap="round" strokeDasharray="113">

        <animateTransform
          attributeName="transform"
          begin="0s"
          dur="20s"
          type="rotate"
          from="0 90 90"
          to="360 90 90"

          repeatCount="indefinite"
    />

      </circle>

      <circle cx="90" cy="90" r="70" fill="none" stroke="#be0000ff" strokeWidth="6" strokeLinecap="round" strokeDasharray="110" transform="scale(1, -1)">
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur="15s"
              type="rotate"
              from="360 90 90"
              to="0 90 90"
              repeatCount="indefinite"
          />

      </circle>

      <circle cx="90" cy="90" r="85" fill="none" stroke="#6e0101ff" strokeWidth="6" strokeLinecap="round" strokeDasharray="109">

            <animateTransform
              attributeName="transform"
              begin="0s"
              dur="12s"
              type="rotate"
              from="0 90 90"
              to="360 90 90"

              repeatCount="indefinite"
          />

      </circle>

    </svg>



  );
}
