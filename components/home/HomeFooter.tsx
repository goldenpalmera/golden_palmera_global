export function HomeFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="brand-mark">
          GP
        </span>

        <div>
          <strong>
            GOLDEN PALMERA
          </strong>

          <small>
            GLOBAL
          </small>
        </div>
      </div>

      <p>
        © {year} Golden Palmera Global.
        All rights reserved.
      </p>

      <a href="#top">
        Back to top ↑
      </a>
    </footer>
  );
}
