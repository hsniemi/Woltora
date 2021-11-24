import React from 'react'
import { Link } from 'react-router-dom'

export default function myFunction( {
var input; filter, ul, li, a, i, txtValue;
input = document.getElementById("myInput");
filter = input.value.toUpperCase();
ul = document.getElementById("myUL");
li = ul.getElementsByTagName("li");
for (i = 0; i < li.length; i++) {
  a = li[i].getElementsByTagName("a")[0];
  txtValue = a.textContent || a.innerText;
  if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
  } else {
      li[i].style.display = "none";
  }
    <div>
      <h2>Wotlora</h2>
      <p> Welcome to Wotlora! Find the best restaurants near you.</p>
      
      <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name"></input>
      <Link to="Restaurant 1"><button>Go to second view</button></Link>
      <Link to="Restaurant 2"><button>Go to second view</button></Link>
      <Link to="Restaurant 3"><button>Go to second view</button></Link>
      <Link to="Restaurant 4"><button>Go to second view</button></Link>

      <ul id="myUL">
      <li><a href="#">Restaurant 1</a></li>
      <li><a href="#">Restaurant 2</a></li>
      <li><a href="#">Restaurant 3</a></li>
      <li><a href="#">Restaurant 4</a></li>
      </ul>
    </div>
);
    
    }