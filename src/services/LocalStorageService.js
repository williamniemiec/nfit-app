/**
 * Responsible for providing device storage services.
 */
class LocalStorageService {
  
  //---------------------------------------------------------------------------
  //        Constructor
  //---------------------------------------------------------------------------
  constructor(dispatch) {
    this.dispatch = dispatch;
  }


  //---------------------------------------------------------------------------
  //        Methods
  //---------------------------------------------------------------------------
  newUser(name, level, workoutDays, workouts) {
    this.dispatch({
      type: 'SET_NAME',
      payload: { name },
    });
    this.dispatch({
      type: 'SET_LEVEL',
      payload: { level: level },
    });
    this.dispatch({
      type: 'SET_WORKOUT_DAYS',
      payload: { workoutDays },
    });
    this.dispatch({
      type: 'SET_MY_WORKOUTS',
      payload: { workouts },
    });
  }

  markWorkoutAsDone(workoutId) {
    this.dispatch({
      type: 'ADD_DAILY_PROGRESS',
      payload: { date: this._getCurrentDate() },
    });
    this.dispatch({
      type: 'SET_LAST_WORKOUT',
      payload: { workout: workoutId },
    });
  }

  _getCurrentDate() {
    const today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth() + 1;
    let thisDay = today.getDate();
  
    if (thisMonth < 10) {
      thisMonth = '0' + thisMonth;
    }
  
    if (thisDay < 10) {
      thisDay = '0' + thisDay;
    }
  
    return `${thisYear}-${thisMonth}-${thisDay}`;
  }

  deleteWorkout(workoutId) {
    this.dispatch({
      type: 'DEL_MY_WORKOUTS',
      payload: { workoutId },
    });
  }

  addDailyProgress(date) {
    this.dispatch({
      type: 'ADD_DAILY_PROGRESS', 
      payload: { date }
    });
  }

  removeDailyProgress(date) {
    this.dispatch({
      type: 'DELETE_DAILY_PROGRESS', 
      payload: { date }
    });
  }

  addWorkout(id, name, exercises) {
    this.dispatch({
      type: 'ADD_MY_WORKOUTS',
      payload: { id, name, exercises },
    });
  }

  updateWorkout(id, name, exercises) {
    this.dispatch({
      type: 'UPDATE_MY_WORKOUTS',
      payload: { id, name, exercises },
    });
  }

  addWorkoutDay(day) {
    this.dispatch({
      type: 'ADD_WORKOUT_DAY',
      payload: { workoutDay: day },
    });
  }

  removeWorkoutDay(day) {
    this.dispatch({
      type: 'DEL_WORKOUT_DAY',
      payload: { workoutDay: day },
    });
  }

  setLevel(level) {
    this.dispatch({
      type: 'SET_LEVEL',
      payload: { level }
    });
  }

  setName(name) {
    this.dispatch({
      type: 'SET_NAME',
      payload: { name }
    });
  }

  reset() {
    this.dispatch({ type: 'RESET' });
  }
}

export default LocalStorageService;
