import { getState } from './state.js'
import { notes } from './consts.js'

const notesEngToIta = {
  A: 'la',
  'A#': 'la diesis',
  B: 'si',
  C: 'do',
  'C#': 'do diesis',
  D: 're',
  'D#': 're diesis',
  E: 'mi',
  F: 'fa',
  'F#': 'fa diesis',
  G: 'sol',
  'G#': 'sol diesis',
}

const italian = {
  right: 'giusto',
  wrong: 'sbagliato',
  ...notes.reduce((result, note) => {
    result[note] = notesEngToIta[note]
    return result
  }, {}),
}

const english = {
  right: 'right',
  wrong: 'wrong',
  ...notes.reduce((result, note) => {
    result[note] = note
    return result
  }, {}),
}

export const t = (key) =>
  getState().language === 'ita' ? italian[key] : english[key]
