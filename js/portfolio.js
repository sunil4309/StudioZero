/* ==========================================
   PORTFOLIO SPECIFIC JAVASCRIPT - SUNIL PORTFOLIO
   Handles Grid Filters and Lightbox
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!galleryGrid) return;

  // Render portfolio grid from myProjects database
  const renderGallery = () => {
    galleryGrid.innerHTML = '';
    myProjects.forEach(project => {
      const item = document.createElement('div');
      item.classList.add('gallery-item');
      item.setAttribute('data-category', project.category);
      
      const tagText = project.category === 'ui' ? 'UI/UX' : project.category.toUpperCase();
      
      item.innerHTML = `
        <div class="item-inner">
          <img src="${project.img}" alt="${project.title}">
          <div class="item-info">
            <h3>${project.title}</h3>
            <p>${project.desc.split('.')[0] + '.'}</p>
            <span class="item-tag">${tagText}</span>
          </div>
        </div>
      `;
      galleryGrid.appendChild(item);
    });
  };

  // Populate layout elements
  renderGallery();

  // Query dynamically rendered gallery list elements
  const galleryItems = document.querySelectorAll('.gallery-item');

  // 1. Portfolio Category Filtering (FLIP Transition)
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active classes
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Record first positions of currently visible items
      const firstPositions = [];
      galleryItems.forEach((item, index) => {
        if (item.style.display !== 'none' && item.style.opacity !== '0') {
          firstPositions[index] = item.getBoundingClientRect();
        } else {
          firstPositions[index] = null;
        }
      });

      // Toggle display states instantly so that grid tracks collapse
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          const wasHidden = item.style.display === 'none' || item.style.opacity === '0';
          
          item.style.display = 'block';
          
          if (wasHidden) {
            item.style.transition = 'none';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9) translate3d(0, 0, 0)';
          }
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9) translate3d(0, 0, 0)';
        }
      });

      // Force layout calculation
      document.body.offsetHeight;

      // Calculate translation offset (Invert step)
      galleryItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          const first = firstPositions[index];
          const last = item.getBoundingClientRect();
          
          if (first) {
            const deltaX = first.left - last.left;
            const deltaY = first.top - last.top;
            
            if (deltaX !== 0 || deltaY !== 0) {
              item.style.transition = 'none';
              item.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1)`;
            }
          }
        }
      });

      // Force another layout reflow to register offset
      document.body.offsetHeight;

      // Enable transitions and play back to origin (0, 0, 0)
      requestAnimationFrame(() => {
        galleryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            item.style.transform = 'translate3d(0, 0, 0) scale(1)';
            item.style.opacity = '1';
          }
        });
      });

      // Clear inline transitions/transforms to restore CSS hover rules
      setTimeout(() => {
        galleryItems.forEach(item => {
          if (item.style.display !== 'none') {
            item.style.transition = '';
            item.style.transform = '';
          }
        });
      }, 500);
    });
  });

  // 2. Lightbox Open / Close Interactions
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h3').textContent;
      const tag = item.querySelector('.item-tag').textContent;
      
      const project = myProjects.find(p => p.title === title) || {};
      
      // Populate Lightbox contents
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxTitle.textContent = title;
      lightboxTag.textContent = tag;
      lightboxDesc.textContent = project.desc || "Detailed technical breakdown of the graphic design. Custom shapes, glowing borders, high-contrast layouts.";
      
      // Display Lightbox
      lightbox.classList.add('active');
      document.body.classList.add('menu-open'); // prevent body scroll
    });
  });

  // Close when clicking Close button
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  }

  // Close when clicking outside of the lightbox contents
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }
});
