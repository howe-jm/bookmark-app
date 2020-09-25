import cuid from 'cuid';
import api from './api';

const STORE = [];

const addingBookmark = false;
const editBookmark = false;

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
}

function deleteElement(id) {
  this.STORE = this.STORE.filter((currentItem) => currentItem.id !== id);
}

export default {
  STORE,
  addingBookmark,
  editBookmark,
  collapseElement,
  findById,
  deleteElement,
  addElement,
  localPushItem,
  editElement,
};
