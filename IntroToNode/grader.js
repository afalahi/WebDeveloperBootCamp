function average(arr){
    var sum=0;
    for (var i = 0; i < arr.length; i++) {
        
        sum = sum + arr[i];
    }
    sum = sum / arr.length;
    console.log(Math.round(sum));
}
var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);