import type { AiMarkingSuggestion, StructureQuestion } from '../types'

const SUGGESTIONS_BY_PROMPT: Record<string, AiMarkingSuggestion> = {
  'What is the difference between regression and binary classification?': {
    score: 8,
    feedback:
      'Answer is partly correct, but it contains an unnecessary and somewhat inaccurate point about "a certain future timestamp." Regression is not limited to forecasting future values; it predicts a continuous numeric value regardless of whether it\'s about the future or the present.',
  },
  'Give a real-world example of a binary classification problem. Name the target variable and explain why it is binary.':
    {
      score: 9,
      feedback:
        'Clear example with a well-defined binary target. Consider briefly noting that the classes should be mutually exclusive for a true binary setup.',
    },
  'Explain the bias–variance tradeoff in simple terms.': {
    score: 9,
    feedback:
      'Strong explanation covering underfitting and overfitting. You could add a one-line example (e.g. polynomial degree) to make it even more concrete.',
  },
  'Explain your approach to handling missing values in this assignment. Why did you choose dropna() or an alternative?':
    {
      score: 5,
      feedback:
        'The reasoning is too shallow for a financial dataset. The student chose dropna() for cosmetic cleanliness without checking how many rows were removed or considering imputation alternatives.',
    },
  'When would you use mean vs median vs mode to fill missing values? Give one example for each.': {
    score: 8,
    feedback:
      'Examples are appropriate and show understanding of when each measure fits. Ask the student to mention checking distribution shape before choosing mean vs median.',
  },
  'Review the submitted code. What is problematic about using dropna() on this financial dataset, and what would you change?':
    {
      score: 6,
      feedback:
        'The code runs but dropna() on all columns is risky here. Suggest fillna() with column medians for numeric fields and document the trade-off before summarizing with describe().',
    },
  'List three data quality checks you would run on a new customer dataset before any modeling.': {
    score: 8,
    feedback:
      'Covers the essentials — missing values, duplicates, and dtype/range checks. Could also mention outliers or inconsistent category labels.',
  },
  'Your submission only prints head(). What additional EDA steps are missing, and why do they matter?': {
    score: 6,
    feedback:
      'Student acknowledges the gap but the answer stays generic. Push for specific next steps: df.info(), df.describe(), missing-value counts, and at least one plot.',
  },
  'Describe one visualization you would add for this dataset and what insight it would reveal.': {
    score: 7,
    feedback:
      'Reasonable choice of histogram for purchase frequency. Ask them to specify the column name and what action the business might take from the insight.',
  },
  'Explain when you would use loc vs iloc with a concrete example from your code.': {
    score: 8,
    feedback:
      'Correct distinction between label-based and position-based indexing. Encourage the student to show a case where loc and iloc would differ (non-default index).',
  },
  'Write a short explanation of what your groupby code does and what the output represents.': {
    score: 8,
    feedback:
      'Accurate description of the aggregation. Suggest sorting the result and commenting on the top-performing region.',
  },
  'What is one improvement you would make to your submitted code and why?': {
    score: 7,
    feedback:
      'Practical improvement around comments and missing values. Could be stronger if tied to a specific line in the submitted code.',
  },
  'Interpret the output of your groupby: which region has the highest revenue and why does that matter?': {
    score: 7,
    feedback:
      'Good business interpretation. Verify the region name against the actual output and suggest next steps for underperforming regions.',
  },
  'What data cleaning steps would you run on sales.csv before aggregating by region?': {
    score: 8,
    feedback:
      'Solid pre-aggregation checklist. Add explicit handling for whitespace in region names and currency formatting in revenue if applicable.',
  },
  'Your code only prints head(). What is missing to complete the assignment requirements?': {
    score: 5,
    feedback:
      'Student correctly identifies the gap but has not completed the required groupby analysis. Assign partial credit for awareness, not for completion.',
  },
}

function buildFallbackSuggestion(question: StructureQuestion): AiMarkingSuggestion {
  const words = question.answer.trim().split(/\s+/).length
  const isCode = /^\s*(import |def |print\(|class |#)/m.test(question.answer)

  if (words < 15) {
    return {
      score: Math.max(3, Math.round(question.maxScore * 0.4)),
      feedback:
        'Answer is too brief for the prompt. Ask the student to expand with definitions, examples, or references to their submitted work.',
    }
  }

  if (isCode && words < 30) {
    return {
      score: Math.max(4, Math.round(question.maxScore * 0.5)),
      feedback:
        'Code is present but lacks explanation. Suggest adding comments, error handling, and a short rationale for the chosen approach.',
    }
  }

  if (words >= 40) {
    return {
      score: Math.max(7, Math.round(question.maxScore * 0.8)),
      feedback:
        'Answer shows reasonable effort and covers the main idea. Review for accuracy on edge cases and ask for one concrete improvement.',
    }
  }

  return {
    score: Math.max(6, Math.round(question.maxScore * 0.65)),
    feedback:
      'Partially addresses the prompt. Encourage the student to add a specific example and connect their answer back to the assignment requirements.',
  }
}

export function getAiMarkingSuggestion(question: StructureQuestion): AiMarkingSuggestion {
  if (question.aiSuggestion) return question.aiSuggestion
  return SUGGESTIONS_BY_PROMPT[question.prompt] ?? buildFallbackSuggestion(question)
}
