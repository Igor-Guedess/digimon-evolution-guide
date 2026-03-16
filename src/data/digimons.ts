import data from './digimons.json'

export type Resistance = {
  [key: string]: string
}

export type StatValue = {
  lv1: number
  lv99: number
}

export type Skill = {
  element: string
  name: string
  description: string
  spCost: string
  accuracy: string
  critRate: string
  power: string
}

export type AttachmentSkill = Skill & {
  levelLearned: string
}

export type Digimon = {
  id: string
  name: string
  stage: string
  attribute: string
  type: string
  personality: string
  url: string
  evolvesFrom: string[]
  evolvesTo: string[]
  icon: string
  image: string
  attributeResistances: Resistance
  elementalResistances: Resistance
  baseStats: { [key: string]: StatValue }
  specialSkills: Skill[]
  attachmentSkills: AttachmentSkill[]
}

const digimons: Digimon[] = data as Digimon[]

export default digimons