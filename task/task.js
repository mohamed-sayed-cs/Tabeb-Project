//async function getUsers() {
 // try {
   // let result = await fetch("https://jsonplaceholder.typicode.com/users");
    //let data = await result.json();
    //console.log(data);
 // } catch (error) {
   // console.log("errrrrrr : ", error);
 // }
//}

//getUsers();

async function getPosts() {
  try {
  
    let result = await fetch("https://jsonplaceholder.typicode.com/posts");
    
    let data = await result.json();
    
    console.log("البيانات وصلت بنجاح: ", data);
  } catch (error) {
    
    console.log("للأسف في مشكلة حصلت: ", error);
  }
}


getPosts();