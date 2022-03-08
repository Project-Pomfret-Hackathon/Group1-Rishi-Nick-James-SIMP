import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   student_name: "",
   student_id: "",
   student_grade: "",
   student_email: "",
   student_phone: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value: any) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e: any) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:6300/record/create", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ student_name: "", student_id: "", student_grade: "" , student_email: "", student_phone: "" });
   navigate("/");
 }

 return (
   <div>
     <h3>Create New User</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.student_name}
           onChange={(e) => updateForm({ student_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Student ID</label>
         <input
           type="number"
           className="form-control"
           id="position"
           value={form.student_id}
           onChange={(e) => updateForm({ student_id: e.target.value })}
         />
       </div>
       <div className="form-group">
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
       <div className="form-group">
         <input
           type="submit"
           value="Create"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}