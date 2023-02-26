import { notes } from './consts.js'
import { setState } from './state.js'
import { speak } from './speak.js'
import { GO_TO_NEXT_EVENT, RESPONDED_EVENT, VOICE_INIT } from './events.js'
import { t } from './i18n.js'

const PAUSE_AFTER_RESPONSE = 1000
const TIME_TO_RESPOND = 3000

let interval

const pickNote = () => {
  const noteToGuess = notes[Math.round(Math.random() * (notes.length - 1))]

  setState({ noteToGuess })

  speak(t(noteToGuess))

  window.clearInterval(interval)
  interval = setInterval(() => {
    setState(({ score }) => ({ score: score - 1 }))
  }, TIME_TO_RESPOND)
}

document.body.addEventListener(GO_TO_NEXT_EVENT, pickNote)

document.body.addEventListener(RESPONDED_EVENT, () => {
  window.clearInterval(interval)
  setTimeout(pickNote, PAUSE_AFTER_RESPONSE)
})

document.body.addEventListener(VOICE_INIT, pickNote)
