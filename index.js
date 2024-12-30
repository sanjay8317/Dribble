let likedCards = JSON.parse(localStorage.getItem('likedCards')) || [];
let savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
let currentFilter = 'all';

fetch('./cards.json')
  .then(response => response.json())
  .then(data => {
    const mycards = document.querySelector('.maincardscontainer');
    const searchInput = document.getElementById('searchcard');
    const respInput = document.getElementById('mysearchcard');

    const maxCards = 28;

    const allCards = Array.from({ length: maxCards }, (_, index) => {
      const card = data.mainCardsContainer.cards[index % data.mainCardsContainer.cards.length];
      const cardId = index + 1;
      return { ...card, id: cardId };
    });

    const renderCards = (filteredCards) => {
      const reshtml = filteredCards.map(item => {
        const isLiked = likedCards.includes(item.id);
        const isSaved = savedCards.includes(item.id);
        return `
          <div class="card1">
            <div class="cardimg">
            <a href="view.html?id=${item.id}">
              <img src="${item.cardImage}" alt="" onclick="saveCardData(${item.id})"></a>
              <div class="hovercard">
                <div class="cardhovername">
                  <p><a href="view.html?id=${item.id}" onclick="saveCardData(${item.id})">${item.cardTitle}</a></p>
                </div>
                <div class="hovericons">
                  <div class="saveicon" onclick="toggleSave(${item.id})">
                    <img src="save-instagram.png" alt="Save Icon" 
                         class="saveiconimg ${isSaved ? 'saved' : ''}">
                  </div>
                  <div class="favicon" onclick="toggleLike(${item.id})">
                    <img src="heart.png" alt="Favorite Icon" 
                         class="faviconimg ${isLiked ? 'liked' : ''}">
                  </div>
                </div>
              </div>
            </div>
            <div class="cardbottom">
              <div class="cardbottomleft">
                <div class="cardlogo">
                  <img src="${item.cardLogo}" alt="">
                </div>
                <div class="cardtitle">
                  <p>${item.cardTitle}</p>
                </div>
                <div class="teambtn">
                  <p>${item.teamLabel}</p>
                </div>
              </div>
              <div class="cardbottomright">
                <div class="like">
                  <div class="likeicon">
                    <img src="${data.mainCardsContainer.iconAssets.like}" alt="">
                  </div>
                  <div class="likecount">
                    <p>${item.stats.likes + (isLiked ? 1 : 0)}</p>
                  </div>
                </div>
                <div class="watch">
                  <div class="watchicon">
                    <img src="${data.mainCardsContainer.iconAssets.view}" alt="">
                  </div>
                  <div class="watchcount">
                    <p>${item.stats.views}</p>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        `;
      }).join('');
      mycards.innerHTML = reshtml;
    };

    //  Save card data to localStorage for view.html to use
    window.saveCardData = function (cardId) {
      const card = allCards.find(c => c.id === cardId);
      if (card) {
        localStorage.setItem('currentCard', JSON.stringify(card));
      }
    };

    const filterCards = (searchTerm = '') => {
      let filteredCards = [...allCards];
      if (searchTerm) {
        filteredCards = filteredCards.filter(card =>
          card.cardTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      switch (currentFilter) {
        case 'liked':
          filteredCards = filteredCards.filter(card => likedCards.includes(card.id));
          break;
        case 'saved':
          filteredCards = filteredCards.filter(card => savedCards.includes(card.id));
          break;
      }
      renderCards(filteredCards);
    };

    window.toggleLike = function (cardId) {
      const index = likedCards.indexOf(cardId);
      if (index === -1) {
        likedCards.push(cardId);
      } else {
        likedCards.splice(index, 1);
      }
      localStorage.setItem('likedCards', JSON.stringify(likedCards));
      filterCards(searchInput.value);
      filterCards(respInput.value);
    };

    window.toggleSave = function (cardId) {
      const index = savedCards.indexOf(cardId);
      if (index === -1) {
        savedCards.push(cardId);
      } else {
        savedCards.splice(index, 1);
      }
      localStorage.setItem('savedCards', JSON.stringify(savedCards));
      filterCards(searchInput.value);
      filterCards(respInput.value);
    };

    document.querySelectorAll('.dropdown-content a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        currentFilter = e.target.getAttribute('data-filter');
        document.querySelector('.popbtn').innerHTML = `${e.target.textContent} <img src="down-arrow.png" alt="" class="popimg">`;
        document.getElementById('dropdown').style.display = 'none';
        filterCards(searchInput.value);
        filterCards(respInput.value);
      });
    });

    searchInput.addEventListener('input', (e) => {
      filterCards(e.target.value);
    });
    respInput.addEventListener('input', (e) => {
      filterCards(e.target.value);
    });

    filterCards();
  })
  .catch(error => console.error('Error fetching JSON:', error));

// Handle dropdown toggle
function toggleDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById('dropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  const dropdown = document.getElementById('dropdown');
  if (!event.target.closest('.dropdown')) {
    dropdown.style.display = 'none';
  }
});

// Function to reset background color for links
function resetBackgroundColors() {
  const links = document.querySelectorAll('.changeColorLink');
  links.forEach(link => {
    link.style.backgroundColor = '';
  });
}

document.querySelectorAll('.changeColorLink').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    resetBackgroundColors();
    this.style.backgroundColor = '#f8f7f4';
    this.style.borderRadius = '10px';
  });
});








//hamburger menu



// Mobile Menu Functionality
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('active');

  // Prevent body scrolling when menu is open
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

function toggleSubmenu(submenuId) {
  const submenu = document.getElementById(submenuId);
  const header = submenu.previousElementSibling;

  // Close all other submenus
  document.querySelectorAll('.submenu').forEach(menu => {
    if (menu.id !== submenuId && menu.classList.contains('active')) {
      menu.classList.remove('active');
      menu.previousElementSibling.classList.remove('active');
    }
  });

  // Toggle current submenu
  submenu.classList.toggle('active');
  header.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', (event) => {
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerMenu = document.querySelector('.hamburger-menu');

  if (!mobileMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});
