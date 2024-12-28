document.addEventListener('DOMContentLoaded', () => {
  // Get the card ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const cardId = parseInt(urlParams.get('id'));

  console.log('Loading card ID:', cardId);

  // Retrieve card data
  const storedCard = localStorage.getItem('currentCard');
  let card = storedCard ? JSON.parse(storedCard) : null;

  // Validate the stored card or find it in the array
  if (!card || card.id !== cardId) {
    card = cardsArray.find(c => c.id === cardId);
  }

  if (card) {
    document.title = card.title; // Update page title

    // Helper to safely update elements
    const updateElement = (id, value, property = 'innerText') => {
      const element = document.getElementById(id);
      if (element) element[property] = value;
    };

    // Update elements with card data
    updateElement('title', card.title);
    updateElement('card-name', card.title);
    updateElement('card-image1', card.cardImage, 'src');
    updateElement('card-image2', card.cardImage, 'src');
    updateElement('card-name-icon', card.cardLogo, 'src');
    updateElement('company-name', card.cardTitle);
    updateElement('email', 'design@shakuro.com');
    updateElement('bottom-company', card.cardTitle);
    updateElement('bottom-email', 'design@shakuro.com');
    updateElement('company-website', `${card.cardTitle.toLowerCase()}.com`);
  } else {
    // Display error message if card not found
    document.querySelector('.maincont').innerHTML = `
        Card not found! No card exists with ID: ${cardId}
      `;
  }
});
