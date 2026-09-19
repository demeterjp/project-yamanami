export function toKanjiNumber(num: number): string {
  if (num === 0) return "〇";

  const digits = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const smallUnits = ["", "十", "百", "千"];
  const bigUnits = ["", "万", "億", "兆"];

  function convertGroup(n: number): string {
    if (n === 0) return "";
    const str = String(n).padStart(4, "0");
    let result = "";
    for (let i = 0; i < 4; i++) {
      const d = parseInt(str[i], 10);
      const unitIndex = 3 - i;
      if (d === 0) continue;
      if (d === 1 && unitIndex > 0) {
        result += smallUnits[unitIndex];
      } else {
        result += digits[d] + smallUnits[unitIndex];
      }
    }
    return result;
  }

  const groups: number[] = [];
  let n = num;
  while (n > 0) {
    groups.push(n % 10000);
    n = Math.floor(n / 10000);
  }

  let result = "";
  for (let i = groups.length - 1; i >= 0; i--) {
    const groupStr = convertGroup(groups[i]);
    if (groupStr !== "") {
      result += groupStr + bigUnits[i];
    }
  }
  return result;
}

const digitsRomaji = ["", "ichi", "ni", "san", "yon", "go", "roku", "nana", "hachi", "kyuu"];

const hundredsRomaji: Record<number, string> = {
  1: "hyaku", 2: "nihyaku", 3: "sanbyaku", 4: "yonhyaku", 5: "gohyaku",
  6: "roppyaku", 7: "nanahyaku", 8: "happyaku", 9: "kyuuhyaku",
};

const thousandsRomaji: Record<number, string> = {
  1: "sen", 2: "nisen", 3: "sanzen", 4: "yonsen", 5: "gosen",
  6: "rokusen", 7: "nanasen", 8: "hassen", 9: "kyuusen",
};

function convertGroupRomaji(n: number): string {
  if (n === 0) return "";
  const str = String(n).padStart(4, "0");
  const thousands = parseInt(str[0], 10);
  const hundreds = parseInt(str[1], 10);
  const tens = parseInt(str[2], 10);
  const ones = parseInt(str[3], 10);

  let result = "";
  if (thousands > 0) result += thousandsRomaji[thousands];
  if (hundreds > 0) result += hundredsRomaji[hundreds];
  if (tens > 0) result += tens === 1 ? "juu" : digitsRomaji[tens] + "juu";
  if (ones > 0) result += digitsRomaji[ones];

  return result;
}

const bigUnitsRomaji = ["", "man", "oku", "chou"];

export function toRomaji(num: number): string {
  if (num === 0) return "zero";

  const groups: number[] = [];
  let n = num;
  while (n > 0) {
    groups.push(n % 10000);
    n = Math.floor(n / 10000);
  }

  let result = "";
  for (let i = groups.length - 1; i >= 0; i--) {
    const groupStr = convertGroupRomaji(groups[i]);
    if (groupStr !== "") {
      result += groupStr + bigUnitsRomaji[i];
    }
  }
  return result;
}

export function normalizeRomaji(input: string): string {
  return input.toLowerCase().replace(/[\s-]/g, "");
}

export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function digitRange(digitLength: number): [number, number] {
  const min = Math.pow(10, digitLength - 1);
  const max = Math.pow(10, digitLength) - 1;
  return [min, max];
}

export function generateUniqueNumbers(count: number, digitLength: number): number[] {
  const [min, max] = digitRange(digitLength);
  const pool = new Set<number>();
  const maxPossible = max - min + 1;
  const target = Math.min(count, maxPossible);
  while (pool.size < target) {
    pool.add(randomInRange(min, max));
  }
  return Array.from(pool);
}

export function generateOptions(correct: number, digitLength: number): number[] {
  const [min, max] = digitRange(digitLength);
  const options = new Set<number>([correct]);
  let attempts = 0;
  while (options.size < 4 && attempts < 200) {
    options.add(randomInRange(min, max));
    attempts++;
  }
  const arr = Array.from(options);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}