export function delay(time) {
  return new Promise((resolve, reject) => {
    if (typeof time !== "undefined") {
      setTimeout(resolve, time);
    } else {
      setImmediate(resolve);
    }
  });
}