import type { MarkingQuiz, Submission } from '../types'

const ML_FUNDAMENTALS_QUIZ: MarkingQuiz = {
  multipleChoice: [
    {
      id: 'mcq1',
      number: 1,
      prompt: 'What is supervised learning?',
      options: [
        { id: 'a', label: 'Learning without any labeled data' },
        { id: 'b', label: 'Learning from labeled input–output examples' },
        { id: 'c', label: 'Grouping unlabeled data into clusters' },
        { id: 'd', label: 'Learning only through trial-and-error rewards' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'b',
    },
    {
      id: 'mcq2',
      number: 2,
      prompt: 'Which of the following is an example of regression?',
      options: [
        { id: 'a', label: 'Predicting house prices from square footage' },
        { id: 'b', label: 'Classifying emails as spam or not spam' },
        { id: 'c', label: 'Segmenting customers into groups' },
        { id: 'd', label: 'Recommending products from purchase history' },
      ],
      correctOptionId: 'a',
      selectedOptionId: 'b',
    },
    {
      id: 'mcq3',
      number: 3,
      prompt: 'Which of the following is binary classification?',
      options: [
        { id: 'a', label: 'Predicting tomorrow’s temperature in °C' },
        { id: 'b', label: 'Predicting whether a customer will churn (yes/no)' },
        { id: 'c', label: 'Grouping products into categories' },
        { id: 'd', label: 'Forecasting monthly revenue' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'c',
    },
  ],
  structure: [
    {
      id: 'sq1',
      number: 4,
      prompt: 'What is the difference between regression and binary classification?',
      answer:
        'Regression predicts a continuous number, like price or temperature. Binary classification predicts one of two classes, like yes/no or spam/not spam. Both can use supervised learning, but the output type is different.',
      maxScore: 10,
    },
  ],
}

const DATA_CLEANING_QUIZ: MarkingQuiz = {
  multipleChoice: [
    {
      id: 'mcq1',
      number: 1,
      prompt: 'When should you avoid dropna() on a financial dataset?',
      options: [
        { id: 'a', label: 'When missing values are random and few' },
        { id: 'b', label: 'When dropping rows removes a large share of records' },
        { id: 'c', label: 'When all columns are numeric' },
        { id: 'd', label: 'When the dataset has no duplicates' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'b',
    },
    {
      id: 'mcq2',
      number: 2,
      prompt: 'Which method preserves more rows while handling missing numeric values?',
      options: [
        { id: 'a', label: 'dropna()' },
        { id: 'b', label: 'fillna() with median or mean' },
        { id: 'c', label: 'Deleting the column' },
        { id: 'd', label: 'Replacing all nulls with zero always' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'a',
    },
    {
      id: 'mcq3',
      number: 3,
      prompt: 'What does df.info() help you identify first in EDA?',
      options: [
        { id: 'a', label: 'Model accuracy' },
        { id: 'b', label: 'Column types and non-null counts' },
        { id: 'c', label: 'Feature importance' },
        { id: 'd', label: 'Train/test split size' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'b',
    },
  ],
  structure: [
    {
      id: 'sq1',
      number: 4,
      prompt:
        'Explain your approach to handling missing values in this assignment. Why did you choose dropna() or an alternative?',
      answer:
        'I used dropna() because the output looked cleaner and the code still ran. I removed all rows with any missing value before calling describe().',
      maxScore: 10,
    },
  ],
}

const QUIZ_BY_SUBMISSION: Record<string, MarkingQuiz> = {
  sub1: DATA_CLEANING_QUIZ,
  sub9: ML_FUNDAMENTALS_QUIZ,
}

function buildDefaultQuiz(submission: Submission): MarkingQuiz {
  return {
    multipleChoice: [
      {
        id: 'mcq1',
        number: 1,
        prompt: `Auto-graded check: Did the student submit work for "${submission.assignmentTitle}"?`,
        options: [
          { id: 'a', label: 'Yes — submission received' },
          { id: 'b', label: 'No submission found' },
          { id: 'c', label: 'Submission is blank' },
          { id: 'd', label: 'Cannot determine' },
        ],
        correctOptionId: 'a',
        selectedOptionId: 'a',
      },
    ],
    structure: [
      {
        id: 'sq1',
        number: 2,
        prompt: 'Review the student’s submitted work and explain your grading rationale.',
        answer: submission.content,
        maxScore: 10,
      },
    ],
  }
}

export function getMarkingQuiz(submission: Submission): MarkingQuiz {
  return QUIZ_BY_SUBMISSION[submission.id] ?? buildDefaultQuiz(submission)
}

export function getMcqAutoScore(quiz: MarkingQuiz): { earned: number; total: number } {
  const total = quiz.multipleChoice.length
  const earned = quiz.multipleChoice.filter(
    (q) => q.selectedOptionId === q.correctOptionId
  ).length
  return { earned, total }
}
