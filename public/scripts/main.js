var rhit = rhit || {};

rhit.Display = class {
   constructor() {
      this.menuIsOpen = false;
      this.currentPage = "search";
      this.favorited = false;
      this.expandedFilters = [false,false,false,false,false];
      
      // Check whether the filter page should act like the menu, or
      // if it should push everything to the side;
      let firstTime = true;
      let resizeHandler = () => {
         let prev = this.overlayFilter;
         this.overlayFilter = window.matchMedia("(max-width: 1000px)").matches;
         if(firstTime || prev != this.overlayFilter) {
            if(firstTime) {
               this.filterIsOpen = !this.overlayFilter;
            }
            if(this.filterIsOpen) this.showFilterPage();
            else this.hideFilterPage();
         }
         firstTime = false;
      };
      window.onresize = resizeHandler;
      resizeHandler();
      
      // Menu links
      let menuLists = document.querySelectorAll(".menu-list-item");
      if(this.currentPage == "search") {
         menuLists[0].style.backgroundColor = "#FFD0D0";
      } else if(this.currentPage == "favorites") {
         menuLists[1].style.backgroundColor = "#FFD0D0";
      }
      
      // Menu button
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
      
      // Filter button
      let filter = document.querySelector("#filter");
      filter.onclick = (event) => {
         let filterPage = document.querySelector("#filterPage");
         let displayPage = document.querySelector("#displayPage");
         if(this.filterIsOpen)
            this.hideFilterPage();
         else
            this.showFilterPage();
         this.filterIsOpen = !this.filterIsOpen;
      };
      
      // Favorite button
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
      
      // Filter sections
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
   
   hideFilterPage() {
      document.body.style.gridTemplateAreas = `"nav"
                                               "display"`;
      document.body.style.gridTemplateColumns = "auto";
      document.querySelector("#displayPage").style.marginRight = "4%";
      document.querySelector("#filterPage").style.display = "none";
   }
   
   showFilterPage() {
      let filterPage = document.querySelector("#filterPage");
      if(this.overlayFilter) {
         this.hideFilterPage();
         filterPage.style.position = "absolute";
         filterPage.style.backgroundColor = "white";
         filterPage.style.top = "50px";
         filterPage.style.right = "0";
         filterPage.style.height = `${window.innerHeight-50}px`;
         filterPage.style.width = `448px`;
      } else {
         document.body.style.gridTemplateAreas = `"nav     nav"
         "display filter"`;
         document.body.style.gridTemplateColumns = "auto 450px";
         document.querySelector("#displayPage").style.marginRight = "8%";
         filterPage.style.position = "static";
      }
      filterPage.style.display = "flex";
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