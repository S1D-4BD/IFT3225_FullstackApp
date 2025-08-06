import React from 'react';

export default function WavesSvg() {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
  <svg className="background-vague" viewBox="0 0 1440 320" width="100%" height="440px" preserveAspectRatio="none">

    <path fill="#004980ff" fillOpacity="0.3" transform="scale(1.1)">
      <animate
        attributeName="d"  dur="10s" repeatCount="indefinite"
        values="
          M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z;
          M0,120 C360,80 1080,240 1440,120 L1440,320 L0,320 Z;
          M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z
        "
      />
    </path>

    <path fill="#0033ffff" fillOpacity="0.3">
      <animate
        attributeName="d"  dur="7s" repeatCount="indefinite"
        values="
          M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z;
          M0,120 C360,80 1080,240 1440,120 L1440,320 L0,320 Z;
          M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z
        "
      />
    </path>

    <path fill="#006effff" fillOpacity="0.4" transform="scale(1.2)">
      <animate
        attributeName="d"  dur="19s" repeatCount="indefinite"
        values="
          M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z;
          M0,120 C360,80 1080,240 1440,120 L1440,320 L0,320 Z;
          M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z
        "
      />
    </path>

    <path fill="#cce2e8ff" fillOpacity="0.4" transform="scale(1.5)">
      <animate
        attributeName="d"  dur="11s" repeatCount="indefinite"
        values="
          M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z;
          M0,120 C360,80 1080,240 1440,120 L1440,320 L0,320 Z;
          M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z
        "
      />
    </path>


  </svg>

);
}