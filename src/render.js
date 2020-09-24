import $ from 'jquery';
import templates from './templates';

function render() {
  $('#bookmarks-toolbar').html(templates.toolbarTemplate());
  $('#bookmarks-list').html(templates.bookmarksList());
}

export default {
  render,
};
