import { useState, type FormEvent } from 'react'
import { Button, Card, TextInput } from '@components/Common'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { cartSlice } from '@store/cartSlice'
import { selectCartItems, selectCartTotal } from '@store/selectors'
import { CartItem } from '@components/Shopping/CartItem'

export function CartSummary(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  function handleAdd(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const parsedPrice = Number(price)
    if (!name.trim() || !Number.isFinite(parsedPrice) || parsedPrice < 0) return
    dispatch(cartSlice.actions.addItem({
      id: Date.now(),
      name: name.trim(),
      quantity: 1,
      price: parsedPrice,
    }))
    setName('')
    setPrice('')
  }

  return (
    <Card header={<h2 className="text-lg font-semibold text-slate-900">Saved cart</h2>}>
      <form onSubmit={handleAdd} className="grid gap-3 sm:grid-cols-[1fr_8rem_auto] sm:items-end">
        <TextInput label="Item" value={name} onChange={(event) => setName(event.target.value)} required />
        <TextInput label="Price" type="number" min="0" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} required />
        <Button type="submit">Add</Button>
      </form>
      {items.length === 0 ? (
        <p className="mt-5 text-sm text-slate-600">Your cart is empty. Items are saved in this browser.</p>
      ) : (
        <ul className="mt-5 divide-y divide-slate-100">
          {items.map((item) => (
            <CartItem key={item.id} item={item} onRemove={(id) => dispatch(cartSlice.actions.removeItem(id))} />
          ))}
        </ul>
      )}
      <p className="mt-4 border-t border-slate-100 pt-4 text-right font-semibold text-slate-900">Total: ${total.toFixed(2)}</p>
    </Card>
  )
}
