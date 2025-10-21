import { initAnimations, typeText, deleteText } from './animations.js'

// === THEME TOGGLE ===
function toggleTheme() {
  const html = document.documentElement;
  const themeIcon = document.getElementById('themeIcon');
  const current = html.getAttribute('data-theme');
  const newTheme = current === 'light' ? 'dark' : 'light';

  html.setAttribute('data-theme', newTheme);
  themeIcon.classList.remove('fa-moon', 'fa-sun');
  themeIcon.classList.add(newTheme === 'light' ? 'fa-sun' : 'fa-moon');

  localStorage.setItem('theme', newTheme);
}

// Set theme on page load
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const html = document.documentElement;
html.setAttribute('data-theme', savedTheme || (prefersDark ? 'dark' : 'light'));
const themeIcon = document.getElementById('themeIcon');
if (themeIcon) {
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  themeIcon.classList.add(currentTheme === 'light' ? 'fa-sun' : 'fa-moon');
}

// Event Listener für den Theme Toggle Button
const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}


// === MOBILE MENU ===
const initMobileMenu = () => {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle')
  const navMenu = document.getElementById('navMenu')
  const navLinks = document.querySelectorAll('.nav-link')

  // Toggle-Funktion
  const toggleMenu = () => {
    navMenu.classList.toggle('active')
    mobileMenuToggle.classList.toggle('active')
  }

  // Event Listener für das Burger-Menü-Icon
  mobileMenuToggle.addEventListener('click', toggleMenu)

  // Event Listener für Navigations-Links (schließt das Menü beim Klicken)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu()
      }
    })
  })
}

// === SCROLL PROGRESS BAR ===
const initScrollProgress = () => {
  const scrollProgressBar = document.getElementById('scrollProgress')

  window.addEventListener('scroll', () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    const scrollPercent = (scrolled / scrollableHeight) * 100

    scrollProgressBar.style.width = scrollPercent + '%'
  })
}

// === NAVBAR SCROLL HIDING/SHADOW ===
let lastScrollY = 0
const initNavbarScroll = () => {
  const navbar = document.getElementById('navbar')
  const scrollUpThreshold = 10 // Px die man nach oben scrollen muss, um die Navbar wieder anzuzeigen

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY

    // Navbar Schatten hinzufügen/entfernen
    if (currentScrollY > 0) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }

    // Navbar bei Scroll Down ausblenden, bei Scroll Up einblenden
    if (currentScrollY > lastScrollY && currentScrollY > 50) { // Scroll Down
      navbar.classList.add('hidden')
    } else if (currentScrollY < lastScrollY && (lastScrollY - currentScrollY) > scrollUpThreshold) { // Scroll Up
      navbar.classList.remove('hidden')
    }

    lastScrollY = currentScrollY
  })
}

// === SMOOTH SCROLL FOR HASH LINKS ===
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const targetId = this.getAttribute('href')
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Berechne die Position abzüglich der Höhe der Navbar (wenn sie existiert)
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0
        const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight

        window.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        })
      }
    })
  })
}

