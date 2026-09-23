import { useId, useState, type ReactNode } from 'react';



interface TooltipProps {
  /** Sichtbarer Begriff */
  children: ReactNode;
  /** Kurze Erklärung */
  text: string;
}

/**
 * Kleiner, tastaturbedienbarer Tooltip. Erscheint bei Hover und Fokus,
 * lässt sich mit Escape schließen und ist per aria-describedby verknüpft.
 */
export function Tooltip({ children, text }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span
      className="tooltip"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="tooltip__trigger"
        aria-describedby={id}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
      >
        {children}
      </button>
      <span role="tooltip" id={id} className={`tooltip__bubble${open ? ' is-open' : ''}`}>
        {text}
      </span>
    </span>
  );
}
