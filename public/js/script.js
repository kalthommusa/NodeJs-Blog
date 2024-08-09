//alert('Hello!');

document.addEventListener('DOMContentLoaded', function(){

    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
  
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('click', function() {
        searchBar.style.visibility = 'visible';
        searchBar.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
        searchInput.focus();
      });
    }
  
    searchClose.addEventListener('click', function() {
      searchBar.style.visibility = 'hidden';
      searchBar.classList.remove('open');
      this.setAttribute('aria-expanded', 'false');
    });
  
  
  });

// Function to show a confirmation dialog when attempting to delete a post
function confirmDelete(postTitle) {
  const confirmation = confirm(`Are you sure you want to delete the post titled "${postTitle}"? The article will not be available in the database anymore.`);
  if (confirmation) {
    //alert(`The article titled "${postTitle}" has been successfully deleted.`);
  } else {
    alert(`The deletion has been canceled.`);
    window.location.href = '/dashboard'; // Redirect back to dashboard
  }
  return confirmation; // Proceed with form submission if confirmed
}
