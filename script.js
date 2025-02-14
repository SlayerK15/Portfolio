// Lenis smooth scroll initialization
const lenis = new Lenis({
  autoRaf: true,
});

/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  var menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
      menuBtn.className += " responsive";
  } else {
      menuBtn.className = "nav-menu";
  }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function() {
  headerShadow();
  scrollActive();
};

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";
  } else {
      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";
  }
}

/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText", {
  strings: ["Developer", "DevOps Engineer", "Cloud Enthusiast"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000,
});

/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const sr = ScrollReveal({
  origin: "top",
  distance: "20px",
  duration: 2000,
  reset: true,
});

/* -- HOME -- */
sr.reveal(".featured-text-card", {});
sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".featured-text-info", { delay: 200 });
sr.reveal(".featured-text-btn", { delay: 200 });
sr.reveal(".social_icons", { delay: 200 });
sr.reveal(".featured-image", { delay: 300 });

/* -- PROJECT BOX -- */
sr.reveal(".project-box", { interval: 200 });

/* -- HEADINGS -- */
sr.reveal(".top-header", {});

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: "top",
  distance: "20px",
  duration: 2000,
  reset: true,
});

srLeft.reveal(".about-info", { delay: 100 });
srLeft.reveal(".contact-info", { delay: 100 });

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: "right",
  distance: "80px",
  duration: 2000,
  reset: true,
});

srRight.reveal(".skills-box", { delay: 100 });
srRight.reveal(".form-control", { delay: 100 });

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
      const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 50,
          sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
              .querySelector(".nav-menu a[href*=" + sectionId + "]")
              .classList.add("active-link");
      } else {
          document
              .querySelector(".nav-menu a[href*=" + sectionId + "]")
              .classList.remove("active-link");
      }
  });
}

/* ----- DOWNLOAD CV BUTTON FUNCTIONALITY ----- */
function handleCvClick() {
  window.location.href = "./cv.pdf";
}

document.getElementById("cvButton").addEventListener("click", handleCvClick);

/* ----- CONTACT FORM FUNCTIONALITY ----- */
document.addEventListener("DOMContentLoaded", function() {
  // Initialize EmailJS
  emailjs.init("Neri5Fyxgc1Sb0TWX");

  const form = document.getElementById('contactForm');
  const sendButton = document.getElementById('sendButton');

  form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Disable the submit button and show loading state
      sendButton.disabled = true;
      sendButton.innerHTML = "Sending...";

      emailjs.sendForm('service_a0qvxyj', 'template_v0e8d0g', form)
          .then((response) => {
              console.log('SUCCESS!', response.status, response.text);
              alert('Message sent successfully!');
              form.reset(); // Clear the form
          })
          .catch((error) => {
              console.log('FAILED...', error);
              alert('Failed to send message. Please try again later.');
          })
          .finally(() => {
              // Re-enable button and restore original text
              sendButton.disabled = false;
              sendButton.innerHTML = 'Send <i class="uil uil-message"></i>';
          });
  });  
});

/* ----- CHATBOT FUNCTIONALITY ----- */

// Chat Widget Initialization and Visibility
document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const projectsSection = document.getElementById('projects');

    // Initially hide the chat button
    if (chatToggleBtn) {
        chatToggleBtn.style.display = 'none';
    }

    // Function to check if element is in viewport
    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Show chat button when scrolling to projects section
    function handleScroll() {
        if (projectsSection && chatToggleBtn && isElementInViewport(projectsSection)) {
            chatToggleBtn.style.display = 'flex';
            chatToggleBtn.classList.add('fade-in');
        }
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    // Prevent page scroll when scrolling chat
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.addEventListener('wheel', (event) => {
            if (chatMessages.contains(event.target)) {
                event.stopPropagation();
            }
        }, { passive: false });
    }
});

// Toggle Chat Widget
function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget) {
        chatWidget.classList.toggle('open');
    }
}

// Show/Hide typing indicator
function showTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.style.display = 'block';
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }
}

// Format Chat Messages - One sentence per line
function formatMessage(message) {
    const sentences = message.split(/(?<=[.!?])\s+/);
    return sentences.filter(s => s.trim()).join('\n');
}

// Add Message to Chat
function addMessage(message, isUser = false) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const formattedMessage = formatMessage(message);
    messageDiv.textContent = formattedMessage;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send Message
async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) return;

    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    chatInput.value = '';
    showTypingIndicator();

    try {
        const response = await fetch('http://35.154.90.195:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                message,
                maxLength: 150
            })
        });

        hideTypingIndicator();

        const data = await response.json();
        if (data.status === 'success') {
            addMessage(data.response);
        } else {
            addMessage('Error: Could not get response');
        }
    } catch (error) {
        hideTypingIndicator();
        addMessage('Error: Could not connect to server');
    }
}

// Handle Enter Key Press
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    const chatToggleBtn = document.getElementById('chatToggleBtn');

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    if (chatToggleBtn) {
        chatToggleBtn.addEventListener('click', toggleChat);
    }
});