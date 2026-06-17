/* ==========================================================================
   NAVIGATION & SCROLL INTERACTION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Sticky Navbar background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile navigation hamburger toggle
  navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    navbar.classList.toggle('mobile-menu-open');
    const icon = navToggle.querySelector('i');
    if (navLinksContainer.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close mobile menu on clicking any navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
      navbar.classList.remove('mobile-menu-open');
      navToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
  });

  // Scroll Spy: Highlight active section in navbar
  const scrollSpyOptions = {
    root: null,
    threshold: 0.25,
    rootMargin: "-10% 0px -40% 0px"
  };

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, scrollSpyOptions);

  sections.forEach(section => {
    scrollSpyObserver.observe(section);
  });

  /* ==========================================================================
     SCROLL REVEAL ANIMATIONS (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Animate once
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     HTML CONTACT FORM VALIDATION & SUCCESS TOAST
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');

  function showToast(title, message, isError = false) {
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    if (isError) {
      toast.style.borderColor = '#ef4444';
      toast.style.borderLeftColor = '#ef4444';
      toast.querySelector('.toast-icon i').className = 'fa-solid fa-triangle-exclamation';
      toast.querySelector('.toast-icon').style.color = '#ef4444';
    } else {
      toast.style.borderColor = 'var(--accent-primary)';
      toast.style.borderLeftColor = 'var(--accent-primary)';
      toast.querySelector('.toast-icon i').className = 'fa-solid fa-circle-check';
      toast.querySelector('.toast-icon').style.color = 'var(--accent-primary)';
    }

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const courseSelect = document.getElementById('form-course');
    const messageInput = document.getElementById('form-message');

    let isValid = true;
    
    // Clear previous outlines
    [nameInput, emailInput, courseSelect, messageInput].forEach(input => {
      input.style.borderColor = 'var(--glass-border)';
    });

    // Check Name
    if (!nameInput.value.trim()) {
      nameInput.style.borderColor = '#ef4444';
      isValid = false;
    }

    // Check Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.style.borderColor = '#ef4444';
      isValid = false;
    }

    // Check Course select
    if (!courseSelect.value) {
      courseSelect.style.borderColor = '#ef4444';
      isValid = false;
    }

    // Check Message
    if (!messageInput.value.trim()) {
      messageInput.style.borderColor = '#ef4444';
      isValid = false;
    }

    if (isValid) {
      showToast(
        "Inquiry Submitted!", 
        `Thank you ${nameInput.value.split(' ')[0]}, your message has been sent.`
      );
      contactForm.reset();
    } else {
      showToast("Submission Failed", "Please fill in all fields with valid information.", true);
    }
  });

  // Re-verify inputs on user typing to clear error borders
  const formElements = [nameInput = document.getElementById('form-name'), emailInput = document.getElementById('form-email'), courseSelect = document.getElementById('form-course'), messageInput = document.getElementById('form-message')];
  formElements.forEach(elem => {
    elem.addEventListener('input', () => {
      if (elem.value.trim() !== "") {
        elem.style.borderColor = 'var(--glass-border)';
      }
    });
  });

  /* ==========================================================================
     CSS ANIMATED BOX WIDGET
     ========================================================================== */
  const animatedBox = document.getElementById('animated-box-widget');
  const btnTriggerAnim = document.getElementById('btn-trigger-animation');

  btnTriggerAnim.addEventListener('click', () => {
    // If animation is already running, reset it
    animatedBox.classList.remove('spin-morph');
    // Trigger reflow to restart animation
    void animatedBox.offsetWidth; 
    animatedBox.classList.add('spin-morph');
  });

  animatedBox.addEventListener('animationend', () => {
    animatedBox.classList.remove('spin-morph');
  });

  /* ==========================================================================
     JAVASCRIPT TABBED DEMOS WIDGET
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      // Add active to clicked button
      btn.classList.add('active');

      // Hide all panes
      tabPanes.forEach(pane => pane.classList.remove('active'));
      // Show active pane
      const targetPane = document.getElementById(btn.getAttribute('data-tab'));
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
     TAB 1: DIGITAL CLOCK DEMO
     -------------------------------------------------------------------------- */
  const clockDisplay = document.getElementById('clock-time-display');
  const clockDateDisplay = document.getElementById('clock-date-display');
  const btnClockFormat = document.getElementById('btn-clock-format');
  const btnClockToggle = document.getElementById('btn-clock-toggle');

  let clockInterval = null;
  let is24Hour = true;
  let isClockPaused = false;
  
  // Custom mock date starting base matching the additional metadata: 2026-06-11T07:50:52+05:45
  // We will run a real-time offset clock using the system clock so that the clock matches local time.
  function updateClock() {
    const now = new Date();
    
    // Time formatting
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = '';

    if (!is24Hour) {
      ampm = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
    }

    // Zero padding
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    clockDisplay.textContent = `${hours}:${minutes}:${seconds}${ampm}`;

    // Date formatting
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    clockDateDisplay.textContent = now.toLocaleDateString('en-US', dateOptions);
  }

  function startClock() {
    if (clockInterval) clearInterval(clockInterval);
    updateClock(); // Run immediately once
    clockInterval = setInterval(updateClock, 1000);
  }

  function pauseClock() {
    clearInterval(clockInterval);
    clockInterval = null;
  }

  btnClockFormat.addEventListener('click', () => {
    is24Hour = !is24Hour;
    btnClockFormat.textContent = is24Hour ? "Format: 24Hr" : "Format: 12Hr";
    if (!isClockPaused) {
      updateClock();
    }
  });

  btnClockToggle.addEventListener('click', () => {
    isClockPaused = !isClockPaused;
    if (isClockPaused) {
      pauseClock();
      btnClockToggle.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
    } else {
      startClock();
      btnClockToggle.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
    }
  });

  // Initialize clock
  startClock();

  /* --------------------------------------------------------------------------
     TAB 2: STATE-MACHINE CALCULATOR DEMO
     -------------------------------------------------------------------------- */
  const calcScreen = document.getElementById('calc-screen');
  const calcButtons = document.querySelectorAll('.calc-btn');

  let calcState = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calcState;

    if (waitingForSecondOperand === true) {
      calcState.displayValue = digit;
      calcState.waitingForSecondOperand = false;
    } else {
      calcState.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }

  function inputDecimal(dot) {
    if (calcState.waitingForSecondOperand === true) {
      calcState.displayValue = "0."
      calcState.waitingForSecondOperand = false;
      return
    }

    if (!calcState.displayValue.includes(dot)) {
      calcState.displayValue += dot;
    }
  }

  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calcState;
    const inputValue = parseFloat(displayValue);

    if (operator && calcState.waitingForSecondOperand)  {
      calcState.operator = nextOperator;
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      calcState.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);

      calcState.displayValue = `${parseFloat(result.toFixed(7))}`;
      calcState.firstOperand = result;
    }

    calcState.waitingForSecondOperand = true;
    calcState.operator = nextOperator;
  }

  function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      if (secondOperand === 0) {
        return 0; // Prevent divide by zero error
      }
      return firstOperand / secondOperand;
    }
    return secondOperand;
  }

  function toggleSign() {
    calcState.displayValue = (parseFloat(calcState.displayValue) * -1).toString();
  }

  function calculatePercent() {
    calcState.displayValue = (parseFloat(calcState.displayValue) / 100).toString();
  }

  function resetCalculator() {
    calcState.displayValue = '0';
    calcState.firstOperand = null;
    calcState.waitingForSecondOperand = false;
    calcState.operator = null;
  }

  function updateCalcScreen() {
    calcScreen.textContent = calcState.displayValue;
  }

  calcButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.id;
      const val = button.textContent;

      if (id.startsWith('calc-') && !isNaN(parseInt(id.replace('calc-', '')))) {
        inputDigit(id.replace('calc-', ''));
      } else if (id === 'calc-dot') {
        inputDecimal('.');
      } else if (id === 'calc-add') {
        handleOperator('+');
      } else if (id === 'calc-sub') {
        handleOperator('-');
      } else if (id === 'calc-mul') {
        handleOperator('*');
      } else if (id === 'calc-div') {
        handleOperator('/');
      } else if (id === 'calc-eq') {
        handleOperator(null);
        calcState.firstOperand = null;
        calcState.waitingForSecondOperand = false;
      } else if (id === 'calc-ac') {
        resetCalculator();
      } else if (id === 'calc-toggle-sign') {
        toggleSign();
      } else if (id === 'calc-percent') {
        calculatePercent();
      }

      updateCalcScreen();
    });
  });

  /* --------------------------------------------------------------------------
     TAB 3: CONTRAST-AWARE RANDOM COLOR GENERATOR DEMO
     -------------------------------------------------------------------------- */
  const colorSwatch = document.getElementById('color-swatch');
  const colorHexLabel = document.getElementById('color-hex-label');
  const btnGenerateColor = document.getElementById('btn-generate-color');
  const colorHistoryRow = document.getElementById('color-history-row');

  let colorHistory = ['#10B981']; // Initial starting color

  function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace("#", "");
    const r = parseInt(hexcolor.substr(0,2), 16);
    const g = parseInt(hexcolor.substr(2,2), 16);
    const b = parseInt(hexcolor.substr(4,2), 16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? '#111827' : '#E5E7EB'; // Return dark or light text
  }

  function updateColorSwatch(hex) {
    colorSwatch.style.backgroundColor = hex;
    colorHexLabel.textContent = hex;
    colorSwatch.style.color = getContrastYIQ(hex);
  }

  function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let hex = '#';
    for (let i = 0; i < 6; i++) {
      hex += letters[Math.floor(Math.random() * 16)];
    }
    return hex;
  }

  function renderHistory() {
    colorHistoryRow.innerHTML = '';
    colorHistory.forEach(color => {
      const pill = document.createElement('div');
      pill.className = 'color-history-pill';
      pill.style.backgroundColor = color;
      pill.setAttribute('data-hex', color);
      
      pill.addEventListener('click', () => {
        updateColorSwatch(color);
      });

      colorHistoryRow.appendChild(pill);
    });
  }

  btnGenerateColor.addEventListener('click', () => {
    const newColor = generateRandomColor();
    updateColorSwatch(newColor);
    
    // Add to history stack
    colorHistory.unshift(newColor);
    if (colorHistory.length > 10) {
      colorHistory.pop();
    }
    renderHistory();
  });

  // Initial render
  renderHistory();
  updateColorSwatch('#10B981');
});



const colorSwatch = document.getElementById('color-swatch');
const colorHexLabel = document.getElementById('color-hex-label');

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let hex = '#';
  for (let i = 0; i < 6; i++) {
    hex += letters[Math.floor(Math.random() * 16)];
  }
  return hex;
}

function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substr(0,2), 16);
  const g = parseInt(hexcolor.substr(2,2), 16);
  const b = parseInt(hexcolor.substr(4,2), 16);
  const yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 128) ? '#111827' : '#E5E7EB';
}



