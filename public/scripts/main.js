var rhit = rhit || {};

rhit.Display = class {
   constructor() {
      this.favorited = false;
      this.expandedFilters = [false,false,false,false,false];
   }
   
   expandFilter(index) {
      this.expandedFilters[index] = true;
   }
   
   closeFilter(index) {
      this.expandedFilters[index] = false;
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
   
   let filterSections = document.querySelectorAll(".filter-section");
   for(let i = 1; i < filterSections.length; i++) {
      let section = filterSections[i];
      section.onclick = (event) => {
         let arrow = section.children[1];
         let expanded = rhit.display.expandedFilters[i];
         if(expanded) {
            rhit.display.closeFilter(i);
            arrow.src = "images/expand_gray.svg";
         } else {
            rhit.display.expandFilter(i);
            arrow.src = "images/expand_red.svg";
         }
      };
   }
};

//TODO: Change course colors by clicking on the key, instead of going
//      into filter options.

rhit.main = function() {
   rhit.init();
};

rhit.main();