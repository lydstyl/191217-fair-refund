import { db } from '../../utils/firebase/base';

const chargeActions = {
  SET_LOADING: {
    type: 'SET_LOADING',
    defaultAction: (state, payload) => {
      console.log('SET_LOADING');

      return { ...state, loading: payload };
    }
  },

  GET_CHARGES_LISTS_FROM_DB: {
    type: 'GET_CHARGES_LISTS_FROM_DB',

    getChargesListCollectionRef: () => {
      return db
        .collection('chargesLists')
        .where('email', '==', 'sam@gmail.com')
        .get();
    }
  },

  SET_CHARGES_LISTS: {
    type: 'SET_CHARGES_LISTS',

    defaultAction: (state, payload) => {
      console.log('SET_CHARGES_LISTS');
      return { ...state, chargesLists: payload };
    }
  }
};

export default chargeActions;
