import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisV,
    faPlus,
    faCheckCircle,
    faEdit,
    faRocket,
    faBan,
} from '@fortawesome/free-solid-svg-icons';
import './Quiz.css';
function QuizPreview() {
    const [error, setError] = useState("");
    const [answers, setAnswers] = useState({});
    const { courseId, quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const navigate = useNavigate();
    const quizUrl = `/Kanbas/Courses/${courseId}/Quizzes/`;
    const [timer, setTimer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const fetchQuiz = async () => {
        try {
            const fetchedQuiz = await client.findQuizById(quizId);
            if (fetchedQuiz.shuffleAnswers) {
                fetchedQuiz.questions.forEach(question => {
                    if (question.type === 'MULTIPLE-CHOICE') {
                        shuffleArray(question.options);
                    }
                    if (question.type === 'TRUE-FALSE') {
                        question.options = ['True', 'False'];
                        shuffleArray(question.options);
                    }
                });
            }
            setQuiz(fetchedQuiz);
            setAnswers(fetchedQuiz.questions.reduce((acc, _, index) => ({ ...acc, [index]: '' }), {}));
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const handleAnswerChange = (index, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [index]: value
        }));
    };
    const goToNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) =>
            prevIndex + 1 < quiz.questions.length ? prevIndex + 1 : prevIndex
        );
    };
    const submitQuiz = () => {
        if (!window.confirm('Are you sure you want to submit the quiz?')) {
            return;
        }
        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (
                answers[index] !== "" && ((answers[index] === question.correctAnswer) ||
                    (
                        ((question.type === "FILL-BLANK" && question.possibleAnswers.includes(answers[index])))
                    ))
            ) {
                score += question.points;
            }
        });
        const total = quiz.questions.reduce((acc, question) => acc + question.points, 0)
        const percent = (score / total) * 100;
        const formattedPercentage = percent.toFixed(2);
        alert(`Your score is: ${score} out of ${total}, a ${formattedPercentage}% `);
        navigate(quizUrl)
    }
    const goToPreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) =>
            prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex
        );
    };
    const renderQuestionInput = (question) => {
        const answer = answers[currentQuestionIndex];

        switch (question.type) {
            case 'MULTIPLE-CHOICE':
                return question.options.map((option, idx) => (
                    <div key={idx}>
                        <input
                            type="radio"
                            id={`option-${currentQuestionIndex}-${idx}`}
                            name={`question-${currentQuestionIndex}`}
                            checked={answer === option}
                            onChange={() => handleAnswerChange(currentQuestionIndex, option)}
                        />
                        <label htmlFor={`option-${currentQuestionIndex}-${idx}`}>{option}</label>
                    </div>
                ));
            case 'TRUE-FALSE':
                return (
                    <>
                        {question.options.map((option, idx) => (
                            <div key={idx}>
                                <input
                                    type="radio"
                                    id={`${option.toLowerCase()}-${currentQuestionIndex}`}
                                    name={`question-${currentQuestionIndex}`}
                                    value={option}
                                    checked={answer === option}
                                    onChange={() => handleAnswerChange(currentQuestionIndex, option)}
                                />
                                <label htmlFor={`${option.toLowerCase()}-${currentQuestionIndex}`}>{option}</label>
                            </div>
                        ))}
                    </>
                );
            case 'FILL-BLANK':
                return (
                    <div>
                        <input
                            type="text"
                            id={`fill-blank-${currentQuestionIndex}`}
                            name={`question-${currentQuestionIndex}`}
                            value={answer || ''}
                            onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}
                        />
                    </div>
                );
            default:
                return null;
        }
    };
    useEffect(() => {
        fetchQuiz();
    }, []);
    const startTimer = () => {
        console.log(quiz)
        if (quiz.timed && quiz.timeLimit) {
            setTimeLeft(quiz.timeLimit * 60);
            const newTimer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(newTimer);
                        alert("Time is up!");
                    }
                    return prevTime - 1;
                });
            }, 1000);
            setTimer(newTimer);
        }
    };
    useEffect(() => {
        if (timer) {
            clearInterval(timer);
        }
        if (quiz && quiz.timed) {
            setTimeLeft(quiz.timeLimit * 60); 
            const newTimer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(newTimer);
                        alert("Time is up! Please submit now.");
                    }
                    return prevTime - 1;
                });
            }, 1000);
            setTimer(newTimer);
        } else {
            setTimeLeft(0);
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [quiz]);
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    return (
        <div>
            <div className="quiz-preview-container">
                {quiz && quiz.questions.length > 0 && (
                    <>
                        <h1>{quiz.title}</h1>
                        <hr />
                        <div className="quiz-question">
                            <div style={{
                                border: '1px solid #ddd',
                                padding: '15px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h2>Question {currentQuestionIndex + 1}</h2>
                                    <span>{quiz.questions[currentQuestionIndex].points} pts</span>
                                </div>
                                <p>{quiz.questions[currentQuestionIndex].question}</p>
                                {renderQuestionInput(quiz.questions[currentQuestionIndex])}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                {quiz.timed && (
                                    <div>
                                        Time left: <strong>{formatTime(timeLeft)}</strong>
                                    </div>
                                )}
                                <button
                                    className="btn btn-secondary"
                                    onClick={goToPreviousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                >
                                    Previous
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={goToNextQuestion}
                                    disabled={currentQuestionIndex === quiz.questions.length - 1}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}

            </div>
            <button onClick={submitQuiz} className="btn btn-danger">
                Submit Quiz
            </button>
        </div >

    );
}

export default QuizPreview;