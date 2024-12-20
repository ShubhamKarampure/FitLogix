import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Wrap,
  WrapItem,
  Heading,
  Image,
  Text,
  Badge,
  HStack,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  VStack,
} from "@chakra-ui/react";
import { useUser } from "../context/userContext";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SearchIcon } from "@chakra-ui/icons";

const WorkoutLog = () => {

const exercises = [
    {
        "bodyPart": "back",
        "equipment": "cable",
        "gifUrl": "https://v2.exercisedb.io/image/DSG-WXSM-EbVHT",
        "id": "0007",
        "name": "alternate lateral pulldown",
        "target": "lats",
        "secondaryMuscles": [
            "biceps",
            "rhomboids"
        ],
        "instructions": [
            "Sit on the cable machine with your back straight and feet flat on the ground.",
            "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
            "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
            "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "back",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/X-7ZAF9W307JZl",
        "id": "3293",
        "name": "archer pull up",
        "target": "lats",
        "secondaryMuscles": [
            "biceps",
            "forearms"
        ],
        "instructions": [
            "Start by hanging from a pull-up bar with an overhand grip, slightly wider than shoulder-width apart.",
            "Engage your core and pull your shoulder blades down and back.",
            "As you pull yourself up, bend one arm and bring your elbow towards your side, while keeping the other arm straight.",
            "Continue pulling until your chin is above the bar and your bent arm is fully flexed.",
            "Lower yourself back down with control, straightening the bent arm and repeating the movement on the other side.",
            "Alternate sides with each repetition."
        ]
    },
    {
        "bodyPart": "back",
        "equipment": "leverage machine",
        "gifUrl": "https://v2.exercisedb.io/image/Gh-IvfDBPqjgxt",
        "id": "0015",
        "name": "assisted parallel close grip pull-up",
        "target": "lats",
        "secondaryMuscles": [
            "biceps",
            "forearms"
        ],
        "instructions": [
            "Adjust the machine to your desired weight and height.",
            "Place your hands on the parallel bars with a close grip, palms facing each other.",
            "Hang from the bars with your arms fully extended and your feet off the ground.",
            "Engage your back muscles and pull your body up towards the bars, keeping your elbows close to your body.",
            "Continue pulling until your chin is above the bars.",
            "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "back",
        "equipment": "leverage machine",
        "gifUrl": "https://v2.exercisedb.io/image/zicrh7h9lG4Xrt",
        "id": "0017",
        "name": "assisted pull-up",
        "target": "lats",
        "secondaryMuscles": [
            "biceps",
            "forearms"
        ],
        "instructions": [
            "Adjust the machine to your desired weight and height settings.",
            "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
            "Hang with your arms fully extended and your feet off the ground.",
            "Engage your back muscles and pull your body up towards the handles, keeping your elbows close to your body.",
            "Continue pulling until your chin is above the handles.",
            "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "back",
        "equipment": "leverage machine",
        "gifUrl": "https://v2.exercisedb.io/image/T9jNmZav9tuNb3",
        "id": "1431",
        "name": "assisted standing chin-up",
        "target": "lats",
        "secondaryMuscles": [
            "biceps",
            "forearms"
        ],
        "instructions": [
            "Adjust the machine to your desired assistance level.",
            "Stand on the foot platform and grip the handles with an overhand grip, slightly wider than shoulder-width apart.",
            "Keep your chest up and shoulders back, engage your core, and slightly bend your knees.",
            "Pull your body up by flexing your elbows and driving your elbows down towards your sides.",
            "Continue pulling until your chin is above the bar.",
            "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "back",
        "equipment": "leverage machine",
        "gifUrl": "https://v2.exercisedb.io/image/9ApmX99CojSUqP",
        "id": "1432",
        "name": "assisted standing pull-up",
        "target": "lats",
        "secondaryMuscles": [
            "biceps",
            "forearms"
        ],
        "instructions": [
            "Adjust the machine to your desired weight and height settings.",
            "Stand facing the machine with your feet shoulder-width apart.",
            "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
            "Engage your lats and biceps, and pull yourself up towards the handles.",
            "Pause for a moment at the top, squeezing your back muscles.",
            "Slowly lower yourself back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "back",
        "equipment": "stability ball",
        "gifUrl": "https://v2.exercisedb.io/image/7s4gnuOWAup24Z",
        "id": "1314",
        "name": "back extension on exercise ball",
        "target": "spine",
        "secondaryMuscles": [
            "glutes",
            "hamstrings"
        ],
        "instructions": [
            "Place the stability ball on the ground and lie face down on top of it, with your hips resting on the ball and your feet against a wall or other stable surface.",
            "Position your hands behind your head or crossed over your chest.",
            "Engage your core and slowly lift your upper body off the ball, extending your back until your body forms a straight line from your head to your heels.",
            "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "back",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/uWX1zuFXrtuLbv",
        "id": "3297",
        "name": "back lever",
        "target": "upper back",
        "secondaryMuscles": [
            "biceps",
            "forearms",
            "core"
        ],
        "instructions": [
            "Start by hanging from a pull-up bar with an overhand grip, hands slightly wider than shoulder-width apart.",
            "Engage your core and pull your shoulder blades down and back.",
            "Bend your knees and tuck them towards your chest.",
            "Slowly lift your legs up, keeping them straight, until your body is parallel to the ground.",
            "Hold this position for a few seconds, then slowly lower your legs back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "back",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/n2o3Krbf99Pb6k",
        "id": "1405",
        "name": "back pec stretch",
        "target": "lats",
        "secondaryMuscles": [
            "shoulders",
            "chest"
        ],
        "instructions": [
            "Stand tall with your feet shoulder-width apart.",
            "Extend your arms straight out in front of you, parallel to the ground.",
            "Cross your arms in front of your body, with your right arm over your left arm.",
            "Interlock your fingers and rotate your palms away from your body.",
            "Slowly raise your arms up and away from your body, feeling a stretch in your back and chest.",
            "Hold the stretch for 15-30 seconds, then release.",
            "Repeat on the opposite side."
        ]
    },
    {
        "bodyPart": "back",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/ef8PvI0uixv93l",
        "id": "0970",
        "name": "band assisted pull-up",
        "target": "lats",
        "secondaryMuscles": [
            "biceps",
            "forearms"
        ],
        "instructions": [
            "Attach the band to a pull-up bar or sturdy anchor point.",
            "Step onto the band and grip the bar with your palms facing away from you, hands slightly wider than shoulder-width apart.",
            "Hang with your arms fully extended, keeping your core engaged and your shoulders down and back.",
            "Pull your body up towards the bar by squeezing your shoulder blades together and driving your elbows down towards your hips.",
            "Continue pulling until your chin is above the bar, then slowly lower yourself back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    
    {
        "bodyPart": "cardio",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/HNwvcis4MHlLqB",
        "id": "3220",
        "name": "astride jumps (male)",
        "target": "cardiovascular system",
        "secondaryMuscles": [
            "quadriceps",
            "hamstrings",
            "calves"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart.",
            "Bend your knees and lower your body into a squat position.",
            "Jump explosively upwards, extending your legs and arms.",
            "While in the air, spread your legs apart and bring your arms out to the sides.",
            "Land softly with your feet shoulder-width apart, bending your knees to absorb the impact.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "cardio",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/ajPnag67XjsQuI",
        "id": "3672",
        "name": "back and forth step",
        "target": "cardiovascular system",
        "secondaryMuscles": [
            "quadriceps",
            "hamstrings",
            "glutes",
            "calves"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart.",
            "Step forward with your right foot, bending your knee and lowering your body into a lunge position.",
            "Push off with your right foot and step back to the starting position.",
            "Repeat the movement with your left foot, alternating legs with each step.",
            "Continue stepping back and forth, maintaining a steady pace.",
            "Repeat for the desired duration or number of repetitions."
        ]
    },
    {
        "bodyPart": "cardio",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/MWxtXuQsuaGddU",
        "id": "3360",
        "name": "bear crawl",
        "target": "cardiovascular system",
        "secondaryMuscles": [
            "core",
            "shoulders",
            "triceps"
        ],
        "instructions": [
            "Start on all fours with your hands directly under your shoulders and your knees directly under your hips.",
            "Lift your knees slightly off the ground, keeping your back flat and your core engaged.",
            "Move your right hand and left foot forward simultaneously, followed by your left hand and right foot.",
            "Continue crawling forward, alternating your hand and foot movements.",
            "Maintain a steady pace and keep your core tight throughout the exercise.",
            "Continue for the desired distance or time."
        ]
    },
    {
        "bodyPart": "cardio",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/r-JIINvR19lBC3",
        "id": "1160",
        "name": "burpee",
        "target": "cardiovascular system",
        "secondaryMuscles": [
            "quadriceps",
            "hamstrings",
            "calves",
            "shoulders",
            "chest"
        ],
        "instructions": [
            "Start in a standing position with your feet shoulder-width apart.",
            "Lower your body into a squat position by bending your knees and placing your hands on the floor in front of you.",
            "Kick your feet back into a push-up position.",
            "Perform a push-up, keeping your body in a straight line.",
            "Jump your feet back into the squat position.",
            "Jump up explosively, reaching your arms overhead.",
            "Land softly and immediately lower back into a squat position to begin the next repetition."
        ]
    },
    {
        "bodyPart": "cardio",
        "equipment": "leverage machine",
        "gifUrl": "https://v2.exercisedb.io/image/kkLwO7JrNsd1P-",
        "id": "2331",
        "name": "cycle cross trainer",
        "target": "cardiovascular system",
        "secondaryMuscles": [
            "quadriceps",
            "hamstrings",
            "glutes"
        ],
        "instructions": [
            "Adjust the seat height and position yourself on the cycle cross trainer.",
            "Place your feet on the pedals and grip the handlebars.",
            "Start pedaling in a smooth and controlled motion.",
            "Maintain a steady pace and increase the resistance if desired.",
            "Continue pedaling for the desired duration of your cardio workout."
        ]
    },
    {
        "bodyPart": "cardio",
        "equipment": "dumbbell",
        "gifUrl": "https://v2.exercisedb.io/image/4Bbm8qzYAV8a68",
        "id": "1201",
        "name": "dumbbell burpee",
        "target": "cardiovascular system",
        "secondaryMuscles": [
            "quadriceps",
            "hamstrings",
            "calves",
            "shoulders",
            "triceps",
            "core"
        ],
        "instructions": [
            "Start in a standing position with your feet shoulder-width apart and a dumbbell in each hand.",
            "Lower your body into a squat position, placing the dumbbells on the ground in front of you.",
            "Kick your feet back into a push-up position, keeping your body in a straight line.",
            "Perform a push-up, bending your elbows and lowering your chest towards the ground.",
            "Jump your feet back towards your hands, landing in a squat position.",
            "Stand up explosively, lifting the dumbbells off the ground and bringing them to your shoulders.",
            "Press the dumbbells overhead, fully extending your arms.",
            "Lower the dumbbells back to your shoulders and repeat the entire sequence for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "cardio",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/YWzw0NAO8dIc0v",
        "id": "3221",
        "name": "half knee bends (male)",
        "target": "cardiovascular system",
        "secondaryMuscles": [
            "quadriceps",
            "hamstrings",
            "glutes"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart.",
            "Bend your knees and lower your body down as if you were sitting back into a chair.",
            "Keep your chest up and your weight in your heels.",
            "Pause for a moment at the bottom, then push through your heels to return to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "cardio",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/qYwqpmQh2456hh",
        "id": "3636",
        "name": "high knee against wall",
        "target": "cardiovascular system",
        "secondaryMuscles": [
            "quadriceps",
            "hamstrings",
            "glutes",
            "calves"
        ],
        "instructions": [
            "Stand facing a wall with your feet hip-width apart.",
            "Place your hands on the wall for support.",
            "Engage your core and lift your right knee up towards your chest, while keeping your left foot on the ground.",
            "Quickly switch legs, bringing your left knee up towards your chest and lowering your right foot back down.",
            "Continue alternating legs in a running motion, bringing your knees up as high as possible.",
            "Maintain a fast pace and keep your upper body stable throughout the exercise.",
            "Repeat for the desired duration or number of repetitions."
        ]
    },
    {
        "bodyPart": "cardio",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/cs7RI5yUsXSwGC",
        "id": "0501",
        "name": "jack burpee",
        "target": "cardiovascular system",
        "secondaryMuscles": [
            "quadriceps",
            "hamstrings",
            "calves",
            "shoulders",
            "triceps",
            "core"
        ],
        "instructions": [
            "Start in a standing position with your feet shoulder-width apart.",
            "Lower your body into a squat position, placing your hands on the ground in front of you.",
            "Kick your feet back, landing in a push-up position.",
            "Perform a push-up, lowering your chest to the ground and then pushing back up.",
            "Jump your feet forward, landing in a squat position.",
            "Jump up explosively, reaching your arms overhead.",
            "Land softly and immediately lower back into the squat position to begin the next repetition."
        ]
    },
    {
        "bodyPart": "cardio",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/vuNwbZJL7M9kpU",
        "id": "3224",
        "name": "jack jump (male)",
        "target": "cardiovascular system",
        "secondaryMuscles": [
            "quadriceps",
            "calves"
        ],
        "instructions": [
            "Stand with your feet together and your arms by your sides.",
            "Jump up, spreading your feet apart and raising your arms above your head.",
            "As you land, quickly jump back to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "chest",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/JTKl8b86Trco9a",
        "id": "3294",
        "name": "archer push up",
        "target": "pectorals",
        "secondaryMuscles": [
            "triceps",
            "shoulders",
            "core"
        ],
        "instructions": [
            "Start in a push-up position with your hands slightly wider than shoulder-width apart.",
            "Extend one arm straight out to the side, parallel to the ground.",
            "Lower your body by bending your elbows, keeping your back straight and core engaged.",
            "Push back up to the starting position.",
            "Repeat on the other side, extending the opposite arm out to the side.",
            "Continue alternating sides for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "chest",
        "equipment": "leverage machine",
        "gifUrl": "https://v2.exercisedb.io/image/AWPTb-FQ5XWgDO",
        "id": "0009",
        "name": "assisted chest dip (kneeling)",
        "target": "pectorals",
        "secondaryMuscles": [
            "triceps",
            "shoulders"
        ],
        "instructions": [
            "Adjust the machine to your desired height and secure your knees on the pad.",
            "Grasp the handles with your palms facing down and your arms fully extended.",
            "Lower your body by bending your elbows until your upper arms are parallel to the floor.",
            "Pause for a moment, then push yourself back up to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "chest",
        "equipment": "assisted",
        "gifUrl": "https://v2.exercisedb.io/image/0VcmNsGBtuCwcV",
        "id": "1716",
        "name": "assisted seated pectoralis major stretch with stability ball",
        "target": "pectorals",
        "secondaryMuscles": [
            "shoulders",
            "triceps"
        ],
        "instructions": [
            "Sit on a stability ball with your feet flat on the ground and your back straight.",
            "Hold a stability ball with both hands and extend your arms straight out in front of you.",
            "Slowly lower the stability ball towards your chest, feeling a stretch in your pectoral muscles.",
            "Hold the stretch for a few seconds, then slowly return to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "chest",
        "equipment": "leverage machine",
        "gifUrl": "https://v2.exercisedb.io/image/hbXlpHaKWlNzX4",
        "id": "2364",
        "name": "assisted wide-grip chest dip (kneeling)",
        "target": "pectorals",
        "secondaryMuscles": [
            "triceps",
            "shoulders"
        ],
        "instructions": [
            "Adjust the machine to your desired height and secure your knees on the pad.",
            "Grasp the handles with a wide grip and keep your elbows slightly bent.",
            "Lower your body by bending your elbows until your upper arms are parallel to the floor.",
            "Push yourself back up to the starting position by extending your arms.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "chest",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/av-q9SWJWm3G8N",
        "id": "1254",
        "name": "band bench press",
        "target": "pectorals",
        "secondaryMuscles": [
            "triceps",
            "shoulders"
        ],
        "instructions": [
            "Lie flat on a bench with your feet flat on the ground and your back pressed against the bench.",
            "Grasp the band handles with an overhand grip, slightly wider than shoulder-width apart.",
            "Extend your arms fully, pushing the bands away from your chest.",
            "Slowly lower the bands back down to your chest, keeping your elbows at a 90-degree angle.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "chest",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/XzNYvEUhBaQUiq",
        "id": "0989",
        "name": "band one arm twisting chest press",
        "target": "pectorals",
        "secondaryMuscles": [
            "shoulders",
            "triceps"
        ],
        "instructions": [
            "Attach the band to a sturdy anchor point at chest height.",
            "Stand with your side facing the anchor point and grab the band with one hand.",
            "Step away from the anchor point to create tension in the band.",
            "Position your feet shoulder-width apart and slightly bend your knees.",
            "Bring your hand holding the band across your body, towards the opposite shoulder.",
            "While maintaining tension in the band, push your hand forward and away from your body, extending your arm.",
            "Slowly return to the starting position and repeat for the desired number of repetitions.",
            "Switch sides and repeat the exercise with the other hand."
        ]
    },
    {
        "bodyPart": "chest",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/3lmDRCOieDprSn",
        "id": "0025",
        "name": "barbell bench press",
        "target": "pectorals",
        "secondaryMuscles": [
            "triceps",
            "shoulders"
        ],
        "instructions": [
            "Lie flat on a bench with your feet flat on the ground and your back pressed against the bench.",
            "Grasp the barbell with an overhand grip slightly wider than shoulder-width apart.",
            "Lift the barbell off the rack and hold it directly above your chest with your arms fully extended.",
            "Lower the barbell slowly towards your chest, keeping your elbows tucked in.",
            "Pause for a moment when the barbell touches your chest.",
            "Push the barbell back up to the starting position by extending your arms.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "chest",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/qbNKuDpKjQO5vh",
        "id": "0033",
        "name": "barbell decline bench press",
        "target": "pectorals",
        "secondaryMuscles": [
            "triceps",
            "shoulders"
        ],
        "instructions": [
            "Lie on a decline bench with your feet secured and your head lower than your hips.",
            "Grasp the barbell with an overhand grip slightly wider than shoulder-width apart.",
            "Unrack the barbell and lower it slowly towards your chest, keeping your elbows tucked in.",
            "Pause for a moment at the bottom, then push the barbell back up to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "chest",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/noWOg8clBKufNi",
        "id": "1255",
        "name": "barbell decline pullover",
        "target": "pectorals",
        "secondaryMuscles": [
            "triceps",
            "shoulders"
        ],
        "instructions": [
            "Lie down on a decline bench with your head lower than your hips and your feet secured.",
            "Hold the barbell with a pronated grip (palms facing away from you) and your hands slightly wider than shoulder-width apart.",
            "Extend your arms above your chest, keeping a slight bend in your elbows.",
            "Lower the barbell in an arc motion behind your head, feeling a stretch in your chest and shoulders.",
            "Pause for a moment, then return the barbell to the starting position by reversing the motion.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "chest",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/Klt3MhHm2bjNeX",
        "id": "0036",
        "name": "barbell decline wide-grip press",
        "target": "pectorals",
        "secondaryMuscles": [
            "triceps",
            "shoulders"
        ],
        "instructions": [
            "Lie on a decline bench with your feet secured and your head lower than your hips.",
            "Grasp the barbell with a wide grip, slightly wider than shoulder-width apart.",
            "Lower the barbell to your chest, keeping your elbows out to the sides.",
            "Push the barbell back up to the starting position, fully extending your arms.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/ZK7rAnK5W67Cs6",
        "id": "0994",
        "name": "band reverse wrist curl",
        "target": "forearms",
        "secondaryMuscles": [
            "forearms"
        ],
        "instructions": [
            "Sit on a bench or chair with your feet flat on the ground.",
            "Hold the band with an overhand grip, palms facing down, and wrap it around your fingers.",
            "Rest your forearms on your thighs, with your wrists hanging off the edge.",
            "Slowly curl your wrists upward, squeezing your forearms.",
            "Pause for a moment at the top, then slowly lower your wrists back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/Mev8dvG5moGiUo",
        "id": "1016",
        "name": "band wrist curl",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "triceps"
        ],
        "instructions": [
            "Sit on a bench or chair with your feet flat on the ground.",
            "Hold the band with both hands, palms facing up, and rest your forearms on your thighs.",
            "Slowly curl your wrists upward, squeezing your forearms.",
            "Pause for a moment at the top, then slowly lower your wrists back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/gaylCSfycLbDlI",
        "id": "1411",
        "name": "barbell palms down wrist curl over a bench",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "brachialis"
        ],
        "instructions": [
            "Sit on a bench with your feet flat on the ground and your forearms resting on your thighs, palms facing down.",
            "Hold a barbell with an overhand grip, hands shoulder-width apart.",
            "Lower the barbell towards the ground by flexing your wrists, keeping your forearms stationary.",
            "Pause for a moment at the bottom, then slowly raise the barbell back up by extending your wrists.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/vWsW-igODfojRY",
        "id": "1412",
        "name": "barbell palms up wrist curl over a bench",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "shoulders"
        ],
        "instructions": [
            "Sit on a bench with your feet flat on the ground and hold a barbell with an underhand grip, palms facing up.",
            "Rest your forearms on the bench, allowing your wrists to hang off the edge.",
            "Keeping your forearms stationary, exhale and curl your wrists upwards as far as possible.",
            "Hold the contracted position for a brief pause, then inhale and slowly lower the barbell back to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/6UBw3JKbhuFeLJ",
        "id": "0079",
        "name": "barbell revers wrist curl v. 2",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "brachialis"
        ],
        "instructions": [
            "Sit on a bench with your feet flat on the ground and your knees bent.",
            "Hold a barbell with an overhand grip, palms facing down, and your hands shoulder-width apart.",
            "Rest your forearms on your thighs, allowing your wrists to hang off the edge.",
            "Keeping your forearms stationary, exhale and curl your wrists upward as far as possible.",
            "Hold the contracted position for a brief pause, then inhale and slowly lower the barbell back to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/o9MVJjm4xu1CjV",
        "id": "0082",
        "name": "barbell reverse wrist curl",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "brachialis"
        ],
        "instructions": [
            "Sit on a bench with your feet flat on the ground and hold a barbell with an overhand grip, palms facing down.",
            "Rest your forearms on your thighs, allowing your wrists to hang off the edge.",
            "Slowly curl your wrists upward, bringing the barbell towards your body.",
            "Pause for a moment at the top, then slowly lower the barbell back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/N1Bm4oBZg3klwG",
        "id": "0104",
        "name": "barbell standing back wrist curl",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "shoulders"
        ],
        "instructions": [
            "Stand up straight with your feet shoulder-width apart and hold a barbell with an overhand grip.",
            "Rest the barbell on the back of your hands with your palms facing down and your fingers pointing towards your body.",
            "Keeping your upper arms stationary, exhale and curl your wrists upwards as far as possible.",
            "Hold the contracted position for a brief pause, then inhale and slowly lower the barbell back to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/bx83U--az8zt9H",
        "id": "0126",
        "name": "barbell wrist curl",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "brachialis"
        ],
        "instructions": [
            "Sit on a bench with your feet flat on the ground and your forearms resting on your thighs, holding a barbell with an underhand grip.",
            "Allow the barbell to roll down to your fingertips, keeping your wrists straight.",
            "Slowly curl the barbell up towards your forearms by flexing your wrists.",
            "Pause for a moment at the top, then slowly lower the barbell back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/aGXfhULicBikTy",
        "id": "0125",
        "name": "barbell wrist curl v. 2",
        "target": "forearms",
        "secondaryMuscles": [
            "biceps",
            "brachialis"
        ],
        "instructions": [
            "Sit on a bench with your feet flat on the ground and your knees bent.",
            "Hold a barbell with an underhand grip, palms facing up, and your hands shoulder-width apart.",
            "Rest your forearms on your thighs, allowing your wrists to hang off the edge.",
            "Slowly curl your wrists upward, bringing the barbell towards your forearms.",
            "Pause for a moment at the top, then slowly lower the barbell back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower arms",
        "equipment": "cable",
        "gifUrl": "https://v2.exercisedb.io/image/o3r8j-LLLvShNE",
        "id": "0210",
        "name": "cable reverse wrist curl",
        "target": "forearms",
        "secondaryMuscles": [
            "forearms",
            "wrists"
        ],
        "instructions": [
            "Attach a cable to a low pulley and sit on a bench facing the cable machine.",
            "Grasp the cable handle with an overhand grip, palms facing down.",
            "Rest your forearms on your thighs, with your wrists hanging off the edge.",
            "Keeping your forearms stationary, exhale and curl your wrists upward as far as possible.",
            "Pause for a moment at the top, then inhale and slowly lower your wrists back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower legs",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/rSLArdJCw1W3SB",
        "id": "1368",
        "name": "ankle circles",
        "target": "calves",
        "secondaryMuscles": [
            "ankle stabilizers"
        ],
        "instructions": [
            "Sit on the ground with your legs extended in front of you.",
            "Lift one leg off the ground and rotate your ankle in a circular motion.",
            "Perform the desired number of circles in one direction, then switch to the other direction.",
            "Repeat with the other leg."
        ]
    },
    {
        "bodyPart": "lower legs",
        "equipment": "assisted",
        "gifUrl": "https://v2.exercisedb.io/image/mGdyXEYsiicgGd",
        "id": "1708",
        "name": "assisted lying calves stretch",
        "target": "calves",
        "secondaryMuscles": [
            "hamstrings"
        ],
        "instructions": [
            "Lie on your back with your legs extended.",
            "Bend one knee and place your foot flat on the ground.",
            "Using your hands or a towel, gently pull your toes towards your body, feeling a stretch in your calf.",
            "Hold the stretch for 20-30 seconds.",
            "Release the stretch and repeat on the other leg."
        ]
    },
    {
        "bodyPart": "lower legs",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/qPw1qmIFsVmZeU",
        "id": "0999",
        "name": "band single leg calf raise",
        "target": "calves",
        "secondaryMuscles": [
            "ankles",
            "feet"
        ],
        "instructions": [
            "Stand with your feet hip-width apart and place the band around the ball of your left foot.",
            "Hold onto a stable object for balance if needed.",
            "Slowly raise your left heel off the ground, lifting your body weight onto the ball of your foot.",
            "Pause for a moment at the top, then slowly lower your left heel back down to the starting position.",
            "Repeat for the desired number of repetitions, then switch to the right leg."
        ]
    },
    {
        "bodyPart": "lower legs",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/Ttvuji910KUUhq",
        "id": "1000",
        "name": "band single leg reverse calf raise",
        "target": "calves",
        "secondaryMuscles": [
            "hamstrings",
            "glutes"
        ],
        "instructions": [
            "Stand with your feet hip-width apart and place the band around the ball of your foot.",
            "Hold onto a stable object for balance.",
            "Slowly raise your heel off the ground, lifting your body weight onto the ball of your foot.",
            "Pause for a moment at the top, then slowly lower your heel back down to the starting position.",
            "Repeat for the desired number of repetitions, then switch to the other leg."
        ]
    },
    {
        "bodyPart": "lower legs",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/FY1oiGE-g0gnfg",
        "id": "1369",
        "name": "band two legs calf raise - (band under both legs) v. 2",
        "target": "calves",
        "secondaryMuscles": [
            "ankles",
            "feet"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and place a resistance band under both feet.",
            "Hold the ends of the band with your hands for stability.",
            "Raise your heels off the ground as high as possible, using your calves.",
            "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower legs",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/YTfZFbua0oQACk",
        "id": "1370",
        "name": "barbell floor calf raise",
        "target": "calves",
        "secondaryMuscles": [
            "hamstrings"
        ],
        "instructions": [
            "Place a barbell on the floor in front of you.",
            "Stand with the balls of your feet on the edge of the barbell, with your heels hanging off.",
            "Hold onto a stable object for balance if needed.",
            "Raise your heels as high as possible, using your calves to lift your body.",
            "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower legs",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/2DfFnzAfLsnPXc",
        "id": "0088",
        "name": "barbell seated calf raise",
        "target": "calves",
        "secondaryMuscles": [
            "hamstrings",
            "quadriceps"
        ],
        "instructions": [
            "Sit on a bench with your feet flat on the floor and a barbell resting on your thighs.",
            "Place the balls of your feet on a raised platform, such as a block or step.",
            "Position the barbell across your thighs and hold it securely with your hands.",
            "Keeping your back straight and your core engaged, lift your heels off the ground by extending your ankles.",
            "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower legs",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/ac1BRBeKLhTpGw",
        "id": "1371",
        "name": "barbell seated calf raise",
        "target": "calves",
        "secondaryMuscles": [
            "hamstrings"
        ],
        "instructions": [
            "Sit on a bench with your feet flat on the floor and a barbell resting on your thighs.",
            "Place the balls of your feet on a raised platform, such as a block or step.",
            "Lower your heels as far as possible, feeling a stretch in your calves.",
            "Raise your heels as high as possible, contracting your calves.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower legs",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/GkOvYQJMlhF83b",
        "id": "1372",
        "name": "barbell standing calf raise",
        "target": "calves",
        "secondaryMuscles": [
            "hamstrings",
            "glutes"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and place a barbell across your upper back.",
            "Raise your heels off the ground as high as possible, using only your toes.",
            "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "lower legs",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/5bCv0gspeRS2wU",
        "id": "0108",
        "name": "barbell standing leg calf raise",
        "target": "calves",
        "secondaryMuscles": [
            "hamstrings",
            "glutes"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and place a barbell across your upper back.",
            "Raise your heels off the ground as high as possible, using your calves.",
            "Pause for a moment at the top, then slowly lower your heels back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "neck",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/eRlgglq65zMG3b",
        "id": "1403",
        "name": "neck side stretch",
        "target": "levator scapulae",
        "secondaryMuscles": [
            "trapezius",
            "sternocleidomastoid"
        ],
        "instructions": [
            "Stand or sit up straight with your shoulders relaxed.",
            "Tilt your head to one side, bringing your ear towards your shoulder.",
            "Hold the stretch for 15-30 seconds.",
            "Repeat on the other side.",
            "Perform 2-4 sets on each side."
        ]
    },
    {
        "bodyPart": "neck",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/gmk3kK5tZah9WR",
        "id": "0716",
        "name": "side push neck stretch",
        "target": "levator scapulae",
        "secondaryMuscles": [
            "trapezius",
            "sternocleidomastoid"
        ],
        "instructions": [
            "Stand or sit up straight with your shoulders relaxed.",
            "Tilt your head to the right, bringing your right ear towards your right shoulder.",
            "Place your right hand on the left side of your head and gently apply pressure to increase the stretch.",
            "Hold the stretch for 15-30 seconds.",
            "Repeat on the other side, tilting your head to the left and applying pressure with your left hand.",
            "Repeat the stretch 2-3 times on each side."
        ]
    },
    {
        "bodyPart": "shoulders",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/swh0CpjSihBSjd",
        "id": "0977",
        "name": "band front lateral raise",
        "target": "delts",
        "secondaryMuscles": [
            "traps",
            "upper back"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and hold the band in front of your thighs with your palms facing down.",
            "Keep your arms straight and lift the band up in front of you until your arms are parallel to the ground.",
            "Pause for a moment at the top, then slowly lower the band back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "shoulders",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/JBaekUj39oZH2l",
        "id": "0978",
        "name": "band front raise",
        "target": "delts",
        "secondaryMuscles": [
            "triceps",
            "upper back"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and hold the band in front of your thighs with your palms facing down.",
            "Keep your arms straight and slowly raise them forward until they are parallel to the ground.",
            "Pause for a moment at the top, then slowly lower your arms back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "shoulders",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/33ccPCRRs2zxrc",
        "id": "0993",
        "name": "band reverse fly",
        "target": "delts",
        "secondaryMuscles": [
            "upper back",
            "trapezius"
        ],
        "instructions": [
            "Attach the band to a stationary object at chest height.",
            "Stand with your feet shoulder-width apart and hold the band with both hands in front of you.",
            "Keep your arms straight and lift them out to the sides until they are parallel to the ground.",
            "Squeeze your shoulder blades together at the top of the movement.",
            "Slowly lower your arms back to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "shoulders",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/dJo70UzDr4utmt",
        "id": "0997",
        "name": "band shoulder press",
        "target": "delts",
        "secondaryMuscles": [
            "triceps",
            "upper back"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and place the band under your feet.",
            "Hold the band with your palms facing forward and raise your hands to shoulder height, elbows bent.",
            "Press the band overhead, fully extending your arms.",
            "Pause for a moment at the top, then slowly lower the band back to shoulder height.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "shoulders",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/-Y-QuB7CIRSA2B",
        "id": "1022",
        "name": "band standing rear delt row",
        "target": "delts",
        "secondaryMuscles": [
            "trapezius",
            "rhomboids",
            "biceps"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and place the band under your feet.",
            "Hold the band handles with your palms facing each other and your arms extended in front of you.",
            "Bend your knees slightly and hinge forward at the hips, keeping your back straight.",
            "Pull the band towards your chest, squeezing your shoulder blades together.",
            "Pause for a moment at the top, then slowly release the tension and return to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "shoulders",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/yBd-E9anEpfhtK",
        "id": "1012",
        "name": "band twisting overhead press",
        "target": "delts",
        "secondaryMuscles": [
            "triceps",
            "upper back"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and place the band under your feet.",
            "Hold the band handles at shoulder height with your palms facing forward.",
            "Engage your core and press the band overhead, fully extending your arms.",
            "As you press, twist your torso to one side, keeping your hips stable.",
            "Pause for a moment at the top, then return to the starting position.",
            "Repeat the press and twist on the opposite side.",
            "Continue alternating sides for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "shoulders",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/bpgdEhJ7fta0qM",
        "id": "1017",
        "name": "band y-raise",
        "target": "delts",
        "secondaryMuscles": [
            "traps",
            "rhomboids"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and hold the band in front of your thighs with your palms facing inwards.",
            "Keep your arms straight and lift them up and out to the sides, forming a 'Y' shape with your body.",
            "Squeeze your shoulder blades together at the top of the movement.",
            "Slowly lower your arms back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "shoulders",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/8EJUjql9FDFKj8",
        "id": "0041",
        "name": "barbell front raise",
        "target": "delts",
        "secondaryMuscles": [
            "biceps",
            "triceps"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and hold a barbell in front of your thighs with an overhand grip.",
            "Keep your arms straight and lift the barbell forward and upward until it reaches shoulder level.",
            "Pause for a moment at the top, then slowly lower the barbell back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "shoulders",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/YsvUu-wyolY268",
        "id": "0067",
        "name": "barbell one arm snatch",
        "target": "delts",
        "secondaryMuscles": [
            "traps",
            "forearms",
            "core"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart, toes pointing slightly outwards.",
            "Hold the barbell with an overhand grip, hands slightly wider than shoulder-width apart.",
            "Bend your knees and lower your hips into a squat position, keeping your back straight and chest up.",
            "Explosively extend your hips, knees, and ankles, driving the barbell upwards.",
            "As the barbell reaches chest level, pull it upwards with your arm, keeping it close to your body.",
            "Rotate your elbow under the barbell and extend your arm fully overhead, locking out your elbow.",
            "Lower the barbell back down to the starting position in a controlled manner.",
            "Repeat for the desired number of repetitions, then switch arms."
        ]
    },
    {
        "bodyPart": "shoulders",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/Mr4JTZOz0WxWRe",
        "id": "0075",
        "name": "barbell rear delt raise",
        "target": "delts",
        "secondaryMuscles": [
            "traps",
            "rhomboids"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and hold a barbell with an overhand grip, palms facing down.",
            "Bend your knees slightly and hinge forward at the hips, keeping your back straight.",
            "Raise the barbell out to the sides, keeping your arms straight, until they are parallel to the ground.",
            "Pause for a moment at the top, then slowly lower the barbell back to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "upper arms",
        "equipment": "assisted",
        "gifUrl": "https://v2.exercisedb.io/image/EBwxyRbRAPviAS",
        "id": "0018",
        "name": "assisted standing triceps extension (with towel)",
        "target": "triceps",
        "secondaryMuscles": [
            "shoulders"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and hold a towel with both hands behind your head.",
            "Keep your elbows close to your ears and your upper arms stationary.",
            "Slowly extend your forearms upward, squeezing your triceps at the top.",
            "Pause for a moment, then slowly lower the towel back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "upper arms",
        "equipment": "leverage machine",
        "gifUrl": "https://v2.exercisedb.io/image/dVJNy6-oy4stAv",
        "id": "0019",
        "name": "assisted triceps dip (kneeling)",
        "target": "triceps",
        "secondaryMuscles": [
            "chest",
            "shoulders"
        ],
        "instructions": [
            "Adjust the machine to your desired weight and height.",
            "Kneel down on the pad facing the machine, with your hands gripping the handles.",
            "Lower your body by bending your elbows, keeping your back straight and close to the machine.",
            "Pause for a moment at the bottom, then push yourself back up to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "upper arms",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/04IYxWFtjfTTLE",
        "id": "0968",
        "name": "band alternating biceps curl",
        "target": "biceps",
        "secondaryMuscles": [
            "forearms"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and hold the band with an underhand grip, palms facing up.",
            "Keep your elbows close to your sides and slowly curl one arm up towards your shoulder, squeezing your biceps at the top.",
            "Lower the arm back down to the starting position and repeat with the other arm.",
            "Continue alternating arms for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "upper arms",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/X24-cE08EwegK6",
        "id": "0975",
        "name": "band close-grip push-up",
        "target": "triceps",
        "secondaryMuscles": [
            "chest",
            "shoulders"
        ],
        "instructions": [
            "Place a band around your upper arms, just above the elbows.",
            "Assume a push-up position with your hands directly under your shoulders and your body in a straight line from head to heels.",
            "Bend your elbows and lower your chest towards the ground, keeping your elbows close to your sides.",
            "Push through your palms to extend your arms and return to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "upper arms",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/5BtaPFlfBBB4gV",
        "id": "0976",
        "name": "band concentration curl",
        "target": "biceps",
        "secondaryMuscles": [
            "forearms"
        ],
        "instructions": [
            "Sit on a bench or chair with your legs spread apart and your feet flat on the ground.",
            "Hold one end of the band in your hand and step on the other end with your foot on the same side.",
            "Lean forward slightly and rest your elbow on the inside of your thigh, just above the knee.",
            "With your palm facing up, slowly curl your hand towards your shoulder, keeping your upper arm stationary.",
            "Pause for a moment at the top, then slowly lower your hand back down to the starting position.",
            "Repeat for the desired number of repetitions, then switch sides."
        ]
    },
    {
        "bodyPart": "upper arms",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/BHxBBeWm9blAA5",
        "id": "0986",
        "name": "band one arm overhead biceps curl",
        "target": "biceps",
        "secondaryMuscles": [
            "forearms",
            "shoulders"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and place one end of the band under your foot.",
            "Hold the other end of the band with your arm fully extended overhead, palm facing forward.",
            "Keeping your upper arm stationary, curl your forearm towards your shoulder, squeezing your biceps.",
            "Pause for a moment at the top, then slowly lower your forearm back to the starting position.",
            "Repeat for the desired number of repetitions, then switch arms."
        ]
    },
    {
        "bodyPart": "upper arms",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/jUdzyok6YFrK4n",
        "id": "0998",
        "name": "band side triceps extension",
        "target": "triceps",
        "secondaryMuscles": [
            "shoulders"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and hold the band with both hands, palms facing down.",
            "Extend your arms straight out to the sides, keeping them parallel to the ground.",
            "Slowly bend your elbows and bring your hands towards your shoulders, keeping your upper arms still.",
            "Pause for a moment, then slowly extend your arms back out to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "upper arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/aAy8r34UObPuuP",
        "id": "0023",
        "name": "barbell alternate biceps curl",
        "target": "biceps",
        "secondaryMuscles": [
            "forearms"
        ],
        "instructions": [
            "Stand up straight with your feet shoulder-width apart and hold a barbell in each hand, palms facing forward.",
            "Keep your upper arms stationary and exhale as you curl the weights while contracting your biceps.",
            "Continue to raise the barbells until your biceps are fully contracted and the barbells are at shoulder level.",
            "Hold the contracted position for a brief pause as you squeeze your biceps.",
            "Inhale as you slowly begin to lower the barbells back to the starting position.",
            "Repeat for the desired number of repetitions, alternating arms."
        ]
    },
    {
        "bodyPart": "upper arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/Ucz6vbHxJqAhgv",
        "id": "2407",
        "name": "barbell biceps curl (with arm blaster)",
        "target": "biceps",
        "secondaryMuscles": [
            "forearms"
        ],
        "instructions": [
            "Stand up straight with your feet shoulder-width apart and hold a barbell with an underhand grip, palms facing up.",
            "Place your upper arms against the arm blaster, keeping your elbows close to your torso.",
            "Keeping your upper arms stationary, exhale and curl the weights while contracting your biceps.",
            "Continue to raise the barbell until your biceps are fully contracted and the bar is at shoulder level.",
            "Hold the contracted position for a brief pause as you squeeze your biceps.",
            "Inhale and slowly begin to lower the barbell back to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "upper arms",
        "equipment": "barbell",
        "gifUrl": "https://v2.exercisedb.io/image/lT7D7JrKgzF9En",
        "id": "0030",
        "name": "barbell close-grip bench press",
        "target": "triceps",
        "secondaryMuscles": [
            "chest",
            "shoulders"
        ],
        "instructions": [
            "Lie flat on a bench with your feet flat on the ground and your back pressed against the bench.",
            "Grasp the barbell with a close grip, slightly narrower than shoulder-width apart.",
            "Unrack the barbell and lower it slowly towards your chest, keeping your elbows close to your body.",
            "Pause for a moment when the barbell touches your chest.",
            "Push the barbell back up to the starting position, fully extending your arms.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "upper legs",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/urVD7qRqAhezLp",
        "id": "1512",
        "name": "all fours squad stretch",
        "target": "quads",
        "secondaryMuscles": [
            "hamstrings",
            "glutes"
        ],
        "instructions": [
            "Start on all fours with your hands directly under your shoulders and your knees directly under your hips.",
            "Extend one leg straight back, keeping your knee bent and your foot flexed.",
            "Slowly lower your hips towards the ground, feeling a stretch in your quads.",
            "Hold this position for 20-30 seconds.",
            "Switch legs and repeat the stretch on the other side."
        ]
    },
    {
        "bodyPart": "upper legs",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/lVJeJDZj3AQtf1",
        "id": "3214",
        "name": "arms apart circular toe touch (male)",
        "target": "glutes",
        "secondaryMuscles": [
            "hamstrings",
            "quadriceps",
            "calves"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and arms extended to the sides.",
            "Keeping your legs straight, bend forward at the waist and reach down towards your toes with your right hand.",
            "As you reach down, simultaneously lift your left leg straight up behind you, maintaining balance.",
            "Return to the starting position and repeat the movement with your left hand reaching towards your toes and your right leg lifting up behind you.",
            "Continue alternating sides for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "upper legs",
        "equipment": "assisted",
        "gifUrl": "https://v2.exercisedb.io/image/cRdtbdfT6bxQPh",
        "id": "1709",
        "name": "assisted lying glutes stretch",
        "target": "glutes",
        "secondaryMuscles": [
            "hamstrings"
        ],
        "instructions": [
            "Lie on your back with your legs extended.",
            "Bend your right knee and place your right ankle on your left thigh, just above the knee.",
            "Grasp your left thigh with both hands and gently pull it towards your chest.",
            "Hold the stretch for 20-30 seconds.",
            "Release and repeat on the other side."
        ]
    },
    {
        "bodyPart": "upper legs",
        "equipment": "assisted",
        "gifUrl": "https://v2.exercisedb.io/image/Gc-RHmHfJWFvB1",
        "id": "1710",
        "name": "assisted lying gluteus and piriformis stretch",
        "target": "glutes",
        "secondaryMuscles": [
            "hamstrings"
        ],
        "instructions": [
            "Lie on your back with your legs extended.",
            "Bend your right knee and place your right ankle on your left thigh, just above the knee.",
            "Grasp your left thigh with both hands and gently pull it towards your chest.",
            "Hold the stretch for 20-30 seconds.",
            "Release the stretch and repeat on the other side."
        ]
    },
    {
        "bodyPart": "upper legs",
        "equipment": "assisted",
        "gifUrl": "https://v2.exercisedb.io/image/fOCSeGNNsXRNbR",
        "id": "0016",
        "name": "assisted prone hamstring",
        "target": "hamstrings",
        "secondaryMuscles": [
            "glutes",
            "lower back"
        ],
        "instructions": [
            "Lie face down on a mat or bench with your legs fully extended.",
            "Have a partner or use a resistance band to secure your ankles.",
            "Engage your hamstrings and lift your legs towards your glutes, keeping your knees straight.",
            "Pause for a moment at the top, then slowly lower your legs back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "upper legs",
        "equipment": "assisted",
        "gifUrl": "https://v2.exercisedb.io/image/h8-7XNkoKCtkKD",
        "id": "1713",
        "name": "assisted prone lying quads stretch",
        "target": "quads",
        "secondaryMuscles": [
            "hamstrings",
            "glutes"
        ],
        "instructions": [
            "Lie face down on the ground with your legs extended.",
            "Bend your left knee and reach back with your left hand to grab your left foot or ankle.",
            "Gently pull your left foot towards your glutes, feeling a stretch in your left quad.",
            "Hold the stretch for 20-30 seconds, then release.",
            "Repeat with your right leg."
        ]
    },
    {
        "bodyPart": "upper legs",
        "equipment": "assisted",
        "gifUrl": "https://v2.exercisedb.io/image/m5o20qHHmcI9CO",
        "id": "1712",
        "name": "assisted side lying adductor stretch",
        "target": "adductors",
        "secondaryMuscles": [
            "hamstrings",
            "glutes"
        ],
        "instructions": [
            "Lie on your side with your legs straight and stacked on top of each other.",
            "Bend your bottom leg slightly for stability.",
            "Place your top foot on a stable surface, such as a bench or step.",
            "Keeping your top leg straight, slowly lower it towards the ground, feeling a stretch in your inner thigh.",
            "Hold the stretch for 20-30 seconds.",
            "Return to the starting position and repeat on the other side."
        ]
    },
    {
        "bodyPart": "upper legs",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/JHmvGFwSTJV7rz",
        "id": "1473",
        "name": "backward jump",
        "target": "quads",
        "secondaryMuscles": [
            "hamstrings",
            "glutes",
            "calves"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart.",
            "Bend your knees slightly and jump backwards, pushing off with both feet.",
            "Land softly on the balls of your feet, bending your knees to absorb the impact.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "upper legs",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/wLGOe6qTFDmo3-",
        "id": "0020",
        "name": "balance board",
        "target": "quads",
        "secondaryMuscles": [
            "calves",
            "hamstrings",
            "glutes"
        ],
        "instructions": [
            "Place the balance board on a flat surface.",
            "Step onto the balance board with one foot, ensuring it is centered.",
            "Slowly shift your weight onto the foot on the balance board, keeping your core engaged.",
            "Maintain your balance and stability as you hold the position for a desired amount of time.",
            "Repeat the exercise with the other foot."
        ]
    },
    {
        "bodyPart": "upper legs",
        "equipment": "band",
        "gifUrl": "https://v2.exercisedb.io/image/EFzfPS6Hyo3vK6",
        "id": "0980",
        "name": "band bent-over hip extension",
        "target": "glutes",
        "secondaryMuscles": [
            "hamstrings",
            "lower back"
        ],
        "instructions": [
            "Attach the band to a sturdy anchor point at ankle height.",
            "Stand facing away from the anchor point with your feet shoulder-width apart.",
            "Step back to create tension in the band, keeping your knees slightly bent.",
            "Hinge at the hips and lean forward, maintaining a neutral spine.",
            "Extend your right leg straight back, squeezing your glutes at the top.",
            "Lower your right leg back down and repeat with the left leg.",
            "Continue alternating legs for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/tPDuAS64FwZosD",
        "id": "0001",
        "name": "3/4 sit-up",
        "target": "abs",
        "secondaryMuscles": [
            "hip flexors",
            "lower back"
        ],
        "instructions": [
            "Lie flat on your back with your knees bent and feet flat on the ground.",
            "Place your hands behind your head with your elbows pointing outwards.",
            "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
            "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/eM-yeWh7DSJkYn",
        "id": "0002",
        "name": "45° side bend",
        "target": "abs",
        "secondaryMuscles": [
            "obliques"
        ],
        "instructions": [
            "Stand with your feet shoulder-width apart and your arms extended straight down by your sides.",
            "Keeping your back straight and your core engaged, slowly bend your torso to one side, lowering your hand towards your knee.",
            "Pause for a moment at the bottom, then slowly return to the starting position.",
            "Repeat on the other side.",
            "Continue alternating sides for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/Xmj9MN7UPnzr0D",
        "id": "0003",
        "name": "air bike",
        "target": "abs",
        "secondaryMuscles": [
            "hip flexors"
        ],
        "instructions": [
            "Lie flat on your back with your hands placed behind your head.",
            "Lift your legs off the ground and bend your knees at a 90-degree angle.",
            "Bring your right elbow towards your left knee while simultaneously straightening your right leg.",
            "Return to the starting position and repeat the movement on the opposite side, bringing your left elbow towards your right knee while straightening your left leg.",
            "Continue alternating sides in a pedaling motion for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/R3Q6yjiPEg6PRM",
        "id": "0006",
        "name": "alternate heel touchers",
        "target": "abs",
        "secondaryMuscles": [
            "obliques"
        ],
        "instructions": [
            "Lie flat on your back with your knees bent and feet flat on the ground.",
            "Extend your arms straight out to the sides, parallel to the ground.",
            "Engaging your abs, lift your shoulders off the ground and reach your right hand towards your right heel.",
            "Return to the starting position and repeat on the left side, reaching your left hand towards your left heel.",
            "Continue alternating sides for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/IDmUjHHyylalim",
        "id": "2355",
        "name": "arm slingers hanging bent knee legs",
        "target": "abs",
        "secondaryMuscles": [
            "shoulders",
            "back"
        ],
        "instructions": [
            "Hang from a pull-up bar with your arms fully extended and your knees bent at a 90-degree angle.",
            "Engage your core and lift your knees towards your chest, bringing them as close to your elbows as possible.",
            "Slowly lower your legs back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/zcZyaeEXGqK9Ge",
        "id": "2333",
        "name": "arm slingers hanging straight legs",
        "target": "abs",
        "secondaryMuscles": [
            "shoulders",
            "back"
        ],
        "instructions": [
            "Hang from a pull-up bar with your arms fully extended and your legs straight down.",
            "Engage your core and lift your legs up in front of you until they are parallel to the ground.",
            "Hold for a moment at the top, then slowly lower your legs back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/tQlcvISVpMV77y",
        "id": "3204",
        "name": "arms overhead full sit-up (male)",
        "target": "abs",
        "secondaryMuscles": [
            "hip flexors",
            "lower back"
        ],
        "instructions": [
            "Lie flat on your back with your knees bent and feet flat on the ground.",
            "Extend your arms overhead, keeping them straight.",
            "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is upright.",
            "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "assisted",
        "gifUrl": "https://v2.exercisedb.io/image/qJDzmZ83ZaarVW",
        "id": "0011",
        "name": "assisted hanging knee raise",
        "target": "abs",
        "secondaryMuscles": [
            "hip flexors"
        ],
        "instructions": [
            "Hang from a pull-up bar with your arms fully extended and your palms facing away from you.",
            "Engage your core muscles and lift your knees towards your chest, bending at the hips and knees.",
            "Pause for a moment at the top of the movement, squeezing your abs.",
            "Slowly lower your legs back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "assisted",
        "gifUrl": "https://v2.exercisedb.io/image/cYAJP5V4S62ruW",
        "id": "0010",
        "name": "assisted hanging knee raise with throw down",
        "target": "abs",
        "secondaryMuscles": [
            "hip flexors",
            "lower back"
        ],
        "instructions": [
            "Hang from a pull-up bar with your arms fully extended and your palms facing away from you.",
            "Engage your core and lift your knees towards your chest, keeping your legs together.",
            "Once your knees are at chest level, explosively throw your legs down towards the ground, extending them fully.",
            "Allow your legs to swing back up and repeat the movement for the desired number of repetitions."
        ]
    },
    {
        "bodyPart": "waist",
        "equipment": "assisted",
        "gifUrl": "https://v2.exercisedb.io/image/x37fepCxhD8VFS",
        "id": "0012",
        "name": "assisted lying leg raise with lateral throw down",
        "target": "abs",
        "secondaryMuscles": [
            "hip flexors",
            "obliques"
        ],
        "instructions": [
            "Lie flat on your back with your legs extended and your arms by your sides.",
            "Place your hands under your glutes for support.",
            "Engage your abs and lift your legs off the ground, keeping them straight.",
            "While keeping your legs together, lower them to one side until they are a few inches above the ground.",
            "Pause for a moment, then lift your legs back to the starting position.",
            "Repeat the movement to the other side.",
            "Continue alternating sides for the desired number of repetitions."
        ]
    }
]

const bodyParts = [
    'back', 
    'cardio', 
    'chest', 
    'lower arms', 
    'lower legs', 
    'neck', 
    'shoulders', 
    'upper arms', 
    'upper legs', 
    'waist'
  ];
  
    const { user } = useUser();
  const [date, setDate] = useState(() => {
    const dateInUTC = new Date();
    const utcTime = dateInUTC.getTime();
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    return new Date(utcTime + ISTOffset);
  });
  const [workoutLog, setWorkoutLog] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedExercise, setSelectedExercise] = useState(null);
  
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);
{/* 
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  useEffect(() => {
    const fetchExercises = async () => {
      const exerciseData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?offset=0&limit=10",
        ["back"]
      );
      setExercises(exerciseData);
    };
    console.log(exercises)
    
    const fetchBodyParts = async () => {
      const url = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";
      try {
        const bodyParts = await fetchData(url, exerciseOptions);
        setBodyParts(bodyParts);
      } catch (error) {
        console.error("Error fetching body parts:", error);
      }
      console.log(bodyParts)
    };
    
    fetchBodyParts();
    fetchExercises();
    
    
  }, []);
  */}

  const handleDateChange = (newDate) => {
    const utcTime = newDate.getTime(); // Get the timestamp of the new date
    const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset: 5.5 hours in milliseconds
    const newDateInIST = new Date(utcTime + ISTOffset); // Adjust to IST
    setDate(newDateInIST); // Update state with the new date in IST
  };

  const handleLogWorkout = (exercise, sets, reps) => {
    const dateString = date.toISOString().split("T")[0];
    setWorkoutLog((prevLog) => ({
      ...prevLog,
      [dateString]: {
        ...(prevLog[dateString] || {}),
        [exercise.id]: { sets, reps },
      },
    }));
    setReps(1);
    setSets(1);
    onClose();
  };

  const formatDate = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-IN", options); // Use "en-IN" locale for a more natural date format
  };

  const getDayStatus = (selectedDate) => {
    const today = new Date();
    const selected = new Date(selectedDate);
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    const diffTime = selected - today;

    if (diffTime === 0) {
      return "Today";
    }
    if (diffTime === 86400000) {
      return "Tomorrow";
    }
    if (diffTime === -86400000) {
      return "Yesterday";
    }
    return formatDate(selected);
  };

  const getLoggedWorkout = (exercise) => {
    const dateString = date.toISOString().split("T")[0];
    return workoutLog[dateString]?.[exercise.id] || null;
  };

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      return (
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedBodyPart || exercise.bodyPart === selectedBodyPart)
      );
    });
  }, [searchTerm, selectedBodyPart, exercises]);

    const todaysWorkouts = useMemo(() => {
      
    const dateString = date.toISOString().split("T")[0];
      const todaysLog = workoutLog[dateString] || {};
      
    return Object.entries(todaysLog)
      .map(([id, log]) => {
          const exercise = exercises.find((e) => e.id === id);
        return exercise ? { ...exercise, ...log } : null;
      })
      .filter(Boolean);
  }, [date, workoutLog, exercises]);

  const headerText = getDayStatus(date);

  return (
    <Container maxW="container.xl" py={8}>
      
      <Grid templateColumns={{ base: "1fr", md: "1fr " }} gap={6}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
          <Box minW="600px" bg="white" p={4} borderRadius="md" boxShadow="sm">
            <Heading size="lg" mb={6} textAlign="center" color="primary.700">
        {headerText}
      </Heading>
      
      {todaysWorkouts.length > 0 ? (
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Exercise</Th>
                <Th>Sets</Th>
                <Th>Reps</Th>
              </Tr>
            </Thead>
            <Tbody>
              {todaysWorkouts.map((workout, index) => (
                <Tr key={index}>
                  <Td fontWeight="bold" color="primary.700">{workout.name}</Td>
                  <Td>{workout.sets}</Td>
                  <Td>{workout.reps}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text textAlign="center" color="gray.500">
          No workouts logged for today.
        </Text>
      )}
          </Box>
          <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
            <Calendar onChange={handleDateChange} value={date} />
          </Box>
        </Grid>
        <Box mx="auto" p={4}>
          <Flex mb={4} alignItems="center">
            <Input
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              mr={2}
              flex="1"
            />
            <Button leftIcon={<SearchIcon />} colorScheme="orange">
              Search
            </Button>
          </Flex>
          <Wrap spacing={2} mb={4}>
            {bodyParts.map((bodyPart) => (
              <WrapItem key={bodyPart}>
                <Button
                  onClick={() =>
                    setSelectedBodyPart(
                      selectedBodyPart === bodyPart ? null : bodyPart
                    )
                  }
                  colorScheme={selectedBodyPart === bodyPart ? "orange" : "gray"}
                  variant={selectedBodyPart === bodyPart ? "solid" : "outline"}
                >
                  {bodyPart}
                </Button>
              </WrapItem>
            ))}
          </Wrap>
        </Box>

        <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={4}>
          {filteredExercises.map((exercise) => (
            <Box
              key={exercise.id}
              minW="100px"
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="sm"
            >
              <Heading size="md" mb={2}>
                {exercise.name}
              </Heading>
              <Badge colorScheme="orange" mb={2}>
                {exercise.bodyPart}
              </Badge>
              <Image
                src={exercise.gifUrl}
                alt={exercise.name}
                mb={4}
                borderRadius="md"
              />
              <HStack justify="space-between">
                <Button
                  onClick={() => {
                    setSelectedExercise(exercise);
                    onOpen();
                  }}
                  colorScheme="orange"
                  variant="outline"
                >
                  Instructions
                </Button>
                <Button
                  onClick={() => {
                    setSelectedExercise(exercise);
                    onOpen();
                  }}
                  colorScheme="orange"
                >
                  Log Workout
                </Button>
              </HStack>
              {getLoggedWorkout(exercise) && (
                <Text mt={2}>
                  Logged: {getLoggedWorkout(exercise).sets} sets,{" "}
                  {getLoggedWorkout(exercise).reps} reps
                </Text>
              )}
            </Box>
          ))}
        </Grid>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedExercise?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>{selectedExercise?.instructions}</Text>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogWorkout(selectedExercise, sets, reps);
              }}
            >
              <FormControl>
                <FormLabel>Sets</FormLabel>
                <NumberInput
                  value={sets}
                  min={1}
                  onChange={(value) => setSets(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Reps</FormLabel>
                <NumberInput
                  value={reps}
                  min={1}
                  onChange={(value) => setReps(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <ModalFooter>
                <Button type="submit" colorScheme="orange">
                  Log Workout
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default WorkoutLog;
