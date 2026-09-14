async function getUsers() {
  try {
    let result = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await result.json();
    console.log(data);
  } catch (error) {
    console.log("errrrrrr : ", error);
  }
}

getUsers();