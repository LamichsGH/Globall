import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-2 bg-primary text-center-xs">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center" style={{ marginBottom: '16px' }}>
            <Link to="/" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                alt="GLO-BALL" 
                src="/index.png" 
                style={{ height: '40px' }} 
              />
            </Link>
          </div>
          <div className="col-sm-12 text-center">
            <ul className="list-inline social-list mb0">
              <Link to="/terms">SITE TERMS</Link> | <Link to="/privacy">PRIVACY</Link>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;