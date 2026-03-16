import { useState } from 'react'
import type { Digimon } from '../data/digimons'
import EvolutionTree from './EvolutionTree'

const elementIcons: Record<string, string> = {
  'Fire': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/fire-icon.png',
  'Water': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/water-icon.png',
  'Plant': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/plant-icon.png',
  'Ice': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/ice-icon.png',
  'Electricity': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/electricity-icon.png',
  'Earth': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/earth-icon.png',
  'Steel': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/steel-icon.png',
  'Wind': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/wind-icon.png',
  'Light': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/light-icon.png',
  'Dark': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/dark-icon.png',
  'Null': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/null-icon.png',
  'Buff': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/buff-icon.png',
  'Debuff': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/debuff-icon.png',
  'Recovery': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/recovery-icon.png',
}

const attributeIcons: Record<string, string> = {
  'Vaccine': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/vaccine-icon.png',
  'Virus': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/virus-icon.png',
  'Data': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/data-icon.png',
  'Free': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/free-icon.png',
  'Variable': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/variable-icon.png',
  'Unknown': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/unknown-icon.png',
  'No Data': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/no-data-icon.png',
}

const resistanceIcons: Record<string, string> = {
  'Double Damage': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/double-damage-icon.png',
  'One and a Half Damage': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/one-and-half-damage-icon.png',
  'No Effect': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/no-effect-icon.png',
  'Half Damage': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/half-damage-icon.png',
  'No Damage': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/no-damage-icon.png',
}

const statMaxValues: Record<string, number> = {
  HP: 4868, SP: 2827, ATK: 3127, DEF: 3361, INT: 3084, SPI: 2159, SPD: 2196,
}

type DigimonDetailProps = {
  digimon: Digimon
  onBack: () => void
  onSelect: (name: string) => void
}

