import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { quizStyles as styles } from '../constants/styles';
import { useAuth } from '../lib/auth-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScores } from '../../hooks/useScores';
import { router } from 'expo-router';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizComponentProps {
  quizData: Question[];
  moduleId: string;
  moduleName: string;
}

export default function QuizComponent({ quizData, moduleId, moduleName }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);

  const { signOut, user } = useAuth();
  const { saveScore, loading: savingScore, error: saveError } = useScores();

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = async () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const finalScore = selectedAnswer === quizData[currentQuestion].correctAnswer ? score + 1 : score;
      setScore(finalScore);
      setQuizFinished(true);
      
      if (user) {
        try {
          await saveScore({
            userID: user.$id,
            moduleID: moduleId,
            score: finalScore
          });
          setScoreSaved(true);
        } catch (error) {
          Alert.alert('Error', 'Failed to save your score. Please try again.');
          console.error('Failed to save score:', error);
        }
      }
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
    setScoreSaved(false);
  };

  const goBack = () => {
    router.back();
  };

  if (quizFinished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>{moduleName} Complete!</Text>
          <Text style={styles.scoreText}>
            Your Score: {score} / {quizData.length}
          </Text>
          <Text style={styles.percentageText}>
            {Math.round((score / quizData.length) * 100)}%
          </Text>
          
          {savingScore && (
            <Text style={styles.savingText}>Saving your score...</Text>
          )}
          {scoreSaved && (
            <Text style={styles.savedText}>✓ Score saved successfully!</Text>
          )}
          {saveError && (
            <Text style={styles.errorText}>⚠ Failed to save score</Text>
          )}
          
          <View style={styles.resultButtonsContainer}>
            <TouchableOpacity style={styles.restartButton} onPress={resetQuiz}>
              <Text style={styles.restartButtonText}>Restart Quiz</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Text style={styles.backButtonText}>Back to Menu</Text>
            </TouchableOpacity>
          </View>
          
          {user && (
            <Text style={styles.userInfo}>
              Signed in as: {user.email}
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{moduleName}</Text>
          <Text style={styles.progress}>
            Question {currentQuestion + 1} of {quizData.length}
          </Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${((currentQuestion + 1) / quizData.length) * 100}%` }
            ]} 
          />
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {quizData[currentQuestion].question}
          </Text>
        </View>

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

        <View style={styles.scoreContainer}>
          <Text style={styles.currentScore}>Score: {score} / {quizData.length}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}