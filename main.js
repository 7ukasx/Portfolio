
import { initAnimations, typeText } from './animations.js'

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

// === MOBILE MENU ===
const initMobileMenu = () => {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle')
  const navMenu = document.getElementById('navMenu')
  const navLinks = document.querySelectorAll('.nav-link')

  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active')
    navMenu.classList.toggle('active')
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : ''
  })

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        mobileMenuToggle.classList.remove('active')
        navMenu.classList.remove('active')
        document.body.style.overflow = ''
      }
    })
  })
}

// === SCROLL PROGRESS ===
const initScrollProgress = () => {
  const scrollProgress = document.getElementById('scrollProgress')

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const progress = (scrollTop / scrollHeight) * 100

    scrollProgress.style.width = `${progress}%`
  })
}

// === NAVBAR SCROLL EFFECT ===
const initNavbarScroll = () => {
  const navbar = document.getElementById('navbar')

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  })
}

// === SMOOTH SCROLL ===
const initSmoothScroll = () => {
  const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]')

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href')

      if (href && href.startsWith('#')) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetSection = document.getElementById(targetId)

        if (targetSection) {
          const navbarHeight = document.getElementById('navbar').offsetHeight
          const targetPosition = targetSection.offsetTop - navbarHeight

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })
        }
      }
    })
  })
}

// === ACTIVE NAV LINK ===
const initActiveNav = () => {
  const sections = document.querySelectorAll('section')
  const navLinks = document.querySelectorAll('.nav-link')

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -66% 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id')
        navLinks.forEach(link => {
          link.classList.remove('active')
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active')
          }
        })
      }
    })
  }, observerOptions)

  sections.forEach(section => observer.observe(section))
}

// === COPY EMAIL ===
const initCopyEmail = () => {
  const copyBtn = document.getElementById('copyEmailBtn')
  const notification = document.getElementById('copyNotification')
  const emailText = document.querySelector('.email-text').textContent

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailText)

      notification.classList.add('show')
      setTimeout(() => {
        notification.classList.remove('show')
      }, 3000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  })
}

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

  const textToType = 'Full-Stack Developer & Problem Solver'
  typeText('typedText', textToType, 80)
  
  // NEU: Füge den Event Listener hinzu
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}


