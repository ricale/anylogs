export type StatusMessage = {
    type: 'success' | 'failure'
    content: string
    timestamp: number
}

export type StatusState = {
    message?: StatusMessage
}
