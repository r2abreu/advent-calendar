import test from "node:test"
import assert from "node:assert"
import sumCalibrationValues from "./index"
import input from "./input";

test("Only one digit", () => { 
  assert.strictEqual(sumCalibrationValues('xkvsone2'), 12)
});

test("Just digits, no alphabetical", () => { 
  assert.strictEqual(sumCalibrationValues('24'), 24) 
});

test("Alpha", () => {
  assert.strictEqual(sumCalibrationValues(`two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen`), 281)
})

test("Random", () => {
  assert.strictEqual(sumCalibrationValues(`pseven3threeeightseven`), 77)
})

test("Fudge", () => {
  assert.strictEqual(sumCalibrationValues(`mbkfgktwolbvsptgsixseven1oneightzvm`), 28)
})

console.log(sumCalibrationValues(input))

