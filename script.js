
//// Image Loader
function loadLargeImage(imageId, loadingImagePath, largeImagePath) {
    // Find the image element by its ID
    var imgElement = document.getElementById(imageId);

    // If the image element is not found, do nothing
    if (!imgElement) {
        return;
    }

    // Create a new image object for the loading image
    var lightImg = new Image();
    lightImg.src = loadingImagePath;

    // Create another new image object for the large image
    var largeImg = new Image();

    // Add a load event listener to the large image to get its dimensions
    largeImg.addEventListener('load', function() {
        // Get the dimensions of the large image
        var largeWidth = largeImg.naturalWidth;
        var largeHeight = largeImg.naturalHeight;
        
        // Calculate the aspect ratio
        var aspectRatio = largeWidth / largeHeight;

        // Create a canvas element
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        // Set the canvas dimensions to match the large image's aspect ratio
        if (aspectRatio >= 1) {
            // Landscape orientation
            canvas.width = 1152 * aspectRatio;
            canvas.height = 1152;
        } else {
            // Portrait orientation
            canvas.width = 1152;
            canvas.height = 1152 / aspectRatio;
        }

        // Draw the loading image on the canvas, centered
        lightImg.onload = function() {
            var loadWidth = lightImg.naturalWidth;
            var loadHeight = lightImg.naturalHeight;

            // Calculate dimensions to fit the loading image into the canvas while maintaining aspect ratio
            var scale = Math.min(canvas.width / loadWidth, canvas.height / loadHeight);
            var loadX = (canvas.width - loadWidth * scale) / 2;
            var loadY = (canvas.height - loadHeight * scale) / 2;

            ctx.drawImage(lightImg, loadX, loadY, loadWidth * scale, loadHeight * scale);

            // Set the canvas data URL as the source of the original image
            imgElement.src = canvas.toDataURL();
        };
    });

    // Set the large image source to start loading it
    largeImg.src = largeImagePath;

    // Add a load event listener to the large image to replace the placeholder once it has fully loaded
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
 