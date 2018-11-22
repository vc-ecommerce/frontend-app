export const handleStatus = res => {
  res.statusText === "OK" ? res : Promise.reject(res.statusText);
}
