// dom queries
const chatlist = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

//Like button
chatlist.addEventListener("click", e => {
  if (e.target.classList.contains("heart")) {
    e.target.classList.toggle("red");
    e.target.parentElement.classList.toggle("redBorder");
  }
});

// dislike button
chatlist.addEventListener("click", e => {
  if (e.target.classList.contains("thumb")) {
    e.target.classList.toggle("blue");
    e.target.parentElement.classList.toggle("greyBorder");
  }
});

// delete from database
chatlist.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.parentElement.getAttribute("data-id");

    db.collection("chats")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Chat deleted");
      })
      .catch(err => {
        console.log(err);
      });
  }
});

// add new chat
newChatForm.addEventListener("submit", e => {
  // prevent defaults
  e.preventDefault();

  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// update name
newNameForm.addEventListener("submit", e => {
  e.preventDefault();

  //   update name via chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // reset form
  newNameForm.reset();
  // show update mssg
  updateMssg.innerText = `Your name was updated to ${newName}`;
  // show update mssg
  setTimeout(() => {
    updateMssg.innerText = "";
  }, 3000);
});

// uppdate chat room
rooms.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat, id) => chatUI.render(chat, id));
  }
});

// check local storage for a name
const name = localStorage.username ? localStorage.username : "Anonymous";

// class instance
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom("general", name);

// get chats and render
chatroom.getChats((data, id) => chatUI.render(data, id));
