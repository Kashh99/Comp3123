function shiftLastThree(str) {
    //important check if the string is long enough for the function
    if (str.length >= 3) {
        let tail = str.substring(str.length - 3);
        let head = str.substring(0, str.length - 3);
        return tail + head;
    } else  {
        return str;
    }
}

//testt
console.log(shiftLastThree("Python"));
console.log(shiftLastThree("JavaScript"));
console.log(shiftLastThree("Hi"));
