import { db } from '../../utils/firebase/base';

const chargeActions = {
  SET_LOADING: {
    type: 'SET_LOADING',
    defaultAction: (state, payload) => {
      console.log('SET_LOADING');

      return { ...state, loading: payload };
    }
  },

  get_charges_lists_from_db: {
    type: 'get_charges_lists_from_db',

    getChargesListCollectionRef: email => {
      return db
        .collection('chargesLists')
        .where('email', '==', email)
        .get();
    }
  },

  SET_CHARGES_LISTS: {
    type: 'SET_CHARGES_LISTS',

    defaultAction: (state, payload) => {
      console.log('SET_CHARGES_LISTS');
      return { ...state, chargesLists: payload };
    }
  },

  SET_CHARGES_LIST: {
    type: 'SET_CHARGES_LIST',

    defaultAction: (state, payload) => {
      console.log('SET_CHARGES_LIST');
      return { ...state, chargesList: { ...state.chargesList, ...payload } };
    }
  }
};

export default chargeActions;
