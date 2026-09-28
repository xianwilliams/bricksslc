'use client';
import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
const words = [
  'For the creators',
  'Art. Entrepreneurship. Culture.',
  'Film. Photography. Marketing.',
  'I just want to do cool shit with my friends',
];
export function Ticker() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="ticker-wrap">
      <div className={`ticker ${paused ? 'is-paused' : ''}`}>
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-set" key={copy} aria-hidden={copy === 1}>
              {words.map((text) => (
                <span key={text}>
                  <img src="/brand/logo.png" alt="" width="1223" height="329" />
                  {text}
                  <b aria-hidden="true">✳</b>
                </span>
              ))}
            </div>
          ))}
        </div>
        <button
          className="ticker-control"
          aria-label={paused ? 'Play ticker' : 'Pause ticker'}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
    </div>
  );
}
