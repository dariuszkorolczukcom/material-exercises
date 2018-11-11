import React, { Component, Fragment } from 'react'
import { Header, Footer } from './Layouts'
import Exercises from './Exercises'
import { muscles, exercises } from '../store.js'

export default class extends Component {
  state = {
    exercises,
    exercise: []
  }
  generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime().toString(16) }`;
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
    let exerciseNew = exercises.find(ex => ex.id === id);
    exerciseNew.uniqueId = this.generateKey('exercise');
    exercisesHolder.push(exerciseNew);
    this.setState(({ exercises }) => ({
      exercise: exercisesHolder
    }))
  }

  handleExerciseDeleted = (id) => {
    let exercisesHolder = this.state.exercise;
    exercisesHolder.splice(id,1);
    this.setState(({ exercises }) => ({
      exercise: exercisesHolder
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
