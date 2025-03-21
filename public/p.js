
// class parent {
//       constructor (name, age, obj){
//           this.name = name;
//           this.age = age
//           this.obj = {
//               name : "naveen"
//           }
//       }
//   }
//   let parent2 = new parent('than')
//   console.log(parent2)

let sec = 50
let min = 59
let hr = 11
let ampm = "AM"

setInterval(() =>{
      sec += 1
      if (sec == 60){
            min += 1
            sec = 0
      } 
      if (min == 60){
            hr += 1
            min = 0
      }
      if (hr == 12){
            ampm == "AM" ? ampm = "PM" : ampm = "AM";
      }
      if (hr > 12){
            hr = 1
      }
      document.getElementById("hr").innerText = hr
      document.getElementById("min").innerText = min
      document.getElementById("sec").innerText = sec
      document.getElementById("ampm").innerText = ampm
}, 1000)

// clock()

console.log("sf")