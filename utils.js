export function random(min, max = 0) {
    return Math.random() * (max - min) + min;
}

export function floor(num) {
    return Math.floor(num);
}

export function randChar() {
    const charNum = floor(random(64, 122));
    return charNum === 64 ? ' ' : String.fromCharCode(charNum);
}
