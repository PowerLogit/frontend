import { EDIT_FORM_ACTION } from '../constant/editForm.action'
import {
    validateName,
    validateReps,
    validateSets,
    validateWeight,
} from '../validations/workout.validation'

export const editFormReducer = (state, { type, payload }) => {
    switch (type) {
        case EDIT_FORM_ACTION.SET_NAME: {
            const error = validateName(payload)

            return {
                ...state,
                name: { value: payload, error },
            }
        }

        case EDIT_FORM_ACTION.SET_SETS: {
            const error = validateSets(payload)

            return {
                ...state,
                sets: { value: payload, error },
            }
        }

        case EDIT_FORM_ACTION.SET_REPS: {
            const error = validateReps(payload)

            return {
                ...state,
                reps: { value: payload, error },
            }
        }

        case EDIT_FORM_ACTION.SET_WEIGHT: {
            const error = validateWeight(payload)

            return {
                ...state,
                weight: { value: payload, error },
            }
        }

        case EDIT_FORM_ACTION.SET_DATE:
            return {
                ...state,
                date: payload,
            }

        case EDIT_FORM_ACTION.SET_IS_SUCCESSFUL:
            return {
                ...state,
                isSuccessful: payload,
            }

        default:
            throw new Error('Invalid action type')
    }
}
