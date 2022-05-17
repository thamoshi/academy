function combineAnagrams(arr) {
  let dictArray = arr.map(el => wordDict(el));
  let finalArray = new Array()

  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) continue
    let auxArray = [arr[i]]

    for (let j = i+1; j < arr.length; j++) {
      if (compare(dictArray[i],dictArray[j])) {
        auxArray.push(arr[j])
        delete arr[j]
      }
    }

    finalArray.push(auxArray)
  }

  return finalArray
}

function wordDict(str) {
  let countDict = {};
  let strArray = str.toLowerCase().split('').sort()
  strArray.forEach(el => {
    countDict[el] = (countDict[el] || 0) + 1;
  });
  return countDict;
}

function compare(o1,o2) {
  return JSON.stringify(o1) === JSON.stringify(o2)
}

(()=>{
  let wordList =  [ 'CaRs', 'racs', 'scar', 'foR', 'poTatos', 'four', 'creams', 'scream'];
  console.log(combineAnagrams(wordList));
})();