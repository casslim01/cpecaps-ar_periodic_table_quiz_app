import React, { useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { quizStyles as styles } from '../constants/styles';

// Sample quiz data - you can replace this with your own questions
const quizData = [
  {
    id: 1,
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is the most abundant gas in Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: 2
  }
];

export default function Index() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const showAnswerResult = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Quiz Complete!</Text>
          <Text style={styles.scoreText}>
            Your Score: {score} / {quizData.length}
          </Text>
          <Text style={styles.percentageText}>
            {Math.round((score / quizData.length) * 100)}%
          </Text>
          <TouchableOpacity style={styles.restartButton} onPress={resetQuiz}>
            <Text style={styles.restartButtonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Chemistry Quiz</Text>
          <Text style={styles.progress}>
            Question {currentQuestion + 1} of {quizData.length}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${((currentQuestion + 1) / quizData.length) * 100}%` }
            ]} 
          />
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {quizData[currentQuestion].question}
          </Text>
        </View>

        {/* Answer Options */}
        <View style={styles.optionsContainer}>
          {quizData[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && styles.selectedOption,
                showResult && index === quizData[currentQuestion].correctAnswer && styles.correctOption,
                showResult && selectedAnswer === index && index !== quizData[currentQuestion].correctAnswer && styles.incorrectOption
              ]}
              onPress={() => handleAnswerSelect(index)}
              disabled={showResult}
            >
              <Text style={[
                styles.optionText,
                selectedAnswer === index && styles.selectedOptionText,
                showResult && index === quizData[currentQuestion].correctAnswer && styles.correctOptionText,
                showResult && selectedAnswer === index && index !== quizData[currentQuestion].correctAnswer && styles.incorrectOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {!showResult ? (
            <TouchableOpacity
              style={[styles.submitButton, selectedAnswer === null && styles.disabledButton]}
              onPress={showAnswerResult}
              disabled={selectedAnswer === null}
            >
              <Text style={styles.submitButtonText}>Submit Answer</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentQuestion + 1 === quizData.length ? 'Finish Quiz' : 'Next Question'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Score Display */}
        <View style={styles.scoreContainer}>
          <Text style={styles.currentScore}>Score: {score} / {quizData.length}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
