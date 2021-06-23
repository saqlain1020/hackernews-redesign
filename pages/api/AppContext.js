import { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "./firebase";

const AppContext = createContext();

export function AppWrapper({ children }) {
  let [sharedState, setState] = useState({});

  useEffect(() => {
    fetchSubreddits();
  }, []);

  const fetchSubreddits = async () => {
    try {
      let querySnapShot = await firestore.collection("subreddits").get();
      let subreddits = [];
      querySnapShot.forEach((doc) => {
        let obj = doc.data();
        obj.id = doc.id;
        subreddits.push(obj);
      });
      console.log(subreddits);
      setState({
        fetchSubreddits,
        subreddits,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
