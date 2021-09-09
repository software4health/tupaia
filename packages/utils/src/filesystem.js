/**
 * Tupaia
 * Copyright (c) 2017 - 2021 Beyond Essential Systems Pty Ltd
 */
import sanitize from 'sanitize-filename';
import fs from 'fs';
import path from 'path';

export const readJsonFile = filePath =>
  JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));

export const writeJsonFile = (filePath, json) =>
  fs.writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`);

export const getNestedFiles = (dirPath, options = {}) => {
  const files = [];
  const findNestedFilesRecursively = currentDirPath => {
    fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(dirent => {
      const fullPath = `${currentDirPath}/${dirent.name}`;
      if (dirent.isFile()) {
        files.push(fullPath);
      } else {
        findNestedFilesRecursively(fullPath);
      }
    });
  };

  findNestedFilesRecursively(path.resolve(dirPath));

  return options.extensions
    ? files.filter(filePath => options.extensions.some(ext => path.extname(filePath) === ext))
    : options;
};

export const toFilename = string => {
  const maxLength = 255;
  const sanitized = sanitize(string).replace(/\s+/g, '-').toLowerCase();
  return sanitized.length <= maxLength ? sanitized : sanitized.slice(0, maxLength);
};