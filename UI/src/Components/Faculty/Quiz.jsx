import React, { useState, useEffect } from "react";
import "./Quiz.css";

function Quiz() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

            // Update state to remove the deleted quiz
            setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizId));
        } catch (err) {
            console.error("Error deleting quiz:", err);
            alert("Failed to delete quiz.");
        }
    };

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h2>Quizzes</h2>
                <button className="add-quiz-btn" onClick={() => alert("Add Quiz functionality not implemented yet")}>
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
                        <div
                            key={quiz.id}
                            className="quiz-tile"
                        >
                            <div className="quiz-content" onClick={() => handleQuizClick(quiz.id)}>
                                <div className="quiz-title">{quiz.name}</div>
                                <div className="quiz-description">{quiz.description}</div>
                            </div>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(quiz.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );


}

export default Quiz;
