import { notes } from '../../consts.js'
import { speak } from '../../speak.js'
import { t } from '../../i18n.js'
import { getState, setState, subscribeStateChange } from '../../state.js'
import { RespondedEvent } from '../../events.js'

const startIndexMap = {
  1: 7,
  2: 2,
  3: 10,
  4: 5,
  5: 0,
  6: 7,
}

class StringBar extends HTMLElement {
  constructor() {
    super()

    this.addEventListener('click', this.handleClick.bind(this))

    this.disabled = true

    subscribeStateChange({
      noteToGuess: () => {
        this.innerText = ''
        this.classList.remove('right')
        this.classList.remove('wrong')
      },
      enableResponse: (enableResponse) => {
        this.disabled = !enableResponse
      },
    })
  }

  handleClick = () => {
    if (this.disabled) {
      return
    }
    setState({ enableResponse: false })
    const bar = Number(this.getAttribute('bar'))
    const string = Number(this.getAttribute('string'))

    const startIndex = startIndexMap[string]
    const index = (startIndex + bar) % notes.length
    const note = notes[index]

    const right = getState().noteToGuess === note

    this.innerText = t(note).replace(' diesis', '#')
    this.classList.add(right ? 'right' : 'wrong')

    speak(right ? t('right') : t('wrong'))

    setState(({ score }) => ({ score: (score += right ? 1 : -1) }))

    document.body.dispatchEvent(new RespondedEvent())
  }
}

customElements.define('string-bar', StringBar)
