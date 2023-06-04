import { useReducer } from "react"

export enum FridgeActionKind {
  SET_INGREDIENT = "SET_INGREDIENT",
}

interface FridgeAction {
  type: FridgeActionKind
  payload: { id: string; quantity: number; unit: string }
}

interface FridgeState {
  fridge: Record<string, { quantity: number; unit: string }>
}

function fridgeReducer(state: FridgeState, action: FridgeAction): FridgeState {
  const { type, payload } = action
  switch (type) {
    case FridgeActionKind.SET_INGREDIENT:
      const existing = state.fridge[payload.id]

      if (existing && !payload.quantity) {
        const { [payload.id]: val, ...rest } = state.fridge
        return { fridge: rest }
      } else if (payload.quantity) {
        return {
          fridge: {
            ...state.fridge,
            [payload.id]: { quantity: payload.quantity, unit: payload.unit },
          },
        }
      } else {
        console.log(state)
        return state
      }
    default:
      console.log(state)
      return state
  }
}

export function useFridge() {
  return useReducer(fridgeReducer, { fridge: {} })
}
