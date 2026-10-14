# Component library

The component library is exported from `src/components/index.ts` and documented interactively by the local Storybook configuration in `.storybook/`.

## Run Storybook

```sh
npm run storybook
```

Storybook listens on port 6006. The production application does not include Storybook.

## Components

| Component | Purpose |
|---|---|
| `Button` | Keyboard-operable action button with primary, secondary, danger, and success variants. |
| `TextInput` | Labeled input with accessible error association. |
| `Select` | Labeled select control with optional error state. |
| `Checkbox` | Labeled native checkbox. |
| `Card` | Content section with optional header and footer. |
| `Modal` | Dialog with Escape and backdrop dismissal, focus restoration, and tab trapping. |
| `Spinner` | Loading indicator with optional status text. |
| `Alert` | Status or error message. |
| `Badge` | Compact status label. |
| `FormField` | Label, required indicator, control, and error layout. |
| `EmptyState` | Empty-content prompt. |
| `ContactCard` | Contact details and edit/delete actions. |
| `ContactForm` | Validated contact creation and editing form. |
| `ContactList` | Contact loading, refresh, empty, error, and list views. |
| `CartItem` | Cart item label, quantity, price, and remove action. |
| `CartSummary` | Cart item entry form, list, and total. |

Controls use semantic HTML and visible focus styles. Automated unit tests exercise the shared button and input; the Storybook stories provide local visual examples for common controls and feature cards.
