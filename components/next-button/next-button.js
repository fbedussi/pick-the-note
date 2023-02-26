import { GoToNextEvent } from '../../events.js'

class NextButton extends HTMLButtonElement {
  constructor() {
    super()

    this.addEventListener('click', () => {
      document.body.dispatchEvent(new GoToNextEvent())
    })
  }
}

customElements.define('next-button', NextButton, {
  extends: 'button',
})
