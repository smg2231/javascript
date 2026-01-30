'use client';

import Link from "next/link";
import Counter from "../component/Counter";

import { CounterStore } from "@/stores/CounterStore";

export default function ContactPage() {
  const count = CounterStore((state) => state.count);

  return (
    <main>
      <h1>Contact Page</h1>
      <p>This is the contact page.</p>

      <h2>Shared Count Value: {count}</h2>

      <Counter />

      <nav>
        <ul>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/product">Product</Link></li>
        </ul>
      </nav>
    </main>
  );
}
