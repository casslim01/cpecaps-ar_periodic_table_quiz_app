import React from 'react';
import QuizComponent from './quizComponent';
import { quizDataModule2 } from '../constants/quizData';

export default function Module2() {
  return (
    <QuizComponent 
      quizData={quizDataModule2}
      moduleId="module2"
      moduleName="Atomic Numbers Quiz"
    />
  );
}