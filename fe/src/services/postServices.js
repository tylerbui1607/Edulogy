import { constants as c } from "../constants";
function getAllPosts() {
  let requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${c.apiUrl}/posts`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function getTrendingPosts() {
  let requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${c.apiUrl}/posts/hot`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
export const postServices = { getAllPosts, getTrendingPosts };
