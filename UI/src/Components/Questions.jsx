import React, { useState, useEffect } from "react";
import "./Questions.css";

function Questions({ quizId = "1" }) {
    const [showModal, setShowModal] = useState(false);
    const [fetchedQuestions, setFetchedQuestions] = useState([]);
    const [newQuestions, setNewQuestions] = useState([
        {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0,
            quiz_id: quizId
        }
    ]);

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

    // Handle form input changes
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

    // Add new blank question
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

    // Submit new questions to backend
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
        } catch (error) {
            console.error("Failed to submit questions:", error);
        }

        setShowModal(false);
        setNewQuestions([]); // Clear form
    };

    return (
        <div>
            <h2>Quiz Questions</h2>
            <button className="open-modal-btn" onClick={() => setShowModal(true)}>Add Questions</button>

            {/* Display Fetched Questions */}
            <div className="fetched-questions">
                {fetchedQuestions.map((q, index) => (
                    <div key={index} className="question-block">
                        <p><strong>{index + 1}. {q.question}</strong></p>
                        {q.options.map((opt, i) => (
                            <label key={i}>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={i+1}
                                    
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                ))}
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
