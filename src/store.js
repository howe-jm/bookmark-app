import cuid from 'cuid';

const STORE = [];

const addingBookmark = false;

function findById(id) {
  return this.STORE.find((currentItem) => currentItem.id === id);
}

function addElement(siteName, siteUrl, siteDescription, siteRating) {
  STORE.push({
    id: cuid(),
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    rating: siteRating,
    collapsed: true,
  });
}

function collapseElement(id) {
  let item = this.findById(id);
  item.collapsed = !item.collapsed;
}

function deleteElement(id) {
  this.STORE = this.STORE.filter((currentItem) => currentItem.id !== id);
}

export default {
  STORE,
  addingBookmark,
  collapseElement,
  findById,
  deleteElement,
  addElement,
};
