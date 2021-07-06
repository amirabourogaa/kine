import {
  USER_STATE_CHANGE,
  USERS_STATE,
  REMOVE_USER,
  TOGGLE_LOAD,
  USER_ERRORS,
} from "../constants/index";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export function fetchUser() {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_LOAD });
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const userId = snapshot.id;
          dispatch({
            type: USER_STATE_CHANGE,
            currentUser: { ...snapshot.data(), userId },
          });
        } else {
          dispatch({ type: USER_STATE_CHANGE, currentUser: null });
        }
      })
      .catch((err) => {
        dispatch({ type: USER_ERRORS, errors: err });
      });
  };
}

export const fetchVideos = () => {
  firebase
    .firestore()
    .collection("videos")
    .where("iduser", "==", "12")
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.exists) {
        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot.data());
        });
      }
    })
    .catch((err) => {
      // console.log(err)
    });
};

export const UpdateUser = (user) => {
  return (dispatch) => {
    dispatch({ type: USER_STATE_CHANGE, currentUser: user });
  };
};

export const FetchUsers = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .where("role", "==", "client")
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((documentSnapshot) => {
          const userId = documentSnapshot.id;
          const userData = documentSnapshot.data();
          users.push({ ...userData, userId });
        });
        dispatch({ type: USERS_STATE, users: users });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
};

export const RemoveUser = ({ userId }) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .delete()
      .then(() => {
        dispatch({ type: REMOVE_USER, userId });
      })
      .catch((err) => {
        // console.log(err)
      });

    firebase.auth().currentUser();
  };
};
