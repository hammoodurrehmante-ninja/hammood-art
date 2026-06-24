import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-copy">© 2026 Hammood Ur Rehman — Lead Product Designer</p>
          <div className="footer-links">
            <Link href="/work"    className="footer-link">Work</Link>
            <Link href="/about"   className="footer-link">About</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
            <a href="mailto:hammoodurrehman.te@gmail.com" className="footer-link">Email</a>
            <a href="https://www.behance.net/hammood" target="_blank" rel="noopener noreferrer" className="footer-link">Behance</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
