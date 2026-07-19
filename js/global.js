/* ==========================================
   GLOBAL JAVASCRIPT - SUNIL PORTFOLIO (pikslnet)
   Handles Shared Navbar and Menu Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header.nav');
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const footerYear = document.getElementById('year');

  // 1. Scroll Effect on Navbar
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once on load to catch current position

  // 2. Mobile Menu Toggle
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // 3. Dynamic Footer Year
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // 4. Shared Lightbox Scroll Wheel Zoom & Drag Panning Utility
  const setupLightboxZoom = (lightboxId, imgId) => {
    const lightbox = document.getElementById(lightboxId);
    const img = document.getElementById(imgId);
    if (!lightbox || !img) return;

    let scale = 1;
    let isDragging = false;
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;

    const resetZoom = () => {
      scale = 1;
      translateX = 0;
      translateY = 0;
      img.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      img.style.transform = 'translate3d(0, 0, 0) scale(1)';
      img.style.cursor = 'zoom-in';
    };

    // Reset when lightbox opens/closes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isActive = lightbox.classList.contains('active');
          if (isActive) {
            resetZoom();
          }
        }
      });
    });
    observer.observe(lightbox, { attributes: true });

    // Scroll Wheel Zoom Event
    lightbox.addEventListener('wheel', (e) => {
      const isOverImg = e.target.closest('.lightbox-img-wrap') || e.target === img;
      if (!isOverImg) return;

      e.preventDefault();

      const zoomIntensity = 0.15;
      if (e.deltaY < 0) {
        scale = Math.min(scale + zoomIntensity, 4.0); // maximum 4x
      } else {
        scale = Math.max(scale - zoomIntensity, 1.0); // minimum 1x
      }

      img.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
      img.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
      img.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
    }, { passive: false });

    // Drag Panning Event
    img.addEventListener('mousedown', (e) => {
      if (scale <= 1) return; // Only pan when zoomed in
      e.preventDefault();
      isDragging = true;
      img.style.cursor = 'grabbing';
      img.style.transition = 'none';

      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;

      // Restrict pan boundary offsets based on zoom scale
      const maxPan = (scale - 1) * 350;
      translateX = Math.max(Math.min(translateX, maxPan), -maxPan);
      translateY = Math.max(Math.min(translateY, maxPan), -maxPan);

      img.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
    });

    const stopDragging = () => {
      if (!isDragging) return;
      isDragging = false;
      img.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
    };

    document.addEventListener('mouseup', stopDragging);
    lightbox.addEventListener('mouseleave', stopDragging);
  };

  // Initialize lightbox zooming
  setupLightboxZoom('lightbox', 'lightboxImg');
  setupLightboxZoom('specLightbox', 'specLightboxImg');
});
