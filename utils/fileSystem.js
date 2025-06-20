import fs from "fs";
import path from "path";

function makeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    return;
  }

  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`Directory created: ${dirPath}`);
}

function saveText(filePath, textContent) {
  const dirName = path.dirname(filePath);
  makeDir(dirName);
  fs.writeFileSync(filePath, textContent, "utf-8");
  console.log(`Text saved to file: ${filePath}`);
}

// const INFO = {
//   chapters: ['1', '2'],
//   id: '123'
// }
function saveInfo(novelID, novelChapter) {
  makeDir(`./output/${novelID}`);
  const infoPath = `./output/${novelID}/info.json`;
  let info = {};
  if (fs.existsSync(infoPath)) {
    info = JSON.parse(fs.readFileSync(infoPath, "utf-8"));
  }
  if (!info.chapters) {
    info.chapters = [];
  }
  if (!info.chapters.includes(novelChapter)) {
    info.chapters.push(novelChapter);
  }
  info.id = novelID;
  fs.writeFileSync(infoPath, JSON.stringify(info, null, 2), "utf-8");
  console.log(`Info saved to file: ${infoPath}`);
}

function saveNovel(
  novelID,
  novelChapter,
  original,
  translated,
  note,
  pretranslated
) {
  saveInfo(novelID, novelChapter);

  const BASE_PATH = `./output/${novelID}`;
  saveText(`${BASE_PATH}/${novelChapter}/original.txt`, original);
  saveText(`${BASE_PATH}/${novelChapter}/translated.txt`, translated);
  saveText(`${BASE_PATH}/${novelChapter}/note.txt`, note);

  if (pretranslated) {
    saveText(`${BASE_PATH}/${novelChapter}/pretranslated.txt`, pretranslated);
  }
}

function loadNovel(novelID) {
  const infoPath = `./output/${novelID}/info.json`;

  if (fs.existsSync(infoPath)) {
    const info = JSON.parse(fs.readFileSync(infoPath, "utf-8"));
    return info.chapters || [];
  }

  return [];
}

function loadNote(novelID) {
  const infoPath = `./output/${novelID}/info.json`;

  if (fs.existsSync(infoPath)) {
    const info = JSON.parse(fs.readFileSync(infoPath, "utf-8"));
    const lastChapter = info.chapters[info.chapters.length - 1];
    const notePath = `./output/${novelID}/${lastChapter}/note.txt`;

    if (fs.existsSync(notePath)) {
      return fs.readFileSync(notePath, "utf-8");
    }
  }

  const sampleNote = fs.readFileSync("./prompt/noteSample.md", "utf-8");
  return sampleNote;
}

function mergeNovel(novelId) {
  const infoPath = `./output/${novelId}/info.json`;
  if (!fs.existsSync(infoPath)) {
    console.error(`Info file not found for novel ID: ${novelId}`);
    return;
  }

  const info = JSON.parse(fs.readFileSync(infoPath, "utf-8"));
  const chapters = info.chapters;

  // convert to array reduce
  const mergedText = chapters.reduce((acc, chapter) => {
    const translatedPath = `./output/${novelId}/${chapter}/translated.txt`;
    const translated = fs.readFileSync(translatedPath, "utf-8");
    return acc + `Chapter ${chapter}\n${translated}\n\n`;
  }, "");

  fs.writeFileSync(`./output/${novelId}/merged.txt`, mergedText, "utf-8");
}

export { saveNovel, loadNovel, loadNote, mergeNovel };
