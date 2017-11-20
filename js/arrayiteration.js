/*var numArray=[1,2,3,4];
var charArray=["A","B","C"]
function printReverse(value) {
  for (let index = value.length -1; index >=0; index--) {
      console.log(value[index]);
      
  }
};*/

// var numArr=[1,1,1,1];
// var charArr=[];
// function isUniform(arr) {
//     var baseIndex=arr[0];
//     for (let index = 1; index < arr.length; index++) {
//         if (arr[index]!==baseIndex) {
//             return false;
//         }
//     }
//     return true;
// }

// function sumArray(arr) {
//     var sum=0
//     for (let index = 0; index < arr.length; index++) {
//         sum += arr[index]
//     }
//     return sum
// }

// function max(arr) {
//     var max=arr[0];
//     for (let index = 1; index < arr.length; index++) {
//         if (max < arr[index]) {
//             max=arr[index];
//         }
       
//     }
//     return max;
// }

function ForEach(arr,func) {
    for (let index = 0; index < arr.length; index++) {
        func(arr[index]);
        
    }
}