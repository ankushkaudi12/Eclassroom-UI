// Quiz.jsx
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./Graphql/Queries";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

function Quiz({ course, userId }) {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingQuizId, setEditingQuizId] = useState(null);
    const [newQuiz, setNewQuiz] = useState({
        name: "",
        description: "",
        startTime: "",
        endTime: "",
        timer: "", // in minutes
    });

    const { data: userData } = useQuery(GET_USER, {
        variables: { id: userId },
    });

    const course_id = course.id;

    function formatDateTimeInIST(utcDateTimeStr) {
        const utcDate = new Date(utcDateTimeStr);
        return utcDate.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short",
            hour12: true,
        });
    }

    function toUTCISOStringFromLocal(localStr) {
        const localDate = new Date(localStr);
        return new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace("T", " ");
    }

    const fetchQuizzes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/quiz/${course_id}`);
            const data = await response.json();
            setQuizzes(data);
        } catch (err) {
            console.error("Error fetching quizzes:", err);
            setError("Failed to fetch quizzes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, [course_id]);

    const handleQuizClick = (quizId, userId) => {
        if (userData?.getUser.role === "STUDENT") {
            navigate("/student/quiz", { state: { quizId, userId } });
        } else if (userData?.getUser.role === "TEACHER") {
            navigate("/faculty/quiz", { state: { quizId, userId } });
        }
    };

    const handleDelete = async (quizId) => {
        if (!window.confirm("Delete this quiz?")) return;
        try {
            await fetch(`http://localhost:3000/api/quiz/delete/${quizId}`, { method: "DELETE" });
            fetchQuizzes();
        } catch (err) {
            console.error("Error deleting quiz:", err);
            alert("Failed to delete quiz.");
        }
    };

    const handleEdit = (quiz) => {
        setIsEditing(true);
        setEditingQuizId(quiz.id);
        const localStart = new Date(quiz.start_time).toISOString().slice(0, 16);
        const localEnd = new Date(quiz.end_time).toISOString().slice(0, 16);
        setNewQuiz({ name: quiz.name, description: quiz.description, startTime: localStart, endTime: localEnd, timer: quiz.timer / 60 });
        setShowModal(true);
    };

    const handleSubmitQuiz = async () => {
        const { name, description, startTime, endTime, timer } = newQuiz;
        if (!name || !description || !startTime || !endTime || !timer || timer <= 0) {
            return alert("Please fill in all fields correctly.");
        }

        const payload = {
            name,
            description,
            course_id,
            start_time: toUTCISOStringFromLocal(startTime),
            end_time: toUTCISOStringFromLocal(endTime),
            timer: parseInt(timer) * 60,
        };

        const url = isEditing
            ? `http://localhost:3000/api/quiz/update/${editingQuizId}`
            : `http://localhost:3000/api/quiz/add`;
        const method = isEditing ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to save quiz");

            setShowModal(false);
            setIsEditing(false);
            setNewQuiz({ name: "", description: "", startTime: "", endTime: "", timer: "" });
            fetchQuizzes();
        } catch (err) {
            alert("Error submitting quiz");
        }
    };

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h2>Quizzes</h2>
                {userData?.getUser.role === "TEACHER" && (
                    <button className="add-quiz-btn" onClick={() => { setShowModal(true); setIsEditing(false); }}>Add Quiz</button>
                )}
            </div>

            {loading ? <p className="loading">Loading...</p> : error ? <p className="error">{error}</p> :
                quizzes.length === 0 ? <p className="no-quiz">No quizzes available.</p> :
                    <div className="quiz-list-vertical">
                        {quizzes.map((quiz) => (
                            <div key={quiz.id} className="quiz-tile">
                                <div className="quiz-content" onClick={() => handleQuizClick(quiz.id, userId)}>
                                    <h3 className="quiz-title">{quiz.name}</h3>
                                    <p className="quiz-description">{quiz.description}</p>
                                    <p><b>Start:</b> {formatDateTimeInIST(quiz.start_time)}</p>
                                    <p><b>End:</b> {formatDateTimeInIST(quiz.end_time)}</p>
                                    <p><b>Duration:</b> {quiz.timer / 60} minutes</p>
                                </div>
                                {userData?.getUser.role === "TEACHER" && (
                                    <div>
                                        <button className="edit-btn" onClick={() => handleEdit(quiz)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(quiz.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>}

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h3>{isEditing ? "Edit Quiz" : "Add New Quiz"}</h3>
                        <input type="text" name="name" value={newQuiz.name} placeholder="Name" onChange={(e) => setNewQuiz({ ...newQuiz, name: e.target.value })} />
                        <textarea name="description" value={newQuiz.description} placeholder="Description" onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })} />
                        <input type="datetime-local" name="startTime" value={newQuiz.startTime} onChange={(e) => setNewQuiz({ ...newQuiz, startTime: e.target.value })} />
                        <input type="datetime-local" name="endTime" value={newQuiz.endTime} onChange={(e) => setNewQuiz({ ...newQuiz, endTime: e.target.value })} />
                        <input type="number" name="timer" value={newQuiz.timer} onChange={(e) => setNewQuiz({ ...newQuiz, timer: e.target.value })} />
                        <div className="modal-buttons">
                            <button onClick={handleSubmitQuiz}>{isEditing ? "Update" : "Submit"}</button>
                            <button className="cancel-btn" onClick={() => { setShowModal(false); setNewQuiz({ name: "", description: "", startTime: "", endTime: "", timer: "" }); }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;
