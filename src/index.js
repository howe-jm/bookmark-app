import $ from 'jquery';
import css from './index.css';
import templates from './templates';
import store from './store';
import bookmarks from './bookmarks';

function main() {
  bookmarks.addButtonListener();
  bookmarks.submitButtonListener();
  bookmarks.filterButtonListener();
  bookmarks.bookmarkClickListener();
  bookmarks.bookmarkDeleteListener();
  bookmarks.render();
}

$(main());
