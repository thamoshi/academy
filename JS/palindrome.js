function strTreatment (str) {
  let onlyLetters = str.replace(/[^A-Za-z]/g,'');
  let onlyLowerLetters = onlyLetters.toLowerCase();
  return onlyLowerLetters
}

function reverseArray(arr) {
  let newArray = new Array(); 
  for (let i = arr.length-1; i >= 0; i--) {
    newArray.push(arr[i]);
  };
  return newArray;
}

function sameArray(arr1, arr2) {
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  };
  return true
}

function palindrome(str) {
  let treatedWord = strTreatment(str)
  if (!treatedWord.length) return 'Not a word nor a sentence. Try again.';
  let strArray = treatedWord.split('');
  let reversedStrArray = reverseArray(strArray);
  return sameArray(strArray,reversedStrArray)
}

(()=>{
  console.log(palindrome("Madam, I'm Adam"));
})();
