import React from "react";

// todo: get request to backend to gather all categories of medical professions
const getCategory = {
    1:{id: 1, name:"Dentist"},
    2:{id: 2, name:"Optometrist"},
    3:{id: 3, name:"Surgeon"}
}

// todo: get request to backend to gather all doctors
const getDoctors = {
    1:{id: 1, name:"Peter", surname:"Bober", category:"Surgeon", pic:"https://www.nbc.com/sites/nbcblog/files/2023/12/house-316-dr-gregory-house.jpg"},
    2:{id: 1, name:"Urska", surname:"Zajec", category:"Dentist", pic:"https://careoptionsforkids.com/hubfs/Imported_Blog_Media/Is-It-Hard-to-Become-a-Nurse-1.jpg"},
    3:{id: 1, name:"Janez", surname:"Novak", category:"Optometrist", pic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjCsy4HhaGYdUWAHO7IZdvntsJAhe2BvEnMV6ltPNLKg&s"}
}

export default {
    getCategory,
    getDoctors
}