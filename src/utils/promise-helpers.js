export const handleStatus = res => {
  return res.statusText === "OK" ? res : Promise.reject(res.statusText);
}
