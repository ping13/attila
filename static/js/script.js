jQuery(function($) {

  var html = $('html');
  var viewport = $(window);

  function footnoteHover() {
    'use strict';
    const footnotes = document.querySelectorAll('a.footnote-ref');

    footnotes.forEach(fn => {
      fn.addEventListener('mouseenter', function(e) {
        const targetId = this.getAttribute('href').replace(':', '\\:');
        const footnote = document.querySelector(targetId);
        if (footnote) {
          const rect = this.getBoundingClientRect();
          const tooltip = document.createElement('div');
          tooltip.className = 'footnote-tooltip';
          tooltip.innerHTML = footnote.innerHTML;

          let left = rect.left;
          let top = rect.bottom + 5;

          const tooltipWidth = 300; 
          const tooltipHeight = tooltip.offsetHeight;
          if (left + tooltipWidth > window.innerWidth) {
            left = window.innerWidth - tooltipWidth - 10; 
          }
          if (top + tooltipHeight > window.innerHeight) {
            top = rect.top - tooltipHeight - 5; 
          }


          tooltip.style.position = 'fixed';
          tooltip.style.left = `${left}px`;
          tooltip.style.top = `${top}px`;
          document.body.appendChild(tooltip);
        }
      });

      fn.addEventListener('mouseleave', function() {
        const tooltip = document.querySelector('.footnote-tooltip');
        if (tooltip) {
          tooltip.remove();
        }
      });
    });
  }

  footnoteHover();

/* ==========================================================================
   Menu
   ========================================================================== */

  function menu() {
    html.toggleClass('menu-active');
  };

  $('#menu').on({
    'click': function() {
      menu();
    }
  });

  $('.nav-menu').on({
    'click': function() {
      menu();
    }
  });

  $('.nav-close').on({
    'click': function() {
      menu();
    }
  });

  viewport.on({
    'resize': function() {
      html.removeClass('menu-active');
    },
    'orientationchange': function() {
      html.removeClass('menu-active');
    }
  });

/* ==========================================================================
   Parallax cover
   ========================================================================== */

  var cover = $('.cover');
  var coverPosition = 0;

  function prlx() {
    if (cover.length >= 1) {
      var windowPosition = viewport.scrollTop();
      (windowPosition > 0) ? coverPosition = Math.floor(windowPosition * 0.25): coverPosition = 0;
      cover.css({
        '-webkit-transform': 'translate3d(0, ' + coverPosition + 'px, 0)',
        'transform': 'translate3d(0, ' + coverPosition + 'px, 0)'
      });
      (viewport.scrollTop() < cover.height()) ? html.addClass('cover-active'): html.removeClass('cover-active');
    }
  }
  prlx();

  viewport.on({
    'scroll': function() {
      prlx();
    },
    'resize': function() {
      prlx();
    },
    'orientationchange': function() {
      prlx();
    }
  });

/* ==========================================================================
   Gallery
   ========================================================================== */

  function gallery() {
    'use strict';
    var images = document.querySelectorAll('.kg-gallery-image img');
    images.forEach(function(image) {
      var container = image.closest('.kg-gallery-image');
      var width = image.attributes.width.value;
      var height = image.attributes.height.value;
      var ratio = width / height;
      container.style.flex = ratio + ' 1 0%';
    });
  }
  gallery();


/* ==========================================================================
   Theme
   ========================================================================== */

  function theme() {
    'use strict';
    var toggle = $('.js-theme');
    var toggleText = toggle.find('.theme-text');

    function system() {
      html.removeClass(['theme-dark', 'theme-light']);
      localStorage.removeItem('attila_theme');
      toggleText.text(toggle.attr('data-system'));
    }

    function dark() {
      html.removeClass('theme-light').addClass('theme-dark');
      localStorage.setItem('attila_theme', 'dark');
      toggleText.text(toggle.attr('data-dark'));
    }

    function light() {
      html.removeClass('theme-dark').addClass('theme-light');
      localStorage.setItem('attila_theme', 'light');
      toggleText.text(toggle.attr('data-light'));
    }

    switch (localStorage.getItem('attila_theme')) {
      case 'dark':
        dark();
      break;
      case 'light':
        light();
      break;
      default:
        system();
      break;
    }

    toggle.on('click', function (e) {
      e.preventDefault();

      if (!html.hasClass('theme-dark') && !html.hasClass('theme-light')) {
        dark();
      } else if (html.hasClass('theme-dark')) {
        light();
      } else {
        system();
      }
    });
  }
  theme();
});

