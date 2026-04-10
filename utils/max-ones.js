export function getMaxOnesSequenceLength(value = "") {
    let currentLength = 0;
    let maxLength = 0;

    for (const char of value) {
        if (char === "1") {
            currentLength += 1;
            if (currentLength > maxLength) {
                maxLength = currentLength;
            }
        } else if (char === "0") {
            currentLength = 0;
        } else {
            return null;
        }
    }

    return maxLength;
}
