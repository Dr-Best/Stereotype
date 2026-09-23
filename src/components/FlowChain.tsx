export interface FlowStep {
  title: string;
  /** Verbindungstext zum nächsten Schritt, z. B. „kann beeinflussen“ */
  link?: string;
  tone?: 'neutral' | 'accent' | 'warn';
}

interface FlowChainProps {
  steps: FlowStep[];
  label: string;
  orientation?: 'horizontal' | 'vertical';
}

/** Visualisiert mögliche (nicht zwangsläufige) Zusammenhänge als Kette. */
export function FlowChain({ steps, label, orientation = 'vertical' }: FlowChainProps) {
  return (
    <ol className={`flow flow--${orientation}`} aria-label={label}>
      {steps.map((step, index) => (
        <li key={step.title} className="flow__item">
          <span className={`flow__node flow__node--${step.tone ?? 'neutral'}`}>{step.title}</span>
          {index < steps.length - 1 && (
            <span className="flow__link">
              <svg aria-hidden="true" className="flow__arrow" viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 4v14M6 12l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {step.link && <span className="flow__link-text">{step.link}</span>}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
