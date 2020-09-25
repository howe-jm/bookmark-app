function fetchBookmarks() {
  return fetch(`https://thinkful-list-api.herokuapp.com/howe-jm/bookmarks`);
}

function addItem(obj) {
  const newItem = JSON.stringify(obj);

  return fetch(`https://thinkful-list-api.herokuapp.com/howe-jm/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newItem,
  });
}

export default {
  fetchBookmarks,
  addItem,
};
