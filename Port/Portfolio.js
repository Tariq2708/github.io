var tablinks = document.getElementsByClassName("tab-links");
var tabcon = document.getElementsByClassName("tab-con");
function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-tab");
  }
  for (tabcontent of tabcon) {
    tabcontent.classList.remove("skills");
  }
  event.currentTarget.classList.add("active-tab");
  document.getElementById(tabname).classList.add("skills")
}

function navigateToContact() {
  var contactDiv = document.getElementById('Contact');
  contactDiv.scrollIntoView({ behavior: 'smooth' });
}
function navigateTomywork() {
  var myworkDiv = document.getElementById('mywork');
  myworkDiv.scrollIntoView({ behavior: 'smooth' });
}
function navigateToabout() {
  var aboutDiv = document.getElementById('about');
  aboutDiv.scrollIntoView({ behavior: 'smooth' });
}

// ----------------------------------------------
// var sidemenu = document.getElementById("sidemenu");

// function openmenu(){
//     sidemenu.style.right="0";
// }
// function closemenu(){
//     sidemenu.style.right="-200px";
// }