function getTime(date) {
    let hours = date.getHours();
    let min = date.getMinutes();

    return hours + ':' + min;
}


module.exports = getTime