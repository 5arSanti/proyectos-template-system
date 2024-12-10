const getRandomNumber = (value=40) => {
    return Math.floor(Math.random() * value);
};

module.exports = { getRandomNumber };