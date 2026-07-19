/* ==========================================
   INDEX SPECIFIC JAVASCRIPT - SUNIL PORTFOLIO
   Handles Typing Terminal & Counters
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Typing Terminal Animation
  const terminalText = document.getElementById('terminalText');
  const linesToType = [
    "profile: Sunil (aka pikslnet)",
    "skills: Brand Systems | UI Graphics | Social Media Creatives",
    "theme: Premium Futuristic Cyber Blue",
    "status: Ready for new projects. Launching engine...",
    "welcome: Click around, play some tunes, and check the PC specs!"
  ];
  
  let lineIndex = 0;
  let charIndex = 0;
  let currentText = '';
  
  const typeCharacter = () => {
    if (lineIndex < linesToType.length) {
      const line = linesToType[lineIndex];
      
      if (charIndex < line.length) {
        currentText += line[charIndex];
        terminalText.textContent = currentText + '_';
        charIndex++;
        setTimeout(typeCharacter, 30);
      } else {
        // Line finished. Add newline, go to next line
        currentText += '\n';
        charIndex = 0;
        lineIndex++;
        setTimeout(typeCharacter, 600); // Pause before next line
      }
    } else {
      // Remove trailing underscore when finished
      terminalText.textContent = currentText.trim();
    }
  };

  if (terminalText) {
    setTimeout(typeCharacter, 800); // Initial delay
  }

  // 2. Stats Number Counters
  const statsNums = document.querySelectorAll('.stat-num');
  
  const animateCounters = () => {
    statsNums.forEach(counter => {
      const targetVal = parseFloat(counter.getAttribute('data-val'));
      let currentVal = 0;
      const speed = targetVal / 50; // increment step
      
      const updateCount = () => {
        currentVal += speed;
        if (currentVal >= targetVal) {
          if (targetVal === 5) {
            counter.textContent = '4.9★'; // client rating formatted
          } else {
            counter.textContent = Math.round(targetVal) + '+';
          }
        } else {
          if (targetVal === 5) {
            counter.textContent = currentVal.toFixed(1) + '★';
          } else {
            counter.textContent = Math.round(currentVal) + '+';
          }
          requestAnimationFrame(updateCount);
        }
      };
      
      updateCount();
    });
  };

  // Intersection Observer to fire count up when visible
  const statsRow = document.querySelector('.stats-row');
  if (statsRow) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statsRow);
  }
});
