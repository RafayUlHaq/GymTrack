import { WorkoutCategory } from '../types';

export const WORKOUT_CATEGORIES: WorkoutCategory[] = [
  {
    id: '1',
    name: 'Chest',
    emoji: '💪',
    color: '#E74C3C',
    exercises: [
      {
        id: 'c1',
        name: 'Bench Press',
        sets: 4,
        reps: '8-10',
        description:
          'Lie on a flat bench, grip the bar slightly wider than shoulder-width. Lower the bar to your chest and press back up.',
      },
      {
        id: 'c2',
        name: 'Incline Dumbbell Press',
        sets: 3,
        reps: '10-12',
        description:
          'Set bench to 30–45°. Press dumbbells from chest level upward, squeezing the upper chest at the top.',
      },
      {
        id: 'c3',
        name: 'Cable Fly',
        sets: 3,
        reps: '12-15',
        description:
          'Stand between two cable towers, pull handles together in front of your chest in a hugging motion.',
      },
      {
        id: 'c4',
        name: 'Push-Ups',
        sets: 3,
        reps: '15-20',
        description:
          'Classic bodyweight move. Keep your core tight and lower your chest to the floor, then push back up.',
      },
    ],
  },
  {
    id: '2',
    name: 'Back',
    emoji: '🏋️',
    color: '#2980B9',
    exercises: [
      {
        id: 'b1',
        name: 'Deadlift',
        sets: 4,
        reps: '5-6',
        description:
          'Hip-hinge movement. Keep your back straight, drive through your heels to pull the bar from the floor.',
      },
      {
        id: 'b2',
        name: 'Pull-Ups',
        sets: 4,
        reps: '6-8',
        description:
          'Hang from a bar with an overhand grip, pull your chin above the bar while keeping your core engaged.',
      },
      {
        id: 'b3',
        name: 'Bent-Over Row',
        sets: 3,
        reps: '8-10',
        description:
          'Hinge forward at the hips, pull the barbell toward your lower chest, squeezing your shoulder blades.',
      },
      {
        id: 'b4',
        name: 'Lat Pulldown',
        sets: 3,
        reps: '10-12',
        description:
          'Sit at the lat pulldown machine, pull the bar to your upper chest while keeping your torso upright.',
      },
    ],
  },
  {
    id: '3',
    name: 'Legs',
    emoji: '🦵',
    color: '#27AE60',
    exercises: [
      {
        id: 'l1',
        name: 'Squat',
        sets: 4,
        reps: '6-8',
        description:
          'Bar on your upper traps, feet shoulder-width apart. Squat until thighs are parallel to the floor.',
      },
      {
        id: 'l2',
        name: 'Romanian Deadlift',
        sets: 3,
        reps: '8-10',
        description:
          'Hinge at the hips with soft knees, lower the bar along your legs feeling a hamstring stretch.',
      },
      {
        id: 'l3',
        name: 'Leg Press',
        sets: 3,
        reps: '10-12',
        description:
          'Sit on the leg press machine, place feet shoulder-width on the platform, press until legs are extended.',
      },
      {
        id: 'l4',
        name: 'Walking Lunges',
        sets: 3,
        reps: '12 each leg',
        description:
          'Step forward into a lunge, then bring your back foot forward into the next lunge. Keep your torso upright.',
      },
    ],
  },
  {
    id: '4',
    name: 'Shoulders',
    emoji: '🔝',
    color: '#8E44AD',
    exercises: [
      {
        id: 's1',
        name: 'Overhead Press',
        sets: 4,
        reps: '6-8',
        description:
          'Press a barbell from shoulder height straight overhead. Keep your core braced and avoid arching.',
      },
      {
        id: 's2',
        name: 'Lateral Raises',
        sets: 3,
        reps: '12-15',
        description:
          'Hold dumbbells at your sides, raise them out to shoulder height with a slight bend in the elbow.',
      },
      {
        id: 's3',
        name: 'Face Pulls',
        sets: 3,
        reps: '15-20',
        description:
          'Using a rope attachment at face height, pull the rope toward your face, flaring your elbows out.',
      },
    ],
  },
  {
    id: '5',
    name: 'Arms',
    emoji: '💥',
    color: '#E67E22',
    exercises: [
      {
        id: 'a1',
        name: 'Barbell Curl',
        sets: 3,
        reps: '10-12',
        description:
          'Hold a barbell with an underhand grip, curl it toward your shoulders without swinging.',
      },
      {
        id: 'a2',
        name: 'Tricep Pushdown',
        sets: 3,
        reps: '12-15',
        description:
          'Using a cable machine, push a bar or rope attachment down until your arms are fully extended.',
      },
      {
        id: 'a3',
        name: 'Hammer Curls',
        sets: 3,
        reps: '10-12',
        description:
          'Hold dumbbells with a neutral (thumbs-up) grip and curl them up, targeting the brachialis.',
      },
      {
        id: 'a4',
        name: 'Skull Crushers',
        sets: 3,
        reps: '10-12',
        description:
          'Lie on a bench, hold an EZ bar above your chest, lower it toward your forehead then press back up.',
      },
    ],
  },
  {
    id: '6',
    name: 'Core',
    emoji: '🔥',
    color: '#16A085',
    exercises: [
      {
        id: 'cr1',
        name: 'Plank',
        sets: 3,
        reps: '30-60 sec',
        description:
          'Hold a push-up position on your forearms, keeping your body in a straight line from head to heels.',
      },
      {
        id: 'cr2',
        name: 'Cable Crunch',
        sets: 3,
        reps: '15-20',
        description:
          'Kneel at a cable machine, pull a rope attachment downward by crunching your abs.',
      },
      {
        id: 'cr3',
        name: 'Hanging Leg Raises',
        sets: 3,
        reps: '10-15',
        description:
          'Hang from a pull-up bar and raise your legs to 90° or higher, keeping the movement controlled.',
      },
    ],
  },
];
