import { useState, useEffect, useMemo } from 'react';

type GridState = boolean[][];

interface Animation {
  name: string;
  frames: GridState[];
}

// Define three preset animations
const animations: Animation[] = [
  {
    name: 'Wave',
    frames: [
      [
        [true, false, false],
        [false, false, false],
        [false, false, false],
      ],
      [
        [false, true, false],
        [true, false, false],
        [false, false, false],
      ],
      [
        [false, false, true],
        [false, true, false],
        [true, false, false],
      ],
      [
        [false, false, false],
        [false, false, true],
        [false, true, false],
      ],
      [
        [false, false, false],
        [false, false, false],
        [false, false, true],
      ],
    ],
  },
  {
    name: 'Wave Negative',
    frames: [
      [
        [false, true, true],
        [true, true, true],
        [true, true, true],
      ],
      [
        [true, false, true],
        [false, true, true],
        [true, true, true],
      ],
      [
        [true, true, false],
        [true, false, true],
        [false, true, true],
      ],
      [
        [true, true, true],
        [true, true, false],
        [true, false, true],
      ],
      [
        [true, true, true],
        [true, true, true],
        [true, true, false],
      ],
    ],
  },
  {
    name: 'Spinner',
    frames: [
      [
        [false, true, false],
        [false, true, false],
        [false, false, false],
      ],
      [
        [false, false, false],
        [false, true, true],
        [false, false, false],
      ],
      [
        [false, false, false],
        [false, true, false],
        [false, true, false],
      ],
      [
        [false, false, false],
        [true, true, false],
        [false, false, false],
      ],
    ],
  },
  {
    name: 'Pulse',
    frames: [
      [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ],
      [
        [false, true, false],
        [true, true, true],
        [false, true, false],
      ],
      [
        [true, true, true],
        [true, true, true],
        [true, true, true],
      ],
      [
        [false, true, false],
        [true, true, true],
        [false, true, false],
      ],
      [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ],
      [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ],
    ],
  },
  {
    name: 'Clockwise',
    frames: [
      [
        [false, true, false],
        [false, false, false],
        [false, false, false],
      ],
      [
        [false, false, true],
        [false, false, false],
        [false, false, false],
      ],
      [
        [false, false, false],
        [false, false, true],
        [false, false, false],
      ],
      [
        [false, false, false],
        [false, false, false],
        [false, false, true],
      ],
      [
        [false, false, false],
        [false, false, false],
        [false, true, false],
      ],
      [
        [false, false, false],
        [false, false, false],
        [true, false, false],
      ],
      [
        [false, false, false],
        [true, false, false],
        [false, false, false],
      ],
      [
        [true, false, false],
        [false, false, false],
        [false, false, false],
      ],
    ],
  },
  {
    name: 'Cross',
    frames: [
      [
        [true, false, true],
        [false, false, false],
        [true, false, true],
      ],
      [
        [true, false, true],
        [false, true, false],
        [true, false, true],
      ],
      [
        [false, true, false],
        [true, true, true],
        [false, true, false],
      ],
      [
        [true, false, true],
        [false, true, false],
        [true, false, true],
      ],
    ],
  },
  {
    name: 'Corners',
    frames: [
      [
        [true, false, false],
        [false, false, false],
        [false, false, false],
      ],
      [
        [true, false, true],
        [false, false, false],
        [false, false, false],
      ],
      [
        [true, false, true],
        [false, false, false],
        [true, false, false],
      ],
      [
        [true, false, true],
        [false, false, false],
        [true, false, true],
      ],
      [
        [false, false, true],
        [false, false, false],
        [true, false, true],
      ],
      [
        [false, false, false],
        [false, false, false],
        [true, false, true],
      ],
      [
        [false, false, false],
        [false, false, false],
        [false, false, true],
      ],
    ],
  },
  {
    name: 'Diamond',
    frames: [
      [
        [false, true, false],
        [true, false, true],
        [false, true, false],
      ],
      [
        [true, false, true],
        [false, true, false],
        [true, false, true],
      ],
    ],
  },
   {
    name: 'Burst',
    frames: [
      [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ],
      [
        [false, true, false],
        [true, false, true],
        [false, true, false],
      ],
      [
        [true, false, true],
        [false, false, false],
        [true, false, true],
      ],
      [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ],
    ],
  },
  {
    name: 'ArrowMove',
    frames: [
    [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
    [
      [false, false, false],
      [true,  false, false],
      [false, false, false],
    ],
    [
      [true,  false, false ],
      [false, true,  false],
      [true,  false, false ],
    ],
    [
      [false, true,  false],
      [true, false, true ],
      [false, true,  false],
    ],
    [
      [false, false, true ],
      [false, true, false],
      [false, false, true ],
    ],
    [
      [false, false, false],
      [false, false, true],
      [false, false, false],
    ],
  ],
},
{
  name: 'Sine Wave',
  frames: [
    // Frame 1
    [
      [false, true,  false],
      [true,  false, true ],
      [false, false, false],
    ],

    // Frame 2
    [
      [false, false, true ],
      [false, true,  false],
      [true,  false, false],
    ],

    // Frame 3
    [
      [false, false, false],
      [true,  false, true ],
      [false, true,  false],
    ],

    // Frame 4
    [
      [true,  false, false],
      [false, true,  false],
      [false, false, true ],
    ],
  ],
  },
  {
    name: 'Pulse2',
    frames: [
      [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ],
      [
        [false, true, false],
        [true, true, true],
        [false, true, false],
      ],
      [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ],
      [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ],
      [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ],
      [
        [true, false, true],
        [false, true, false],
        [true, false, true],
      ],
      [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ],
      [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ],
    ],
  },
  {
    name: 'Chaos',
    frames: [
      [
        [true, false, true],
        [false, true, false],
        [true, false, false],
      ],
      [
        [false, true, false],
        [true, false, true],
        [false, true, false],
      ],
      [
        [true, false, false],
        [false, false, true],
        [true, true, false],
      ],
      [
        [false, true, true],
        [true, false, false],
        [false, true, true],
      ],
      [
        [true, false, true],
        [false, true, false],
        [false, false, true],
      ],
      [
        [false, false, false],
        [true, true, true],
        [true, false, false],
      ],
      [
        [true, true, false],
        [false, false, true],
        [false, true, false],
      ],
      [
        [false, true, true],
        [true, false, false],
        [true, false, true],
      ],
      [
        [true, false, false],
        [false, true, true],
        [false, true, false],
      ],
      [
        [false, false, true],
        [true, true, false],
        [true, false, true],
      ],
    ],
  },

];

// Per-animation default settings
interface AnimationDefaults {
  speed?: number;
  easeInDuration?: number;
  easeOutDuration?: number;
}

const animationDefaults: Record<string, AnimationDefaults> = {
  'Wave Negative': {
    speed: 200,
    easeInDuration: 750,
    easeOutDuration: 200,
  },
  'Cross': {
    speed: 300,
    easeInDuration: 200,
    easeOutDuration: 500,
  },
  'Diamond': {
    speed: 600,
    easeInDuration: 150,
    easeOutDuration: 600,
  },
  'Burst': {
    speed: 250,
    easeInDuration: 150,
    easeOutDuration: 600,
  },
  // Default values for all other animations are defined in the component state
};

export function DotMatrix() {
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [dotSize, setDotSize] = useState(8);
  const [speed, setSpeed] = useState(200);
  const [dotColor, setDotColor] = useState('#ff14cc');
  const [dotOpacity, setDotOpacity] = useState(1);
  const [shadowColor, setShadowColor] = useState('#ffa3eb');
  const [glowOpacity, setGlowOpacity] = useState(1);
  const [glowSpread, setGlowSpread] = useState(10);
  const [inactiveDotColor, setInactiveDotColor] = useState('#333333');
  const [borderRadius, setBorderRadius] = useState(0);
  const [spacing, setSpacing] = useState(0);
  const [easeInDuration, setEaseInDuration] = useState(150);
  const [easeOutDuration, setEaseOutDuration] = useState(600);
  const [enableScale, setEnableScale] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  
  // Custom animation states
  const [customFrames, setCustomFrames] = useState<GridState[]>([
    // Default frame 1 - corners
    [
      [true, false, true],
      [false, false, false],
      [true, false, true],
    ],
    // Default frame 2 - all off
    [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
    // Default frame 3 - center dot
    [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ],
  ]);
  const [isCustomPanelOpen, setIsCustomPanelOpen] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(true);

  useEffect(() => {
    // Always keep page in dark mode
    document.documentElement.classList.add('dark');
  }, []);

  // Apply per-animation default settings
  useEffect(() => {
    // Skip for custom animation
    if (currentAnimation === animations.length) {
      setSpeed(250);
      setEaseInDuration(150);
      setEaseOutDuration(600);
      return;
    }
    
    const animationName = animations[currentAnimation].name;
    const defaults = animationDefaults[animationName];
    
    if (defaults) {
      if (defaults.speed !== undefined) setSpeed(defaults.speed);
      if (defaults.easeInDuration !== undefined) setEaseInDuration(defaults.easeInDuration);
      if (defaults.easeOutDuration !== undefined) setEaseOutDuration(defaults.easeOutDuration);
    } else {
      // Apply global defaults for animations without custom settings
      setSpeed(250);
      setEaseInDuration(150);
      setEaseOutDuration(600);
    }
  }, [currentAnimation]);


  useEffect(() => {
    if (!isPreviewPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const totalFrames = currentAnimation === animations.length ? customFrames.length : animations[currentAnimation].frames.length;
        return (prev + 1) % totalFrames;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [currentAnimation, speed, customFrames, isPreviewPlaying]);

  const grid = currentAnimation === animations.length ? customFrames[currentFrame] : animations[currentAnimation].frames[currentFrame];

  // Helper function to convert hex to RGBA
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const generatedCSS = useMemo(() => {
    // Handle custom animation
    const isCustom = currentAnimation === animations.length;
    const animation = isCustom 
      ? { name: 'Custom', frames: customFrames }
      : animations[currentAnimation];
    const animationName = animation.name.toLowerCase().replace(/\s+/g, '-');
    const bgColor = '#0a0a0a'; // Always dark for exported CSS
    
    // Generate keyframes for each dot individually with custom easing
    let allKeyframes = '';
    for (let dotIndex = 1; dotIndex <= 9; dotIndex++) {
      const rowIndex = Math.floor((dotIndex - 1) / 3);
      const colIndex = (dotIndex - 1) % 3;
      
      let keyframes = `@keyframes dot-${dotIndex}-${animationName} {\n`;
      
      // Calculate keyframe percentages with easing-aware timing
      const totalFrames = animation.frames.length;
      let cumulativeTime = 0;
      const frameTimes: number[] = [];
      
      // Calculate the actual time for each transition (from current frame to next frame)
      animation.frames.forEach((frame, frameIndex) => {
        const currentDotState = frame[rowIndex][colIndex];
        const nextFrame = animation.frames[(frameIndex + 1) % totalFrames];
        const nextDotState = nextFrame[rowIndex][colIndex];
        
        // Determine which duration to use based on the transition TO the next frame
        let transitionDuration = speed;
        if (nextDotState && !currentDotState) {
          // Transitioning from OFF to ON - use ease in duration
          transitionDuration = easeInDuration;
        } else if (!nextDotState && currentDotState) {
          // Transitioning from ON to OFF - use ease out duration
          transitionDuration = easeOutDuration;
        }
        
        frameTimes.push(transitionDuration);
        cumulativeTime += transitionDuration;
      });
      
      // Generate keyframes with proper percentages
      let accumulatedPercentage = 0;
      animation.frames.forEach((frame, frameIndex) => {
        const isActive = frame[rowIndex][colIndex];
        const nextFrame = animation.frames[(frameIndex + 1) % totalFrames];
        const nextIsActive = nextFrame[rowIndex][colIndex];
        
        // Determine easing function for the transition FROM this keyframe to the next
        let easing = 'linear';
        if (nextIsActive && !isActive) {
          easing = 'ease-in';
        } else if (!nextIsActive && isActive) {
          easing = 'ease-out';
        }
        
        const glowColor = hexToRgba(shadowColor, glowOpacity);
        const activeDotColor = hexToRgba(dotColor, dotOpacity);
        
        keyframes += `  ${accumulatedPercentage.toFixed(2)}% {\n`;
        keyframes += `    background-color: ${isActive ? activeDotColor : inactiveDotColor};\n`;
        keyframes += `    box-shadow: ${isActive ? `0 0 ${glowSpread}px 0 ${glowColor}` : 'none'};\n`;
        keyframes += `    transform: ${isActive && enableScale ? 'scale(1.1)' : 'scale(1)'};\n`;
        keyframes += `    animation-timing-function: ${easing};\n`;
        keyframes += `  }\n`;
        
        accumulatedPercentage += (frameTimes[frameIndex] / cumulativeTime) * 100;
      });
      
      // Add 100% keyframe (same as 0%)
      const firstFrame = animation.frames[0];
      const isFirstActive = firstFrame[rowIndex][colIndex];
      const glowColor100 = hexToRgba(shadowColor, glowOpacity);
      const activeDotColor100 = hexToRgba(dotColor, dotOpacity);
      keyframes += `  100% {\n`;
      keyframes += `    background-color: ${isFirstActive ? activeDotColor100 : inactiveDotColor};\n`;
      keyframes += `    box-shadow: ${isFirstActive ? `0 0 ${glowSpread}px 0 ${glowColor100}` : 'none'};\n`;
      keyframes += `    transform: ${isFirstActive && enableScale ? 'scale(1.1)' : 'scale(1)'};\n`;
      keyframes += `  }\n`;
      keyframes += `}\n\n`;
      allKeyframes += keyframes;
    }

    // Calculate total animation duration based on all transitions
    const sampleDotRow = 0;
    const sampleDotCol = 0;
    let totalAnimDuration = 0;
    animation.frames.forEach((frame, frameIndex) => {
      const currentDotState = frame[sampleDotRow][sampleDotCol];
      const nextFrame = animation.frames[(frameIndex + 1) % animation.frames.length];
      const nextDotState = nextFrame[sampleDotRow][sampleDotCol];
      
      if (nextDotState && !currentDotState) {
        totalAnimDuration += easeInDuration;
      } else if (!nextDotState && currentDotState) {
        totalAnimDuration += easeOutDuration;
      } else {
        totalAnimDuration += speed;
      }
    });

    // Generate the CSS code
    const timestamp = new Date().toLocaleTimeString();
    const css = `/* Dot Matrix Animator - ${animation.name} */\n` +
      `/* Generated at: ${timestamp} */\n` +
      `/* Custom easing: Ease In ${easeInDuration}ms, Ease Out ${easeOutDuration}ms */\n` +
      `${allKeyframes}` +
      `.dot-matrix-wrapper {\n` +
      `  background-color: ${bgColor};\n` +
      `  padding: 32px;\n` +
      `  border-radius: 16px;\n` +
      `  display: inline-block;\n` +
      `}\n\n` +
      `.dot-matrix-${animationName} {\n` +
      `  display: grid;\n` +
      `  grid-template-columns: repeat(3, ${dotSize}px);\n` +
      `  grid-template-rows: repeat(3, ${dotSize}px);\n` +
      `  gap: ${spacing}px;\n` +
      `  width: fit-content;\n` +
      `}\n\n` +
      `.dot-matrix-${animationName} > div {\n` +
      `  width: ${dotSize}px;\n` +
      `  height: ${dotSize}px;\n` +
      `  background-color: ${inactiveDotColor};\n` +
      `  border-radius: ${borderRadius}px;\n` +
      `  animation-duration: ${totalAnimDuration}ms;\n` +
      `  animation-iteration-count: infinite;\n` +
      `}\n\n` +
      `/* Individual dot animations */\n` +
      Array.from({ length: 9 }, (_, i) => {
        const dotNum = i + 1;
        return `.dot-matrix-${animationName} > div:nth-child(${dotNum}) {\n` +
          `  animation-name: dot-${dotNum}-${animationName};\n` +
          `}\n`;
      }).join('\n');

    const html = `<!-- HTML Structure -->\n` +
      `<div class="dot-matrix-wrapper">\n` +
      `  <div class="dot-matrix-${animationName}">\n` +
      `    <div></div><div></div><div></div>\n` +
      `    <div></div><div></div><div></div>\n` +
      `    <div></div><div></div><div></div>\n` +
      `  </div>\n` +
      `</div>`;

    return `${css}\n\n${html}`;
  }, [currentAnimation, dotSize, speed, dotColor, dotOpacity, shadowColor, glowOpacity, glowSpread, inactiveDotColor, borderRadius, spacing, easeInDuration, easeOutDuration, enableScale, customFrames]);

  // Split CSS and HTML from generated code
  const cssCode = useMemo(() => {
    const lines = generatedCSS.split('\n');
    const htmlStart = lines.findIndex(line => line.includes('<!-- HTML Structure -->'));
    return lines.slice(0, htmlStart).join('\n').trim();
  }, [generatedCSS]);

  const htmlCode = useMemo(() => {
    const lines = generatedCSS.split('\n');
    const htmlStart = lines.findIndex(line => line.includes('<!-- HTML Structure -->'));
    return lines.slice(htmlStart).join('\n').trim();
  }, [generatedCSS]);

  const handleCopyCode = async (code: string, type: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 2000);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="h-screen w-[80vw] flex flex-col bg-background mx-auto">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Doto, sans-serif' }}>Dot Matrix Animator</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          made by <a href="https://x.com/5paceb0i" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#14ff9e] transition-colors" style={{ textDecorationStyle: 'dotted', textUnderlineOffset: '6px' }}>🌙 Vishwesh</a>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="flex-1 grid grid-cols-[25%_50%_25%] overflow-hidden">
        {/* Left Column - Settings */}
        <div className="flex flex-col gap-6 border-r border-border overflow-y-auto p-6 bg-card/50">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>

          {/* Dot Size Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Dot Size</label>
              <span className="text-sm text-muted-foreground">{dotSize}px</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={dotSize}
              onChange={(e) => setDotSize(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>


          {/* Border Radius Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Border Radius</label>
              <span className="text-sm text-muted-foreground">{borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Spacing Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Spacing</label>
              <span className="text-sm text-muted-foreground">{spacing}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={spacing}
              onChange={(e) => setSpacing(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="border-t border-border my-4"></div>

          {/* Animation Speed Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Animation Speed</label>
              <span className="text-sm text-muted-foreground">{speed}ms</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Fast</span>
              <span>Slow</span>
            </div>
          </div>

          {/* Ease In Duration Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Ease In Duration</label>
              <span className="text-sm text-muted-foreground">{easeInDuration}ms</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={easeInDuration}
              onChange={(e) => setEaseInDuration(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Ease Out Duration Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Ease Out Duration</label>
              <span className="text-sm text-muted-foreground">{easeOutDuration}ms</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={easeOutDuration}
              onChange={(e) => setEaseOutDuration(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="border-t border-border my-4"></div>

          {/* Color Pickers */}
          <div>
            <label className="text-sm font-medium mb-2 block">Dot Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={dotColor}
                onChange={(e) => setDotColor(e.target.value)}
                className="w-12 h-12 rounded cursor-pointer border-2 border-border"
              />
              <input
                type="text"
                value={dotColor}
                onChange={(e) => setDotColor(e.target.value)}
                className="flex-1 px-3 py-2 rounded text-sm"
                style={{ backgroundColor: '#222' }}
                placeholder="#000000"
              />
            </div>
            <div className="flex justify-between items-center mt-2 mb-1">
              <label className="text-xs text-muted-foreground">Opacity</label>
              <span className="text-xs text-muted-foreground">{Math.round(dotOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={dotOpacity}
              onChange={(e) => setDotOpacity(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Glow Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-12 h-12 rounded cursor-pointer border-2 border-border"
              />
              <input
                type="text"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="flex-1 px-3 py-2 rounded text-sm"
                style={{ backgroundColor: '#222' }}
                placeholder="#000000"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">OFF Dot Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={inactiveDotColor}
                onChange={(e) => setInactiveDotColor(e.target.value)}
                className="w-12 h-12 rounded cursor-pointer border-2 border-border"
              />
              <input
                type="text"
                value={inactiveDotColor}
                onChange={(e) => setInactiveDotColor(e.target.value)}
                className="flex-1 px-3 py-2 rounded text-sm"
                style={{ backgroundColor: '#222' }}
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Glow Opacity Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Glow Opacity</label>
              <span className="text-sm text-muted-foreground">{Math.round(glowOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={glowOpacity}
              onChange={(e) => setGlowOpacity(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Glow Spread Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Glow Spread</label>
              <span className="text-sm text-muted-foreground">{glowSpread}px</span>
            </div>
            <input
              type="range"
              min="1"
              max={dotSize+20}
              value={glowSpread}
              onChange={(e) => setGlowSpread(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Enable Scale Toggle */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Scale ON Dots</label>
              <button
                onClick={() => setEnableScale(!enableScale)}
                className={`relative w-12 h-6 rounded-full transition-colors`}
                style={{ backgroundColor: enableScale ? '#14ff9e' : 'rgb(39, 39, 42)' }}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    enableScale ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Canvas Mode Toggle */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Canvas Mode</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{isDarkMode ? 'Dark' : 'Light'}</span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors`}
                  style={{ backgroundColor: isDarkMode ? '#14ff9e' : 'rgb(39, 39, 42)' }}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Preview */}
        <div className="flex flex-col items-center justify-center p-8" style={{ justifyContent: 'space-between', height: '70%' }}>
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Animation Preset</label>
            <div className="flex flex-row flex-wrap gap-2">
              {animations.map((animation, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentAnimation(index);
                    setCurrentFrame(0);
                    setIsCustomPanelOpen(false);
                    setIsPreviewPlaying(true); // Auto-resume when switching from custom
                  }}
                  className={`px-4 py-2 rounded-lg text-left transition-all ${
                    currentAnimation === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  {animation.name}
                </button>
              ))}
              {/* Custom Animation Button */}
              <button
                onClick={() => {
                  setCurrentAnimation(animations.length);
                  setCurrentFrame(0);
                  setIsCustomPanelOpen(true);
                }}
                className={`px-4 py-2 rounded-lg text-left transition-all ${
                  currentAnimation === animations.length
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
                style={{
                  border: currentAnimation === animations.length ? 'none' : '2px dotted rgba(255, 255, 255, 0.4)',
                }}
              >
                Custom
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6">
            {/* Dot Matrix Grid */}
            <div 
              className="flex flex-col p-12 relative dot-matrix-corners" 
              style={{ 
                gap: `${spacing}px`,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: isDarkMode ? '#000000' : '#ffffff',
              }}
            >
              <style>{`
                .dot-matrix-corners::before,
                .dot-matrix-corners::after {
                  content: '';
                  position: absolute;
                  width: 14px;
                  height: 14px;
                  border: 1px solid rgba(255, 255, 255, 0.4);
                  pointer-events: none;
                }
                .dot-matrix-corners::before {
                  top: -1px;
                  left: -1px;
                  border-right: none;
                  border-bottom: none;
                }
                .dot-matrix-corners::after {
                  top: -1px;
                  right: -1px;
                  border-left: none;
                  border-bottom: none;
                }
                .dot-matrix-corners {
                  position: relative;
                }
                .dot-matrix-corners > *:first-child::before,
                .dot-matrix-corners > *:first-child::after {
                  content: '';
                  position: absolute;
                  width: 14px;
                  height: 14px;
                  border: 1px solid rgba(255, 255, 255, 0.4);
                  pointer-events: none;
                  z-index: 10;
                }
              `}</style>
              <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '14px', height: '14px', border: '1px solid rgba(255, 255, 255, 0.4)', borderRight: 'none', borderTop: 'none', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '14px', height: '14px', border: '1px solid rgba(255, 255, 255, 0.4)', borderLeft: 'none', borderTop: 'none', pointerEvents: 'none' }} />
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex" style={{ gap: `${spacing}px` }}>
                  {row.map((isActive, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      style={{
                        width: `${dotSize}px`,
                        height: `${dotSize}px`,
                        borderRadius: `${borderRadius}px`,
                        backgroundColor: isActive ? hexToRgba(dotColor, dotOpacity) : inactiveDotColor,
                        boxShadow: isActive ? `0 0 ${glowSpread}px 0 ${hexToRgba(shadowColor, glowOpacity)}` : undefined,
                        transition: `all ${isActive ? easeInDuration : easeOutDuration}ms ease`,
                      }}
                      className={isActive && enableScale ? 'scale-110' : 'scale-100'}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Animation Info */}
            <div className="text-center text-muted-foreground">
              <p className="font-semibold">{currentAnimation === animations.length ? 'Custom' : animations[currentAnimation].name} Animation</p>
              <p className="text-sm">Frame {currentFrame + 1} of {currentAnimation === animations.length ? customFrames.length : animations[currentAnimation].frames.length}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Code Export */}
        <div className="border-l border-border overflow-y-auto p-6 bg-card/50">
          <h2 className="text-lg font-semibold mb-4">Code Export</h2>
          
          {/* CSS Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">CSS</label>
              <button
                onClick={() => handleCopyCode(cssCode, 'CSS')}
                className="px-3 py-1 text-xs rounded bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent transition-colors"
              >
                Copy CSS
              </button>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 overflow-auto max-h-[400px]">
              <pre className="text-xs text-foreground whitespace-pre-wrap break-words font-mono">
                {cssCode}
              </pre>
            </div>
          </div>

          {/* HTML Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">HTML</label>
              <button
                onClick={() => handleCopyCode(htmlCode, 'HTML')}
                className="px-3 py-1 text-xs rounded bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent transition-colors"
              >
                Copy HTML
              </button>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 overflow-auto max-h-[200px]">
              <pre className="text-xs text-foreground whitespace-pre-wrap break-words font-mono">
                {htmlCode}
              </pre>
            </div>
          </div>
        </div>
      </div>


      {/* Custom Animation Panel */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-card/10 border-t-2 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out z-50"
        style={{
          height: '240px',
          opacity: isCustomPanelOpen ? 1 : 0,
          transform: isCustomPanelOpen ? 'translateY(-8px)' : 'translateY(0)',
          filter: isCustomPanelOpen ? 'blur(0)' : 'blur(8px)',
          pointerEvents: isCustomPanelOpen ? 'auto' : 'none',
        }}
      >
          <div className="h-full flex flex-col p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold">Custom Animation Editor</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPreviewPlaying(!isPreviewPlaying)}
                    className="flex items-center gap-1.5 px-3 py-1 text-sm rounded bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {isPreviewPlaying ? (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                      </svg>
                    )}
                    <span>{isPreviewPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const exportData = {
                      name: 'Custom',
                      frames: customFrames,
                      settings: {
                        dotSize,
                        speed,
                        dotColor,
                        dotOpacity,
                        shadowColor,
                        glowOpacity,
                        glowSpread,
                        inactiveDotColor,
                        borderRadius,
                        spacing,
                        easeInDuration,
                        easeOutDuration,
                        enableScale,
                      }
                    };
                    const dataStr = JSON.stringify(exportData, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'custom-animation.json';
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 text-sm rounded bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download</span>
                </button>
                <label className="flex items-center gap-1.5 px-3 py-1 text-sm rounded bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Import</span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const json = JSON.parse(event.target?.result as string);
                          if (json.frames && Array.isArray(json.frames)) {
                            setCustomFrames(json.frames);
                            setCurrentFrame(0);
                            
                            // Restore settings if they exist
                            if (json.settings) {
                              const s = json.settings;
                              if (s.dotSize !== undefined) setDotSize(s.dotSize);
                              if (s.speed !== undefined) setSpeed(s.speed);
                              if (s.dotColor !== undefined) setDotColor(s.dotColor);
                              if (s.dotOpacity !== undefined) setDotOpacity(s.dotOpacity);
                              if (s.shadowColor !== undefined) setShadowColor(s.shadowColor);
                              if (s.glowOpacity !== undefined) setGlowOpacity(s.glowOpacity);
                              if (s.glowSpread !== undefined) setGlowSpread(s.glowSpread);
                              if (s.inactiveDotColor !== undefined) setInactiveDotColor(s.inactiveDotColor);
                              if (s.borderRadius !== undefined) setBorderRadius(s.borderRadius);
                              if (s.spacing !== undefined) setSpacing(s.spacing);
                              if (s.easeInDuration !== undefined) setEaseInDuration(s.easeInDuration);
                              if (s.easeOutDuration !== undefined) setEaseOutDuration(s.easeOutDuration);
                              if (s.enableScale !== undefined) setEnableScale(s.enableScale);
                            }
                          } else {
                            alert('Invalid JSON format. Expected format: { "frames": [...], "settings": {...} }');
                          }
                        } catch (err) {
                          alert('Error parsing JSON file');
                        }
                      };
                      reader.readAsText(file);
                      e.target.value = '';
                    }}
                  />
                </label>
                <button
                  onClick={() => setIsCustomPanelOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1 text-sm rounded bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Frame Editor */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden">
              <div className="flex gap-4 h-full pb-2">
                {customFrames.map((frame, frameIndex) => (
                  <div
                    key={frameIndex}
                    className="flex-shrink-0 flex flex-col items-center gap-2"
                  >
                    <div className="text-xs text-muted-foreground">Frame {frameIndex + 1}</div>
                    {/* 3x3 Grid Editor */}
                    <div
                      className="grid grid-cols-3 gap-1 p-2 rounded-lg border-2 transition-all"
                      style={{
                        backgroundColor: '#1a1a1a',
                        borderColor: currentFrame === frameIndex ? '#14ff9e' : 'rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      {frame.map((row, rowIndex) =>
                        row.map((isActive, colIndex) => (
                          <button
                            key={`${frameIndex}-${rowIndex}-${colIndex}`}
                            onClick={() => {
                              const newFrames = [...customFrames];
                              newFrames[frameIndex][rowIndex][colIndex] = !isActive;
                              setCustomFrames(newFrames);
                            }}
                            className="w-6 h-6 rounded transition-all hover:scale-110"
                            style={{
                              backgroundColor: isActive ? dotColor : inactiveDotColor,
                              boxShadow: isActive ? `0 0 6px 0 ${shadowColor}` : 'none',
                            }}
                          />
                        ))
                      )}
                    </div>
                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        if (customFrames.length > 1) {
                          const newFrames = customFrames.filter((_, idx) => idx !== frameIndex);
                          setCustomFrames(newFrames);
                          if (currentFrame >= newFrames.length) {
                            setCurrentFrame(newFrames.length - 1);
                          }
                        }
                      }}
                      disabled={customFrames.length === 1}
                      className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                
                {/* Add Frame Tile */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="text-xs text-muted-foreground opacity-0">+</div>
                  <button
                    onClick={() => {
                      const newFrame: GridState = [
                        [false, false, false],
                        [false, false, false],
                        [false, false, false],
                      ];
                      setCustomFrames([...customFrames, newFrame]);
                    }}
                    className="flex items-center justify-center p-2 rounded-lg border-2 border-dashed border-primary/40 hover:border-primary hover:bg-primary/10 transition-all cursor-pointer"
                    style={{
                      width: '100px',
                      height: '100px',
                      backgroundColor: 'rgba(20, 255, 158, 0.05)',
                    }}
                  >
                    <span className="text-xs text-primary font-medium">+ Add Frame</span>
                  </button>
                  <div className="px-2 py-1 text-xs opacity-0">·</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Copy Notification */}
      {showCopyNotification && (
        <div className="fixed top-4 right-4 px-4 py-2 bg-green-500 text-white rounded shadow-lg">
          Code copied to clipboard!
        </div>
      )}
    </div>
  );
}