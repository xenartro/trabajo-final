import User from 'models/User';

let currentUser = null;

export function getUser() {
  if (currentUser) {
    return currentUser;
  }

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser) {
    currentUser = new User(storedUser);
  }

  return currentUser;
}

export function setUser(user) {
  currentUser = new User(user);

  localStorage.setItem('user', JSON.stringify(user));

  return currentUser;
}
