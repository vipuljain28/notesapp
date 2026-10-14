import { Button } from '@components/Common'
import type { CartItem as CartItemModel } from '@store/cartSlice'

interface CartItemProps {
  item: CartItemModel
  onRemove: (id: number) => void
}

export function CartItem({ item, onRemove }: CartItemProps): React.JSX.Element {
  return (
    <li className="flex items-center justify-between gap-3 py-3">
      <div>
        <p className="font-medium text-slate-900">{item.name}</p>
        <p className="text-sm text-slate-600">{item.quantity} × ${item.price.toFixed(2)}</p>
      </div>
      <Button type="button" variant="secondary" className="px-3 py-1.5 text-sm" onClick={() => onRemove(item.id)}>Remove</Button>
    </li>
  )
}
