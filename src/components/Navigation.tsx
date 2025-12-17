import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('React hamburger clicked!', !isMobileMenuOpen); // Debug log
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Also update DOM classes for CSS styling
    const navBar = document.querySelector('.nav-bar');
    const hamburger = document.querySelector('.custom-hamburger-btn');
    
    if (navBar && hamburger) {
      if (!isMobileMenuOpen) {
        navBar.classList.add('mobile-open');
        hamburger.classList.add('active');
      } else {
        navBar.classList.remove('mobile-open');
        hamburger.classList.remove('active');
      }
    }
  };

  const handleLinkClick = () => {
    // Close mobile menu when clicking a link
    setIsMobileMenuOpen(false);
    
    // Remove DOM classes
    const navBar = document.querySelector('.nav-bar');
    const hamburger = document.querySelector('.custom-hamburger-btn');
    
    if (navBar && hamburger) {
      navBar.classList.remove('mobile-open');
      hamburger.classList.remove('active');
    }
    
    // Scroll to top instantly
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  useEffect(() => {
    // Fallback jQuery approach for older browsers
    if (typeof window !== 'undefined' && window.jQuery) {
      const $ = window.jQuery;
      
      setTimeout(() => {
        $('.custom-hamburger-btn').off('click.mobilemenu').on('click.mobilemenu touchend.mobilemenu', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('jQuery hamburger clicked!'); // Debug log
          
          const $navBar = $('.nav-bar');
          const $moduleGroup = $('.module-group');
          const $hamburger = $('.custom-hamburger-btn');
          
          $navBar.toggleClass('mobile-open');
          $hamburger.toggleClass('active');
          
          if ($navBar.hasClass('mobile-open')) {
            $moduleGroup.slideDown(300);
          } else {
            $moduleGroup.slideUp(300);
          }
        });
      }, 100);
    }
  }, []);

  return (
    <div className="nav-container">
      <nav>
        <div className="nav-bar">
          <div className="module left">
            <Link to="/">
              <img className="logo logo-dark" alt="Globall" src="/globall.png" />
            </Link>
          </div>
          <div className="module widget-handle mobile-toggle right visible-sm visible-xs">
            <button 
              className={`custom-hamburger-btn ${isMobileMenuOpen ? 'active' : ''}`}
              type="button"
              onClick={toggleMobileMenu}
              onTouchEnd={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
          <div className={`module-group right ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <div className="module left">
              <ul className="menu">
                <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                <li><Link to="/about" onClick={handleLinkClick}>Mission</Link></li>
                <li><Link to="/faqs" onClick={handleLinkClick}>FAQ's</Link></li>
                <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
                <li><Link to="/donate" onClick={handleLinkClick} className="donate-nav-link">Donate</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;