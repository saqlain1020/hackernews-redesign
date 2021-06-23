import { auth } from "./firebase";

export const login = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location = "/";
  } catch (err) {
    alert(err.message);
  }
};

export const signup = async (name, email, password) => {
  try {
    let {
      user: { uid },
    } = await auth.createUserWithEmailAndPassword(email, password);
    await auth.currentUser.updateProfile({
      displayName: name,
    });
    console.log(uid)
    window.location = "/";
  } catch (err) {
    alert(err.message);
  }
};
