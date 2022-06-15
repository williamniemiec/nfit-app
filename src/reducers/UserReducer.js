const initialState = {
  name: '',
  level: '', // beginner, intermediate, advanced
  workoutDays: [], // 0-6 (sunday = 0)
  myWorkouts: [],
  lastWorkout: '', // id
  dailyProgress: ['2019-09-13', '2019-09-12'],
};


export default (state = initialState, action) => {
  let newMyWorkouts = state.myWorkouts;
  let newWorkoutDays = state.workoutDays;
  let dailyProgress = state.dailyProgress;
  let index = -1;

  switch (action.type) {
    case 'SET_NAME':
      if (action.payload.name) {
        return {...state, name: action.payload.name};
      }
      break;
    case 'SET_LEVEL':
      return {...state, level: action.payload.level};
    case 'SET_WORKOUT_DAYS':
      return {...state, workoutDays: action.payload.workoutDays};
    case 'ADD_WORKOUT_DAY':
      newWorkoutDays.push(action.payload.workoutDay);

      return {...state, workoutDays: newWorkoutDays};
    case 'DEL_WORKOUT_DAY':
      newWorkoutDays = state.workoutDays.filter(
        (item) => item != action.payload.workoutDay,
      );

      return {...state, workoutDays: newWorkoutDays};
    case 'SET_MY_WORKOUTS':
      return {...state, myWorkouts: action.payload.workouts};
    case 'ADD_MY_WORKOUTS':
      index = newMyWorkouts.findIndex((e) => e.id == action.payload.id);
      if (index == -1) {
        newMyWorkouts.push({
          id: action.payload.id,
          name: action.payload.name,
          exercises: action.payload.exercises,
        });
      }

      return {...state, myWorkouts: newMyWorkouts};
    case 'UPDATE_MY_WORKOUTS':
      index = newMyWorkouts.findIndex((e) => e.id == action.payload.id);
      if (index != -1) {
        newMyWorkouts[index].name = action.payload.name;
        newMyWorkouts[index].exercises = action.payload.exercises;
      }

      return {...state, myWorkouts: newMyWorkouts};
    case 'DEL_MY_WORKOUTS':
      newMyWorkouts = state.myWorkouts.filter(
        (item) => item != action.payload.workoutId,
      );

      return {...state, myWorkouts: newMyWorkouts};
    case 'ADD_DAILY_PROGRESS':
      if (!dailyProgress.includes(action.payload.date)) {
        dailyProgress.push(action.payload.date);

        return {...state, dailyProgress: dailyProgress};
      }

      break;
    case 'DELETE_DAILY_PROGRESS':
      dailyProgress = state.dailyProgress.filter(
        (date, _) => date != action.payload.date,
      );

      return {...state, dailyProgress: dailyProgress};
    case 'SET_LAST_WORKOUT':
      return {...state, lastWorkout: action.payload.workout};
    case 'RESET':
      return initialState;
  }

  return state;
};
