import settingsActions from './settingsActions';

const reducer = (state, action) => {
  // instead of the heavy switch(action.typ){case ...}
  if (action.type) {
    return settingsActions[action.type].defaultAction(state, action.payload);
  }
  return state;
};

export default reducer;
