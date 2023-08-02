
import React, { useState,useEffect } from "react";
const toDoFetch=()=>{
const [toDoList,setToDoList]=useState(["Prepare my Bags", "Clean my room","Say Good bye to the dogs", "Go to Girona"]);
const [input,setInput]=useState("");

useEffect (()=>{
    fetch('https://jsonplaceholder.typicode.com/toDoList')
    .then(response=>{
        if(!response.ok){
            throw Error(response.statusText);
        }
        return response.json ();
    })
    .then (responseAsJson=>{
        setToDoList(responseAsJson.map(t=>t.name));
    })
    .catch(error=>{
        console.log('Oh...Oooh! Some error in the area,dude:\n',error);
    });
}, []) 

function addToDo (){
    setToDoList(toDoList.concat(input));

    fetch('https://jsonplaceholder.typicode.com/toDoList', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
            'content-Type':'application/json'
        }
    })
.then(res => {
    if (!res.ok) throw Error(res.statusText);
    return res.json();
})
.then(response => console.log('Success:', response))
.catch(error => console.error(error));
}

const handleSubmit=(e)=>{
    e.preventDefault();
    if(input !== ""){
        setToDoList({...toDoList, input});
        setInput("");
    }
};

const deleteToDo=(i)=>{
    setToDoList(toDoList.filter((_,index)=>{
        return index !== i
    }));

    fetch('https://jsonplaceholder.typicode.com/toDoList/${index}', {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
    })
    .then(response => console.log('Success:', response))
    .catch(error => console.error(error));
}
    
return (
    <div className="container d-flex flex-column">
         <div>
            <h1>Deucalino´s to Dos</h1>
         </div>
         <form >
         <div className="input-group mb-3">
  <input onChange={event => { setInput(event.target.value) }}  value={input}  onSubmit={handleSubmit} type="text" className="form-control" placeholder="Write your task"/>
  <button onClick={addToDo} type="button" class="btn btn-success"> <i className="fa-solid fa-calendar-plus"></i></button>
</div>
       
     <div  className="p-3 mb-2 bg-primary">
     <ul className="list-group">
        {toDoList.map((toDo,index)=>(
            <li key={index} className="list-group-item d-flex justify-content-between">
                <div class="alert alert-info" role="alert">
                {toDo}
                <button onClick={()=>{deleteToDo(index)}} className="btn btn-outline-success" type="button">
                <i className="fa-solid fa-calendar-plus"></i>
                </button>
                </div>
            </li>
        ))}
    </ul>
    </div>   
   
    </form>
    </div>  
 );
};
export default toDoFetch;