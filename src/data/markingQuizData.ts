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
        { id: 'a', label: "Predicting tomorrow's temperature in °C" },
        { id: 'b', label: 'Predicting whether a customer will churn (yes/no)' },
        { id: 'c', label: 'Grouping products into categories' },
        { id: 'd', label: 'Forecasting monthly revenue' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'c',
    },
    {
      id: 'mcq4',
      number: 4,
      prompt: 'What does overfitting mean?',
      options: [
        { id: 'a', label: 'The model performs well on training data but poorly on new data' },
        { id: 'b', label: 'The model never learns any patterns' },
        { id: 'c', label: 'The model has too few parameters' },
        { id: 'd', label: 'The training dataset is too large' },
      ],
      correctOptionId: 'a',
      selectedOptionId: 'a',
    },
    {
      id: 'mcq5',
      number: 5,
      prompt: 'Which metric is most appropriate for an imbalanced binary classification problem?',
      options: [
        { id: 'a', label: 'Accuracy alone' },
        { id: 'b', label: 'F1-score or ROC-AUC' },
        { id: 'c', label: 'Mean squared error' },
        { id: 'd', label: 'R-squared' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'a',
    },
  ],
  structure: [
    {
      id: 'sq1',
      number: 6,
      prompt: 'What is the difference between regression and binary classification?',
      answer:
        'Regression is for continuous numerical values, and predicts a single value in a certain future timestamp. Binary classification is for classifying data into binary groups of 1 and 0.',
      maxScore: 10,
    },
    {
      id: 'sq2',
      number: 7,
      prompt:
        'Give a real-world example of a binary classification problem. Name the target variable and explain why it is binary.',
      answer:
        'Email spam detection — the target is whether an email is spam (1) or not spam (0). It is binary because there are only two possible outcomes for each email.',
      maxScore: 10,
    },
    {
      id: 'sq3',
      number: 8,
      prompt: 'Explain the bias–variance tradeoff in simple terms.',
      answer:
        'A simple model may underfit (high bias) and miss patterns. A very complex model may overfit (high variance) and memorize noise. The goal is to find a balance that generalizes well to new data.',
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
    {
      id: 'mcq4',
      number: 4,
      prompt: 'Which imputation strategy is generally safest for skewed numeric columns?',
      options: [
        { id: 'a', label: 'Mean' },
        { id: 'b', label: 'Median' },
        { id: 'c', label: 'Mode' },
        { id: 'd', label: 'Forward fill always' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'c',
    },
    {
      id: 'mcq5',
      number: 5,
      prompt: 'What is the main risk of using dropna() without checking missingness first?',
      options: [
        { id: 'a', label: 'It always improves model accuracy' },
        { id: 'b', label: 'You may silently remove too much data and introduce bias' },
        { id: 'c', label: 'It converts strings to numbers' },
        { id: 'd', label: 'It duplicates rows' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'b',
    },
  ],
  structure: [
    {
      id: 'sq1',
      number: 6,
      prompt:
        'Explain your approach to handling missing values in this assignment. Why did you choose dropna() or an alternative?',
      answer:
        'I used dropna() because the output looked cleaner and the code still ran. I removed all rows with any missing value before calling describe().',
      maxScore: 10,
    },
    {
      id: 'sq2',
      number: 7,
      prompt:
        'When would you use mean vs median vs mode to fill missing values? Give one example for each.',
      answer:
        'Mean for normally distributed numeric data like age. Median for skewed data like income. Mode for categorical columns like city or product category.',
      maxScore: 10,
    },
    {
      id: 'sq3',
      number: 8,
      prompt:
        'Review the submitted code. What is problematic about using dropna() on this financial dataset, and what would you change?',
      answer:
        'import pandas as pd\n\ndata = pd.read_csv("sales.csv")\n# Dropping all null rows\ndata.dropna(inplace=True)\n\nprint(data.describe())',
      maxScore: 10,
    },
  ],
}

const EDA_QUIZ: MarkingQuiz = {
  multipleChoice: [
    {
      id: 'mcq1',
      number: 1,
      prompt: 'What is the primary goal of exploratory data analysis (EDA)?',
      options: [
        { id: 'a', label: 'Deploy a model to production' },
        { id: 'b', label: 'Understand patterns, distributions, and data quality before modeling' },
        { id: 'c', label: 'Write database migrations' },
        { id: 'd', label: 'Tune hyperparameters' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'b',
    },
    {
      id: 'mcq2',
      number: 2,
      prompt: 'Which pandas method gives summary statistics for numeric columns?',
      options: [
        { id: 'a', label: 'head()' },
        { id: 'b', label: 'describe()' },
        { id: 'c', label: 'tail()' },
        { id: 'd', label: 'astype()' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'a',
    },
    {
      id: 'mcq3',
      number: 3,
      prompt: 'Which chart is best for comparing revenue across regions?',
      options: [
        { id: 'a', label: 'Line chart' },
        { id: 'b', label: 'Bar chart' },
        { id: 'c', label: 'Scatter plot' },
        { id: 'd', label: 'Pie chart for every numeric column' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'b',
    },
    {
      id: 'mcq4',
      number: 4,
      prompt: 'What should you check first when you load a new CSV for analysis?',
      options: [
        { id: 'a', label: 'Model accuracy' },
        { id: 'b', label: 'Shape, dtypes, missing values, and duplicates' },
        { id: 'c', label: 'GPU availability' },
        { id: 'd', label: 'API rate limits' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'c',
    },
    {
      id: 'mcq5',
      number: 5,
      prompt: 'Why is visualizing distributions useful in EDA?',
      options: [
        { id: 'a', label: 'It replaces the need for summary statistics' },
        { id: 'b', label: 'It helps spot skew, outliers, and unexpected patterns' },
        { id: 'c', label: 'It guarantees higher model accuracy' },
        { id: 'd', label: 'It removes missing values automatically' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'b',
    },
  ],
  structure: [
    {
      id: 'sq1',
      number: 6,
      prompt:
        'List three data quality checks you would run on a new customer dataset before any modeling.',
      answer:
        '1) Check missing values per column. 2) Look for duplicate customer IDs. 3) Validate dtypes and ranges (e.g. age should not be negative).',
      maxScore: 10,
    },
    {
      id: 'sq2',
      number: 7,
      prompt:
        'Your submission only prints head(). What additional EDA steps are missing, and why do they matter?',
      answer:
        'I only ran head() to preview the data. I did not check missing values, summary stats, or plots. That makes it hard to understand distributions and data quality issues.',
      maxScore: 10,
    },
    {
      id: 'sq3',
      number: 8,
      prompt: 'Describe one visualization you would add for this dataset and what insight it would reveal.',
      answer:
        'A histogram of purchase frequency would show whether most customers buy rarely or if there is a long tail of heavy buyers.',
      maxScore: 10,
    },
  ],
}

const PYTHON_DATA_QUIZ: MarkingQuiz = {
  multipleChoice: [
    {
      id: 'mcq1',
      number: 1,
      prompt: 'What is the difference between df.loc and df.iloc?',
      options: [
        { id: 'a', label: 'loc uses labels; iloc uses integer positions' },
        { id: 'b', label: 'loc is faster; iloc is slower' },
        { id: 'c', label: 'loc only works on strings; iloc only on numbers' },
        { id: 'd', label: 'They are identical' },
      ],
      correctOptionId: 'a',
      selectedOptionId: 'a',
    },
    {
      id: 'mcq2',
      number: 2,
      prompt: 'Which pandas method groups rows and applies an aggregation?',
      options: [
        { id: 'a', label: 'merge()' },
        { id: 'b', label: 'groupby()' },
        { id: 'c', label: 'pivot()' },
        { id: 'd', label: 'concat()' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'b',
    },
    {
      id: 'mcq3',
      number: 3,
      prompt: 'What does inplace=True do in pandas?',
      options: [
        { id: 'a', label: 'Modifies the DataFrame in memory instead of returning a copy' },
        { id: 'b', label: 'Saves the file to disk' },
        { id: 'c', label: 'Creates a backup automatically' },
        { id: 'd', label: 'Converts all columns to strings' },
      ],
      correctOptionId: 'a',
      selectedOptionId: 'c',
    },
    {
      id: 'mcq4',
      number: 4,
      prompt: 'Which is the best first step after loading a CSV into a DataFrame?',
      options: [
        { id: 'a', label: 'Train a random forest immediately' },
        { id: 'b', label: 'Inspect shape, columns, and dtypes' },
        { id: 'c', label: 'Delete half the rows' },
        { id: 'd', label: 'Export to JSON' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'b',
    },
    {
      id: 'mcq5',
      number: 5,
      prompt: 'Why should you avoid chained indexing like df[col][row] in pandas?',
      options: [
        { id: 'a', label: 'It can return a view and lead to SettingWithCopyWarning' },
        { id: 'b', label: 'It always deletes the DataFrame' },
        { id: 'c', label: 'It only works in Python 2' },
        { id: 'd', label: 'It improves performance' },
      ],
      correctOptionId: 'a',
      selectedOptionId: 'b',
    },
  ],
  structure: [
    {
      id: 'sq1',
      number: 6,
      prompt: 'Explain when you would use loc vs iloc with a concrete example from your code.',
      answer:
        'I used loc[0] and iloc[0] on the same row. loc uses the index label, while iloc uses position. If the index is not 0-based, they can return different rows.',
      maxScore: 10,
    },
    {
      id: 'sq2',
      number: 7,
      prompt: 'Write a short explanation of what your groupby code does and what the output represents.',
      answer:
        'sales.groupby("region")["revenue"].sum() groups sales by region and sums revenue for each region. The output shows total revenue per region.',
      maxScore: 10,
    },
    {
      id: 'sq3',
      number: 8,
      prompt: 'What is one improvement you would make to your submitted code and why?',
      answer:
        'I would add comments and handle missing regions before groupby, so the output is easier to read and does not silently drop incomplete rows.',
      maxScore: 10,
    },
  ],
}

const SALES_EXPLORATION_QUIZ: MarkingQuiz = {
  multipleChoice: [
    {
      id: 'mcq1',
      number: 1,
      prompt: 'Which aggregation answers "total revenue per region"?',
      options: [
        { id: 'a', label: 'sales["revenue"].mean()' },
        { id: 'b', label: 'sales.groupby("region")["revenue"].sum()' },
        { id: 'c', label: 'sales.dropna()' },
        { id: 'd', label: 'sales.sort_index()' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'b',
    },
    {
      id: 'mcq2',
      number: 2,
      prompt: 'What does groupby() return before an aggregation is applied?',
      options: [
        { id: 'a', label: 'A GroupBy object' },
        { id: 'b', label: 'A matplotlib figure' },
        { id: 'c', label: 'A SQL connection' },
        { id: 'd', label: 'A trained model' },
      ],
      correctOptionId: 'a',
      selectedOptionId: 'a',
    },
    {
      id: 'mcq3',
      number: 3,
      prompt: 'If the region column has missing values, what can happen during groupby?',
      options: [
        { id: 'a', label: 'Rows with missing region may be excluded from groups' },
        { id: 'b', label: 'Pandas automatically fills regions with "Unknown"' },
        { id: 'c', label: 'The file cannot be read' },
        { id: 'd', label: 'Revenue becomes categorical' },
      ],
      correctOptionId: 'a',
      selectedOptionId: 'c',
    },
    {
      id: 'mcq4',
      number: 4,
      prompt: 'Which method previews the first rows of a DataFrame?',
      options: [
        { id: 'a', label: 'info()' },
        { id: 'b', label: 'head()' },
        { id: 'c', label: 'describe()' },
        { id: 'd', label: 'value_counts()' },
      ],
      correctOptionId: 'b',
      selectedOptionId: 'b',
    },
    {
      id: 'mcq5',
      number: 5,
      prompt: 'Why is it useful to sort aggregated results?',
      options: [
        { id: 'a', label: 'To quickly identify top and bottom performing regions' },
        { id: 'b', label: 'To remove duplicates' },
        { id: 'c', label: 'To convert revenue to strings' },
        { id: 'd', label: 'To impute missing values' },
      ],
      correctOptionId: 'a',
      selectedOptionId: 'd',
    },
  ],
  structure: [
    {
      id: 'sq1',
      number: 6,
      prompt: 'Interpret the output of your groupby: which region has the highest revenue and why does that matter?',
      answer:
        'West has the highest revenue in my output. That matters because the business may want to investigate what drives performance there and replicate it in weaker regions.',
      maxScore: 10,
    },
    {
      id: 'sq2',
      number: 7,
      prompt: 'What data cleaning steps would you run on sales.csv before aggregating by region?',
      answer:
        'Check for missing region or revenue values, strip whitespace from region names, and remove or fix duplicate rows.',
      maxScore: 10,
    },
    {
      id: 'sq3',
      number: 8,
      prompt: 'Your code only prints head(). What is missing to complete the assignment requirements?',
      answer:
        'The assignment asks for revenue by region, but I only previewed the file. I still need groupby("region")["revenue"].sum() and a short interpretation.',
      maxScore: 10,
    },
  ],
}

const QUIZ_BY_SUBMISSION: Record<string, MarkingQuiz> = {
  sub1: DATA_CLEANING_QUIZ,
  sub2: SALES_EXPLORATION_QUIZ,
  sub3: PYTHON_DATA_QUIZ,
  sub4: EDA_QUIZ,
  sub5: EDA_QUIZ,
  sub7: EDA_QUIZ,
  sub8: SALES_EXPLORATION_QUIZ,
  sub9: ML_FUNDAMENTALS_QUIZ,
}

function buildDefaultQuiz(submission: Submission): MarkingQuiz {
  const title = submission.assignmentTitle.toLowerCase()

  if (title.includes('missing') || title.includes('clean')) return DATA_CLEANING_QUIZ
  if (title.includes('exploratory') || title.includes('eda')) return EDA_QUIZ
  if (title.includes('sales') || title.includes('groupby')) return SALES_EXPLORATION_QUIZ
  if (title.includes('python') || title.includes('quiz') || title.includes('index')) {
    return PYTHON_DATA_QUIZ
  }
  if (title.includes('classification') || title.includes('regression') || title.includes('ml')) {
    return ML_FUNDAMENTALS_QUIZ
  }

  return {
    multipleChoice: [
      {
        id: 'mcq1',
        number: 1,
        prompt: 'Which library is most commonly used for tabular data manipulation in Python?',
        options: [
          { id: 'a', label: 'NumPy' },
          { id: 'b', label: 'Pandas' },
          { id: 'c', label: 'Matplotlib' },
          { id: 'd', label: 'Requests' },
        ],
        correctOptionId: 'b',
        selectedOptionId: 'b',
      },
      {
        id: 'mcq2',
        number: 2,
        prompt: 'What does df.shape return?',
        options: [
          { id: 'a', label: 'Column names' },
          { id: 'b', label: 'Number of rows and columns' },
          { id: 'c', label: 'Summary statistics' },
          { id: 'd', label: 'Missing value count' },
        ],
        correctOptionId: 'b',
        selectedOptionId: 'a',
      },
      {
        id: 'mcq3',
        number: 3,
        prompt: 'Which step should come before building a predictive model?',
        options: [
          { id: 'a', label: 'Exploratory data analysis' },
          { id: 'b', label: 'Deploying to production' },
          { id: 'c', label: 'Writing unit tests for the API' },
          { id: 'd', label: 'Choosing a logo' },
        ],
        correctOptionId: 'a',
        selectedOptionId: 'a',
      },
      {
        id: 'mcq4',
        number: 4,
        prompt: `For "${submission.assignmentTitle}", was a submission received?`,
        options: [
          { id: 'a', label: 'Yes — submission received' },
          { id: 'b', label: 'No submission found' },
          { id: 'c', label: 'Submission is blank' },
          { id: 'd', label: 'Cannot determine' },
        ],
        correctOptionId: 'a',
        selectedOptionId: 'a',
      },
      {
        id: 'mcq5',
        number: 5,
        prompt: 'Why is it important to document your data analysis steps?',
        options: [
          { id: 'a', label: 'So others can reproduce and review your work' },
          { id: 'b', label: 'To increase RAM usage' },
          { id: 'c', label: 'To avoid using comments' },
          { id: 'd', label: 'To skip validation' },
        ],
        correctOptionId: 'a',
        selectedOptionId: 'c',
      },
    ],
    structure: [
      {
        id: 'sq1',
        number: 6,
        prompt: 'Summarize what the student submitted and whether it meets the assignment brief.',
        answer: submission.content,
        maxScore: 10,
      },
      {
        id: 'sq2',
        number: 7,
        prompt: 'What is one strength and one area for improvement in this submission?',
        answer:
          'Strength: the code runs and loads the dataset correctly. Improvement: add more explanation, handle edge cases, and complete all parts of the prompt.',
        maxScore: 10,
      },
      {
        id: 'sq3',
        number: 8,
        prompt: 'What feedback would you give the learner to improve on the next attempt?',
        answer:
          'Break the task into smaller steps — load, inspect, clean, analyze, then interpret. Add comments so a mentor can follow your reasoning.',
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
