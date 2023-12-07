//* variables
let LS = window.localStorage;
let landingPage = document.querySelector(".landing-page");
let imgsList = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];
let randomImg;
let randomVal;
let randomCheckBox = document.querySelector(".option.randoms #random-check");
let selectImg = document.querySelector('.option.randoms .select-img');
let imgElement = document.querySelectorAll('.option.randoms .select-img li');


//* make the setting box icon spin on hover.
let settingIcon = document.querySelector(".setting-box .setting-icon");
settingIcon.onclick = function () {
  this.firstElementChild.classList.toggle("fa-spin");
  this.parentElement.classList.toggle("active");
};

//* change the main color
let colors = document.querySelectorAll(".setting-options .colors li");
//* get the default color from local storage
if (LS.getItem("color") === null) {
  LS.setItem("color", "#2196f3");
}
colors.forEach((c) => {
  if (c.dataset.color === LS.getItem("color")) {
    c.classList.add("active");
  }
});
//* change the default color from the root in css
document.documentElement.style.setProperty("--main-color", LS.getItem("color"));
//* add event for the color options
colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    LS.setItem("color", e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      LS.getItem("color")
    );
    //* remove active class from all
    colors.forEach((c) => c.classList.remove("active"));
    //* add active class for the current color
    color.classList.add("active");
  });
});
//* set the random image option from the setting.
//* check if the local storage has random value
if (LS.getItem("random") === null) {
  LS.setItem("random", "yes");
  randomCheckBox.setAttribute("checked", "");
  landingPage.style.backgroundImage = `url('./imgs/landing-img1.jpg')`;
  setRandomVal();
} else {
  //* set default values when the random value is yes in the local storage
  if (LS.getItem('random') === 'yes') {
    randomCheckBox.setAttribute('checked', '');
    landingPage.style.backgroundImage = `url('./imgs/landing-img1.jpg')`;
    setRandomVal();
  } else { //* set default values when the random value is no in the local storage
    randomCheckBox.removeAttribute('checked');
    imgElement.forEach((e) => {
      if (e.dataset.img === LS.getItem('currentImg')) {
        imgElement.forEach(e => e.classList.remove('active'));
        e.classList.add('active');
        landingPage.style.backgroundImage = `url('./imgs/landing-${e.dataset.img}')`;
      }
    })
  }
}
disableSelect();
//* toggle between the options on checkbox
randomCheckBox.onclick = () => {
  if (randomCheckBox.hasAttribute('checked')) {
    randomCheckBox.removeAttribute('checked');
    LS.setItem('random', 'no');
    clearInterval(randomVal);
  } else {
    randomCheckBox.setAttribute('checked', '');
    LS.setItem('random', 'yes');
    setRandomVal();
  }
  disableSelect();
}
//* check if the random imgs option disabled then enable the imgs selector.
function disableSelect() {
  if (randomCheckBox.hasAttribute('checked')) {
    selectImg.classList.add('disabled');
  } else {
    selectImg.classList.remove('disabled');
    //* for every img when click on it set the image in local storage and make it set always.
    imgElement.forEach((e) => {
      e.onclick = () => {
        if (!selectImg.classList.contains('disabled')) {
          imgElement.forEach((e) => {
            e.classList.remove('active');
          })
          e.classList.add('active');
          LS.setItem('currentImg', e.dataset.img);
          landingPage.style.backgroundImage = `url('./imgs/landing-${e.dataset.img}')`;
        }
      }
    })
  }
}
//* change the image automatic in the landing page background.
function setRandomVal() {
  randomVal = setInterval(() => {
    randomImg = Math.floor(Math.random() * imgsList.length);
    landingPage.style.backgroundImage = `url('./imgs/landing-${imgsList[randomImg]}')`;
  }, 5000);
  return randomVal
}

//* change the width for the span when scroll to it.
let skillsSection = document.querySelector('.skills');
let skills = document.querySelectorAll('.skills .skill-box .skill-progress span');
window.onscroll = () => {
  if (window.scrollY+10 > (skillsSection.offsetTop + skillsSection.offsetHeight - window.innerHeight)) {
    progress();
  };
}
function progress() {
  skills.forEach(skill => {
    skill.style.width = skill.dataset.width;
  })
}

//* create popup for the image
let galleryImgs = document.querySelectorAll('.our-gallery .imgs-box img');
let galleryOverlay = document.createElement('div');
galleryOverlay.className = 'gallery-overlay';
galleryImgs.forEach(img => {
  img.addEventListener('click', () => {
    document.body.appendChild(galleryOverlay);
    let galleryPopup = document.createElement('div');
    galleryPopup.className = 'gallery-popup';
    document.body.appendChild(galleryPopup);
    //* create heading to the img
    if (img.alt !== null) {
      let heading = document.createElement('h2');
      heading.innerHTML = img.alt;
      heading.className = 'heading';
      galleryPopup.appendChild(heading);
    }
    //* append the img to the popup
    let theImg = document.createElement('img');
    theImg.className = 'img';
    theImg.src = img.src;
    galleryPopup.appendChild(theImg);
    //* create button to remove the popup
    let removeBtn = document.createElement('span');
    let removeBtnText = document.createTextNode('x');
    removeBtn.appendChild(removeBtnText);
    removeBtn.className = 'remove-btn';
    galleryPopup.appendChild(removeBtn);
  })
});
document.addEventListener('click', (e) => {
  //* remove the popup when click on the close btn
  if (e.target.classList.contains('remove-btn')) {
    e.target.parentElement.remove();
    document.querySelector('.gallery-overlay').remove();
  }
});
//* nav bullets action
let bullets = document.querySelectorAll('.nav-bullets .bullet');
navigation(bullets);
//* main nav action
let links = document.querySelectorAll('.landing-page .nav li a');
navigation(links)

function navigation(links) {
  links.forEach(l => {
    l.addEventListener('click', function (e) {
      e.target.tagName === "A" ? e.preventDefault() : '';
      let theTarget = document.getElementById(e.target.dataset.position);
      theTarget.scrollIntoView({
        behavior: "smooth"
      });
    })
  })
}
//* bullest option in box setting
let showBullOption = document.querySelector('.setting-box .option.bullets input');
let bulletsElement = document.querySelector('.nav-bullets');

if (LS.getItem('show-bullets') === null) {
  LS.setItem('show-bullets', 'yes');
} 
if (LS.getItem('show-bullets') === 'yes') {
  showBullOption.setAttribute('checked', '');
  document.body.appendChild(bulletsElement);
} else {
  showBullOption.removeAttribute('checked');
  bulletsElement.remove();
}
showBullOption.onclick = () => {
  if (showBullOption.hasAttribute('checked')) {
    showBullOption.removeAttribute('checked');
    LS.setItem('show-bullets', 'no');
    bulletsElement.remove();
  } else {
    showBullOption.setAttribute('checked', '');
    LS.setItem('show-bullets', 'yes');
    document.body.appendChild(bulletsElement);
  }
}
//* Reset button option in the setting
document.querySelector('.setting-box .option.reset').addEventListener("click", () => {
  LS.clear();
  window.location.reload();
});
//* mega menue toggle action
let megaMenue = document.querySelector('.landing-page .links .mega-menu');
let linksElement = document.querySelector('.landing-page .links .nav');
let navLinks = document.querySelectorAll('.landing-page .links .nav li a');
megaMenue.addEventListener('click', function (e) {
  e.stopPropagation();
  this.classList.toggle('open');
});
document.addEventListener("click", (e) => {
  if (e.target!== linksElement && e.target !== megaMenue && megaMenue.classList.contains('open')) {
    megaMenue.classList.remove('open');
  }
})