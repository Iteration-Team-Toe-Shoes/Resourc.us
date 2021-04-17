/* eslint-disable no-case-declarations */
export const initialState = {
  user: {
    isLoggedIn: false,
    firstName: '',
    lastName: '',
    emailAddress: '',
    googleId: '',
    teamList: [],
    id: null,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        user: action.item,
      };
    case 'UNAUTH_USER':
      return {
        ...state,
        user: {
          isLoggedIn: false,
          firstName: '',
          lastName: '',
          emailAddress: '',
          googleId: '',
          teamList: [],
          id: null,
        },
      };
    case 'JOIN_TEAM':

      return {
        ...state,
        user: action.item,
      }
    case 'LEAVE_TEAM':

      return {
        ...state,
        user: action.item,
      }
    default:
      return state;
  }
};

export default reducer;
