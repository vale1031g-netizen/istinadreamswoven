const groupList = document.getElementById("groupList");
const groupNameInput = document.getElementById("groupName");
const createGroupBtn = document.getElementById("createGroup");

const chatHeader = document.getElementById("chatHeader");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const imageInput = document.getElementById("imageInput");
const sendBtn = document.getElementById("sendBtn");

let groups = JSON.parse(localStorage.getItem("groups")) || [];
let currentGroup = null;

function saveGroups() {
  localStorage.setItem("groups", JSON.stringify(groups));
}

function renderGroups() {
  groupList.innerHTML = "";

  groups.forEach((group, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-light px-3 py-2 rounded cursor-pointer";

    const name = document.createElement("span");
    name.textContent = group.name;
    name.onclick = () => selectGroup(index);

    const del = document.createElement("button");
    del.textContent = "Eliminar";
    del.className = "text-xs text-red-600";
    del.onclick = () => deleteGroup(index);

    li.appendChild(name);
    li.appendChild(del);
    groupList.appendChild(li);
  });
}

createGroupBtn.onclick = () => {
  const name = groupNameInput.value.trim();
  if (!name) return;

  groups.push({ name, messages: [] });
  groupNameInput.value = "";
  saveGroups();
  renderGroups();
};

function deleteGroup(index) {
  if (!confirm("¿Eliminar este grupo?")) return;
  groups.splice(index, 1);
  currentGroup = null;
  chatHeader.textContent = "Selecciona un grupo";
  chatMessages.innerHTML = "";
  saveGroups();
  renderGroups();
}

function selectGroup(index) {
  currentGroup = groups[index];
  chatHeader.textContent = currentGroup.name;
  renderMessages();
}

/* ---------- MENSAJES ---------- */
function sendMessage(image = null) {
  if (!currentGroup) return;

  const text = chatInput.value.trim();

  if (!text && !image) return;

  currentGroup.messages.push({
    text: text || "",
    image: image || null,
    time: new Date().toLocaleTimeString()
  });

  chatInput.value = "";
  imageInput.value = "";
  saveGroups();
  renderMessages();
}

sendBtn.onclick = () => sendMessage();

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

imageInput.addEventListener("change", () => {
  if (!currentGroup) return;

  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => sendMessage(reader.result);
  reader.readAsDataURL(file);
});

function renderMessages() {
  chatMessages.innerHTML = "";

  currentGroup.messages.forEach((msg, index) => {
    const div = document.createElement("div");
    div.className = "bg-light p-3 rounded-xl relative max-w-sm";

    if (msg.image) {
      const img = document.createElement("img");
      img.src = msg.image;
      img.className = "rounded mb-2";
      div.appendChild(img);
    }

    if (msg.text) {
      const p = document.createElement("p");
      p.textContent = msg.text;
      div.appendChild(p);
    }

    const time = document.createElement("span");
    time.textContent = msg.time;
    time.className = "block text-xs text-gray-500 mt-1";

    const del = document.createElement("button");
    del.textContent = "Eliminar";
    del.className = "absolute top-1 right-2 text-xs text-red-600";
    del.onclick = () => deleteMessage(index);

    div.appendChild(time);
    div.appendChild(del);
    chatMessages.appendChild(div);
  });

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function deleteMessage(index) {
  currentGroup.messages.splice(index, 1);
  saveGroups();
  renderMessages();
}

renderGroups();