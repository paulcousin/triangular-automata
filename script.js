//// Image Loader
function loadImagesWithLoadingEffect() {
    // Get all images with the class "load"
    var images = document.querySelectorAll(".load");

    images.forEach(function(imgElement) {
        const originalSrc = imgElement.src; // The current source is the large image
        const loadingImagePath = "style/wait.gif";

        // Temporarily set the source to the loading image
        imgElement.src = loadingImagePath;

        // Preload the original large image
        var largeImg = new Image();

        largeImg.onload = function() {
            // Replace with the original large image after it has loaded
            imgElement.src = originalSrc;
        };

        largeImg.onerror = function() {
            console.error("Failed to load large image at " + originalSrc);
        };

        // Start preloading the large image
        largeImg.src = originalSrc;
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


