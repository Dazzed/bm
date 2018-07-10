const formatDate = (date) => {
    console.log(date);
    var numbers = date.replace(/\D/g, '');
    var char = { 2: '/', 4: '/' };
    date = '';
    for (var i = 0; i < numbers.length; i++) {
        date += (char[i] || '') + numbers[i];
    }
    return date;
}

export {
    formatDate
}
