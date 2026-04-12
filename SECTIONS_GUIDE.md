# ProbeAI Landing Page - Additional Sections

Copy these sections into `/Volumes/Workplaces/Testing/ProbeAI/landingpage/src/app/[locale]/page.tsx` after the hero terminal section.

## Stats Bar Section

```tsx
{/* STATS BAR */}
<section 
  className="py-10 border-t border-b"
  style={{ 
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
    background: 'var(--surface)'
  }}
>
  <div className="max-w-[1140px] mx-auto px-10">
    <div className="grid grid-cols-4 gap-0">
      {[
        { num: '4x', label: 'Faster test authoring' },
        { num: '99%', label: 'Execution determinism' },
        { num: '20+', label: 'Parallel agent workers' },
        { num: '3', label: 'LLM providers supported' }
      ].map((stat, i) => (
        <div 
          key={i} 
          className="stat-item fade-in px-10 py-6"
          style={{ borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}
        >
          <div 
            className="text-4xl font-extrabold tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '-2px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {stat.num}
          </div>
          <div className="text-sm mt-1" style={{ color: 'var(--text-dim)' }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

## Pipeline Section

```tsx
{/* PIPELINE SECTION */}
<section id="pipeline" className="py-[120px]" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%)' }}>
  <div className="max-w-[1140px] mx-auto px-10">
    <div className="text-center mb-20 fade-in">
      <div className="font-mono text-[11px] tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
        // 4-Stage Pipeline
      </div>
      <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05 }}>
        From intent to<br/>execution
      </h2>
      <p className="mt-4 text-[17px] max-w-[580px] mx-auto" style={{ color: 'var(--text-dim)', fontWeight: 300, lineHeight: 1.7 }}>
        Every test run passes through four stages — AI handles the ambiguity, determinism handles the execution.
      </p>
    </div>

    <div className="flex items-center justify-center gap-0 flex-wrap">
      {[
        { icon: '🧠', badge: 'AI', label: 'Compile', desc: 'NL / YAML / Figma → Canonical IR', type: 'ai' },
        { icon: '🔗', badge: 'DET', label: 'Bind', desc: 'Resolve vars, env, accounts', type: 'det' },
        { icon: '⚡', badge: 'DET', label: 'Execute', desc: 'Browser steps + evidence collection', type: 'det' },
        { icon: '🔍', badge: 'AI', label: 'Analyze', desc: 'Failure triage + bug reports', type: 'ai' }
      ].map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="pipeline-step flex flex-col items-center gap-4">
            <div 
              className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl relative"
              style={{
                border: '1px solid var(--border)',
                background: step.type === 'ai' 
                  ? 'linear-gradient(135deg, rgba(123,97,255,0.15), rgba(0,229,255,0.08))'
                  : 'linear-gradient(135deg, rgba(0,229,255,0.1), rgba(0,255,163,0.08))',
                borderColor: step.type === 'ai' ? 'rgba(123,97,255,0.3)' : 'rgba(0,229,255,0.25)'
              }}
            >
              {step.icon}
              <span 
                className="absolute -top-1.5 -right-1.5 font-mono text-[9px] px-1.5 py-0.5 rounded font-semibold"
                style={{
                  background: step.type === 'ai' ? 'rgba(123,97,255,0.9)' : 'rgba(0,229,255,0.9)',
                  color: step.type === 'ai' ? '#fff' : '#000'
                }}
              >
                {step.badge}
              </span>
            </div>
            <div className="font-bold text-[15px] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{step.label}</div>
            <div className="text-xs text-center max-w-[110px] leading-tight" style={{ color: 'var(--text-dim)' }}>{step.desc}</div>
          </div>
          {i < 3 && (
            <div className="w-[60px] flex items-center justify-center pb-11">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}/>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
```

Due to message length, I'll create a complete working version as a single file. Let me do that now:
