import { SELECTED_VOICE_KEY } from '../consts.js'
import { VoiceInitEvent } from '../events.js'
import { checkVoiceLang, setSelectedVoice } from '../speak.js'
import { subscribeStateChange } from '../state.js'

class VoiceSelect extends HTMLSelectElement {
  constructor() {
    super()

    const getVoicesInterval = setInterval(() => {
      if (speechSynthesis.getVoices().length) {
        clearInterval(getVoicesInterval)
        this.populateVoiceList()
        document.body.dispatchEvent(new VoiceInitEvent())
      }
    }, 50)

    subscribeStateChange({
      audioOn: (audioOn) => {
        this.disabled = !audioOn
      },
    })
  }

  populateVoiceList = () => {
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

      this.appendChild(option)
    })
  }
}

customElements.define('voice-select', VoiceSelect, { extends: 'select' })
