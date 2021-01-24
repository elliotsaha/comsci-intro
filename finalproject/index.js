// canvas
var featuredGame = document.getElementById("featuredGame");
var featuredGameTitle = document.getElementById("featuredGameTitle");

// Tab Elements
var homepage = document.getElementById("homepage");
var newsletter = document.getElementById("newsletter");

// Tab Links
var newsletterLink = document.getElementById("newsletterLink");
var homepageLink = document.getElementById("homepageLink");

// NewsLetter Email Input
var emailNewsletter = document.getElementById("emailNewsletter");

// Error Handler Email Verification
var emailError = document.getElementById("emailError");

// Filling in Email on Newsletter Tab
var newsletterEmailPopulate = document.getElementById(
  "newsletterEmailPopulate"
);

// Go Back Button on Newsletter page
var goBackHome = document.getElementById("goBackHome");

// Change Featured Game Title on Mouse Hover
featuredGame.addEventListener("mouseover", function () {
  featuredGameTitle.innerHTML = "The Best Platformer";
});

featuredGame.addEventListener("mouseleave", function () {
  featuredGameTitle.innerHTML = "Our Featured Game";
});

// Loading State
var loadingStateHomepage = document.getElementById("loadingStateHomepage");

// Tabs
let activeTab = "homepage";
var tabcontent = document.getElementsByClassName("tabContent");

// Footer
var date = new Date();
var footerYear = document.getElementById("footerYear");

footerYear.innerHTML = date.getFullYear();

// Navbar
var navbar = document.getElementById("navbar");

// Change navbar classname on scroll
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    // On scroll remove normal class and add scroll class
    navbar.classList.remove("navbarRoot");
    navbar.classList.add("navbarRootScroll");
  } else {
    // When user is at the top of the screen, remove scroll class name and add normal classname
    navbar.classList.remove("navbarRootScroll");
    navbar.classList.add("navbarRoot");
  }
});

function changeTab() {
  // Scroll to top of the screen
  document.documentElement.scrollTop = 0;
  // loop through tabcontent array
  for (var i = 0; i < tabcontent.length; i++) {
    // if tabcontent iterable id not equal to active tab: set to display none
    if (tabcontent[i].id !== activeTab) {
      tabcontent[i].style.display = "none";
    } else {
      // if active tab === tab content iterable: set to display block
      tabcontent[i].style.display = "block";
    }
  }
}

// newsletter email regex verification
const verifyEmail = (email) => {
  const regex = /\S+@\S+\.\S+/; // any character + @ + any character + . + any character (ex. heril@gmail.com)
  return regex.test(email);
};


// The tabs I have are the homepage and the newsletter page, while this isn't a traditional method for tabbing content, it demonstrates that I know how to tab use Javascript to show different tabs

// Set to only one tab during initialization
changeTab();

homepageLink.addEventListener("click", function () {
  activeTab = "homepage";
  changeTab();
});

newsletterLink.addEventListener("click", function () {
  loadingStateHomepage.style.display = "flex";
  emailError.style.display = "none";
  setTimeout(() => {
    // remove loading
    loadingStateHomepage.style.display = "none";
    // Error handling
    const inputVerification = verifyEmail(emailNewsletter.value);
    if (inputVerification) {
      activeTab = "newsletter";
      changeTab();
      emailError.style.display = "none";
      newsletterEmailPopulate.innerHTML = emailNewsletter.value;
      emailNewsletter.value = "";
    } else {
      emailError.style.display = "block";
    }
  }, 1000);
});

goBackHome.addEventListener("click", function () {
  activeTab = "homepage";
  changeTab();
});
