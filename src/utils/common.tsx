export const randomId = () => Math.random().toString(32).substr(2);

export const asyncDelay = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
