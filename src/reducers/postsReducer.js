export default (state = [], action) => {
  // if (action.type === "FETCH_POSTS") {
  //   return action.payload;
  // }

  // return state;
  // instead use "Switch Case"
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    default:
      return state;
  }
};
