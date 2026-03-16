const attributeIcons: Record<string, string> = {
  'Vaccine': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/vaccine-icon.png',
  'Virus': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/virus-icon.png',
  'Data': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/data-icon.png',
  'Free': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/free-icon.png',
  'Variable': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/variable-icon.png',
  'Unknown': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/unknown-icon.png',
  'No Data': 'https://www.grindosaur.com/img/games/digimon-story-time-stranger/icons/no-data-icon.png',
}

type DigimonCardProps = {
  id: string
  name: string
  level: string
  icon: string
  attribute: string
  onClick: () => void
}

function DigimonCard({ id, name, level, icon, attribute, onClick }: DigimonCardProps) {
  const attrIcon = attributeIcons[attribute]

  return (
    <div className="digimon-card" onClick={onClick}>
      <div className="card-top">
        <span className="card-id">#{id}</span>
        <h2>{name}</h2>
      </div>
      <img src={icon} alt={name} width={100} height={100} />
      <p className="card-stage">{level}</p>
      <div className="card-attribute">
        {attrIcon && <img src={attrIcon} alt={attribute} width={20} height={20} />}
        <span>{attribute}</span>
      </div>
    </div>
  )
}

export default DigimonCard