/* Quiz Data */

export const quizDataModule1 = [
  {
    id: 1,
    question: "What is the chemical symbol for Hydrogen?",
    options: ["H", "He", "Hy", "Hg"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What is the chemical symbol for Oxygen?",
    options: ["Ox", "O", "O2", "Om"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is the chemical symbol for Carbon?",
    options: ["Ca", "Cr", "C", "Co"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "What is the chemical symbol for Sodium?",
    options: ["So", "Na", "S", "N"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What is the chemical symbol for Iron?",
    options: ["Ir", "In", "I", "Fe"],
    correctAnswer: 3
  },
  {
    id: 6,
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "What is the chemical symbol for Silver?",
    options: ["Si", "Sv", "Ag", "S"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "What is the chemical symbol for Helium?",
    options: ["H", "He", "Hl", "Hm"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What is the chemical symbol for Nitrogen?",
    options: ["Ni", "N", "No", "Ne"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "What is the chemical symbol for Calcium?",
    options: ["C", "Cl", "Ca", "Cr"],
    correctAnswer: 2
  }
];

export const quizDataModule2 = [
  {
    id: 1,
    question: "What is the atomic number of Hydrogen?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What is the atomic number of Carbon?",
    options: ["4", "6", "8", "12"],
    correctAnswer: 1
  },
  // Add more questions for module 2
];

export const quizDataModule3 = [
  {
    id: 1,
    question: "Which group does Hydrogen belong to?",
    options: ["Group 1", "Group 2", "Group 17", "Group 18"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What period is Carbon in?",
    options: ["Period 1", "Period 2", "Period 3", "Period 4"],
    correctAnswer: 1
  },
  // Add more questions for module 3
];

// Export a mapping object for easy access
export const moduleQuizData = {
  module1: quizDataModule1,
  module2: quizDataModule2,
  module3: quizDataModule3,
};

// Keep backward compatibility
export const quizData = quizDataModule1;