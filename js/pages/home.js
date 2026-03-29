import { local_key, getItemFromLocal } from "../services/localStorage.js";
import { Blog } from "../models/blog.js";

// 1. Lấy dữ liệu và khởi tạo danh sách blog ban đầu
const rawData = getItemFromLocal(local_key.BLOGS);
let blogs = rawData.map(
  (item) =>
    new Blog(item.title, item.author, item.time, item.content, item.image)
);

// 2. Hàm tạo thẻ HTML cho từng bài viết
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

// 3. Hàm hiển thị danh sách Blog lên màn hình
function renderBlog(datas) {
  let container = document.getElementById("blog-container");

  // Lấy cái nút cây bút ra để giữ lại, không cho nó bị xóa
  let addBtn = document.querySelector(".btn-edit");

  // Xóa trắng khung chứa để vẽ lại danh sách mới
  container.innerHTML = "";

  // Cài đặt vị trí cho khung chứa và nút bấm (để nút nằm góc trên phải)
  container.style.position = "relative";
  container.style.paddingTop = "40px"; // Tạo khoảng trống phía trên cho nút

  if (addBtn) {
    container.appendChild(addBtn); // Gắn nút vào lại container
    addBtn.style.position = "absolute";
    addBtn.style.top = "10px";
    addBtn.style.right = "10px";
    addBtn.style.zIndex = "1000"; // Luôn nổi trên các tấm ảnh
  }

  // Vẽ từng bài viết vào container
  datas.forEach((item) => {
    container.appendChild(createItem(item));
  });
}

// Chạy hàm render lần đầu khi mở trang
renderBlog(blogs);

// 4. Xử lý khi người dùng bấm nút cây bút để tạo bài mới
let addBtn = document.querySelector(".btn-edit");

if (addBtn) {
  addBtn.addEventListener("click", () => {
    // Hiện các ô nhập liệu (Prompt)
    let title = prompt("Nhập tiêu đề bài viết:");
    if (!title) return; // Thoát nếu người dùng bấm Cancel

    let author = prompt("Nhập tên tác giả:");
    if (!author) return;

    let content = prompt("Nhập nội dung bài viết:");
    if (!content) return;

    // Yêu cầu nhập link ảnh
    let imageUrl = prompt(
      "Dán link ảnh của bạn vào đây (nếu để trống sẽ dùng ảnh mặc định):"
    );

    // Nếu người dùng không nhập link ảnh, dùng một ảnh mặc định
    if (!imageUrl || imageUrl.trim() === "") {
      imageUrl = "https://picsum.photos";
    }

    // Tự động lấy ngày hiện tại
    let today = new Date().toLocaleDateString("vi-VN");

    // Tạo đối tượng Blog mới
    let newBlog = new Blog(title, author, today, content, imageUrl);

    // Cập nhật vào Local Storage
    let currentData = getItemFromLocal(local_key.BLOGS);
    currentData.unshift(newBlog); // Đưa bài mới lên ĐẦU danh sách
    localStorage.setItem(local_key.BLOGS, JSON.stringify(currentData));

    // Vẽ lại màn hình với dữ liệu mới nhất
    renderBlog(currentData);

    alert("Đã đăng bài viết mới của bạn!");
  });
}