// === ACTIVE NAVIGATION LINK MARKER ===
const initActiveNav = () => {
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.nav-link')

  const observerOptions = {
    rootMargin: '-50% 0px -50% 0px', // Überprüft, ob die Sektion in der Mitte des Viewports ist
    threshold: 0 // Der Callback wird ausgelöst, sobald 0% der Sektion sichtbar sind
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Entferne 'active' von allen Links
        navLinks.forEach(link => link.classList.remove('active'))

        // Füge 'active' zum entsprechenden Link hinzu
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`)
        if (activeLink) {
          activeLink.classList.add('active')
        }
      }
    })
  }, observerOptions)

  sections.forEach(section => observer.observe(section))
}

// === EMAIL COPY FUNCTIONALITY ===
const initCopyEmail = () => {
  const copyBtn = document.getElementById('copyEmailBtn')
  const emailText = document.querySelector('.email-text')
  const notification = document.getElementById('copyNotification')

  if (!copyBtn || !emailText || !notification) return

  copyBtn.addEventListener('click', () => {
    const email = emailText.textContent.trim()
    
    // Verwende die Clipboard API, die moderner und sicherer ist
    navigator.clipboard.writeText(email).then(() => {
      // Benachrichtigung anzeigen
      notification.classList.add('show')
      
      // Benachrichtigung nach 2 Sekunden wieder ausblenden
      setTimeout(() => {
        notification.classList.remove('show')
      }, 2000)

      // Button-Text kurz ändern
      const originalText = copyBtn.innerHTML
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!'
      
      setTimeout(() => {
        copyBtn.innerHTML = originalText
      }, 1500)

    }).catch(err => {
      console.error('Konnte E-Mail nicht kopieren: ', err)
      // Fallback-Logik, falls die Clipboard API fehlschlägt, kann hier hinzugefügt werden
    })
  })
}

// === SCROLL TO TOP BUTTON LOGIC ===
document.addEventListener("DOMContentLoaded", function() {
    const scrollButton = document.getElementById("scrollTopBtn");
    
    // Funktion, die den Button ein- oder ausblendet
    function toggleScrollButton() {
        // Der Button erscheint, sobald 300px gescrollt wurde
        if (window.scrollY > 300) {
            scrollButton.classList.add("show");
        } else {
            scrollButton.classList.remove("show");
        }
    }

    // Event-Listener für das Scrollen
    window.addEventListener("scroll", toggleScrollButton);
    
    // Event-Listener für den Klick auf den Button
    scrollButton.addEventListener("click", function(e) {
        e.preventDefault(); // Verhindert das "Springen"
        
        // Sanfter Scroll-Effekt zum Anfang der Seite
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Führt die Funktion einmal aus, falls die Seite nicht ganz oben geladen wird
    toggleScrollButton();
});


// === INIT ALL ===
const init = () => {
  initMobileMenu()
  initScrollProgress()
  initNavbarScroll()
  initSmoothScroll()
  initActiveNav()
  initCopyEmail()
  initAnimations()

  // START: CODE FÜR WECHSELNDE TYPING ANIMATION (MEHR PREMIUM)
  const typingElementId = 'typedText'
  const phrases = [
    'Full-Stack Developer & Problem Solver', // 1. Phrase (Start-Text)
    'Building modern responsive web applications',        // 2. Phrase
    'Expertise in JavaScript, React & Node.js', // 3. Phrase
    'Dedicated to turning ideas into reality'              // 4. Phrase
  ]
  const typingSpeed = 80  // Geschwindigkeit, mit der Buchstaben getippt werden
  const deleteSpeed = 30  // Geschwindigkeit, mit der Buchstaben gelöscht werden
  const waitTime = 3000   // Wartezeit in ms, bevor der Löschvorgang beginnt

  let phraseIndex = 0;  // Startindex für die Phrasen
  let firstRun = true;   // Flag, um den ersten Durchlauf zu erkennen

const startTypingCycle = async () => {
  const typingElement = document.getElementById(typingElementId);
  if (!typingElement) return;

  // Wenn es NICHT der erste Durchlauf ist → warten und löschen
  if (!firstRun) {
    await new Promise(resolve => setTimeout(resolve, waitTime));
    await deleteText(typingElementId, deleteSpeed);
  }

  // Nach dem ersten Durchlauf ist es nicht mehr der erste
  firstRun = false;

  // Index der nächsten Phrase bestimmen
  phraseIndex = (phraseIndex + 1) % phrases.length;
  const nextText = phrases[phraseIndex];

  // Neue Phrase tippen
  await typeText(typingElementId, nextText, typingSpeed);

  // Nächsten Zyklus starten
  setTimeout(startTypingCycle, 1000);
};

  // Starte den ersten Zyklus
  startTypingCycle()
  // ENDE: CODE FÜR WECHSELNDE TYPING ANIMATION
}

// Starte alle Funktionen, sobald das Dokument geladen ist
document.addEventListener('DOMContentLoaded', init)
