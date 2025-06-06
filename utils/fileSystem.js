import fs from "fs";
import path from "path";

// Check if dir exist. If not, make folder. If needed, make folder recursivly
function makeDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Directory created: ${dirPath}`);
    } catch (err) {
      console.error(`Error creating directory ${dirPath}:`, err);
      throw err; // Re-throw the error if you want the caller to handle it
    }
  } else {
    console.log(`Directory already exists: ${dirPath}`);
  }
}

// Save text to .txt file. Encoding should be UTF-8
function saveText(filePath, textContent) {
  try {
    // Ensure the directory for the file exists
    const dirName = path.dirname(filePath);
    makeDir(dirName);
    fs.writeFileSync(filePath, textContent, "utf-8");
    console.log(`Text saved to file: ${filePath}`);
  } catch (err) {
    console.error(`Error saving text to ${filePath}:`, err);
    throw err; // Re-throw the error if you want the caller to handle it
  }
}

// export all the functions
export { makeDir, saveText };
