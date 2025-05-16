document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu functionality
  const hamburger = document.getElementById("hamburger")
  const navLinks = document.getElementById("nav-links")

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active")
  })

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav") && !event.target.closest("#hamburger")) {
      navLinks.classList.remove("active")
    }
  })

  // Close menu when clicking on a link
  const navLinksItems = document.querySelectorAll(".nav-links a")
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active")
    })
  })

  // Countdown Timer functionality
  const countdownDate = new Date("July 1, 2028 00:00:00").getTime()
  const daysElement = document.getElementById("days")
  const hoursElement = document.getElementById("hours")
  const minutesElement = document.getElementById("minutes")
  const secondsElement = document.getElementById("seconds")
  
  function updateCountdown() {
    const now = new Date().getTime()
    const distance = countdownDate - now
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    
    // Add leading zeros
    daysElement.textContent = days.toString().padStart(2, '0')
    hoursElement.textContent = hours.toString().padStart(2, '0')
    minutesElement.textContent = minutes.toString().padStart(2, '0')
    secondsElement.textContent = seconds.toString().padStart(2, '0')
    
    // If the countdown is over
    if (distance < 0) {
      clearInterval(countdownInterval)
      daysElement.textContent = "00"
      hoursElement.textContent = "00"
      minutesElement.textContent = "00"
      secondsElement.textContent = "00"
      
      // Optional: Add a message when countdown is complete
      const countdownContainer = document.querySelector('.countdown-container')
      const completedMessage = document.createElement('div')
      completedMessage.className = 'countdown-completed'
      completedMessage.textContent = 'Congratulations on your MIPT Bachelor\'s Degree!'
      completedMessage.style.color = '#5cb800'
      completedMessage.style.fontWeight = 'bold'
      completedMessage.style.fontSize = '18px'
      completedMessage.style.marginTop = '20px'
      countdownContainer.appendChild(completedMessage)
    }
  }
  
  // Update the countdown every second
  updateCountdown() // Run once immediately
  const countdownInterval = setInterval(updateCountdown, 1000)

  // Gallery popup functionality
  const galleryItems = document.querySelectorAll('.gallery-item')
  const galleryPopup = document.getElementById('gallery-popup')
  const popupImage = document.getElementById('popup-image')
  const closePopup = document.querySelector('.close-popup')
  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')
  const popupCaption = document.getElementById('popup-caption')
  
  let currentIndex = 0
  const totalImages = galleryItems.length

  // Open popup when clicking on a gallery item
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      currentIndex = parseInt(item.getAttribute('data-index'))
      updatePopupImage()
      galleryPopup.style.display = 'flex'
      document.body.style.overflow = 'hidden' // Prevent scrolling when popup is open
    })
  })

  // Close popup when clicking on close button
  closePopup.addEventListener('click', () => {
    galleryPopup.style.display = 'none'
    document.body.style.overflow = 'auto' // Re-enable scrolling
  })

  // Close popup when clicking outside the image
  galleryPopup.addEventListener('click', (e) => {
    if (e.target === galleryPopup) {
      galleryPopup.style.display = 'none'
      document.body.style.overflow = 'auto'
    }
  })

  // Navigate to previous image
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    currentIndex = (currentIndex - 1 + totalImages) % totalImages
    updatePopupImage()
  })

  // Navigate to next image
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    currentIndex = (currentIndex + 1) % totalImages
    updatePopupImage()
  })

  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (galleryPopup.style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages
        updatePopupImage()
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % totalImages
        updatePopupImage()
      } else if (e.key === 'Escape') {
        galleryPopup.style.display = 'none'
        document.body.style.overflow = 'auto'
      }
    }
  })

  // Update popup image and navigation buttons
  function updatePopupImage() {
    const currentItem = galleryItems[currentIndex]
    const imgSrc = currentItem.querySelector('img').src
    const title = currentItem.querySelector('.gallery-title').textContent
    
    popupImage.src = imgSrc
    popupCaption.textContent = title
    
    // Show/hide navigation buttons based on current position
    prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex'
    nextBtn.style.display = currentIndex === totalImages - 1 ? 'none' : 'flex'
  }
  
  // Timed popup functionality
  const timedPopup = document.getElementById('timed-popup')
  const closeTimedPopup = document.getElementById('close-timed-popup')
  const popupCtaButton = document.querySelector('.popup-cta-button')
  
  // Check if popup has been shown in this session
  const popupShown = sessionStorage.getItem('popupShown')
  
  // Show popup after 30 seconds if it hasn't been shown yet
  if (!popupShown) {
    setTimeout(() => {
      timedPopup.classList.add('show')
      document.body.style.overflow = 'hidden' // Prevent scrolling when popup is open
      
      // Mark popup as shown in this session
      sessionStorage.setItem('popupShown', 'true')
    }, 30000) // 30 seconds
  }
  
  // Close popup when clicking on close button
  closeTimedPopup.addEventListener('click', () => {
    timedPopup.classList.remove('show')
    document.body.style.overflow = 'auto' // Re-enable scrolling
  })
  
  // Close popup when clicking outside the content
  timedPopup.addEventListener('click', (e) => {
    if (e.target === timedPopup) {
      timedPopup.classList.remove('show')
      document.body.style.overflow = 'auto'
    }
  })
  
  // Contact Form Popup Functionality
  const contactPopup = document.getElementById('contact-popup')
  const contactBtn = document.getElementById('contact-btn')
  const heroContactBtn = document.getElementById('hero-contact-btn')
  const popupContactBtn = document.getElementById('popup-contact-btn')
  const closeContactPopup = document.getElementById('close-contact-popup')
  const contactForm = document.getElementById('contact-form')
  const emailInput = document.getElementById('email')
  const mobileInput = document.getElementById('mobile')
  const messageInput = document.getElementById('message')
  const emailError = document.getElementById('email-error')
  const mobileError = document.getElementById('mobile-error')
  const messageError = document.getElementById('message-error')
  const submitButton = document.getElementById('submit-button')
  
  // Open contact popup when clicking on contact buttons
  const contactButtons = [contactBtn, heroContactBtn, popupContactBtn]
  contactButtons.forEach(button => {
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        openContactPopup()
      })
    }
  })
  
  function openContactPopup() {
    // Close timed popup if it's open
    timedPopup.classList.remove('show')
    
    // Open contact popup
    contactPopup.classList.add('show')
    document.body.style.overflow = 'hidden'
    
    // Reset form
    contactForm.reset()
    resetFormErrors()
    submitButton.textContent = 'Submit ›'
    submitButton.classList.remove('sending', 'success')
    submitButton.disabled = false
  }
  
  // Close popup when clicking on close button
  closeContactPopup.addEventListener('click', () => {
    contactPopup.classList.remove('show')
    document.body.style.overflow = 'auto'
  })
  
  // Close popup when clicking outside the content
  contactPopup.addEventListener('click', (e) => {
    if (e.target === contactPopup) {
      contactPopup.classList.remove('show')
      document.body.style.overflow = 'auto'
    }
  })
  
  // Close popup when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (contactPopup.classList.contains('show') && e.key === 'Escape') {
      contactPopup.classList.remove('show')
      document.body.style.overflow = 'auto'
    }
  })
  
  // Form validation
  function resetFormErrors() {
    emailError.textContent = ''
    mobileError.textContent = ''
    messageError.textContent = ''
    emailInput.classList.remove('error')
    mobileInput.classList.remove('error')
    messageInput.classList.remove('error')
  }
  
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  function validatePhone(phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    return phoneRegex.test(phone)
  }
  
  function validateMessage(message) {
    // Check if message contains only Russian or English characters
    const russianRegex = /^[А-Яа-яЁё\s.,!?()-]+$/
    const englishRegex = /^[A-Za-z\s.,!?()-]+$/
    
    return russianRegex.test(message) || englishRegex.test(message)
  }
  
  // Form submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    resetFormErrors()
    
    let isValid = true
    
    // Validate email
    if (!validateEmail(emailInput.value)) {
      emailError.textContent = 'Please enter a valid email address'
      emailInput.classList.add('error')
      isValid = false
    }
    
    // Validate phone
    if (!validatePhone(mobileInput.value)) {
      mobileError.textContent = 'Please enter a valid phone number'
      mobileInput.classList.add('error')
      isValid = false
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
      messageError.textContent = 'Please enter a message'
      messageInput.classList.add('error')
      isValid = false
    } else if (!validateMessage(messageInput.value)) {
      messageError.textContent = 'Please use only Russian or English characters'
      messageInput.classList.add('error')
      isValid = false
    }
    
    if (isValid) {
      // Change button state to "sending"
      submitButton.textContent = 'Sending...'
      submitButton.classList.add('sending')
      submitButton.disabled = true
      
      try {
        // Simulate form submission with a delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Simulate POST request
        // In a real application, you would use fetch() to send the data to your server
        /*
        const response = await fetch('your-server-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailInput.value,
            mobile: mobileInput.value,
            message: messageInput.value
          })
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        */
        
        // Change button state to "success"
        submitButton.textContent = 'Successfully sent!'
        submitButton.classList.remove('sending')
        submitButton.classList.add('success')
        
        // Close the popup after a delay
        setTimeout(() => {
          contactPopup.classList.remove('show')
          document.body.style.overflow = 'auto'
        }, 2000)
        
      } catch (error) {
        console.error('Error:', error)
        submitButton.textContent = 'Error. Try again'
        submitButton.classList.remove('sending')
        submitButton.disabled = false
      }
    }
  })

  // SVG Animation functionality
  const svgContainer = document.getElementById('svg-container')
  const interactiveSvg = document.getElementById('interactive-svg')
  const circle1 = document.getElementById('circle1')
  const circle2 = document.getElementById('circle2')
  const circle3 = document.getElementById('circle3')
  const wavePath = document.getElementById('wave')
  
  // Initial positions
  const initialPositions = {
    circle1: { cx: 200, cy: 200, r: 50 },
    circle2: { cx: 400, cy: 200, r: 70 },
    circle3: { cx: 600, cy: 200, r: 40 }
  }
  
  // Mouse movement effect
  svgContainer.addEventListener('mousemove', (e) => {
    // Get mouse position relative to the container
    const rect = svgContainer.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    // Calculate normalized position (0 to 1)
    const normalizedX = mouseX / rect.width
    const normalizedY = mouseY / rect.height
    
    // Move circles based on mouse position
    circle1.setAttribute('cx', initialPositions.circle1.cx + (normalizedX - 0.5) * 100)
    circle1.setAttribute('cy', initialPositions.circle1.cy + (normalizedY - 0.5) * 100)
    
    circle2.setAttribute('cx', initialPositions.circle2.cx - (normalizedX - 0.5) * 50)
    circle2.setAttribute('cy', initialPositions.circle2.cy - (normalizedY - 0.5) * 50)
    
    circle3.setAttribute('cx', initialPositions.circle3.cx + (normalizedX - 0.5) * 80)
    circle3.setAttribute('cy', initialPositions.circle3.cy + (normalizedY - 0.5) * 80)
    
    // Update wave path
    const wavePathD = `M0,200 Q${200 + (normalizedX - 0.5) * 100},${100 + (normalizedY - 0.5) * 100} ${400},200 Q${600 - (normalizedX - 0.5) * 100},${300 - (normalizedY - 0.5) * 100} 800,200`
    wavePath.setAttribute('d', wavePathD)
    
    // Update gradient colors based on mouse position
    const gradient = document.querySelector('#gradient')
    const stopColor1 = `hsl(${normalizedX * 120}, 100%, 50%)`
    const stopColor2 = `hsl(${normalizedY * 240 + 120}, 100%, 50%)`
    
    gradient.querySelector('stop:first-child').setAttribute('stop-color', stopColor1)
    gradient.querySelector('stop:last-child').setAttribute('stop-color', stopColor2)
  })
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    // Get the SVG section position
    const svgSection = document.getElementById('svg-animation')
    const rect = svgSection.getBoundingClientRect()
    
    // Check if the SVG section is visible
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Calculate how far the section is scrolled into view (0 to 1)
      const scrollProgress = 1 - (rect.top / window.innerHeight)
      
      // Apply scroll-based animations
      if (scrollProgress >= 0 && scrollProgress <= 1) {
        // Scale circles based on scroll position
        circle1.setAttribute('r', initialPositions.circle1.r * (1 + scrollProgress * 0.3))
        circle2.setAttribute('r', initialPositions.circle2.r * (1 + scrollProgress * 0.2))
        circle3.setAttribute('r', initialPositions.circle3.r * (1 + scrollProgress * 0.4))
        
        // Rotate the entire SVG based on scroll
        interactiveSvg.style.transform = `rotate(${scrollProgress * 5}deg)`
        
        // Change stroke width of the wave
        wavePath.setAttribute('stroke-width', 5 + scrollProgress * 5)
      }
    }
  })
  
  // Reset positions when mouse leaves
  svgContainer.addEventListener('mouseleave', () => {
    // Reset circles to initial positions with animation
    circle1.style.transition = 'cx 0.5s, cy 0.5s, r 0.5s'
    circle2.style.transition = 'cx 0.5s, cy 0.5s, r 0.5s'
    circle3.style.transition = 'cx 0.5s, cy 0.5s, r 0.5s'
    wavePath.style.transition = 'd 0.5s, stroke-width 0.5s'
    
    circle1.setAttribute('cx', initialPositions.circle1.cx)
    circle1.setAttribute('cy', initialPositions.circle1.cy)
    
    circle2.setAttribute('cx', initialPositions.circle2.cx)
    circle2.setAttribute('cy', initialPositions.circle2.cy)
    
    circle3.setAttribute('cx', initialPositions.circle3.cx)
    circle3.setAttribute('cy', initialPositions.circle3.cy)
    
    // Reset wave path
    wavePath.setAttribute('d', 'M0,200 Q200,100 400,200 Q600,300 800,200')
    
    // Remove transitions after reset
    setTimeout(() => {
      circle1.style.transition = ''
      circle2.style.transition = ''
      circle3.style.transition = ''
      wavePath.style.transition = ''
    }, 500)
  })
  
  // Trigger initial scroll effect
  window.dispatchEvent(new Event('scroll'))
})