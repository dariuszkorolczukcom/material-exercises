import React, { Component, Fragment } from 'react'
import { Header, Footer } from './Layouts'
import Exercises from './Exercises'
import { muscles, exercises } from '../store.js'

export default class extends Component {
  state = {
    exercises,
    exercise: []
  }

  getExercisesByMuscles() {
    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise
        exercises[muscles] = exercises[muscles]
          ? [...exercises[muscles], exercise]
          : [exercise]

        return exercises
      }, {})
    )
  }

  handleCategorySelected = category => {
    this.setState({
      category
    })
  }

  handleExerciseSelected = id => {
    let exercisesHolder = this.state.exercise;
    let execiseNew = exercises.find(ex => ex.id === id);
    exercisesHolder.push(execiseNew);
    this.setState(({ exercises }) => ({
      exercise: exercisesHolder
    }))
  }

  handleExerciseDeleted = (id) => {
    let exercisesHolder = this.state.exercise;
    let execiseNew = exercisesHolder.filter((item) => item.id !== id);
    this.setState(({ exercises }) => ({
      exercise: execiseNew
    }))
  }

  render() {
    const exercises = this.getExercisesByMuscles(),
      { category, exercise } = this.state

    return <Fragment>
      <Header />

      <Exercises
        exercise={exercise}
        category={category}
        exercises={exercises}
        onSelect={this.handleExerciseSelected}
        onDelete={this.handleExerciseDeleted}
      />

      <Footer
        category={category}
        muscles={muscles}
        onSelect={this.handleCategorySelected}
      />
    </Fragment>
  }
}
