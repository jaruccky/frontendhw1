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
})