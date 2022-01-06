import React, { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const StatisticsRow = ({ type, value }) => <p>{type} {value}</p>
const Statistics = ({ goodCount, neutralCount, badCount }) => {
  const allFeedbackCount = goodCount + neutralCount + badCount
  const averageScore = allFeedbackCount > 0 ? ((goodCount * 1 + badCount * -1) / allFeedbackCount) : 0
  const positiveFeedbackPercent = allFeedbackCount > 0 ? (goodCount / allFeedbackCount) * 100 : 0
  
  return (
    <div>
      <StatisticsRow type="good" value={goodCount} />
      <StatisticsRow type="neutral" value={neutralCount} />
      <StatisticsRow type="bad" value={badCount} />
      <StatisticsRow type="all" value={allFeedbackCount} />
      <StatisticsRow type="average" value={averageScore} />
      <StatisticsRow type="positive" value={positiveFeedbackPercent + ' %'} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  const hasFeedback = (good + neutral + bad) > 0

  return (
    <div>
      <Heading text="give feedback" />

      <Button text="good" onClick={incrementGood} />
      <Button text="neutral" onClick={incrementNeutral} />
      <Button text="bad" onClick={incrementBad} />

      <Heading text="statistics" />

      { 
        hasFeedback 
          ? <Statistics goodCount={good} neutralCount={neutral} badCount={bad} /> 
          : <p>No feedback given</p> 
      }
    </div>
  )
}

export default App
