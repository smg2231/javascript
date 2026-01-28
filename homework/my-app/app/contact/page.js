import Link from "next/link";

export default function ContactPage() {
  return (
    <main>
      <h1>Contact Page</h1>
      <p>This is the contact page.</p>
       <nav>
        <ul>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/product">Product</Link></li>
        </ul>
      </nav>
    </main>
  )
}