import cuid from 'cuid';

const STORE = [];

const addingBookmark = false;
const editBookmark = false;

function findById(id) {
  return this.STORE.find((currentItem) => currentItem.id === id);
}

function addElement(obj) {
  this.STORE.push(obj);
}

function collapseElement(id) {
  let newItem = this.findById(id);
  Object.assign(newItem, { collapsed: !newItem.collapsed });
}

function deleteElement(id) {
  this.STORE = this.STORE.filter((currentItem) => currentItem.id !== id);
}

function editElement(id, newdata) {
  let item = this.findById(id);
  Object.assign(item, newData);
}

export default {
  STORE,
  addingBookmark,
  editBookmark,
  collapseElement,
  findById,
  deleteElement,
  addElement,
  editElement,
};
