function angleType(angle) {
    if(angle < 0 || angle > 180) {
        console.log("Invalid angle!!!");
        return;
    }
    if (angle <90) {
        return "Acute angle";
    } else if (angle === 90) {
        return "Right angle";
    } else if (angle <180) {
        return "Obtuse angle";
    } else {
        return "Straight angle";
    }
}

//testt
console.log(angleType(47));
console.log(angleType(90));
console.log(angleType(145));
console.log(angleType(180));
