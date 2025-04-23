import React, { useState, useEffect } from "react";
import "./Quiz.css";

function Quiz() {
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
    });

    const course_id = "1"; // Replace with actual course ID if needed

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/quiz/${course_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setQuizzes(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching quizzes:", err);
                setError("Failed to fetch quizzes.");
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [course_id]);

    const handleQuizClick = (quizId) => {
        alert(`You clicked on quiz ID: ${quizId}`);
    };

    const handleDelete = async (quizId) => {
        const confirmed = window.confirm("Are you sure you want to delete this quiz?");
        if (!confirmed) return;

        try {
            const response = await fetch(`http://localhost:3000/api/quiz/delete/${quizId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete quiz.");
            }

            setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizId));
        } catch (err) {
            console.error("Error deleting quiz:", err);
            alert("Failed to delete quiz.");
        }
    };

    const handleEdit = (quiz) => {
        setIsEditing(true);
        setEditingQuizId(quiz.id);
        setNewQuiz({
            name: quiz.name,
            description: quiz.description,
            startTime: new Date(quiz.start_time).toISOString().slice(0, 16),
            endTime: new Date(quiz.end_time).toISOString().slice(0, 16),
        });
        setShowModal(true);
    };

    const handleModalInputChange = (e) => {
        const { name, value } = e.target;
        setNewQuiz((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitQuiz = async () => {
        const { name, description, startTime, endTime } = newQuiz;

        if (!name || !description || !startTime || !endTime) {
            alert("Please fill in all fields.");
            return;
        }

        const payload = {
            name,
            description,
            course_id,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
        };

        const url = isEditing
            ? `http://localhost:3000/api/quiz/update/${editingQuizId}`
            : `http://localhost:3000/api/quiz/add`;
        const method = isEditing ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${isEditing ? "update" : "create"} quiz.`);
            }

            const result = await response.json();

            if (isEditing) {
                // Update the quiz in state without reloading the page
                setQuizzes((prev) =>
                    prev.map((quiz) =>
                        quiz.id === editingQuizId ? { ...quiz, ...newQuiz } : quiz
                    )
                );
            } else {
                setQuizzes((prev) => [...prev, result]);
            }

            setShowModal(false);
            setNewQuiz({ name: "", description: "", startTime: "", endTime: "" });
            setIsEditing(false);
            setEditingQuizId(null);
        } catch (err) {
            console.error(`Error ${isEditing ? "updating" : "creating"} quiz:`, err);
            alert(`Failed to ${isEditing ? "update" : "create"} quiz.`);
        }
    };


    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h2>Quizzes</h2>
                <button
                    className="add-quiz-btn"
                    onClick={() => {
                        setIsEditing(false);
                        setNewQuiz({ name: "", description: "", startTime: "", endTime: "" });
                        setShowModal(true);
                    }}
                >
                    Add Quiz
                </button>
            </div>

            {loading ? (
                <p className="loading">Loading quizzes...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : quizzes.length === 0 ? (
                <p className="no-quiz">No quizzes found.</p>
            ) : (
                <div className="quiz-list-vertical">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="quiz-tile">
                            <div className="quiz-content" onClick={() => handleQuizClick(quiz.id)}>
                                <div className="quiz-title">{quiz.name}</div>
                                <div className="quiz-description">{quiz.description}</div>
                            </div>
                            <button className="delete-btn" onClick={() => handleDelete(quiz.id)}>
                                Delete
                            </button>
                            <button className="edit-btn" onClick={() => handleEdit(quiz)}>
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h3>{isEditing ? "Edit Quiz" : "Create New Quiz"}</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Quiz Name"
                            value={newQuiz.name}
                            onChange={handleModalInputChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={newQuiz.description}
                            onChange={handleModalInputChange}
                        />
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={newQuiz.startTime}
                            onChange={handleModalInputChange}
                        />
                        <input
                            type="datetime-local"
                            name="endTime"
                            value={newQuiz.endTime}
                            onChange={handleModalInputChange}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleSubmitQuiz}>
                                {isEditing ? "Update" : "Submit"}
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setShowModal(false);
                                    setIsEditing(false);
                                    setEditingQuizId(null);
                                    setNewQuiz({ name: "", description: "", startTime: "", endTime: "" });
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;
