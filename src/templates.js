function toolbarTemplate() {
  return `<div class="button-container">
        <form><input type="button" id="js-add-new-bookmark" value="Add New" /><input type="button" id="js-filter-bookmarks" value="Filter By" /></form>
      </div>`;
}

function bookmarksList() {
  return `<div class="bookmarks-container">
        <div class="bookmark js-bookmark"><p>Test Bookmark</p></div>
        <div class="bookmark-body">
          <form><input type="button" id="js-visit-site" value="Visit Site" /><span class="bookmark-rating js-bookmark-rating">5</span></form>
          <p>
            I'm baby bitters pork belly direct trade, actually readymade chillwave pinterest. Quinoa pinterest tumeric, taiyaki kinfolk meggings lyft 3 wolf moon gentrify farm-to-table normcore drinking vinegar tbh gluten-free vegan. Pop-up raclette deep v ugh, chia poke mixtape vape lomo health
            goth yr activated charcoal vinyl biodiesel. Tilde activated charcoal try-hard unicorn. Four loko etsy church-key distillery chillwave pitchfork chambray taxidermy ramps gastropub.
          </p>
          <form><input type="button" id="edit-bookmark" value="Edit" /></form>`;
}

export default {
  toolbarTemplate,
  bookmarksList,
};
