// Get novel chapter list
function getNovelList(novelID) {
  // fetch https://ncode.syosetu.com/${novelID}/?p=1
  // if '.c-pager__item.c-pager__item--next' is span, this is the last list page.
  // if not, change p value to get all the list
  // do this to all the list page
  // document.querySelectorAll('.p-eplist__subtitle') to find all anchor in this page
  // make array of href values. The value should be a working link
  // return array
}

// Get novel text
function getNovelText(novelLink) {
  // fetch novelLink
  // Find title with '.p-novel__title.p-novel__title--rensai'
  // Find novel content with '.js-novel-text.p-novel__text'
  // Novel content has <p> and <br>. Convert <br> to line break char
  // return novel title + novel content to one string. Line break twice after the title
}

// export all functions
export {};
