export type StatusState = {
    message?: {
        type: 'success' | 'failure'
        content: string
        timestamp: number
    }
}
