function makeTitle(sentence) {
    // function to split sentence by each word
    let words = sentence.split(' ');

    // function to make each word's first letterr capital
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }

    // function to join the words back into a sentencee
    let titleSentence = words.join(' ');
    return titleSentence;
} 

//test 
console.log(makeTitle("the quick brown fox"));
