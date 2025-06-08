import { JSDOM } from "jsdom";

// Get novel chapter list
async function getNovelChapters(novelID) {
  const chapterLinks = [];
  let page = 1;
  let hasNextPage = true;
  const baseUrl = `https://ncode.syosetu.com/${novelID}/`;

  console.log(`Fetching chapter list for novel ID: ${novelID}`);

  while (hasNextPage) {
    const url = `${baseUrl}?p=${page}`;
    console.log(`Fetching page: ${url}`);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to fetch ${url}: ${response.statusText}`);
        // If a page fails, we might want to stop or retry,
        // for now, we'll stop and return what we have.
        break;
      }
      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Find all chapter links on this page
      const subtitleElements = document.querySelectorAll(".p-eplist__subtitle");
      subtitleElements.forEach((anchor) => {
        if (anchor.href) {
          // Ensure the link is absolute
          const absoluteUrl = new URL(anchor.href, baseUrl).href;
          chapterLinks.push(absoluteUrl);
        }
      });

      // Check for the next page
      // The next page link is an anchor tag. If it's a span, it's the last page.
      const nextPageLink = document.querySelector(
        ".c-pager__item.c-pager__item--next"
      );
      if (nextPageLink && nextPageLink.tagName === "A") {
        page++;
      } else {
        hasNextPage = false;
        console.log("No more pages found for chapter list.");
      }
    } catch (error) {
      console.error(`Error fetching or parsing page ${url}:`, error);
      // Stop fetching if an error occurs
      hasNextPage = false;
    }
  }
  console.log(`Found ${chapterLinks.length} chapters.`);
  return chapterLinks;
}

// Get novel text
async function getNovelText(novelLink) {
  // fetch novelLink
  // Find title with '.p-novel__title.p-novel__title--rensai'
  // Find novel content with '.js-novel-text.p-novel__text'
  // Novel content has <p> and <br>. Convert <br> to line break char
  // return novel title + novel content to one string. Line break twice after the title
  console.log(`Fetching novel text from: ${novelLink}`);
  try {
    const response = await fetch(novelLink);
    if (!response.ok) {
      console.error(`Failed to fetch ${novelLink}: ${response.statusText}`);
      return null; // Or throw an error
    }
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Find title
    const titleElement = document.querySelector(
      ".p-novel__title.p-novel__title--rensai"
    );
    const title = titleElement ? titleElement.textContent.trim() : "Untitled";

    // Find novel content
    const novelContentElement = document.querySelector(
      ".js-novel-text.p-novel__text"
    );
    if (!novelContentElement) {
      console.error("Novel content element not found.");
      return `${title}\n\n[Content not found]`;
    }

    let contentHTML = novelContentElement.innerHTML;
    // Replace <br> and <br /> with newline characters
    contentHTML = contentHTML.replace(/<br\s*\/?>/gi, "\n");

    // Create a temporary element to parse the modified HTML and get textContent
    // This helps strip out any remaining HTML tags like <p>, <b>, <i> etc.
    const tempDiv = dom.window.document.createElement("div");
    tempDiv.innerHTML = contentHTML;
    const novelText = tempDiv.textContent || tempDiv.innerText || "";

    return `${title}\n\n${novelText.trim()}`;
  } catch (error) {
    console.error(
      `Error fetching or parsing novel text from ${novelLink}:`,
      error
    );
    return null; // Or throw an error
  }
}

// export all functions
export { getNovelChapters, getNovelText };
