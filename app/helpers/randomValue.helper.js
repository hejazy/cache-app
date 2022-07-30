export const getRandomValue = () => {
    return `${Math.floor(100000 + Math.random() * 900000)}${new Date().getTime()}`
}