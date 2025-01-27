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
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-2xl bg-neutral">
        {!country ? (
          <div className="card-body text-center">
            <h2 className="text-lg font-bold mb-6">
              Choose a country to start the quiz
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => selectCountry("France")}
                className="btn rounded-full px-6 py-2"
              >
                France
              </button>
              <button
                onClick={() => selectCountry("Japan")}
                className="btn rounded-full px-6 py-2"
              >
                Japan
              </button>
            </div>
          </div>
        ) : isLoading ? (
          <div className="card-body text-center">
            <p className="text-lg">Loading question..</p>
          </div>
        ) : (
          <div className="card-body text-center">
            <h2 className="text-lg font-bold mb-6">{question}</h2>
            <div className="flex flex-col gap-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="btn rounded-full px-8 py-4"
                >
                  {option}
                </button>
              ))}
            </div>
            {feedback && <p className="mt-4 text-lg font-bold">{feedback}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
