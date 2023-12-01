// Utilities
const sum = (a: number, b: number) => a + b;
const splitIntoLines = (text: string) => text.split("\n");

const TOKENS_MAPPING = new Map([
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);

/**
 * Tokenizes a string into an array of tokens.
 * @param input - The input string to tokenize.
 * @returns An array of tokens.
 */
function tokenizer(input: string): Array<string> {
  const VALID_TOKENS = [...TOKENS_MAPPING.keys(), ...TOKENS_MAPPING.values()];

  // Positive lookahead regex to get overlapping matches.
  // Source: https://mtsknn.fi/blog/how-to-do-overlapping-matches-with-regular-expressions/
  const tokensRegex = new RegExp(`(?=(${VALID_TOKENS.join("|")}))`, "g");
  const tokens = input.matchAll(tokensRegex);

  return Array.from(tokens, (token) => token[1]);
}

/**
 * Calculates the sum of calibration numbers in a calibration document.
 * @param calibrationDocument - The calibration document as a string.
 * @returns The sum of calibration numbers.
 */
export default function calculateCalibrationSum(calibrationDocument: string) {
  return splitIntoLines(calibrationDocument)
    .map(getCalibrationNumber)
    .reduce(sum, 0);
}

/**
 * Extracts the calibration number from a line of text.
 * @param line - The line of text containing the calibration numbers.
 * @returns The calibration number extracted from the line or
 * 0 if no calibration number was found.
 */
export function getCalibrationNumber(line: string) {
  const tokens = tokenizer(line);
  if (!tokens.length) return 0;
  const FIRST_TOKEN = tokens[0];
  const LAST_TOKEN =
    tokens.length === 1 ? FIRST_TOKEN : tokens[tokens.length - 1];

  return parseInt(getTokenValue(FIRST_TOKEN) + getTokenValue(LAST_TOKEN));
}

/**
 * Gets the value of a token.
 * @param token - The token to get the value of.
 * @returns The value of the token.
 */
const getTokenValue = (token: string) => {
  if (/\d/.test(token)) return token;

  return TOKENS_MAPPING.get(token)!;
};
