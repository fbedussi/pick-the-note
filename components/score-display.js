import { subscribeStateChange } from '../state.js'

class ScoreDisplay extends HTMLElement {
  constructor() {
    super()

    subscribeStateChange({
      score: (score) => {
        this.innerText = score
      },
    })
  }
}

customElements.define('score-display', ScoreDisplay)
