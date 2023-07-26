import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));


let loaddata = async()=>{
  // fetch the data of sales people
  const salesPeopleUrl = 'http://localhost:8090/api/salespeople/';
  const response = await fetch(salesPeopleUrl);
  console.log(response,'-------data------')
  if(response.ok){
    const salesPeople_content = await response.json()
    console.log(salesPeople_content,"salesPeople_content")


    // passing the data
    root.render(
      <React.StrictMode>
        <App salesPeople_content={salesPeople_content}/>
      </React.StrictMode>
    );


  // if the respnse is not ok
  }else{
    console.log('response is error')
  }
}


// caling the function
loaddata()
