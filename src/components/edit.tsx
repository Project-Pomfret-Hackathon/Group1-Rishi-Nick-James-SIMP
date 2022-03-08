import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
    student_name: "",
    student_id: "",
    student_grade: "",
    student_email: "",
    student_phone: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params?.id?.toString(); // thank u stackoverflow
     const response = await fetch(`http://localhost:6300/record/${params?.id?.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value: any) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e: any) {
   e.preventDefault();
   const editedPerson = {
     student_name: form.student_name,
     student_grade: form.student_grade,
     student_id: form.student_id,
     student_email: form.student_email,
    student_phone: form.student_phone,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:6300/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.student_name}
           onChange={(e) => updateForm({ student_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Student ID: </label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.student_id}
           onChange={(e) => updateForm({ student_id: e.target.value })}
         />
       </div>
       <div className="form-group">
           <p>Student Grade</p>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="position9"
             value="Freshman"
             checked={form.student_grade === "9"}
             onChange={(e) => updateForm({ student_grade: e.target.value })}
           />
           <label htmlFor="position9" className="form-check-label">Freshman</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="position10"
             value="Sophomore"
             checked={form.student_grade === "10"}
             onChange={(e) => updateForm({ student_grade: e.target.value })}
           />
           <label htmlFor="position10" className="form-check-label">Sophomore</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="position11"
             value="Junior"
             checked={form.student_grade === "11"}
             onChange={(e) => updateForm({ student_grade: e.target.value })}
           />
           <label htmlFor="position11" className="form-check-label">Junior</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="position12"
             value="Senior"
             checked={form.student_grade === "12"}
             onChange={(e) => updateForm({ student_grade: e.target.value })}
           />
           <label htmlFor="position12" className="form-check-label">Senior</label>
         </div>
       </div>
       <br />
       <div className="form-group">
         <label htmlFor="position">Email</label>
         <input
           type="email"
           className="form-control"
           id="email"
           value={form.student_email}
           onChange={(e) => updateForm({ student_email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Phone Number</label>
         <input
           type="tel"
           className="form-control"
           id="position"
           value={form.student_phone}
           onChange={(e) => updateForm({ student_phone: e.target.value })}
         />
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}