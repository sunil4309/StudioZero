/* ==========================================
   PC SPECS SPECIFIC JAVASCRIPT - SUNIL PORTFOLIO
   Dynamic rendering, categories filter, benchmark animation
   ========================================== */

const pcProducts = [
  {
    name: "Graphic Card (GPU)",
    description: "RTX 4060 | 8GB VRAM | Ray Tracing | GDDR6 Memory | DLSS 3.0 Support",
    price: "₹ 90,000",
    category: "core",
    benchmarkLabel: "3D Rendering & Gaming Power",
    benchmarkPct: 85,
    img: "spec/rtx 4060.png",
    link: "https://www.nvidia.com/en-in/geforce/graphics-cards/40-series/rtx-4060-4060ti/",
    bill: "bills/rtx_4060_bill.pdf"
  },
  {
    name: "Processor (CPU)",
    description: "Ryzen 7 5700X | 8 Cores, 16 Threads | 36MB Cache | 3.4 GHz up to 4.6 GHz Turbo",
    price: "₹ 38,000",
    category: "core",
    benchmarkLabel: "Multithreaded Task Speed",
    benchmarkPct: 88,
    img: "spec/5700x.png",
    link: "https://www.amazon.in/AMD-Ryzen-5700X-Processor-100-100000926WOF/dp/B09VCHQHZ6?th=1",
    bill: "bills/ryzen_5700x_bill.pdf"
  },
  {
    name: "Liquid Cooler (AIO)",
    description: "Deepcool LE520 | 240mm ARGB Dual Fan CPU Liquid Cooling System",
    price: "₹ 8,599",
    category: "core",
    benchmarkLabel: "Thermal Cooling Efficiency",
    benchmarkPct: 78,
    img: "spec/le520.png",
    link: "https://www.deepcool.com/products/Cooling/cpuliquidcoolers/LE520-240mm-Liquid-CPU-Cooler-1851-1700-AM5/2024/16608.shtml"
  },
  {
    name: "Power Supply (SMPS)",
    description: "Deepcool PK650D 650 Watts PSU | 80 Plus Bronze Certified | Flat Cabling",
    price: "₹ 7,999",
    category: "core",
    benchmarkLabel: "Power Delivery Stability",
    benchmarkPct: 75,
    img: "spec/pk650d.png",
    link: "https://www.deepcool.com/products/PowerSupplyUnits/powersupplyunits/PK650D-80-Plus-Bronze-Power-Supply/2022/15876.shtml"
  },
  {
    name: "Motherboard",
    description: "GIGABYTE B550M K DDR4 | Micro-ATX form factor | PCIe 4.0 slots | Dual NVMe M.2",
    price: "₹ 19,999",
    category: "core",
    benchmarkLabel: "System Stability & Bus Link",
    benchmarkPct: 82,
    img: "spec/b550m.png",
    link: "https://www.gigabyte.com/Motherboard/B550M-K-rev-10"
  },
  {
    name: "Primary Monitor (1)",
    description: "Acer EK240Y | 23.8\" IPS FHD display | 1ms VRB response | 100Hz Refresh Rate | AMD FreeSync",
    price: "₹ 9,499",
    category: "monitors",
    benchmarkLabel: "Visual Fluidity & Refresh",
    benchmarkPct: 75,
    img: "spec/EK241.png",
    link: "https://www.acer.com/"
  },
  {
    name: "Secondary Monitor (2)",
    description: "Samsung B2230 | 21.5\" LCD auxiliary screen | 5ms Response Time | 60Hz Refresh Rate",
    price: "₹ 4,999",
    category: "monitors",
    benchmarkLabel: "Auxiliary Workstation Area",
    benchmarkPct: 50,
    img: "spec/B2230.png",
    link: "https://www.flipkart.com/samsung-b2230-21-5-inch-lcd-monitor/p/itmd96kbbjqzg6xf",
    archived: true
  },
  {
    name: "Mechanical Keyboard",
    description: "Redragon K630 | 60% Form factor wired RGB keyboard | Linear Red switches | Pro Driver support",
    price: "₹ 3,399",
    category: "peripherals",
    benchmarkLabel: "Key Response & Tactility",
    benchmarkPct: 80,
    img: "spec/K630i.png",
    link: "https://redragon.in/products/redragon-k630-dragonborn-60-wired-rgb-gaming-keyboard"
  },
  {
    name: "Gaming Mouse",
    description: "Ultra Value Blaze | 8 programmable buttons | Gaming grade DPI up to 12800 | 7000 FPS sensor speed",
    price: "₹ 1,299",
    category: "peripherals",
    benchmarkLabel: "Cursor Tracking precision",
    benchmarkPct: 72,
    img: "spec/Blaze.png",
    link: "#"
  },
  {
    name: "Stereo Headset",
    description: "EKSA E900 Pro | Wired gaming headphones | Detachable noise canceling microphone | Surround Sound",
    price: "₹ 2,999",
    category: "peripherals",
    benchmarkLabel: "Audio Clarity & Space Depth",
    benchmarkPct: 76,
    img: "spec/Eksa.png",
    link: "https://www.eksa.net/products/eksa-e900-3d-stereo-sound-gaming-headset?variant=45453040517358",
    archived: true
  },
  {
    name: "Wireless Controller",
    description: "Elitex2 Pro | 1000Hz polling rate | Hall-effect magnetic joysticks & triggers | Macro paddles",
    price: "₹ 2,499",
    category: "peripherals",
    benchmarkLabel: "Input Latency & Action Speed",
    benchmarkPct: 90,
    img: "spec/Elitex2.png",
    link: "https://www.amkette.com/products/evofox-elite-x2-dual-mode-pc-gamepad?_pos=1&_sid=1c9e9f41b&_ss=r"
  },
  {
    name: "Auxiliary Keyboard & Mouse",
    description: "Evon combo | RGB backlight design | 12000 DPI mouse | 5 responsive control buttons",
    price: "₹ 999",
    category: "peripherals",
    benchmarkLabel: "Backup Peripheral Access",
    benchmarkPct: 45,
    img: "spec/EVON combo.png",
    link: "https://www.amazon.in/Live-Tech-Evon-Backlit-Keyboard/dp/B083QLLRWC",
    archived: true
  },
  {
    name: "Odyssey G5 Monitor",
    description: "Samsung Odyssey G5 | 27\" Curved QHD gaming monitor | 144Hz refresh rate | 1ms response time | FreeSync Premium",
    price: "₹ 22,999",
    category: "monitors",
    benchmarkLabel: "Refresh Fluidity & Curved Immersion",
    benchmarkPct: 92,
    img: "spec/Odysse G5.png",
    link: "https://www.samsung.com/in/monitors/gaming/odyssey-g5-g53f-27-inch-200hz-qhd-ls27fg530ewxxl/"
  },
  {
    name: "HyperX Cloud Stinger",
    description: "HyperX Cloud Stinger | Lightweight gaming headset | 90-degree rotating ear cups | 50mm directional drivers",
    price: "₹ 3,290",
    category: "peripherals",
    benchmarkLabel: "Acoustic Comfort & Spatial Clarity",
    benchmarkPct: 74,
    img: "spec/Hyperx stinger.png",
    link: "https://row.hyperx.com/products/hyperx-cloud-stinger-2-wired-gaming-headset?_pos=2&_psq=hyperx+stinger+2&_ss=e&_v=1.0"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const specListContainer = document.getElementById('pcspecList');
  const specFilters = document.querySelectorAll('.spec-filter-btn');

  // Function to render cards
  const renderSpecCards = (filterValue = 'all') => {
    specListContainer.innerHTML = ''; // Clear container

    // Filter array
    const filteredProducts = pcProducts.filter(p => filterValue === 'all' || p.category === filterValue);

    // Inject cards into DOM
    filteredProducts.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('pcspec-card');
      if (product.archived) {
        card.classList.add('archived');
      }
      card.setAttribute('data-category', product.category);

      card.innerHTML = `
        <div class="pcspec-img">
          <img src="${product.img}" alt="${product.name}">
        </div>
        <div class="pcspec-info">
          <div>
            <div class="pcspec-header-row">
              <h3>${product.name}</h3>
              ${product.archived ? `<span class="archived-badge">ARCHIVED</span>` : ''}
            </div>
            <p>${product.description}</p>
          </div>
          <div class="spec-benchmark">
            <div class="benchmark-label">
              <span>${product.benchmarkLabel}</span>
              <span>${product.benchmarkPct}%</span>
            </div>
            <div class="benchmark-track">
              <div class="benchmark-fill" data-pct="${product.benchmarkPct}"></div>
            </div>
          </div>
          <div class="spec-action-row">
            <div class="pcspec-price-wrapper" style="display: flex; gap: 12px; align-items: center;">
              <div class="pcspec-price">${product.price}</div>
              ${product.bill ? `<button class="spec-bill-btn" data-bill="${product.bill}">BILL</button>` : ''}
            </div>
            <a href="${product.link || '#'}" target="_blank" class="spec-buy-btn" aria-label="View Product">
              <span>BUY</span>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21 12l-8.15-8.15-1.42 1.42 5.43 5.43H5v2z"/>
              </svg>
            </a>
          </div>
        </div>
      `;

      // Open Spec Lightbox on card click (excluding Buy/Bill links)
      card.addEventListener('click', (e) => {
        if (e.target.closest('.spec-buy-btn') || e.target.closest('.spec-bill-btn')) {
          return;
        }

        const lightbox = document.getElementById('specLightbox');
        const lightboxImg = document.getElementById('specLightboxImg');
        const lightboxTitle = document.getElementById('specLightboxTitle');
        const lightboxTag = document.getElementById('specLightboxTag');
        const lightboxDesc = document.getElementById('specLightboxDesc');
        const lightboxPrice = document.getElementById('specLightboxPrice');
        const lightboxBuyBtn = document.getElementById('specLightboxBuyBtn');
        const lightboxBillBtn = document.getElementById('specLightboxBillBtn');

        if (!lightbox) return;

        // Reset classes
        lightboxTag.className = 'item-tag';
        lightboxBuyBtn.className = 'spec-buy-btn';

        // Populate spec details
        lightboxImg.src = product.img;
        lightboxImg.alt = product.name;
        lightboxTitle.textContent = product.name;

        if (product.archived) {
          lightboxTag.textContent = "ARCHIVED";
          lightboxTag.classList.add('archived-tag');
          lightboxBuyBtn.classList.add('archived-btn');
        } else {
          let categoryName = "CORE SYSTEM";
          if (product.category === 'monitors') categoryName = "DISPLAY MONITORS";
          else if (product.category === 'peripherals') categoryName = "GEAR & PERIPHERALS";
          lightboxTag.textContent = categoryName;
        }

        // Display/hide buy link button
        if (product.link && product.link !== '#') {
          lightboxBuyBtn.style.display = 'inline-flex';
        } else {
          lightboxBuyBtn.style.display = 'none';
        }

        // Display/hide bill link button
        if (lightboxBillBtn) {
          if (product.bill) {
            lightboxBillBtn.setAttribute('data-bill', product.bill);
            lightboxBillBtn.style.display = 'inline-block';
          } else {
            lightboxBillBtn.removeAttribute('data-bill');
            lightboxBillBtn.style.display = 'none';
          }
        }

        lightboxDesc.textContent = product.description;
        lightboxPrice.textContent = product.price;
        lightboxBuyBtn.href = product.link || '#';

        // Trigger active state
        lightbox.classList.add('active');
        document.body.classList.add('menu-open');
      });

      specListContainer.appendChild(card);
    });

    // Short delay to trigger progress bar transitions
    setTimeout(() => {
      const fills = document.querySelectorAll('.benchmark-fill');
      fills.forEach(fill => {
        const pct = fill.getAttribute('data-pct');
        fill.style.width = `${pct}%`;
      });
    }, 100);
  };

  // 1. Initial Render
  renderSpecCards();

  // 2. Filter Buttons Event Binding
  specFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      specFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      renderSpecCards(filter);
    });
  });

  // 3. Spec Lightbox Close Listeners
  const lightbox = document.getElementById('specLightbox');
  const lightboxClose = document.getElementById('specLightboxClose');

  if (lightbox && lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.classList.remove('menu-open');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // ==========================================
  // BILL ACCESS SECURE PASSCODE MODAL SYSTEM
  // ==========================================
  const BILL_PASSCODE = "1804"; // 4-digit pincode
  let activeBillPath = "";

  // Append pin modal to DOM
  const pinModal = document.createElement('div');
  pinModal.id = 'pinModal';
  pinModal.className = 'pin-modal-overlay';
  pinModal.innerHTML = `
    <div class="pin-modal-content">
      <div class="pin-modal-header">
        <h4>SECURE_ACCESS_REQUIRED</h4>
        <button class="pin-close-btn" id="closePinModal">&times;</button>
      </div>
      <div class="pin-modal-body">
        <p class="pin-instruction">Enter 4-digit pincode to view bill PDF.</p>
        <div class="pin-input-row">
          <input type="password" maxlength="1" class="pin-digit" pattern="[0-9]" inputmode="numeric">
          <input type="password" maxlength="1" class="pin-digit" pattern="[0-9]" inputmode="numeric">
          <input type="password" maxlength="1" class="pin-digit" pattern="[0-9]" inputmode="numeric">
          <input type="password" maxlength="1" class="pin-digit" pattern="[0-9]" inputmode="numeric">
        </div>
        <div id="pinErrorMsg" class="pin-error-msg">ACCESS_DENIED: Invalid Pincode</div>
        <button class="pin-submit-btn" id="submitPin">DECRYPT & VIEW BILL</button>
      </div>
    </div>
  `;
  document.body.appendChild(pinModal);

  const pinDigits = pinModal.querySelectorAll('.pin-digit');
  const pinErrorMsg = document.getElementById('pinErrorMsg');
  const submitPinBtn = document.getElementById('submitPin');
  const closePinModalBtn = document.getElementById('closePinModal');

  // Focus chaining for digits
  pinDigits.forEach((input, idx) => {
    input.addEventListener('input', (e) => {
      input.value = input.value.replace(/[^0-9]/g, ''); // Numeric only
      if (input.value && idx < pinDigits.length - 1) {
        pinDigits[idx + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && idx > 0) {
        pinDigits[idx - 1].focus();
      }
      if (e.key === 'Enter') {
        submitPinBtn.click();
      }
    });
  });

  // Open Passcode prompt
  const openPinPrompt = (billPath) => {
    activeBillPath = billPath;
    pinDigits.forEach(input => input.value = ''); // Reset values
    pinErrorMsg.classList.remove('active'); // Hide error
    pinModal.classList.add('active');
    setTimeout(() => pinDigits[0].focus(), 100);
  };

  // Close passcode modal
  const closePinPrompt = () => {
    pinModal.classList.remove('active');
  };

  closePinModalBtn.addEventListener('click', closePinPrompt);
  pinModal.addEventListener('click', (e) => {
    if (e.target === pinModal) closePinPrompt();
  });

  // Validate passcode
  submitPinBtn.addEventListener('click', () => {
    const enteredPin = Array.from(pinDigits).map(input => input.value).join('');
    if (enteredPin === BILL_PASSCODE) {
      window.open(activeBillPath, '_blank');
      closePinPrompt();
    } else {
      pinErrorMsg.classList.add('active');
      pinDigits.forEach(input => input.value = '');
      pinDigits[0].focus();
    }
  });

  // Listen to spec card BILL buttons click events dynamically (delegated listener)
  document.addEventListener('click', (e) => {
    const billBtn = e.target.closest('.spec-bill-btn');
    if (billBtn) {
      const billPath = billBtn.getAttribute('data-bill');
      if (billPath) {
        openPinPrompt(billPath);
      }
    }
  });
});
