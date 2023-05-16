import { ThemeVariables } from './types';

interface Rec<T> {
  [K: string]: Rec<T> | T;
}

function keysToPathArray<T>(obj: Rec<T>) {
  const result: [string[], T][] = [];

  function recurse(obj: any, currentKey: string[] = []) {
    for (const key in obj) {
      const value = obj[key];
      const newKey = [...currentKey, key];
      if (value && typeof value === 'object') {
        recurse(value, newKey);
      } else {
        result.push([newKey, value]);
      }
    }
  }

  recurse(obj);

  return result;
}

function toDashCase(str: string) {
  return str.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase());
}

export function generateCssVariablesFromTheme(theme: ThemeVariables) {
  const entries = keysToPathArray(theme).map(([path, value]) => {
    const key = '--' + path.map(toDashCase).join('-').replace('--', '-');
    return [key, value] as const;
  });

  return {
    entries,
    toObject() {
      return Object.fromEntries(entries);
    },
    toInlineStyleString() {
      return entries
        .map(([key, value]) => {
          return `${key}: ${value}`;
        })
        .join('; ');
    },
  };
}
