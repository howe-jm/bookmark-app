import $ from 'jquery';
import css from './index.css';
import templates from './templates';
import store from './store';
import bookmarks from './bookmarks';
import api from './api';

function main() {
  bookmarks.addButtonListener();
  bookmarks.submitButtonListener();
  bookmarks.filterButtonListener();
  bookmarks.bookmarkClickListener();
  bookmarks.bookmarkDeleteListener();
  api
    .fetchBookmarks()
    .then((res) => res.json())
    .then((items) => {
      items.forEach((item) => store.localPushItem(item));
      bookmarks.render();
    });

  bookmarks.render();
}

$(main());
