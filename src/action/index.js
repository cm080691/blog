import _ from "lodash";
import jsonPlaceHolder from "../apis/jsonPlaceHolder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts()); // await will wait till /posts call
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach((id) => dispatch(fetchUser(id)));

  //optional refactor to line 6-7
  // _.chain(getState().posts) //chain is lodash method
  //   .map('userId')
  //   .uniq()
  //   .forEach(id => dispatch(fetchUser(id)));
  //   .value()
};

export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await jsonPlaceHolder.get("/posts");

    dispatch({
      type: "FETCH_POSTS",
      payload: response.data,
    });
  };
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceHolder.get(`/users/${id}`);

  dispatch({
    type: "FETCH_USER",
    payload: response.data,
  });
};

// _.memoize version for stopping to recall
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);
// _fetchUser is private funciton
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceHolder.get(`/users/${id}`);

//   dispatch({
//     type: "FETCH_USER",
//     payload: response.data,
//   });
// });

// export const fetchPosts = () => async dispatch => {
//       const response = await jsonPlaceHolder.get("/posts");

//       dispatch({
//         type: "FETCH_POSTS",
//         payload: response,
//       });
//   }; we could write this way as well in es2015
