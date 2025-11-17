import React from 'react';
import QuizComponent from './quizComponent';
import { quizDataModule3 } from '../constants/quizData';

export default function Module3() {
  return (
    <QuizComponent 
      quizData={quizDataModule3}
      moduleId="module3"
      moduleName="Periodic Groups Quiz"
    />
  );
}