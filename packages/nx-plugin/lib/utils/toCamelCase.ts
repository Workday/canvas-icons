import {camelCase} from 'change-case-all';

/**
 * Utility function to transform a kebab-case, snake_case, or sentence case string to camelCase
 * @param {string} str string (kebab, snake, space cases)
 * @returns {string} Returns the camelized string or unchanged string for single word parameter.
 */
export const toCamelCase = (str: string) => camelCase(str, {mergeAmbiguousCharacters: true});
