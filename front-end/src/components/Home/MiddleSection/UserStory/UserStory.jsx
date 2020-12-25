import React, { useEffect } from "react";
import { projectFirestore } from "../../../../firebase/config";
import FriendsStories from "./FriendsStories/FriendsStories";
import "./UserStory.css";
import YourOwnStory from "./YourOwnStory/YourOwnStory";

const UserStory = ({ username }) => {
  useEffect(() => {
    projectFirestore
      .collection("users")
      .doc(username)
      .collection("story")
      .doc(username + "story")
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (new Date() > new Date(doc.data().expiredAt.substring(0, 24))) {
            doc.ref.delete();
          }
        }
      });
    const x = setInterval(() => {
      projectFirestore
        .collection("users")
        .doc(username)
        .collection("story")
        .doc(username + "story")
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (new Date() > new Date(doc.data().expiredAt.substring(0, 24))) {
              doc.ref.delete();
            }
          } else {
            clearInterval(x);
          }
        });
    }, 3000);
  }, []);
  return (
    <div className="userStory">
      <div className="youOWN__story">
        <YourOwnStory username={username} />
      </div>
      <FriendsStories username={username} />
    </div>
  );
};

export default UserStory;
