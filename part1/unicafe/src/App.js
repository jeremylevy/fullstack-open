import React, { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const FeedbackStatsRow = ({ type, value }) => <p>{type} {value}</p>
const FeebackStats = ({ goodCount, neutralCount, badCount }) => {
  const allFeedbackCount = goodCount + neutralCount + badCount
  const averageScore = allFeedbackCount > 0 ? ((goodCount * 1 + badCount * -1) / allFeedbackCount) : 0
  const positiveFeedbackPercent = allFeedbackCount > 0 ? (goodCount / allFeedbackCount) * 100 : 0
  
  return (
    <div>
      <FeedbackStatsRow type="good" value={goodCount} />
      <FeedbackStatsRow type="neutral" value={neutralCount} />
      <FeedbackStatsRow type="bad" value={badCount} />
      <FeedbackStatsRow type="all" value={allFeedbackCount} />
      <FeedbackStatsRow type="average" value={averageScore} />
      <FeedbackStatsRow type="positive" value={positiveFeedbackPercent + ' %'} />
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

  return (
    <div>
      <Heading text="give feedback" />

      <Button text="good" onClick={incrementGood} />
      <Button text="neutral" onClick={incrementNeutral} />
      <Button text="bad" onClick={incrementBad} />

      <Heading text="statistics" />

      <FeebackStats goodCount={good} neutralCount={neutral} badCount={bad} />
    </div>
  )
}

export default App
