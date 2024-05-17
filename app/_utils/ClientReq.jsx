import React from "react";

// todo: get request to backend to gather all categories of medical professions
const getCategory = {
    1:{id: 1, name:"Dentist"},
    2:{id: 2, name:"Optometrist"},
    3:{id: 3, name:"Surgeon"},
    4:{id: 4, name:"Neurologist"},
    5:{id: 5, name:"Cardiologist"},
    6:{id: 6, name:"General Doctor"}

}

// todo: get request to backend to gather all doctors
const getDoctors = {
    1:{id: 1, name:"Gregory", surname:"House", category:"Surgeon", location:'Plainsboro Rd 25, NJ 08540', pic:"https://www.nbc.com/sites/nbcblog/files/2023/12/house-316-dr-gregory-house.jpg"},
    2:{id: 2, name:"Adeline", surname:"Badeaux", category:"Dentist", location:'Rue de Elisee 45, 70123 Paris', pic:"https://media.gettyimages.com/id/1277540215/photo/portrait-of-a-caucasian-female-dentist-in-her-office.jpg?s=612x612&w=0&k=20&c=e2wmX8LcTZTiAZzbrc6iOUPXaqjcy9qUKmhRQcPYfqI="},
    3:{id: 3, name:"Urška", surname:"Zajec", category:"Optometrist", location:'Aškerčeva 2, 1000 Ljubljana', pic:"https://media.gettyimages.com/id/1425798958/photo/photo-of-confident-female-doctor-in-hospital-looking-at-camera-with-smile.jpg?s=612x612&w=0&k=20&c=i91idG544pXuYkw5ju6iIzm1m-lEqQaygeOOrjG5GEk="},
    4:{id: 4, name:"Urška", surname:"Zajec", category:"Optometrist", location:'Aškerčeva 2, 1000 Ljubljana', pic:"https://media.gettyimages.com/id/1425798958/photo/photo-of-confident-female-doctor-in-hospital-looking-at-camera-with-smile.jpg?s=612x612&w=0&k=20&c=i91idG544pXuYkw5ju6iIzm1m-lEqQaygeOOrjG5GEk="},
    5:{id: 5, name:"Urška", surname:"Zajec", category:"Optometrist", location:'Aškerčeva 2, 1000 Ljubljana', pic:"https://media.gettyimages.com/id/1425798958/photo/photo-of-confident-female-doctor-in-hospital-looking-at-camera-with-smile.jpg?s=612x612&w=0&k=20&c=i91idG544pXuYkw5ju6iIzm1m-lEqQaygeOOrjG5GEk="},
    6:{id: 6, name:"Urška", surname:"Zajec", category:"Optometrist", location:'Aškerčeva 2, 1000 Ljubljana', pic:"https://media.gettyimages.com/id/1425798958/photo/photo-of-confident-female-doctor-in-hospital-looking-at-camera-with-smile.jpg?s=612x612&w=0&k=20&c=i91idG544pXuYkw5ju6iIzm1m-lEqQaygeOOrjG5GEk="}
}

export default {
    getCategory,
    getDoctors
}