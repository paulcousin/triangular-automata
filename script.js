
//// Image Loader
function loadLargeImage(imageId, loadingImagePath, largeImagePath) {
    // Find the image element by its ID
    var imgElement = document.getElementById(imageId);

    // Check if the image element exists
    if (!imgElement) {
        console.error('Image element not found');
        return;
    }

    // Create a new image object for the loading image
    var lightImg = new Image();
    lightImg.src = loadingImagePath;

    // Replace the source of the original image with the loading image
    imgElement.src = loadingImagePath;

    // Create a new image object for the large image
    var largeImg = new Image();
    largeImg.src = largeImagePath;

    // Add a load event listener to the large image
    largeImg.addEventListener('load', function() {
        // Replace the source of the original image with the large image once it has loaded
        imgElement.src = largeImagePath;
    });

    // Optionally, handle errors if the large image fails to load
    largeImg.addEventListener('error', function() {
        console.error('Failed to load large image at ' + largeImagePath);
    });
}

//// Hide part of the header on scroll down for smartphone view
  var didScroll;
  var lastScrollTop = 0;
  var delta = 20;
  var navbarHeight = $('header').outerHeight();

  $(window).scroll(function(event){
      didScroll = true;
  });

  setInterval(function() {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
  }, 250);

  function hasScrolled() {
      var st = $(this).scrollTop();
      
      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta)
          return;
      
      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight){
          // Scroll Down
          $('header').removeClass('nav-down').addClass('nav-up');
      } else {
          // Scroll Up
          if(st + $(window).height() < $(document).height()) {
              $('header').removeClass('nav-up').addClass('nav-down');
          }
      }
      
      lastScrollTop = st;
  }

//// Formats a string to look like a title
  function titleCase(str) {
    var splitStr = str.toLowerCase().replaceAll('-', ' ').split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }
 