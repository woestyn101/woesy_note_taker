
// setting variabls from html id
const divE = document.getElementById('list');
var userTitle = document.getElementById("title");
var userText = document.getElementById("text");
var saveBtn = document.getElementById("postbutton");
var clearBtn = document.getElementById("clearbutton");
var newBtn = document.getElementById("newbutton");

// setting buttons to hide
saveBtn.style.display = "none";
clearBtn.style.display = "none";
newBtn.style.display = "none";

// Invoked by the buttonHandler function to fetch terms from the data store
const getTerms = () =>
  fetch('/notes/api', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data);

// clear button click
clearBtn.addEventListener("click", clearForm);

// clear form fields values
function clearForm(){
    userTitle.value = "";
    userText.value = "";
    
}

// new button click function
newBtn.addEventListener("click", newNote);

// new button function to clear form fields and hide newBtn
function newNote(){
  userTitle.removeAttribute('readonly');
  userText.removeAttribute('readonly');
    userTitle.value = "";
    userText.value = "";
     newBtn.style.display = "none";
}

// adding eventlisteners to input fields
   userTitle.addEventListener('keyup', show );
  userText.addEventListener('keyup', show );

  //hiding save and clear buttons
  function show(){
    
    if (userTitle.value != ""){
        saveBtn.style.display = "inline";
        clearBtn.style.display = "inline";
    }
   
  }


      
      // setting empty arrar for db.json data
      var textobject = [];
     
      // outputting db.json data to html
    function renderNotes(note){
        var divTitle = document.createElement("div");
        var divText = document.createElement("div");
                   
        divTitle.classList.add('title-list');
        divTitle.innerHTML = note.title;
        divText.innerHTML = note.text;
        textobject.push(note.title);
        textobject.push(note.text);
        textobject.push(note.id);
        divE.appendChild(divTitle);
               
     
        
        
        // outputting note text to form field
        divE.addEventListener('click', viewNote);
       
            }
   
            // function to view title and text  in form fields
     function viewNote(event){
        
       userTitle.value = event.target.textContent;
      

        //finding index of title in array
        let titleIndex = textobject.findIndex(x => x == event.target.textContent);
       // getting text value from array
        userText.value = textobject[titleIndex + 1];

        //displaying new btn
        newBtn.style.display = "inline";

        //hiding new btn
        saveBtn.style.display = "none";
        clearBtn.style.display = "none";

        userTitle.setAttribute('readonly', true);
        userText.setAttribute('readonly', true);
        
     }       

     getTerms().then((response) => response.forEach((note) => renderNotes(note)));
    
   // savebtn click 
    saveBtn.addEventListener("click", saveData);
    
    