import React from 'react'
import ExerciseList from './comp/ExerciseList'

function Blog() {
  return (
<div className="min-h-screen ">
      <header className="text-center text-2xl font-bold py-6">🏋️ Exercises</header>
      <ExerciseList />
    </div>
  )
}

export default Blog