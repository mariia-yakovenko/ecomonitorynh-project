export default function Footer() {
  return (
    <footer className="footer-ep">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
        <span>
          <strong>єПовітря</strong> {new Date().getFullYear()} · лабораторна
          робота 1 · усі дані є ВИГАДАНИМИ
        </span>
      </div>
    </footer>
  );
}
