//render chats to DOM

class ChatUI {
  constructor(list) {
    this.list = list;
  }
  clear() {
    this.list.innerHTML = "";
  }
  render(data, id) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true
    });
    const html = `
        <li class="list-group-item" data-id="${id}">    
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <i class="fas fa-thumbs-down thumb"></i>
            <i class="fas fa-heart heart"></i>
            <i class="fas fa-trash-alt delete"></i>
            <div class="time">${when}</div>
            
        </li>
          `;
    this.list.innerHTML += html;
  }
}
