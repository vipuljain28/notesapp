import { lazy, Suspense } from 'react'
import { ContactList } from '@components/Contact/ContactList'
import { Spinner } from '@components/Common'

const CartSummary = lazy(() =>
  import('@components/Shopping/CartSummary').then((module) => ({
    default: module.CartSummary,
  })),
)

function App(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8">
        <header className="border-b border-slate-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-700">Contact Manager</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">People, in one place.</h1>
          <p className="mt-2 max-w-2xl text-slate-600">Browse and manage contacts, with resilient API loading and a cart that stays saved in this browser.</p>
        </header>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <ContactList />
          <aside aria-label="Shopping cart">
            <Suspense fallback={<Spinner message="Loading cart…" />}>
              <CartSummary />
            </Suspense>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default App
