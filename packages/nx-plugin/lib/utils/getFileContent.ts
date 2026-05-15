import fs from 'fs';

/**
 * Utility function to get JSON file content
 * @param dir {string} - file direction
 * @returns Object extracted from JSON
 */
export const getJSONContent = (dir: string) => {
  const fileContent = fs.readFileSync(dir);
  const buffer = Buffer.from(fileContent).toString();
  return JSON.parse(buffer);
};

/**
 * Utility function to get SVG content
 * @param dir {string} - file direction
 * @returns Object extracted from JSON
 */
export const getSvgContent = (dir: string) => {
  const fileContent = fs.readFileSync(dir);
  const buffer = Buffer.from(fileContent).toString();
  return buffer.replace(/\n\s*|\n/g, '').trim();
};
