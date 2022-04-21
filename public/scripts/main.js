var rhit = rhit || {};

rhit.Display = class {
   constructor() {
      this.favorited = false;
   }
   
   setFavorited(newValue) {
      this.favorited = newValue;
   }
};

rhit.init = function() {
   rhit.menuIsVisible = false;
   rhit.display = new rhit.Display();
   
   let menuIcon = document.querySelector("#menuIcon");
   menuIcon.onclick = (event) => {
      let menuPage = document.querySelector("#menuPage");
      //TODO: Animation
      if(rhit.menuIsVisible) {
         menuPage.style.display = "none";
         menuIcon.src = "images/menu_white.svg";
      } else {
         menuPage.style.display = "flex";
         menuIcon.src = "images/menu_red.svg";
      }
      rhit.menuIsVisible = !rhit.menuIsVisible;
   };
   
   let favoriteStar = document.querySelector("#favoriteStar");
   favoriteStar.onclick = (event) => {
      if(rhit.display.favorited) {
         rhit.display.setFavorited(false);
         favoriteStar.src = "images/star_gray.svg";
      } else {
         rhit.display.setFavorited(true);
         favoriteStar.src = "images/star_gold.svg";
      }
   }
};


rhit.main = function() {
   rhit.init();
};

rhit.main();