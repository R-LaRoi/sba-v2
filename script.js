// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      // this assignment is not due
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(courseInfo, groupAssignments, submissions) {
  let collectId = [];
  let assignmentInfo = [];
  let learnerScores = [];
  let learnerScores2 = [];
  let learnerObj = [];

  let assignmentPoints = "";

  function getLearnerId() {
    submissions.forEach((element) => {
      collectId.push(element.learner_id);
    });

    function removeDuplicates(collectId) {
      return [...new Set(collectId)];
    }

    let learnerIdArray = removeDuplicates(collectId);
    let idObj = { ...learnerIdArray };
    console.log(collectId[0]);
    console.log(collectId[4]);
    // create nested learner object
    learnerObj = [];
    for (const i in idObj) learnerObj.push({ learner_id: idObj[i] });
    console.log(learnerObj);
  }
  getLearnerId();

  function getAssignmentData(assignments) {
    assignments.forEach((element) => {
      assignmentInfo.push(element.points_possible);
    });

    submissions.forEach((element) => {
      // seperate scores by learner id
      if (element.learner_id === collectId[0]) {
        learnerScores.push(element.submission.score);
      } else if (element.learner_id === collectId[4]) {
        learnerScores2.push(element.submission.score);
      }

      function totalPoints(numbers) {
        let sum = 0;
        numbers.forEach(function (number) {
          sum += number;

          learnerObj[0].avg = Math.round(sum / learnerScores.length);
          learnerObj[1].avg = Math.round(sum / learnerScores2.length);
          assignmentPoints = Math.round(sum / learnerScores2.length);
        });
      }

      totalPoints(learnerScores);
      totalPoints(learnerScores2);
      totalPoints(assignmentInfo);
    });

    console.log(assignmentPoints);
    console.log(learnerObj);
  }
  getAssignmentData(groupAssignments.assignments);
}

getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// get the learners total avg:number and compare the total points for all the assignments

// assignment _id: number
//  each assignment needs a key
//  return the learners score % based on the total points available
