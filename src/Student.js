// Student.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Student() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setStudents(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/delete/${id}`);
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success mb-3'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Date of Birth</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, i) => (
                            <tr key={i}>
                                <td>{student.Name}</td>
                                <td>{student.Email}</td>
                                <td>{student.PhoneNumber}</td>
                                <td>{student.DOB}</td>
                                <td>
                                    <Link to={`/update/${student.ID}`} className='btn btn-primary me-2'>Update</Link>&nbsp;
                                    <button className='btn btn-danger ms-2' onClick={() => handleDelete(student.ID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;
