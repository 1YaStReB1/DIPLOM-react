export const obrMass = (test) =>{
  //ОБРАБОТКА МАССИВА
  let j=test.length;
  let max = test.length-2
  let flag =false;
  let temp;
 
  for(let i=0; i<max;){
    //   console.log(i,max)
    //  console.log(test[i],test[i+1])
    //  console.log(test)
       if(test[i+1]!==temp){
         flag = false;
       }
       if(i===0 || flag){
       //  console.log("Пропуск")
         while(test[i+1] === test[i+3] && test[i+2] - test[i]<=10){
           i+=2
         }
       i+=2
       flag=false;
       }
     else if(test[i+1] === test[i+3]  &&   test[i+2] - test[i] > 10){
         temp = test[i+1]
         let dop = test.slice(i,i+2)
         test.splice(j,0,dop[0],dop[1])
         test.splice(i,2)
         max-=2
         j-=2
         flag = true
       //  console.log("ИФ")
       }
       else{
        // console.log("ИНАЧЕ")
         let dop = test.slice(i,i+2)
         test.splice(j,0,dop[0],dop[1])
         test.splice(i,2)
         j-=2
         max-=2
       }
     } //КОНЕЦ ОБРАБОТКИ МАССИВА

     return test
}