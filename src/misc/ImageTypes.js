const typeMap = new Map([
    [ "jpg", "image/jpeg" ],
    [ "jpeg", "image/jpeg" ],
    [ "gif", "image/gif" ],
    [ "png", "image/png" ]
])

function getMimetype (ext) {
    return typeMap.get(ext)
}

export { getMimetype }