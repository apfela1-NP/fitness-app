import Vue from "vue";

const api_root = "http://localhost:80/session";
export let playerId = null;
export const events = new Vue();


export function GetState(){
    return myFetch(api_root + "/");
}


export function Login(name, fbid, access_token){
    return myFetch(api_root + `/users`, { name, fbid, access_token })
            .then(x=> {
                playerId = x.id;
                events.$emit('playerId', playerId);
                
            });
}

export function EnterMeal(food){
    return myFetch(api_root + `/diet`, {food})
}

export function EnterExercise(exercise, duration){
    return myFetch(api_root + `/exercise`, {exercise, duration})
}

export function EnterWeight(id){
    return myFetch(api_root + `/sharedwith`, {id})
}

export function AllowAccess(weight){
    return myFetch(api_root + `/weight`, {weight})
}

export function GetMyProfile(){
    return myFetch(api_root + `/users/${playerId}`);
}

export function GetTotalUsers(){
    return myFetch(api_root + `/totalusers`)
}

export function GetExercise(){
    return myFetch(api_root + `/users/${playerId}/exercise`)
}

export function GetDiet(){
    return myFetch(api_root + `/users/${playerId}/diet`)
}

export function GetWeight(){
    return myFetch(api_root + `/users/${playerId}/weight`)
}

export function GetBMI(){
    return myFetch(api_root + `/users/${playerId}/bmi`)
}

export function GetSharedWith(){
    return myFetch(api_root + `/users/${playerId}/sharedwith`)
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