export const handleStatus = res => {
  return res.statusText === "OK" ? res : Promise.reject(res.statusText);
}

export const timeoutPromise = (milliseconds, promise) => {

  const timeout = new Promise((resolve, reject) =>
    setTimeout(() =>
        reject(`Limite da promisse excedido (Limite: ${milliseconds}) ms`),
      milliseconds));

  return Promise.race([
    timeout, promise
  ]);

}

export const delay = milliseconds => data =>
  new Promise((resolve, reject) => setTimeout(() => resolve(data), milliseconds));

