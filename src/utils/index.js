export const contains = (root, n) => {
  var node = n
  while (node) {
    if (node === root) {
      return true
    }
    node = node.parentNode
  }
  return false
}

export const SStorageSetJson = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export const SStorageGetJson = key => JSON.parse(sessionStorage.getItem(key))

export const LStorageSetJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const LStorageGetJson = key => JSON.parse(localStorage.getItem(key))
