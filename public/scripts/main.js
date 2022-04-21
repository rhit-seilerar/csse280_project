var rhit = rhit || {};

rhit.Display = class {
   constructor() {
      this.overlayFilter = window.matchMedia("(max-width: 1000px)").matches;
      this.filterIsOpen = !this.overlayFilter;
      this.menuIsOpen = false;
      this.currentPage = "search";
      this.favorited = false;
      this.expandedFilters = [false,false,false,false,false];
      
      
      let menuLists = document.querySelectorAll(".menu-list-item");
      if(this.currentPage == "search") {
         menuLists[0].style.backgroundColor = "#FFD0D0";
      } else if(this.currentPage == "favorites") {
         menuLists[1].style.backgroundColor = "#FFD0D0";
      }
      
      
      let menuIcon = document.querySelector("#menuIcon");
      let hideMenu = () => {
         menuPage.style.display = "none";
         menuIcon.src = "images/menu_white.svg";
         document.onclick = null;
         this.menuIsOpen = false;
      };
      menuIcon.onclick = (event) => {
         let menuPage = document.querySelector("#menuPage");
         //TODO: Animation
         if(this.menuIsOpen) {
            hideMenu();
         } else {
            menuPage.style.display = "flex";
            menuIcon.src = "images/menu_red.svg";
            document.onclick = (event) => {
               if(!menuPage.contains(event.target) && event.target != menuIcon) {
                  console.log("hi");
                  hideMenu();
               }
            };
            this.menuIsOpen = true;
         }
      };
      
      
      let filter = document.querySelector("#filter");
      filter.onclick = (event) => {
         let filterPage = document.querySelector("#filterPage");
         if(this.filterIsOpen) {
            filterPage.style.display = "none";
            document.body.style.gridTemplateAreas = `"nav"
                                                     "display"`;
            document.body.style.gridTemplateColumns = "auto";
            this.filterIsOpen = false;
         } else {
            filterPage.style.display = "flex";
            document.body.style.gridTemplateAreas = `"nav     nav"
                                                     "display filter"`;
            document.body.style.gridTemplateColumns = "auto 450px";
            this.filterIsOpen = true;
         }
      };
      
      
      let favoriteStar = document.querySelector("#favoriteStar");
      favoriteStar.onclick = (event) => {
         if(this.favorited) {
            this.setFavorited(false);
            favoriteStar.src = "images/star_gray.svg";
         } else {
            this.setFavorited(true);
            favoriteStar.src = "images/star_gold.svg";
         }
      };
      
      
      let filterSections = document.querySelectorAll(".filter-section");
      for(let i = 1; i < filterSections.length; i++) {
         let section = filterSections[i];
         section.onclick = (event) => {
            let arrow = section.children[1];
            let expanded = this.expandedFilters[i];
            if(expanded) {
               this.expandedFilters[i] = false;
               arrow.src = "images/expand_gray.svg";
            } else {
               this.expandedFilters[i] = true;
               arrow.src = "images/expand_red.svg";
            }
         };
      }
   }
   
   setFavorited(newValue) {
      this.favorited = newValue;
   }
};

//TODO: Change course colors by clicking on the key, instead of going
//      into filter options.

rhit.main = function() {
   rhit.display = new rhit.Display();
};

rhit.main();