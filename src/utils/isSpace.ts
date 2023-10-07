export const SPACES_REGEX = /(\s+)/;

const isSpace = (word: string) => SPACES_REGEX.test(word);

export default isSpace;