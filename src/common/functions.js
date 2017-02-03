export function noop() { };

export function delay(time) {
  return new Promise((resolve, reject) => {
    if (time !== undefined) {
      setTimeout(resolve, time);
    } else {
      setImmediate(resolve);
    }
  });
}