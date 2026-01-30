'use client';

import { CounterStore } from '@/stores/CounterStore';

export default function Counter() {
  const { count, increment, decrement, reset } = CounterStore((state) => ({
    count: state.count,
    increment: state.increment,
    decrement: state.decrement,
    reset: state.reset,
  }));

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Count: {count}</h3>

      <button onClick={increment}>+</button>
      <button onClick={decrement} style={{ marginLeft: 8 }}>
        -
      </button>
      <button onClick={reset} style={{ marginLeft: 8 }}>
        Reset
      </button>
    </div>
  );
}
