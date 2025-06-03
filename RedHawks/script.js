// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll Animation
const animateSections = document.querySelectorAll('.animate-scroll');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
animateSections.forEach(section => observer.observe(section));

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  document.getElementById('form-response').textContent = `Thank you, ${name}! Your message has been sent.`;
  this.reset();
});

// Card Flip Animation
function toggleFlip(playerId, event) {
  const card = document.getElementById(playerId).parentElement;
  // Only flip if clicking the front or the close button
  if (!card.classList.contains('flipped') || event.target.classList.contains('player-close-btn')) {
    card.classList.toggle('flipped');
  }
}

// Filter Players by Role
function filterPlayers(role) {
  const players = document.querySelectorAll('.player-card');
  players.forEach(player => {
    if (role === 'all' || player.getAttribute('data-role') === role) {
      player.classList.remove('hidden');
    } else {
      player.classList.add('hidden');
    }
  });
}

// Close Alert
function closeAlert() {
  const alertElement = document.getElementById('match-alert');
  alertElement.classList.remove('active');
}

// Countdown Timer for Next Match and Enhanced Alert
function startCountdown() {
  const matchDate = new Date('2025-06-10T20:00:00+06:00').getTime();
  const countdownElement = document.getElementById('countdown');
  const alertElement = document.getElementById('match-alert');
  const alertTitle = document.getElementById('alert-title');
  const alertMessage = document.getElementById('alert-message');
  const alertDetails = document.getElementById('alert-details');

  const recentMatches = [
    {
      tournament: "Free Fire Bangladesh Championship 2025",
      opponent: "EliteSquad",
      result: "Won 18-13",
      map: "Purgatory",
      date: "June 01, 2025",
      highlight: "RaptorX's clutch 1v3 sealed the victory!"
    },
    {
      tournament: "Free Fire World Series 2025",
      opponent: "WildFire",
      result: "Won 17-12",
      map: "Purgatory",
      date: "May 30, 2025",
      highlight: "ThunderHawk's strategy shone through!"
    }
  ];

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = matchDate - now;

    if (distance <= 0) {
      countdownElement.textContent = 'Match is Live!';
      alertTitle.textContent = 'Match Update: Live Now!';
      alertMessage.textContent = 'RedHawks vs. FireStorm is LIVE!';
      alertDetails.textContent = 'Tournament: Free Fire Bangladesh League | Date: June 10, 2025, 8:00 PM | Watch on YouTube & Twitch';
      alertElement.classList.add('active');
      setTimeout(closeAlert, 7000);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance <= 300000 && distance > 0) {
      const recentMatch = recentMatches[0];
      alertTitle.textContent = 'Match Alert: Coming Soon!';
      alertMessage.textContent = 'RedHawks vs. FireStorm starts in 5 minutes!';
      alertDetails.textContent = `Recent Match: ${recentMatch.tournament} | ${recentMatch.opponent} ${recentMatch.result} on ${recentMatch.map} (${recentMatch.date}) - ${recentMatch.highlight}`;
      alertElement.classList.add('active');
      setTimeout(closeAlert, 7000);
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
startCountdown();

// Particles.js for Dynamic Background
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 50,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#e53e3e"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#f6e05e",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 100,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

// Toggle Match History
function toggleMatchHistory(matchId) {
  const matchHistory = document.getElementById(matchId);
  if (matchHistory.classList.contains('active')) {
    matchHistory.classList.remove('active');
  } else {
    matchHistory.classList.add('active');
  }
}

// Player Spotlight
function closeSpotlight() {
  const spotlight = document.getElementById('player-spotlight');
  spotlight.classList.remove('active');
}
window.addEventListener('load', function() {
  const spotlight = document.getElementById('player-spotlight');
  spotlight.classList.add('active');
  setTimeout(closeSpotlight, 7000);
});