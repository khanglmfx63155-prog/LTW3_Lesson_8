import { local_key, getItemFromLocal } from "../services/localStorage.js";
import { Blog } from "../models/blog.js";

const rawData = getItemFromLocal(local_key.BLOGS);

const blogs = rawData.map(
  (item) => new Blog(item.id, item.title, item.author, item.content, item.time)
);

function createItem(data) {
  let div = document.createElement("div");
  div.className = "blog-item";

  div.innerHTML = `
    <img src="${data.image}" class="thumb">
    <div class="content">
      <h3>${data.title}</h3>
      <p class="author">Tác giả: ${data.author}</p>
      <p class="time">${data.time}</p>
      <p>${data.content}</p>
    </div>
  `;

  return div;
}

function renderBlog(datas) {
  let container = document.getElementById("blog-container");
  container.innerHTML = "";

  datas.forEach((item) => {
    container.appendChild(createItem(item));
  });
}

renderBlog(blogs);

let addBtn = document.getElementById("add-btn");

if (addBtn) {
  addBtn.addEventListener("click", () => {
    let newBlog = {
      title: "Bài mới",
      author: "Bạn",
      time: new Date().toLocaleDateString(),
      content: "Nội dung mới...",
      image: "https://picsum.photos/200/120?random",
    };

    let data = getItemFromLocal(local_key.BLOGS);
    data.push(newBlog);

    localStorage.setItem(local_key.BLOGS, JSON.stringify(data));
    renderBlog(blogs);
  });
}
