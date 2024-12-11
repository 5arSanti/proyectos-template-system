const { getRandomNumber } = require("./getRandomNumber");

const getRandomItems = (array, count) => {
    const items = [];
    for (let i = 0; i < count + 1; i++) {
        items.push(array[getRandomNumber(array.length)]);
    }
    return items;
};

module.exports = { getRandomItems };