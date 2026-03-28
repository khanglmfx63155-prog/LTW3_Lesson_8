import { Blog } from "../models/blog.js";

export const local_key = {
  BLOGS: "blog_data_v2",
};

const blog_data = [
  new Blog(
    "Nước Ý thật đẹp",
    "Nam Cao",
    "1/2/2004",
    "Nước Ý là 1 nơi tuyệt vời nhất mà tôi đã từng đật chân tới",
    "./assets/italy.jpg"
  ),
  new Blog(
    "Nước Pháp thật Lãng mạn",
    "Văn Cao",
    "13/12/2024",
    "Nước Pháp là một đất nước lãng mạn nhất thế giới",
    "./assets/france.jpg"
  ),

  new Blog(
    "Món gà KFC",
    "Cao Cao",
    "13/11/2014",
    "Món gà KFC thật là ngon! Ăn rất là đã",
    "./assets/kfc.jpg"
  ),
  new Blog(
    "Nước Ý thật đẹp",
    "Nam Cao",
    "1/2/2004",
    "Nước Ý là 1 nơi tuyệt vời nhất mà tôi đã từng đật chân tới",
    "./asset/italy.jpg"
  ),
  new Blog(
    "Nước Pháp thật Lãng mạn",
    "Văn Cao",
    "13/12/2024",
    "Nước Pháp là một đất nước lãng mạn nhất thế giới",
    "./asset/france.jpg"
  ),

  new Blog(
    "Món gà KFC",
    "Cao Cao",
    "13/11/2014",
    "Món gà KFC thật là ngon! Ăn rất là đã",
    "./asset/kfc.jpg"
  ),
];

// Lay  du lieu blog tu local storage
export function getItemFromLocal(key) {
  let data = localStorage.getItem(key);

  if (!data) {
    data = JSON.stringify(blog_data);
    localStorage.setItem(key, data);
  }
  return JSON.parse(data);
}
