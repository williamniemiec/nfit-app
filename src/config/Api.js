import firestore from '@react-native-firebase/firestore';

export default {

  getWorkoutByLevel: async (level) => {
    let workoutsByLevel = [];
    const workouts = []
    
    const result = await firestore().collection('workout_level').get()

    result.forEach(async workoutLevelResult => {
      let workoutLevel = workoutLevelResult.data();
      
      if (workoutLevel.level !== level)
        return;  
      
      workoutLevel.workouts.forEach(async workoutResult => {
        workouts.push(workoutResult)
      })
    })

    for (let workoutResult of workouts) {
      let workoutResultItem = await workoutResult.get();
      let workout = workoutResultItem.data()
      let exercises = []

      for (let exerciseResult of workout.exercises) {
        let exercise = await exerciseResult.get();
        exercises.push(exercise.data());
      }

      workoutsByLevel.push({
        name: workout.name,
        exercises: exercises
      });
    }
    
    return workoutsByLevel;
  }
}
