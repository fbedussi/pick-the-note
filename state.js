import { AUDIO_ON_KEY } from './consts.js'

let state = {
  language: 'ita',
  audioOn: window.localStorage.getItem(AUDIO_ON_KEY) === 'true',
  score: 0,
  noteToGuess: '',
}

const subscriptions = []

export const subscribeStateChange = (subscription) => {
  if (!subscriptions.includes(subscription)) {
    subscriptions.push(subscription)
  }
}

export const setState = (update) => {
  const newState = typeof update === 'function' ? update(state) : update

  state = {
    ...state,
    ...newState,
  }

  Object.keys(newState).forEach((slice) => {
    subscriptions
      .filter((subscription) => Object.keys(subscription).includes(slice))
      .forEach((subscription) => {
        subscription[slice](state[slice])
      })
  })
}

export const getState = () => state
