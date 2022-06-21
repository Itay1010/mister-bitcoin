
export function saveToStorage(key: string, val: any) {
    const json = JSON.stringify(val)
    localStorage.setItem(key, json)
}

export function loadFromStorage(key: string):object {
    const json: any = localStorage.getItem(key)
    const val: object = JSON.parse(json)
    return val
}