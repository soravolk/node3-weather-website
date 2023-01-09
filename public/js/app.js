console.log("Client side javascript file is loaded!");

/* 
Fetch is not part of JavaScript. It's a browser based API which means it's sth we can use in all modern browsers but it's not accessible in nodejs

Calling Fetch in our client side JavaScript is gonna kick off an asychronous IO operation, much like calling a request in nodeJS did

instead of providing a callback func, we use the then method on the return value from fetch and we provide to it the callback function we wanna run and we get access to the response as the first and only arg up above
*/

// fetch("http://localhost:3000/weather?address=Boston").then((res) => {
//   res.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");

/* 
figure out how to run some code when someone submit that form
arg1: the name of the event we are trying to listen for, i.e. submit
arg2: the function that is executed every time when the event occurs
*/
weatherForm.addEventListener("submit", (e) => {
  // prevent the browser from refreshing
  e.preventDefault();

  const location = search.value;
  msgOne.textContent = "Loading ...";
  msgTwo.textContent = "";

  // console.log(location);
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    });
  });
});
