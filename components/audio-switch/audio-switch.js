import { getState, setState } from '../../state.js'
import { AUDIO_ON_KEY } from '../../consts.js'

class AudioSwitch extends HTMLLabelElement {
  constructor() {
    super()

    this.input = this.querySelector('input')

    if (getState().audioOn) {
      this.input.checked = true
    }

    this.input.addEventListener('change', (e) => {
      setState({ audioOn: e.target.checked })
      window.localStorage.setItem(AUDIO_ON_KEY, e.target.checked)
    })
  }
}

customElements.define('audio-switch', AudioSwitch, {
  extends: 'label',
})
