export const typeText = (elementId, text, speed = 100) => {
  const element = document.getElementById(elementId)
  if (!element) return

  let index = 0

  const type = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index)
      index++
      setTimeout(type, speed)
    }
  }

  type()
}

export const initAnimations = () => {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate')
        }, index * 100)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const skillCards = document.querySelectorAll('.skill-card')
  skillCards.forEach(card => observer.observe(card))

  const projectCards = document.querySelectorAll('.project-card')
  projectCards.forEach(card => observer.observe(card))
}
