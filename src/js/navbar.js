
  
  /*********************************************************************************************
  .) NEW NAVBAR
  **********************************************************************************************/
  
  navBtn = document.querySelector('.hamburger');
  navBtn.addEventListener('click', plToggle, false);
  
  
  function plToggle(event) {
  
      navBtn.classList.toggle('is-active');
      $('.content').toggleClass('isOpen');
      $('.sidebar').toggleClass('isOpen');
      var $container = $('.sidebar');
  
  
  $('.nav li, .closeonclick').click(function(event) {
      console.log('clickeado en nav li');
      $('.hamburger').removeClass('is-active');
      $('.content').removeClass('isOpen');
      $('.sidebar').removeClass('isOpen');
  });
  
  
      $(document).click(function(event) {
          if ($container.hasClass('isOpen') && !$('.hamburger')) {
            console.log("NAVLI");
        };
  
         if ($container.hasClass('isOpen') && !$(event.target).children()) {
              console.log("HAS CLICKEADO FUERA y el menu playlist se cerrará");
              navBtn.classList.toggle('is-active');
              $('.content').toggleClass('isOpen');
              $('.sidebar').toggleClass('isOpen');
              return false;
          }
  
      });
  }
  
  var modal = document.querySelector(".sidebar");
  
  modal.addEventListener("click", handleNavClick);
  
  function handleNavClick(evt) {
    // `evt.target` is the DOM node the user clicked on.
    if (!evt.target.closest(".is-active")) {
        // if (!evt.target.closest(".sidebar")) {
      handleNavlClose();
    }
  }
  
  function handleNavlClose(evt) {
    console.log('CLOSE NAVBAR')
  }
  
  /** CLOSE MAIN NAVIGATION WHEN CLICKING OUTSIDE THE MAIN NAVIGATION AREA**/
  $(document).on('click', function (e){
    /* bootstrap collapse js adds "in" class to your collapsible element*/
    var menu_opened = $('.sidebar').hasClass('is-active');
  
    if(!$(e.target).closest('.sidebar').length &&
        !$(e.target).is('.sidebar') &&
        menu_opened === true){
          console.log('YEP. CLOSE NAVBAR')
  
  
    }
  
  });
  
  /*********************************************************************************************
  .) DARKMODE
  **********************************************************************************************/
    const toggleButton = document.querySelector('.darklight');
    const colors = document.querySelectorAll('.color');
    
    colors.forEach(color => {
    color.addEventListener('click', (e) => {
      colors.forEach(c => c.classList.remove('selected'));
      const theme = color.getAttribute('data-color');
      document.body.setAttribute('data-theme', theme);
      color.classList.add('selected');
    });
    });
    
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
  
      if (document.body.classList.contains('my-class-name')) {
        //do something
        console.log('HASCLASS dark mode!');
      };
  
      toggleStoredItem("uimode", 'dark');
      console.log('togled dark mode!');
    });
  
  
  let uimode = localStorage.getItem("uimode");
    if(uimode){
      console.log("uimode:", uimode)
      document.body.classList.toggle('dark-mode');
  
      
    } else{
      console.log('no hay uimode')
    }
  