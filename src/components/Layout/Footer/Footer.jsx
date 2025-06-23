import "./Footer.css";
// Description: A footer component that provides attribution for the application, stating that it uses TMDB and its APIs but is not endorsed by TMDB.
const Footer = () => (
  <footer className="attribution">
    <p>
      This application uses TMDB and the TMDB APIs but is not endorsed,
      certified, or otherwise approved by TMDB.
    </p>
    <p>Powered by The Movie Database (TMDB)</p>
  </footer>
);

export default Footer;
