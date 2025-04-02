import React from "react";
import styled, { keyframes } from "styled-components";

interface WaveAnimationProps {
  className?: string;
  color?: string;
  duration?: number;
  blurAmount?: number;
  waveCount?: number;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({
  className,
  color = "rgba(58, 83, 155, 0.8)",
  duration = 20,
  blurAmount = 2,
  waveCount = 5,
}) => {
  // 优化后的波浪路径生成函数
  const generateWavePath = (index: number) => {
    const amplitude = 80 + index * 15;
    return `M0,400 
            C150,${400 + amplitude} 350,${400 - amplitude} 500,400 
            C650,${400 + amplitude} 850,${400 - amplitude} 1000,400
            C1150,${400 + amplitude} 1350,${400 - amplitude} 1500,400`;
  };

  return (
    <WaveContainer className={className}>
      <SvgWrapper viewBox="0 0 1500 800" preserveAspectRatio="none">
        {Array.from({ length: waveCount }).map((_, i) => (
          <WavePath
            key={i}
            d={generateWavePath(i)}
            fill="none"
            stroke={color}
            strokeWidth={2 + i * 0.5}
            $duration={duration - i * 2}
            $blurAmount={Math.max(blurAmount - i * 0.3, 0)}
            style={{ opacity: 0.6 - i * 0.1 }}
            $index={i}
          />
        ))}
      </SvgWrapper>
    </WaveContainer>
  );
};

// 平滑动画关键帧
const smoothWaveAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const WaveContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const SvgWrapper = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 300%;
  height: 100%;
`;

const WavePath = styled.path<{
  $duration: number;
  $blurAmount: number;
  $index: number;
}>`
  animation: ${smoothWaveAnimation} ${(props) => props.$duration}s linear
    infinite;
  filter: blur(${(props) => props.$blurAmount}px);
  transform-origin: left center;

  /* 不同层次的波浪轻微错开时间 */
  animation-delay: ${(props) => props.$index * 0.5}s;
`;

export default WaveAnimation;
