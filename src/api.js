function fetchBookmarks() {
  return fetch(`https://thinkful-list-api.herokuapp.com/howe-jm/bookmarks/`);
}

function addItem(obj) {
  const newItem = JSON.stringify(obj);

  return fetch(`https://thinkful-list-api.herokuapp.com/howe-jm/bookmarks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newItem,
  });
}

function editItem(obj, id) {
  const newItem = JSON.stringify(obj);

  return fetch(`https://thinkful-list-api.herokuapp.com/howe-jm/bookmarks/` + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newItem,
  });
}

function deleteItem(id) {
  return fetch(`https://thinkful-list-api.herokuapp.com/howe-jm/bookmarks/` + id, {
    method: 'DELETE',
  });
}

export default {
  fetchBookmarks,
  addItem,
  deleteItem,
  editItem,
};
