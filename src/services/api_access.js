const api_root = "http://localhost:80/session";
export let playerId = null;



export function GetState(){
    return myFetch(api_root + "/");
}

export function GetProfile(){
    return myFetch(api_root + `/users/${playerId}`);
}

export function Login(name, weight, height){
    return myFetch(api_root + `/users`, { name: name, weight: weight, height: height })
            .then(x=> playerId = x.id);
}


  function myFetch(url = ``, data = null) {
    let options = {
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, same-origin, *omit
          headers: {
              playerId: playerId
          }
    };
    if(data){
        options = { 
          ...options,
          method:  "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
              ...options.headers,
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        };
    }
    return fetch(url, options)
    .then(response =>{
      return response.json()
    }); // parses response to JSON
}