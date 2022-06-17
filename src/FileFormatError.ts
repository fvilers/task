class FileFormatError extends Error {
  constructor() {
    super("The tasks.json file is corrupted");
  }
}

export default FileFormatError;
