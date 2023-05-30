export const loadVideo = (video) => {
  console.log(video)
  //if (!e.target.files.length) {
   // return;
 // }
  //let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = () => {
    console.log(video)
  };
  /*if (file) {
    reader.readAsDataURL(file);
    
    console.log(file.name);
  } 
 */
};