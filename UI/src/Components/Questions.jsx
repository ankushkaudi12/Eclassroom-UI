import React, { useState, useEffect } from "react";
import "./Questions.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./Graphql/Queries"; // Assuming you have a query to get user info

function Questions() {
    const [showModal, setShowModal] = useState(false);
    const [fetchedQuestions, setFetchedQuestions] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { quizId, userId } = location.state || {};
    console.log("Quiz ID:", quizId);
    console.log("User ID:", userId);

    const [newQuestions, setNewQuestions] = useState([
        {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0,
            quiz_id: quizId
        }
    ]);
    const { data: userData } = useQuery(GET_USER, {
        variables: { id: userId }, // Hardcoded userId for now
    });

    const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

    // Fetch questions from the backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/quiz/questions/${quizId}`);
                if (!res.ok) throw new Error("Failed to fetch questions");

                const data = await res.json();
                console.log("Fetched Questions:", data);

                // Convert option1–4 to options[]
                const transformed = data.map(q => ({
                    ...q,
                    options: [q.option1, q.option2, q.option3, q.option4]
                }));

                setFetchedQuestions(transformed);
            } catch (err) {
                console.error("Error fetching questions:", err);
            }
        };

        fetchQuestions();
    }, [quizId]);

    // Handle form input changes for adding new questions
    const handleChange = (index, field, value) => {
        const updatedQuestions = [...newQuestions];
        if (field === "question") {
            updatedQuestions[index].question = value;
        } else if (field.startsWith("option")) {
            const optionIndex = parseInt(field.slice(-1), 10);
            updatedQuestions[index].options[optionIndex] = value;
        } else if (field === "correctAnswer") {
            updatedQuestions[index].correctAnswer = parseInt(value, 10);
        }
        setNewQuestions(updatedQuestions);
    };

    // Add a new blank question to the form
    const addQuestion = () => {
        setNewQuestions([
            ...newQuestions,
            {
                question: "",
                options: ["", "", "", ""],
                correctAnswer: 0,
                quiz_id: quizId
            }
        ]);
    };

    // Submit the new questions to the backend
    // Submit the new questions to the backend
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/quiz/add/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ questions: newQuestions }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log("Server Response:", data);

            // Option 1: Fetch updated questions after submit
            const fetchUpdatedQuestions = async () => {
                try {
                    const res = await fetch(`http://localhost:3000/api/quiz/questions/${quizId}`);
                    if (!res.ok) throw new Error("Failed to fetch updated questions");

                    const updatedQuestions = await res.json();
                    console.log("Updated Questions:", updatedQuestions);

                    // Transform options and update state
                    const transformed = updatedQuestions.map(q => ({
                        ...q,
                        options: [q.option1, q.option2, q.option3, q.option4]
                    }));

                    setFetchedQuestions(transformed); // Update state with the new questions
                } catch (err) {
                    console.error("Error fetching updated questions:", err);
                }
            };

            await fetchUpdatedQuestions(); // Fetch updated questions

        } catch (error) {
            console.error("Failed to submit questions:", error);
        }

        setShowModal(false); // Close the modal
        setNewQuestions([]); // Clear the new questions form
    };


    // Submit the answers for the quiz
    const submitStudentAnswers = async () => {
        const answers = Object.entries(selectedAnswers).map(([question_id, selected_answer]) => ({
            student_id: 1, // hardcoded
            question_id: parseInt(question_id),
            selected_answer
        }));

        try {
            const response = await fetch("http://localhost:3000/api/quiz/submission", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ answers }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Submission successful:", result);
            alert("Answers submitted successfully!");
        } catch (error) {
            console.error("Failed to submit answers:", error);
            alert("Failed to submit answers");
        }
    };

    const handleDeleteQuestion = async (questionId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/quiz/questions/delete/${questionId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Question deleted:", result);
            alert("Question deleted successfully!");
            setFetchedQuestions(fetchedQuestions.filter(q => q.id !== questionId));
        } catch (error) {
            console.error("Failed to delete question:", error);
        }
    }

    const calculateScoresAndRoute = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/quiz/calculatescore`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quiz_id: quizId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Scores calculated:", result);
            navigate("/student/quiz/score/"); // Redirect to results page
        } catch (error) {
            console.error("Failed to calculate scores:", error);
            alert("Failed to calculate scores.");
        }
    }

    return (
        <div>
            <h2>Quiz Questions</h2>
            {userData && userData.getUser.role == "TEACHER" && <button className="open-modal-btn" onClick={() => setShowModal(true)}>Add Questions</button>}

            {/* Display Fetched Questions */}
            <div className="fetched-questions">
                {fetchedQuestions.map((q, index) => (
                    <div key={q.id} className="question-block">
                        <p><strong>{index + 1}. {q.question}</strong></p>
                        {q.options.map((opt, i) => (
                            <label key={i}>
                                <input
                                    type="radio"
                                    name={`question-${q.id}`}
                                    value={i + 1}
                                    checked={selectedAnswers[q.id] === i + 1}
                                    onChange={() =>
                                        setSelectedAnswers(prev => ({
                                            ...prev,
                                            [q.id]: i + 1
                                        }))
                                    }
                                />
                                {opt}
                            </label>
                        ))}
                        {/* Delete Button */}
                        {userData && userData.getUser.role == "TEACHER" && <button
                            className="delete-btn"
                            onClick={() => handleDeleteQuestion(q.id)}
                        >
                            Delete
                        </button>}
                    </div>
                ))}
            </div>


            {/* Submit Answers Button */}
            <div className="quiz-buttons">
                <div className="submit-answers">
                    {fetchedQuestions.length > 0 && (
                        <button className="submit-my-answers" onClick={submitStudentAnswers}>Submit My Answers</button>
                    )}
                </div>
                {userData && userData.getUser.role == "TEACHER" && <div className="calculate-scores">
                    <button onClick={() => calculateScoresAndRoute()}>Calculate Scores</button>
                </div>}
            </div>

            {/* Modal to Add New Questions */}
            {showModal && (
                <div className="modal">
                    <h2>Add Quiz Questions</h2>
                    {newQuestions.map((q, index) => (
                        <div key={index} className="question-block">
                            <input
                                type="text"
                                placeholder="Enter question"
                                value={q.question}
                                onChange={(e) => handleChange(index, "question", e.target.value)}
                            />
                            {q.options.map((opt, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    placeholder={`Option ${i + 1}`}
                                    value={opt}
                                    onChange={(e) => handleChange(index, `option${i}`, e.target.value)}
                                />
                            ))}
                            <select
                                value={q.correctAnswer}
                                onChange={(e) => handleChange(index, "correctAnswer", e.target.value)}
                            >
                                <option value={0}>Select correct option</option>
                                <option value={1}>Option 1</option>
                                <option value={2}>Option 2</option>
                                <option value={3}>Option 3</option>
                                <option value={4}>Option 4</option>
                            </select>
                        </div>
                    ))}
                    <button onClick={addQuestion}>+ Add Another Question</button>
                    <button onClick={handleSubmit}>Submit Questions</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Questions;
