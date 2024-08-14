//alert('Hello!');

document.addEventListener('DOMContentLoaded', function(){

    // Select all elements with the class 'searchBtn'
    const allButtons = document.querySelectorAll('.searchBtn');

    // Select the element with the class 'searchBar'
    const searchBar = document.querySelector('.searchBar');

    // Select the element with the id 'searchInput'
    const searchInput = document.getElementById('searchInput');
    
    // Select the element with the id 'searchClose'
    const searchClose = document.getElementById('searchClose');

    // Add an event listener to each search button
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('click', function() {

        // Make the search bar visible
        searchBar.style.visibility = 'visible';
        searchBar.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
        searchInput.focus();
      });
    }
  
    // Add an event listener to the close button
    searchClose.addEventListener('click', function() {

      // Hide the search bar
      searchBar.style.visibility = 'hidden';
      searchBar.classList.remove('open');
      this.setAttribute('aria-expanded', 'false');
    });

  });



// Function to show a confirmation dialog when attempting to delete a post
function confirmDelete(postTitle) {
  const confirmation = confirm(`Are you sure you want to delete the post titled "${postTitle}"? The article will not be available in the database anymore.`);
  if (confirmation) {
    alert(`The article titled "${postTitle}" has been successfully deleted.`);
  } else {
    alert(`The deletion has been canceled.`);
    window.location.href = '/dashboard'; // Redirect back to dashboard
  }
  return confirmation; // Proceed with form submission if confirmed
}
