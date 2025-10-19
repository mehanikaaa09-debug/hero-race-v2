    import React from 'react';
    import type { IconProps } from '../utils/types'; // Убедитесь, что путь правильный

    const Arrow: React.FC<IconProps> = ({ size = 24, className = '' }) => {
      const svgSize = `${size}px`;

      return (
        <svg
          className={className}
          height={svgSize}
          width={svgSize}
          viewBox="0 0 24 24" // Это стандартный viewBox
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Это путь для стрелки вправо. Вы можете заменить на ваш, если он у вас есть */}
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      );
    };

    export default Arrow;
    