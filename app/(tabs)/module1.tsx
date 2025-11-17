import React from 'react';
import QuizComponent from './quizComponent';
import { quizDataModule1 } from '../constants/quizData';

export default function Module1() {
  return (
    <QuizComponent 
      quizData={quizDataModule1}
      moduleId="module1"
      moduleName="Chemical Symbols Quiz"
    />
  );
}