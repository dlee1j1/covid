
export function amend(dict, prefix, key, val) {
    let delim = prefix && key ? "_" : ""
    let k = `${prefix}${delim}${key}`
    if (val) {
        dict[k] = val
    }
}

export function amendTuple(dict, prefix, key, val) {
    let delim = prefix && key ? "_" : ""
    let k = `${prefix}${delim}${key}`
    if (val) {
        dict[k] = val ? val[0] : null
        dict[`${k}_val`] = val ? val[1] : null
    }
}
