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
import { Tab, Nav } from 'react-bootstrap';
function QuizEditor() {
    const { courseId, quizId } = useParams();
    const [error, setError] = useState("");
    const [quiz, setQuiz] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();
    const fetchQuiz = async () => {
        try {
            const fetchedQuiz = await client.findQuizById(quizId);
            setQuiz(fetchedQuiz);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const save = async () => {
        await client.updateQuiz(quiz);
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`)
    };
    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const saveQuestion = async () => {
        await client.updateQuiz(quiz);
    };
    const deleteQuestion = async (index) => {
        const updatedQuestions = quiz.questions.filter((_, i) => i !== index);
        const updatedQuiz = {
            ...quiz,
            questions: updatedQuestions
        };

        try {
            await client.updateQuiz(updatedQuiz);
            setQuiz(updatedQuiz);

        } catch (error) {

            setError(error.response.data.message || 'An error occurred while deleting the question.');
            console.error('Error deleting question:', error);
        }
    };
    const removeAnswerField = (questionIndex, answerIndex) => {
        const updatedQuiz = { ...quiz };
        updatedQuiz.questions[questionIndex].possibleAnswers.splice(answerIndex, 1);
        setQuiz(updatedQuiz);
    };
    const removeMCOptionField = (questionIndex, optionIndex) => {
        const updatedQuiz = { ...quiz };
        updatedQuiz.questions[questionIndex].options.splice(optionIndex, 1);
        setQuiz(updatedQuiz);
    };
    const saveAndPublish = async () => {
        const publishedQuiz = {
            ...quiz,
            published: true
        };
        setQuiz(publishedQuiz)

        await client.updateQuiz(publishedQuiz);
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
    };
    const cancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
    }
    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...quiz.questions];
        const updatedQuestion = { ...updatedQuestions[questionIndex] };

        const updatedOptions = updatedQuestion.options || [];
        updatedOptions[optionIndex] = value;
        updatedQuestion.options = updatedOptions;

        updatedQuestions[questionIndex] = updatedQuestion;
        setQuiz({ ...quiz, questions: updatedQuestions });
    };
    const createQuestion = async () => {
        if (!quiz) return;
        try {
            const newQuestion = {
                title: "New Question Title",
                type: "MULTIPLE-CHOICE",
                question: "Question Description",
                points: 75,
                options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                correctAnswer: "",
                possibleAnswers: ["", "", ""],
            }
            const updatedQuestions = [...quiz.questions, newQuestion];

            const updatedQuiz = {
                ...quiz,
                questions: updatedQuestions
            };
            await client.updateQuiz(updatedQuiz);
            setQuiz(updatedQuiz);
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    const handleCorrectAnswersChange = (questionIndex, answerIndex, value) => {
        const updatedQuestions = [...quiz.questions];
        const updatedCorrectAnswers = [...updatedQuestions[questionIndex].possibleAnswers];
        updatedCorrectAnswers[answerIndex] = value;
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            possibleAnswers: updatedCorrectAnswers
        };
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const addAnswerField = (questionIndex) => {
        const updatedQuestions = [...quiz.questions];
        const updatedCorrectAnswers = [...updatedQuestions[questionIndex].possibleAnswers, ''];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            possibleAnswers: updatedCorrectAnswers
        };
        setQuiz({ ...quiz, questions: updatedQuestions });
    };
    const addMCAnswerField = (questionIndex) => {
        const updatedQuestions = [...quiz.questions];
        const updatedCorrectAnswers = [...updatedQuestions[questionIndex].options, ''];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            options: updatedCorrectAnswers
        };
        setQuiz({ ...quiz, questions: updatedQuestions });
    };
    useEffect(() => {
        fetchQuiz();
    }, []);
    const [activeKey, setActiveKey] = useState('details');
    return (

        <div className="body" style={{ width: '25%' }}>
            <h1>Quiz Editor</h1>
            <hr />
            {quiz && (
                <div>
                    <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link eventKey="details">Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="questions">Questions</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="details">
                                <br />
                                <h3>Quiz Details</h3>
                                <input value={quiz.title}
                                    className="form-control my-2"
                                    placeholder="Title"
                                    onChange={(e) => setQuiz({
                                        ...quiz,
                                        title: e.target.value
                                    })} />
                                <textarea value={quiz.description}
                                    className="form-control my-2"
                                    placeholder="Description"
                                    onChange={(e) => setQuiz({
                                        ...quiz,
                                        description: e.target.value
                                    })}
                                    rows={3} />
                                <div className="d-flex align-items-center">
                                    <input value={quiz.points}
                                        className="form-control my-2"
                                        type="number"
                                        placeholder="Points"
                                        id="points"
                                        onChange={(e) => setQuiz({
                                            ...quiz,
                                            points: e.target.value
                                        })} />
                                    <label class="form-check-label ms-2" for="points">
                                        Points
                                    </label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input
                                        className="form-control my-2"
                                        type="date"
                                        value={quiz.dueDate}
                                        id="dueDate"
                                        onChange={(e) => setQuiz({
                                            ...quiz,
                                            dueDate: e.target.value
                                        })} />
                                    <label class="form-check-label ms-2" for="dueDate">
                                        Due on
                                    </label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input
                                        className="form-control my-2"
                                        type="date"
                                        id="availFrom"
                                        value={quiz.availableFrom}
                                        onChange={(e) => setQuiz({
                                            ...quiz,
                                            availableFrom: e.target.value
                                        })} />
                                    <label class="form-check-label ms-2" for="availFrom">
                                        Available from
                                    </label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input
                                        className="form-control my-2"
                                        type="date"
                                        id="availUntil"
                                        value={quiz.availableUntil}
                                        onChange={(e) => setQuiz({
                                            ...quiz,
                                            availableUntil: e.target.value
                                        })} />
                                    <label class="form-check-label ms-2" for="availDate">
                                        Available untill
                                    </label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input value={quiz.timeLimit}
                                        className="form-control my-2"
                                        type="number"
                                        placeholder="Time Limit Amt"
                                        id="timelimit"
                                        onChange={(e) => setQuiz({
                                            ...quiz,
                                            timeLimit: e.target.value
                                        })} />
                                    <label class="form-check-label ms-2" for="timelimit">
                                        Time Limit &#40;Mins&#41;
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input
                                        class="form-check-input ms-1"
                                        type="checkbox"
                                        id="flexCheckDefault1"
                                        checked={quiz.timed}
                                        onChange={(e) => setQuiz({
                                            ...quiz,
                                            timed: e.target.checked
                                        })}
                                    >
                                    </input>
                                    <label class="form-check-label ms-2" for="flexCheckDefault1">
                                        Time limit?
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input
                                        class="form-check-input ms-1"
                                        type="checkbox"
                                        id="flexCheckDefault2"
                                        checked={quiz.shuffleAnswers}
                                        onChange={(e) => setQuiz({
                                            ...quiz,
                                            shuffleAnswers: e.target.checked
                                        })}
                                    >
                                    </input>
                                    <label class="form-check-label ms-2" for="flexCheckDefault2">
                                        Shuffle answers?
                                    </label>
                                </div>
                                <button className="btn btn-primary my-1 w-100" onClick={save}>
                                    Save
                                </button>
                                <button className="btn btn-secondary my-1 w-100" onClick={saveAndPublish}>
                                    Save and Publish
                                </button>
                                <button className="btn btn-danger my-1 w-100" onClick={cancel}>
                                    Cancel
                                </button>
                            </Tab.Pane>
                            <Tab.Pane eventKey="questions">
                                <br />
                                <h3>Quiz Questions</h3>
                                <button type="button" class="btn btn-secondary button-spacing" onClick={createQuestion}>
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        style={{ fontSize: '12px', marginRight: '5px' }}
                                    />
                                    Add Question
                                </button>
                                <br />

                                <div className="mt-4">
                                    {quiz && quiz.questions && quiz.questions.length > 0 ? (
                                        quiz.questions.map((question, index) => (
                                            <div key={question._id || index} className="mb-3">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Question {index + 1}</h5>
                                                        <input
                                                            type="text"
                                                            value={question.title}
                                                            onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
                                                            className="form-control mb-2"
                                                            placeholder="Title"
                                                        />
                                                        <select
                                                            value={question.type}
                                                            onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                                                            className="form-select mb-2"
                                                        >
                                                            <option value="MULTIPLE-CHOICE">Multiple Choice</option>
                                                            <option value="TRUE-FALSE">True/False</option>
                                                            <option value="FILL-BLANK">Fill in the Blank</option>
                                                        </select>
                                                        <textarea
                                                            value={question.question}
                                                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                                            className="form-control mb-2"
                                                            placeholder="Question"
                                                        />
                                                        <label className="form-label" style={{ fontWeight: 'bold' }}>
                                                            Points
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={question.points}
                                                            onChange={(e) => handleQuestionChange(index, 'points', e.target.value)}
                                                            className="form-control mb-2"
                                                            placeholder="Points"
                                                        />
                                                        {question.type === "MULTIPLE-CHOICE" && (
                                                            <>
                                                                <label className="form-label" style={{ fontWeight: 'bold' }}>
                                                                    Answer Choices
                                                                </label>
                                                                {Array.from({ length: question.options.length }).map((_, idx) => (
                                                                    <div key={idx} className="mb-2 d-flex align-items-center">
                                                                        <input
                                                                            type="text"
                                                                            value={question.options[idx] || ''}
                                                                            onChange={(e) => handleOptionChange(index, idx, e.target.value)}
                                                                            className="form-control"
                                                                            placeholder={`Option ${idx + 1}`}
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-danger btn-sm ms-2"
                                                                            onClick={() => removeMCOptionField(index, idx)}
                                                                        >
                                                                            X
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-secondary my-2"
                                                                    onClick={() => addMCAnswerField(index)}
                                                                >
                                                                    + Add Another Choice
                                                                </button>
                                                                <br />
                                                                <label className="form-label" style={{ fontWeight: 'bold' }}>
                                                                    Correct Answer
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={question.correctAnswer || ''}
                                                                    onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                                                                    className="form-control mb-2"
                                                                    placeholder="Correct Answer"
                                                                />
                                                            </>
                                                        )}
                                                        {question.type === "TRUE-FALSE" && (
                                                            <>
                                                                <label className="form-label" style={{ fontWeight: 'bold' }}>
                                                                    Correct Answer
                                                                </label>
                                                                <div>
                                                                    <div className="form-check">
                                                                        <input
                                                                            type="radio"
                                                                            id={`true-${index}`}
                                                                            name={`correctAnswer-${index}`}
                                                                            value="True"
                                                                            checked={question.correctAnswer === 'True'}
                                                                            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                                                                            className="form-check-input"
                                                                        />
                                                                        <label className="form-check-label" htmlFor={`true-${index}`}>
                                                                            True
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <input
                                                                            type="radio"
                                                                            id={`false-${index}`}
                                                                            name={`correctAnswer-${index}`}
                                                                            value="False"
                                                                            checked={question.correctAnswer === 'False'}
                                                                            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                                                                            className="form-check-input"
                                                                        />
                                                                        <label className="form-check-label" htmlFor={`false-${index}`}>
                                                                            False
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                        {question.type === "FILL-BLANK" && (
                                                            <>
                                                                <label className="form-label" style={{ fontWeight: 'bold' }}>
                                                                    Answers:
                                                                </label>
                                                                {question.possibleAnswers.map((answer, answerIndex) => (
                                                                    <div key={answerIndex} className="mb-2 d-flex align-items-center">
                                                                        <input
                                                                            type="text"
                                                                            value={answer}
                                                                            onChange={(e) => handleCorrectAnswersChange(index, answerIndex, e.target.value)}
                                                                            className="form-control"
                                                                            placeholder={`Possible Answer ${answerIndex + 1}`}
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-danger btn-sm ms-2"
                                                                            onClick={() => removeAnswerField(index, answerIndex)}
                                                                        >
                                                                            X
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-secondary my-2"
                                                                    onClick={() => addAnswerField(index)}
                                                                >
                                                                    + Add Another Answer
                                                                </button>
                                                            </>
                                                        )}
                                                        <br />

                                                        <button type="button" className="btn btn-primary" onClick={saveQuestion}>
                                                            Save
                                                        </button>
                                                        <button type="button" className="btn btn-danger ms-2" onClick={() => deleteQuestion(index)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No questions added yet.</p>
                                    )}
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>

                </div>
            )}
        </div>
    );
}
export default QuizEditor;