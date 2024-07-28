export interface GeneratePromptBody {
  social: string
  subject: string
  tone: string
}

export interface SaveCaptionBody {
  idea?: string
  captions: string[]
}

export interface CaptionPayloadResponse {
  captionId: string
  caption:string
}
export interface SaveContentResponse {
  idea?: string
  captions: CaptionPayloadResponse[]
  ideaId?: string
}