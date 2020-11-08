import { BaseAction } from "../types"

export type Writing = {
    id: string
    content: string
    createdAt: number
    updatedAt: number
}

export type WritingsAction = BaseAction

export type WritingsState = {
    list: {
        data: Writing[]
        page: number
        pageSize: number
        totalSize: number
    }
    detail?: Writing
}
