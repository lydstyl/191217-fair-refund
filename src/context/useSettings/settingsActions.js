// import { db } from '../../utils/firebase/base';

const settingsActions = {
  SET_LANGUAGE: {
    type: 'SET_LANGUAGE',
    defaultAction: (state, payload) => {
      console.log('SET_LANGUAGE');

      return { ...state, lang: payload };
    }
  }
};

export default settingsActions;
