//// NAVIGATION ////
var urlParams = new URLSearchParams(window.location.search);
var currentPage = urlParams.get('page');
var currentRule = Number(urlParams.get('rule'));
var currentStart = urlParams.get('start');
if (urlParams.get('time')==null) {
    var currentTime = null;
} else {
    var currentTime = Number(urlParams.get('time'));
}

//// GALLERY ////
var galleryContent = "";
for (let i = 0; i <= 255; i++) { 
    galleryContent += '<div class="gallery-element"><a class="rule-number" id="rule-number-';
    galleryContent += i.toString();
    galleryContent += '">';
    galleryContent += i.toString();
    galleryContent += '</a><a id="gallery-element-';
    galleryContent += i.toString();
    galleryContent += '"><img id="img';
    galleryContent += i.toString();
    galleryContent += '" alt="';
    galleryContent += i.toString();
    galleryContent += '"></a></div>';
}
document.getElementById("gallery-content").innerHTML += galleryContent;


function showPage(whatToShow) {
    document.getElementById(currentPage).style.display = "none";
    currentPage = whatToShow;
    document.getElementById(currentPage).style.display = "block";
    urlParams.set('page', currentPage);
    history.pushState(null, null, "?"+urlParams.toString());
    if (currentPage=='home' || currentPage=='rule') {
        document.getElementById('footer').style.display = "none";
    } else {
        document.getElementById('footer').style.display = "block";
    }
    
}
if (currentPage == null) {
    currentPage = 'home';
    showPage(currentPage);
} else {
    showPage(currentPage);
}

function updateGallery() {
    document.getElementById("hq-plot").src = 'images/steps-hq/rule-'+currentRule.toString()+'-time-'+currentTime.toString()+'-'+currentStart+'.svg';
    for (let i = 0; i <= 255; i++) { 
        document.getElementById('img'+i.toString()).src='images/steps-lq/rule-'+i.toString()+'-time-'+currentTime+'-'+currentStart+'.jpg';
        document.getElementById('gallery-element-'+i.toString()).href='?page=close-up&rule='+i.toString()+'&time='+currentTime.toString()+'&start='+currentStart;
        document.getElementById('rule-number-'+i.toString()).href='?page=rule&rule='+i.toString()+'&time='+currentTime.toString()+'&start='+currentStart;
    }
}

function setTime(time) {
    currentTime = time;
    updateGallery()
    document.getElementById('time-selection').value=Number(currentTime);
    document.getElementById('big-rule-number').innerHTML=currentRule.toString();
    document.getElementById('big-rule-number').href='?page=rule&rule='+currentRule.toString()+'&time='+currentTime.toString()+'&start='+currentStart;
    urlParams.set('time', currentTime);
    history.pushState(null, null, "?"+urlParams.toString());
}

function setRule(rule) {
    currentRule = rule;
    urlParams.set('rule', currentRule);
    history.pushState(null, null, "?"+urlParams.toString());

}

function setStart(start) {
    currentStart = start;
    updateGallery()
    document.getElementById('start-selection').value=currentStart;
    urlParams.set('start', currentStart);
    history.pushState(null, null, "?"+urlParams.toString());
    showPlot(start)
}

if (currentTime == null) {
    currentTime=32;
} 
if (currentStart == null) {
    currentStart='OneAlive';
} 

setTime(currentTime);
setStart(currentStart);

// Arrows //
document.getElementById('left-arrow').addEventListener("click",function(){
    if (currentRule<=0) {
        setRule(255);
    } else {
        setRule(currentRule-1);
    };
    updateRulePage()
});
document.getElementById('right-arrow').addEventListener("click",function(){
    if (currentRule>=255) {
        setRule(0);
    } else {
        setRule(currentRule+1);
    };
    updateRulePage()
});

//// RULE PAGE ////
function updateRulePage() {
    document.getElementById("rule-title").innerHTML = 'Rule '+currentRule.toString();
    document.getElementById("rule-plot").src = 'images/rules/rule-'+currentRule.toString()+'.svg';
    document.getElementById("evolution-plot-OneAlive").src = 'images/animations/rule-'+currentRule.toString()+'-OneAlive.gif';
    document.getElementById("evolution-plot-TA").src = 'images/animations/rule-'+currentRule.toString()+'-TA.gif';
    document.getElementById("evolution-plot-Random").src = 'images/animations/rule-'+currentRule.toString()+'-Random.gif';
}
updateRulePage()

function updateCloseUpPage() {
    document.getElementById("hq-plot").src = 'images/steps-hq/rule-'+currentRule.toString()+'-time-'+currentTime.toString()+'-'+currentStart+'.svg';
}
updateCloseUpPage()

function showPlot(whatToShow) {
    document.getElementById('evolution-plot-OneAlive').style.display = "none";
    document.getElementById('evolution-plot-TA').style.display = "none";
    document.getElementById('evolution-plot-Random').style.display = "none";
    document.getElementById('evolution-plot-'+whatToShow).style.display = "inline";
    document.getElementById('button-OneAlive').style.fontWeight = "normal";
    document.getElementById('button-TA').style.fontWeight = "normal";
    document.getElementById('button-Random').style.fontWeight = "normal";
    document.getElementById('button-'+whatToShow).style.fontWeight = "bold";
}

//// Hide part of the header on scroll down for smartphone view
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
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