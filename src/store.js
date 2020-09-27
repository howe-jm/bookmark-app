import api from './api';

let STORE = [];
let FORMDATA = {
  title: '',
  url: '',
  rating: 1,
  desc: '',
};

let EDITFORMDATA = {
  title: '',
  url: '',
  rating: 1,
  desc: '',
};

let addingBookmark = false;
let editingBookmark = false;
let sortedBy = '1';
let httpsError = 0;
let incompleteForm = 0;
let editHttpsError = 0;
let editIncompleteForm = 0;

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

function filterResultsBy() {
  this.STORE = this.STORE.filter((currentItem) => currentItem.rating >= this.sortedBy);
}

function getItemURL(id) {
  let item = this.findById(id);
  return item.url;
}

export default {
  STORE,
  FORMDATA,
  EDITFORMDATA,
  addingBookmark,
  editingBookmark,
  sortedBy,
  httpsError,
  incompleteForm,
  editHttpsError,
  editIncompleteForm,
  collapseElement,
  findById,
  deleteElement,
  addElement,
  localPushItem,
  editElement,
  filterResultsBy,
  getItemURL,
};
