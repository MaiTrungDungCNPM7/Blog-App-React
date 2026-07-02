import { useState, useReducer } from 'react'
import './App.css'

function App() {
  const initialState = { items: [], total: 0 };
  
  function cartReducer(state, action) {
    switch (action.type) {
      case 'ADD': {
        const exists = state.items.find(i => i.id === action.payload.id);
        const items = exists
          ? state.items.map(i => i.id === action.payload.id
              ? { ...i, qty: i.qty + 1 } : i)
          : [...state.items, { ...action.payload, qty: 1 }];
        return { items, total: items.reduce((s,i) => s + i.price*i.qty, 0) };
      }
      case 'REMOVE': {
        const items = state.items.filter(i => i.id !== action.payload);
        return { items, total: items.reduce((s,i) => s + i.price*i.qty, 0) };
      }
      case 'CLEAR': return initialState;
      default: return state;
    }
  }
  
  function Cart() {
    const [cart, dispatch] = useReducer(cartReducer, initialState);
    return (
      <div>
        <button onClick={() => dispatch({ type:'ADD', payload: product })}>Thêm</button>
        <button onClick={() => dispatch({ type:'CLEAR' })}>Xóa tất cả</button>
        <p>Tổng: {cart.total.toLocaleString('vi-VN')}đ</p>
      </div>
    );
  }

  Cart();
}

export default App
