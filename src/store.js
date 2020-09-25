import cuid from 'cuid';
import api from './api';

const STORE = [];

const addingBookmark = false;
const editingBookmark = false;
let sortedBy = '1';

function findById(id) {
  return this.STORE.find((currentItem) => currentItem.id === id);
}

function localPushItem(obj) {
  obj.collapsed = true;
  obj.editing = false;
  this.STORE.push(obj);
}

function addElement(obj) {
  api.createItem(obj);
}

function collapseElement(id) {
  let newItem = this.findById(id);
  Object.assign(newItem, { collapsed: !newItem.collapsed });
}

function editElement(id) {
  let newItem = this.findById(id);
  Object.assign(newItem, { editing: true });
  editingBookmark;
}

function deleteElement(id) {
  this.STORE = this.STORE.filter((currentItem) => currentItem.id !== id);
}

function filterResultsBy(val) {
  this.STORE = this.STORE.filter((currentItem) => currentItem.rating >= this.sortedBy);
}

function getItemURL(id) {
  let item = this.findById(id);
  return item.url;
}

export default {
  STORE,
  addingBookmark,
  editingBookmark,
  sortedBy,
  collapseElement,
  findById,
  deleteElement,
  addElement,
  localPushItem,
  editElement,
  filterResultsBy,
  getItemURL,
};
