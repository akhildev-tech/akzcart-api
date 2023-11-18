/**
 * Validates option text input.
 * @param {string} str String
 * @returns {string} Converted string
 */
export function toCamel(str: string): string {
  return str.replace(/_([a-z1-3])/g, (word: string) => word[1].toUpperCase());
}

/**
 * Checks object is an actual JavaScript object.
 * @param {any} obj Object to be checked
 * @returns {boolean} Whether object or not
 */
export function isObject(obj: any[] | any): boolean {
  return (
    obj === Object(obj) &&
    obj instanceof Date === false &&
    !Array.isArray(obj) &&
    typeof obj !== 'function'
  );
}

/**
 * Converts object or object array's keys to camel case.
 * @param {any[] | any} obj Object or object array
 * @returns {any[] | any} Converted object or object array
 */
export function convertKeysToCamelCase(obj: any[] | any): any[] | any {
  if (this.isObject(obj)) {
    const newObj = {};

    Object.keys(obj).forEach((key) => {
      newObj[this.toCamel(key)] = this.convertKeysToCamelCase(obj[key]);
    });

    return newObj;
  } else if (Array.isArray(obj)) {
    return obj.map((i) => this.convertKeysToCamelCase(i));
  }

  return obj;
}
