import { createStore } from 'redux'
const defaultState = {
    location: ''
};
function chatStore(state = defaultState, action) {
    switch (action.type) {
        case "LOCATION":
            return {
                ...state,
                email: action.payload.location,
                
            };
        default:
            return state;
    }
}
export default createStore(chatStore);