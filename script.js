const display = document.querySelector('.display')
const voiceSelect = document.querySelector('.voice-select')
const required = document.querySelector('.required')
const played = document.querySelector('.played')
const points = document.querySelector('.points')
const next = document.querySelector('.next')
const neck = document.querySelector('.neck')

let language = 'ita'

const SELECTED_VOICE_KEY = 'pick-a-note_selected-voice'

const utterance = new SpeechSynthesisUtterance()
utterance.rate = 0.8

const speak = (text) => {
  utterance.text = text
  synth.speak(utterance)
}

const checkVoiceLang = (voice, lang) => voice.lang.substring(0, 2) === lang

const setSelectedVoice = (voice) => {
  window.localStorage.setItem(SELECTED_VOICE_KEY, voice.voiceURI)
  utterance.voice = voice
  language = checkVoiceLang(voice, 'it') ? 'ita' : 'eng'
}

const populateVoiceList = () => {
  if (typeof speechSynthesis === 'undefined') {
    return
  }

  const savedSelectedVoice = window.localStorage.getItem(SELECTED_VOICE_KEY)
  const voices = speechSynthesis.getVoices()
  const allowedVoices = voices.filter(
    (voice) => checkVoiceLang(voice, 'it') || checkVoiceLang(voice, 'en'),
  )

  allowedVoices.sort((v1, v2) => v1.lang > v2.lang)

  allowedVoices.forEach((voice) => {
    const option = document.createElement('option')

    option.textContent = `${voice.name} (${voice.lang})`
    if (
      voice.voiceURI === savedSelectedVoice ||
      (!savedSelectedVoice && checkVoiceLang(voice, 'it'))
    ) {
      option.selected = true
      setSelectedVoice(voice)
    }
    option.addEventListener('click', () => {
      setSelectedVoice(voice)
    })

    voiceSelect.appendChild(option)
  })
}

const synth = window.speechSynthesis

synth.addEventListener('voiceschanged', () => {
  populateVoiceList()
})

synth.onvoiceschanged = populateVoiceList

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

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

const startIndexMap = {
  1: 7,
  2: 2,
  3: 10,
  4: 5,
  5: 0,
  6: 7,
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

const t = (key) => (language === 'ita' ? italian[key] : english[key])

let score = 0

let interval

const PAUSE_AFTER_RESPONSE = 1000

const handleClick = (e) => {
  const el = e.target
  const bar = el.dataset.bar
  const string = el.dataset.string

  const startIndex = startIndexMap[string]
  const index = (startIndex + Number(bar)) % notes.length
  const note = notes[index]

  played.innerText = t(note).replace(' diesis', '#')

  const right = noteToGuess === note
  speak(right ? t('right') : t('wrong'))
  score += right ? 1 : -1
  points.innerText = score

  window.clearInterval(interval)
  setTimeout(pickNote, PAUSE_AFTER_RESPONSE)
}

for (let string = 1; string <= 6; string++) {
  for (let bar = 0; bar <= 4; bar++) {
    const button = document.createElement('div')
    button.className = `button string-${string} bar-${bar}`
    button.dataset.bar = bar
    button.dataset.string = string

    button.addEventListener('click', handleClick)
    neck.appendChild(button)
  }
}

let noteToGuess

const TIME_TO_RESPOND = 3000

const pickNote = () => {
  noteToGuess = notes[Math.round(Math.random() * (notes.length - 1))]
  required.innerText = t(noteToGuess).replace(' diesis', '#')
  speak(t(noteToGuess))
  window.clearInterval(interval)
  interval = setInterval(() => {
    score--
    points.innerText = score
  }, TIME_TO_RESPOND)
}

pickNote()

next.addEventListener('click', pickNote)
