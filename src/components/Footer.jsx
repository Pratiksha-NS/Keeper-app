let day = new Date();
let year = day.getFullYear();

function Footer() {
  return (
    <div className="footer">
      <footer>
        <p>Copyright ©️ {year}</p>
      </footer>
    </div>
  );
}

export default Footer;
