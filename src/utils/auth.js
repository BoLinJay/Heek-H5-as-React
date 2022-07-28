const TokenKey = "heek-h5";

export function getToken() {
  return JSON.parse(localStorage.getItem(TokenKey));
}

export function setToken(token) {
  localStorage.setItem(TokenKey, JSON.stringify(token));
}

export function removeToken() {
  return JSON.parse(localStorage.removeItem(TokenKey));
}
