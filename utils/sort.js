function sortLettersInServiceWord(serviceWord) {
    return serviceWord
        .toLowerCase()
        .split("")
        .sort((firstLetter, secondLetter) => firstLetter.localeCompare(secondLetter, "ru"))
        .join("");
}

export function sortText(servicesRequestText = "") {
    const normalizedText = servicesRequestText.split(" ").filter((word) => word).join(" ").trim();

    if (!normalizedText) {
        return "";
    }

    const serviceWords = normalizedText.split(" ");
    const sortedServiceWords = serviceWords.map(sortLettersInServiceWord).sort((firstWord, secondWord) => firstWord.localeCompare(secondWord, "ru"));

    return sortedServiceWords.map((serviceWord) => serviceWord.charAt(0).toUpperCase() + serviceWord.slice(1).toLowerCase()).join(" ");
}
