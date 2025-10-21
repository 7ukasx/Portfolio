export const typeText = (elementId, text, speed = 100) => {
  return new Promise(resolve => {
    const element = document.getElementById(elementId)
    if (!element) return resolve()

    let index = 0

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index)
        index++
        setTimeout(type, speed)
      } else {
        resolve() // Promise auflösen, wenn das Tippen beendet ist
      }
    }

    type()
  })
}
//test
/**
 * Löscht den Text im Element Buchstabe für Buchstabe.
 * @param {string} elementId - Die ID des HTML-Elements.
 * @param {number} speed - Die Verzögerung in ms zwischen den einzelnen Löschvorgängen.
 * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn der Text komplett gelöscht ist.
 */
export const deleteText = (elementId, speed = 30) => {
    return new Promise(resolve => {
        const element = document.getElementById(elementId)
        if (!element) return resolve()
        
        let text = element.textContent
        
        const remove = () => {
            if (text.length > 0) {
                // Den letzten Buchstaben entfernen
                text = text.slice(0, -1)
                element.textContent = text
                setTimeout(remove, speed)
            } else {
                resolve() // Promise auflösen, wenn der Text leer ist
            }
        }
        remove()
    })
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
