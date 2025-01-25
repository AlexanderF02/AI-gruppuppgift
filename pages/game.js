import { useState } from "react";

export default function Game() {
  const [country, setCountry] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");

  // Hämtar ny fråga
  const fetchQuestion = async (chosenCountry) => {
    setIsLoading(true);
    setFeedback("");

    try {
      const response = await fetch("/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: chosenCountry }),
      });

      const data = await response.json();

      setQuestion(data.question);
      setOptions(data.options);
      setCorrectAnswer(data.correctAnswer);
    } catch (error) {
      console.error("Error getting question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Val av land tex Japan
  const selectCountry = (chosenCountry) => {
    setCountry(chosenCountry);
    fetchQuestion(chosenCountry);
  };


  const handleOptionClick = (option) => {
    if (option === correctAnswer) {
      setFeedback("Correct! 🎉🎉🎉");
    } else {
      setFeedback("Incorrect 😞😞😞");
    }


    setTimeout(() => {
      fetchQuestion(country);
    }, 2000);
  };

  return (
    <div className="p-8">
      {!country ? (
        <div className="mt-4">
          <p className="text-lg">Choose a country to start the quiz:</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => selectCountry("France")}
              className="btn btn-primary"
            >
              France
            </button>
            <button
              onClick={() => selectCountry("Japan")}
              className="btn btn-primary"
            >
              Japan
            </button>
          </div>
        </div>
      ) : isLoading ? (
        <p className="text-lg mt-4">Loading question..</p>
      ) : (
        <div className="mt-4">
          <p className="text-lg font-bold">{question}</p>
          <div className="mt-4 flex flex-col space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="btn btn-outline"
              >
                {option}
              </button>
            ))}
          </div>
          {feedback && <p className="mt-4 text-lg font-semibold">{feedback}</p>}
        </div>
      )}
    </div>
  )
}
