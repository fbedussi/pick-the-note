import { SELECTED_VOICE_KEY } from './consts.js'
import { getState, setState } from './state.js'

const synth = window.speechSynthesis

const utterance = new SpeechSynthesisUtterance()
utterance.rate = 0.8

export const checkVoiceLang = (voice, lang) =>
  voice.lang.substring(0, 2) === lang

export const setSelectedVoice = (voice) => {
  window.localStorage.setItem(SELECTED_VOICE_KEY, voice.voiceURI)
  utterance.voice = voice
  setState({ language: checkVoiceLang(voice, 'it') ? 'ita' : 'eng' })
}

export const speak = (text) => {
  if (getState().audioOn) {
    utterance.text = text
    synth.speak(utterance)
  }
}

export const isSpeaking = () => synth.speaking
