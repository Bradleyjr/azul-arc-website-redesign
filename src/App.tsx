import { useState } from 'react';
import Design1 from './components/Design1';
import Design2 from './components/Design2';
import Design3 from './components/Design3';
import Design4 from './components/Design4';
import Design5 from './components/Design5';
import Design6 from './components/Design6';
import Design7 from './components/Design7';
import Design8 from './components/Design8';
import DesignFinal from './components/DesignFinal';

export default function App() {
  const [activeDesign, setActiveDesign] = useState(9);

  return (
    <div className="min-h-screen bg-zinc-100 font-sans">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 px-4 py-3 flex flex-wrap justify-center gap-2 md:gap-4 border-b border-zinc-200">
        {[
          { id: 1, name: 'Clean & Structured' },
          { id: 2, name: 'Light & Technical' },
          { id: 3, name: 'Editorial Flow' },
          { id: 4, name: 'Vibrant & Modern' },
          { id: 5, name: 'Premium Agency' },
          { id: 6, name: 'The Blueprint' },
          { id: 7, name: 'Kinetic Accordion' },
          { id: 8, name: 'Spatial & Tactile' },
          { id: 9, name: '★ Precision & Presence' },
        ].map((design) => (
          <button
            key={design.id}
            onClick={() => setActiveDesign(design.id)}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
              activeDesign === design.id
                ? 'bg-black text-white shadow-md scale-105'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {design.id}. {design.name}
          </button>
        ))}
      </nav>
      <div className="pt-24 md:pt-16">
        {activeDesign === 1 && <Design1 />}
        {activeDesign === 2 && <Design2 />}
        {activeDesign === 3 && <Design3 />}
        {activeDesign === 4 && <Design4 />}
        {activeDesign === 5 && <Design5 />}
        {activeDesign === 6 && <Design6 />}
        {activeDesign === 7 && <Design7 />}
        {activeDesign === 8 && <Design8 />}
        {activeDesign === 9 && <DesignFinal />}
      </div>
    </div>
  );
}
