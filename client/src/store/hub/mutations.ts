import { HubStateType } from "./types";

export const SET_SEARCH_VALUE = (state: HubStateType, value: string) => {
  state.search.value = value
}

export const CLEAR_SEARCH = (state: HubStateType) => {
  state.search.value = ''
  state.search.result = {}
}

export const SET_SEARCH_RESULT = (state: HubStateType, result: any) => {
  state.search.result.total = result?.total || 0
  state.search.result.channels = result?.channels || []
}