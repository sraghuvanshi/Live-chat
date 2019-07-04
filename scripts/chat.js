//adding a new chat
//setting up a real-time listener to get new chat
//updating the username
//updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }
  async addChat(message) {
    //format of chat
    const now = new Date();
    const chat = {
      message,
      room: this.room,
      username: this.username,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // save the chat doc
    const response = await this.chats.add(chat);
    return response;
  }
  //setting up a real-time listener to get new chat
  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            // update the ui
            callback(change.doc.data(), change.doc.id);
          } else if (change.type == "removed") {
            // console.log(`removed found`);
            const list = document.querySelectorAll("li");
            list.forEach(eachList => {
              if (eachList.getAttribute("data-id") === change.doc.id) {
                eachList.remove();
              }
            });
          }
        });
      });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    // console.log(`Room Updated`);
    if (this.unsub) {
      this.unsub;
    }
  }
}
