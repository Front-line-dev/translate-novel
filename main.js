import "dotenv/config";
import { saveNovel, loadNovel, loadNote } from "./utils/fileSystem.js";
import { getNovelChapters, getNovelText } from "./utils/getNovel.js";
import { requestTranslate, requestRetranslate } from "./utils/gemini.js";

const novelID = process.env.NOVEL_ID;

const transaltedChapters = loadNovel(novelID);
let note = loadNote(novelID);
const chapters = await getNovelChapters(novelID);

for (let chapterLink of chapters) {
  const chapter = chapterLink.split("/").at(-2);
  console.log("Starting translate", chapter);

  if (transaltedChapters.includes(chapter)) {
    console.log("Already translated", chapter);
    continue;
  }

  const novelText = await getNovelText(chapterLink);
  console.log("Translate", chapter);
  let { translated, newNote } = await requestTranslate(
    novelText,
    note,
    chapter
  );
  // console.log("Retranslate", chapter);
  // const { retranslated } = await requestRetranslate(translated, newNote);
  // saveNovel(novelID, chapter, novelText, retranslated, newNote, translated);
  saveNovel(novelID, chapter, novelText, translated, newNote);

  note = newNote;
  console.log("Finished translate", chapter);
}
