const petList = (state = [], action) => {
    switch (action.type) {
        case 'SET_PETS':
        return action.payload;
        case 'UNSET_USER':
        return [];
        default:
        return state;
    }
};

// pet list will be on the redux state at:
// state.petList
export default petList;