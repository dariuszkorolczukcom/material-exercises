import React, { Component, Fragment } from 'react';
import { Header, Footer } from './Layouts';
import Exercises from './Exercises';
import { muscles, exercises } from '../store.js';
//import ReactPaginate from 'react-paginate';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: exercises,
      exercise: [],
      musclesValue: '',
      exerciseValue: '',
      descriptionValue: ''
    }
    this.handleMusclesChange = this.handleMusclesChange.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  generateKey = (pre) => {
    return `${pre}_${new Date().getTime().toString(16)}`;
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

  handleSubmit(event) {
    alert(this.state.exercises);
        event.preventDefault();
    let exercisesTemp = this.state.exercises;
    let exerciseNew = {
      id: this.state.exerciseValue.replace(/\s+/g, '-').toLowerCase(),
      title: this.state.exerciseValue,
      description: this.state.descriptionValue,
      muscles: this.state.musclesValue
    }
    exercisesTemp.push(exerciseNew);
    alert(exercisesTemp);
    this.setState({
      exercises: exercisesTemp
    })
  }

  handleMusclesChange(event) {
    this.setState({musclesValue: event.target.value});
  }
  handleExerciseChange(event) {
    console.log(event.target)
    this.setState({exerciseValue: event.target.value});
  }
  handleDescriptionChange(event) {
    console.log(event.target)
    this.setState({descriptionValue: event.target.value});
  }

  handleCategorySelected = category => {
    this.setState({
      category
    })
    console.log(exercises)
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
    exercisesHolder.splice(id, 1);
    this.setState(({ exercises }) => ({
      exercise: exercisesHolder
    }))
  }

  render() {
    const exercises = this.getExercisesByMuscles(),
      { category, exercise, value } = this.state

    return <Fragment>
      <Header />

      <Exercises
        exercise={exercise}
        category={category}
        exercises={exercises}
        onSelect={this.handleExerciseSelected}
        onDelete={this.handleExerciseDeleted}
        handleSubmit={this.handleSubmit}
        musclesValue={this.state.musclesValue}
        exerciseValue={this.state.exerciseValue}
        descriptionValue={this.state.descriptionValue}
        handleMusclesChange={this.handleMusclesChange}
        handleExerciseChange={this.handleExerciseChange}
        handleDescriptionChange={this.handleDescriptionChange}
      />

      <Footer
        category={category}
        muscles={muscles}
        onSelect={this.handleCategorySelected}
      />
    </Fragment>
  }
}
