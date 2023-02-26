export const GO_TO_NEXT_EVENT = 'go-to-next'
export class GoToNextEvent extends CustomEvent {
  constructor() {
    super(GO_TO_NEXT_EVENT)
  }
}

export const RESPONDED_EVENT = 'responded'
export class RespondedEvent extends CustomEvent {
  constructor() {
    super(RESPONDED_EVENT)
  }
}

export const VOICE_INIT = 'voice-init'
export class VoiceInitEvent extends CustomEvent {
  constructor() {
    super(VOICE_INIT)
  }
}
