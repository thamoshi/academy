function onlyWords(str) {
  let strArray = str.toLowerCase().split(' ');
  let onlyWordsArray = new Array()
  for (let i = 0; i < strArray.length; i++) {
    let word = strArray[i].replace(/(^,)|(,$)/g, '')
    if (!word.match(/[^A-Za-z]/g) && word!=='') {
      onlyWordsArray.push(word)
    }
  };
  return onlyWordsArray;
}

function countWords(str) {
  let arr = onlyWords(str);
  let countDict = {};
  arr.forEach(el => {
    countDict[el] = (countDict[el] || 0) + 1;
  });
  return countDict;
}

(()=>{
  let str = 'oi  tchau bim9 ,puts, tuts, aosid1e123124 !@#$% TCHau puts tuts'
  console.log(countWords(str))
})();
