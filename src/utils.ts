export const ensure = (condition: boolean, msg = 'validate failed') => {
    if (!condition) {
        throw new Error(msg)
    }
}

export const isAddress = function(val: string) {
    return /^0x[0-9a-fA-F]{40}$/i.test(val)
}