function DigimonDetail({ digimon, onBack, onSelect }: DigimonDetailProps) {
  const [lightbox, setLightbox] = useState(false)

  const totalLv1 = Object.values(digimon.baseStats).reduce((acc, v) => acc + v.lv1, 0)
  const totalLv99 = Object.values(digimon.baseStats).reduce((acc, v) => acc + v.lv99, 0)

  return (
    <div className="detail-page">
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <img src={digimon.image} alt={digimon.name} className="lightbox-image" />
        </div>
      )}

      <button className="back-btn" onClick={onBack}>← Back to list</button>

      <div className="detail-header">
        <img
          src={digimon.image}
          alt={digimon.name}
          className="detail-image"
          onClick={() => setLightbox(true)}
        />
        <div className="detail-right">
          <div className="detail-info">
            <h1>{digimon.name}</h1>
            <div className="detail-tags">
              <span className="tag tag-stage">{digimon.stage}</span>
              <span className="tag tag-attr">{digimon.attribute}</span>
              <span className="tag tag-type">{digimon.type}</span>
              <span className="tag tag-personality">{digimon.personality}</span>
            </div>
          </div>

          {Object.keys(digimon.baseStats).length > 0 && (
            <div className="stats-table">
              <div className="stats-header-row">
                <span className="stats-col-label">Stat</span>
                <span className="stats-col-lv">Lv. 1</span>
                <span></span>
                <span className="stats-col-lv99">Lv. 99</span>
              </div>
              {Object.entries(digimon.baseStats).map(([stat, values]) => {
                const max = statMaxValues[stat] ?? 5000
                const pct1 = (values.lv1 / max) * 100
                const pct99 = (values.lv99 / max) * 100
                return (
                  <div key={stat} className="stats-row">
                    <span className="stats-label">{stat}</span>
                    <span className="stats-value">{values.lv1}</span>
                    <div className="stats-bar-wrap">
                      <div className="stats-bar-lv99" style={{ width: `${pct99}%`, background: '#3b82f6' }} />
                      <div className="stats-bar-lv1" style={{ width: `${pct1}%`, background: '#f97316' }} />
                    </div>
                    <span className="stats-value-99">{values.lv99}</span>
                  </div>
                )
              })}
              <div className="stats-total-row">
                <span className="stats-label">Total</span>
                <span className="stats-value">{totalLv1}</span>
                <span></span>
                <span className="stats-value-99">{totalLv99}</span>
              </div>
              <p className="stats-disclaimer">
                Orange bar represents Lv. 1 stats. Blue bar represents Lv. 99 stats. Each bar is relative to the maximum possible value for that stat across all Digimon.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="detail-section">
        <h2 className="detail-section-title">Evolution tree</h2>
        <EvolutionTree digimon={digimon} onSelect={onSelect} />
      </div>

      {Object.keys(digimon.attributeResistances).length > 0 && (
        <div className="detail-section">
          <h2 className="detail-section-title">Attribute resistances</h2>
          <div className="resistance-table">
            <div className="resistance-header">
              {Object.keys(digimon.attributeResistances).map(attr => (
                <div key={attr} className="resistance-col">
                  {attributeIcons[attr] && <img src={attributeIcons[attr]} alt={attr} width={32} height={32} title={attr} />}
                  <span className="resistance-name">{attr}</span>
                </div>
              ))}
            </div>
            <div className="resistance-row">
              {Object.values(digimon.attributeResistances).map((value, i) => (
                <div key={i} className="resistance-col">
                  {resistanceIcons[value] && <img src={resistanceIcons[value]} alt={value} width={32} height={32} title={value} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {Object.keys(digimon.elementalResistances).length > 0 && (
        <div className="detail-section">
          <h2 className="detail-section-title">Elemental resistances</h2>
          <div className="resistance-table">
            <div className="resistance-header">
              {Object.keys(digimon.elementalResistances).map(elem => (
                <div key={elem} className="resistance-col">
                  {elementIcons[elem] && <img src={elementIcons[elem]} alt={elem} width={32} height={32} title={elem} />}
                  <span className="resistance-name">{elem}</span>
                </div>
              ))}
            </div>
            <div className="resistance-row">
              {Object.values(digimon.elementalResistances).map((value, i) => (
                <div key={i} className="resistance-col">
                  {resistanceIcons[value] && <img src={resistanceIcons[value]} alt={value} width={32} height={32} title={value} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {digimon.specialSkills.length > 0 && (
        <div className="detail-section">
          <h2 className="detail-section-title">Special skills</h2>
          <div className="skills-table">
            <div className="skills-header">
              <span>Element</span>
              <span>Name</span>
              <span>Description</span>
              <span>SP Cost</span>
              <span>Accuracy</span>
              <span>Crit Rate</span>
              <span>Power</span>
            </div>
            {digimon.specialSkills.map((skill, i) => (
              <div key={i} className="skills-row">
                <div className="skills-element">
                  {elementIcons[skill.element] && <img src={elementIcons[skill.element]} alt={skill.element} width={28} height={28} />}
                </div>
                <span className="skills-name">{skill.name}</span>
                <span className="skills-desc">{skill.description}</span>
                <span className="skills-stat">{skill.spCost}</span>
                <span className="skills-stat">{skill.accuracy}</span>
                <span className="skills-stat">{skill.critRate}</span>
                <span className="skills-stat">{skill.power}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {digimon.attachmentSkills.length > 0 && (
        <div className="detail-section">
          <h2 className="detail-section-title">Attachment skills</h2>
          <div className="skills-table">
            <div className="skills-header skills-header-attachment">
              <span>Element</span>
              <span>Name</span>
              <span>Description</span>
              <span>Level</span>
              <span>SP Cost</span>
              <span>Accuracy</span>
              <span>Crit Rate</span>
              <span>Power</span>
            </div>
            {digimon.attachmentSkills.map((skill, i) => (
              <div key={i} className="skills-row skills-row-attachment">
                <div className="skills-element">
                  {elementIcons[skill.element] && <img src={elementIcons[skill.element]} alt={skill.element} width={28} height={28} />}
                </div>
                <span className="skills-name">{skill.name}</span>
                <span className="skills-desc">{skill.description}</span>
                <span className="skills-stat">{skill.levelLearned}</span>
                <span className="skills-stat">{skill.spCost}</span>
                <span className="skills-stat">{skill.accuracy}</span>
                <span className="skills-stat">{skill.critRate}</span>
                <span className="skills-stat">{skill.power}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DigimonDetail