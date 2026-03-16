import { useState } from 'react'
import DigimonCard from './components/DigimonCard'
import DigimonDetail from './components/DigimonDetail'
import digimons from './data/digimons'
import type { Digimon } from './data/digimons'

const stages = ['All', ...Array.from(new Set(digimons.map(d => d.stage)))]
const attributes = ['All', ...Array.from(new Set(digimons.map(d => d.attribute)))]

function App() {
  const [search, setSearch] = useState('')
  const [stage, setStage] = useState('All')
  const [attribute, setAttribute] = useState('All')
  const [selected, setSelected] = useState<Digimon | null>(null)

  const filtered = digimons.filter((d) => {
    const matchName = d.name.toLowerCase().includes(search.toLowerCase())
    const matchStage = stage === 'All' || d.stage === stage
    const matchAttribute = attribute === 'All' || d.attribute === attribute
    return matchName && matchStage && matchAttribute
  })

  const handleSelect = (name: string) => {
    const found = digimons.find((d) => d.name === name)
    if (found) setSelected(found)
  }

  return (
    <>
      <header>
        <h1>Digimon Evolution Guide</h1>
      </header>
      <main>
        {selected ? (
          <DigimonDetail
            digimon={selected}
            onBack={() => setSelected(null)}
            onSelect={handleSelect}
          />
        ) : (
          <>
            <div className="filters">
              <div className="filter-group">
                <label className="filter-label">Name</label>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search Digimon..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label className="filter-label">Stage</label>
                <select
                  className="filter-select"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                >
                  {stages.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Attribute</label>
                <select
                  className="filter-select"
                  value={attribute}
                  onChange={(e) => setAttribute(e.target.value)}
                >
                  {attributes.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="digimon-grid">
              {filtered.map((digimon) => (
                <DigimonCard
                  key={digimon.id}
                  id={digimon.id}
                  name={digimon.name}
                  level={digimon.stage}
                  icon={digimon.icon}
                  attribute={digimon.attribute}
                  onClick={() => handleSelect(digimon.name)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  )
}

export default App