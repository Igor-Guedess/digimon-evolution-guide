import { useState } from 'react'
import type { Digimon } from '../data/digimons'
import digimons from '../data/digimons'

const attributeIcons: Record<string, string> = {
  'Vaccine': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/vaccine-icon.png',
  'Virus': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/virus-icon.png',
  'Data': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/data-icon.png',
  'Free': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/free-icon.png',
  'Variable': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/variable-icon.png',
  'Unknown': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/unknown-icon.png',
  'No Data': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/no-data-icon.png',
}

type NodeProps = {
  digimon: Digimon
  onSelect: (name: string) => void
  depth: number
  isCurrentDigimon?: boolean
  expandable?: boolean
}

function EvolutionNode({ digimon, onSelect, depth, isCurrentDigimon, expandable = true }: NodeProps) {
  const [expanded, setExpanded] = useState(isCurrentDigimon === true)

  const children = digimon.evolvesTo
    .map(name => digimons.find(d => d.name === name))
    .filter(Boolean) as Digimon[]

  const hasChildren = children.length > 0 && expandable
  const attrIcon = attributeIcons[digimon.attribute]

  return (
    <div>
      <div className="evo-tree-row" style={{ paddingLeft: depth * 32 }}>
        {hasChildren ? (
          <button className="evo-tree-toggle" onClick={() => setExpanded(!expanded)}>
            {expanded ? '−' : '+'}
          </button>
        ) : (
          <div className="evo-tree-toggle-empty" />
        )}
        <div
          className={`evo-tree-card ${isCurrentDigimon ? 'evo-tree-card-current' : ''}`}
          onClick={() => onSelect(digimon.name)}
        >
          <img src={digimon.icon} alt={digimon.name} width={72} height={72} />
          <div>
            <p className="evo-tree-name">{digimon.name}</p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <p className="evo-tree-stage">{digimon.stage}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {attrIcon && <img src={attrIcon} alt={digimon.attribute} width={16} height={16} />}
                <p className="evo-tree-attr">{digimon.attribute}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {expanded && hasChildren && (
        <div className="evo-tree-children">
          {children.map(child => (
            <EvolutionNode
              key={child.name}
              digimon={child}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

type EvolutionTreeProps = {
  digimon: Digimon
  onSelect: (name: string) => void
}

function EvolutionTree({ digimon, onSelect }: EvolutionTreeProps) {
  const evolvesFrom = digimon.evolvesFrom
    .map(name => digimons.find(d => d.name === name))
    .filter(Boolean) as Digimon[]

  return (
    <div className="evo-tree">
      {evolvesFrom.length > 0 && (
        <>
          <div className="evo-section-label">Evolves from</div>
          {evolvesFrom.map(d => (
            <EvolutionNode
              key={d.name}
              digimon={d}
              onSelect={onSelect}
              depth={0}
              expandable={false}
            />
          ))}
          <div className="evo-tree-separator" />
        </>
      )}

      <div className="evo-section-label">Current</div>
      <EvolutionNode
        digimon={digimon}
        onSelect={onSelect}
        depth={0}
        isCurrentDigimon={true}
      />
    </div>
  )
}

export default EvolutionTree