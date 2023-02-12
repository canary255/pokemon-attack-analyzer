export const capitalizeOneWord = (title: string) => {
    const firstCapLetter = title.slice(0,1).toUpperCase()
    return `${firstCapLetter}${title.slice(1)}`
}

export const capitalizeEveryWord = (title: string) => {
    const words = title.split(" ")
    return words.map((el) => {return capitalizeOneWord(el)}).join(" ")
}