import { t } from '../i18n.js'
import { subscribeStateChange } from '../state.js'

class RequiredNote extends HTMLElement {
  constructor() {
    super()

    subscribeStateChange({
      noteToGuess: (noteToGuess) => {
        this.innerText = t(noteToGuess).replace(' diesis', '#')
      },
    })
  }
}

customElements.define('required-note', RequiredNote)
