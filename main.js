import "dotenv/config";
import { saveNovel, loadNovel, loadNote } from "./utils/fileSystem";
import { getNovelChapters, getNovelText } from "./utils/getNovel";
import { requestTranslate, requestRetranslate } from "./utils/gemini";

const novelID = process.env.NOVEL_ID;

const transaltedChapters = loadNovel(novelID);
let note = loadNote(novelID);
const chapters = getNovelChapters(novelID);

chapters.forEach(async (chapterLink) => {
  const chapter = chapterLink.split("/").at(-2);

  if (transaltedChapters.includes(chapter)) {
    return;
  }

  const novelText = await getNovelText(chapterLink);
  let { translated, newNote } = await requestTranslate(novelText, note);
  const { retranslated } = await requestRetranslate(translated, newNote);

  saveNovel(novelID, chapter, novelText, retranslated, newNote);
  note = newNote;
});
