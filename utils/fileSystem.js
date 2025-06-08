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
  makeDir(`../output/${novelID}`);
  const infoPath = `../output/${novelID}/info.json`;
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

function saveNovel(novelID, novelChapter, original, translated, note) {
  saveInfo(novelID, novelChapter);

  const BASE_PATH = `../output/${novelID}`;
  saveText(`${BASE_PATH}/${novelChapter}/original.txt`, original);
  saveText(`${BASE_PATH}/${novelChapter}/translated.txt`, translated);
  saveText(`${BASE_PATH}/${novelChapter}/note.txt`, note);
}

function loadNovel(novelID) {
  const infoPath = `../output/${novelID}/info.json`;

  if (fs.existsSync(infoPath)) {
    const info = JSON.parse(fs.readFileSync(infoPath, "utf-8"));
    return info.chapters || [];
  }

  return [];
}

function loadNote(novelID) {
  const infoPath = `../output/${novelID}/info.json`;
  if (fs.existsSync(infoPath)) {
    const info = JSON.parse(fs.readFileSync(infoPath, "utf-8"));
    const lastChapter = info.chapters[info.chapters.length - 1];
    const notePath = `../output/${novelID}/${lastChapter}/note.txt`;

    if (fs.existsSync(notePath)) {
      return fs.readFileSync(notePath, "utf-8");
    }
  }
  return "";
}

export { saveNovel, loadNovel, loadNote };
