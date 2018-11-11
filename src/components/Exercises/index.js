import React, { Fragment } from 'react'
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { EditorFormatAlignCenter } from 'material-ui/svg-icons';



const styles = {
  Paper: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 500,
    overflowY: 'auto'
  }
}

export default ({
  exercises,
  category,
  onSelect,
  exercise,
  onDelete,
  handleSubmit,
  musclesValue,
  exerciseValue,
  descriptionValue,
  handleMusclesChange,
  handleExerciseChange,
  handleDescriptionChange
}) =>
  <Grid container>
    <Grid item sm>
      <Paper style={styles.Paper}>
        {exercises.map(([group, exercises]) =>
          !category || category === group
            ? <Fragment key={group}>
              <Typography
                variant="headline"
                style={{ textTransform: 'capitalize' }}
              >
                {group}
              </Typography>
              <List component="ul">
                {exercises.map(({ id, title }) =>
                  <ListItem
                    key={id}
                    button
                    onClick={() => onSelect(id)}
                  >
                    <ListItemText primary={title} />
                  </ListItem>
                )}
              </List>
            </Fragment>
            : null
        )}
      </Paper>
    </Grid>
    <Grid item sm>

      <Paper style={styles.Paper}>
        <Grid container>
          {exercise.map((item, index) => {
            return (
              <Grid item sm={4} key={index}>
                <Typography
                  variant="display1"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="subheading"
                  style={{ marginTop: 20 }}
                >
                  {item.description}
                </Typography>
                <Button onClick={() => onDelete(index)} color="secondary">Delete</Button>
              </Grid>
            )
          })}
        </Grid>
      </Paper>
    </Grid>
    <Grid container style={{ margin:'20px' }}>
      <form>
        <Typography variant="display1">
          Add:
        </Typography>
        <Grid container style={{ textAlign:'center' }}>
        <Grid item>
         <label>
        <Typography variant="subheading">
          Muscles:
        </Typography>
        <TextField style={{margin:'10px'}} type="text" value={musclesValue} onChange={handleMusclesChange} />
        </label>
        </Grid>
        <Grid item>
         <label>
        <Typography variant="subheading">
          Exercise:
        </Typography>
          <TextField style={{margin:'10px'}} type="text" value={exerciseValue} onChange={handleExerciseChange} />
        </label>
        </Grid>
        <Grid item>
         <label>
        <Typography variant="subheading">
          Description:
        </Typography>
          <TextField style={{margin:'10px'}} type="text" value={descriptionValue} onChange={handleDescriptionChange} />
        </label>
        </Grid>
        <Button style={{margin:'10px'}} color='primary' type="submit" onClick={e => handleSubmit(e)} value="Submit">Submit</Button>

        </Grid>
        
      </form>
    </Grid>

  </Grid>