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
  let learnerObj = [];
  let sbaObj = {};

  function getCourse(info) {
    let course = info.id;
    let title = info.name;
    sbaObj.id = course;
    sbaObj.course = title;
  }

  getCourse(courseInfo);

  function getLearnerId() {
    submissions.forEach((element) => {
      collectId.push(element.learner_id);
    });

    function removeDuplicates(collectId) {
      return [...new Set(collectId)];
    }

    let learnerIdArray = removeDuplicates(collectId);
    let idObj = { ...learnerIdArray };

    // create nested learner object
    learnerObj = [];
    for (const i in idObj) learnerObj.push({ learner_id: idObj[i] });
    // console.log(learnerObj);
  }

  getLearnerId();

  function getAssignmentData(assignments) {
    let completedAssignments = new Array();
    let completedAssignments2 = new Array();

    let learnerScores = [];
    let learnerScores2 = [];
    let perScore = new Array();
    let perScore2 = new Array();
    let assignmentObj = new Array();
    let sum = 0;

    let total_possible_points = "";

    // loop through assignments
    for (let i = 0; i < assignments.length; i++) {
      const element = assignments[i];

      // filter year
      let year = element.due_at;
      if (year.slice(0, 4) == "2023") {
        assignmentInfo.push(element.points_possible);
        let thisEl = [element];
        thisEl.forEach((element) => {
          assignmentObj.push(element);
        });
        sbaObj.assignments_due = [assignmentObj];

        assignmentInfo.forEach(function (number) {
          let assignmentPoints = "";
          sum += number;
          assignmentPoints = Math.round(sum / assignmentInfo.length);
          total_possible_points = sum;
        });
      }
    }

    learnerObj[0].total_possible_points = total_possible_points;
    learnerObj[1].total_possible_points = total_possible_points;

    submissions.forEach((element) => {
      // seperates scores by learner id
      if (element.learner_id === collectId[0]) {
        learnerScores.push(element.submission.score);
        completedAssignments.push([
          element.assignment_id,
          element.submission.score,
        ]);
        learnerObj[0].assignment_points = completedAssignments;
      } else if (element.learner_id === collectId[4]) {
        learnerScores2.push(element.submission.score);

        completedAssignments2.push([
          element.assignment_id,
          element.submission.score,
        ]);
        learnerObj[1].submitted_assignments = completedAssignments2;
      }

      //  get avg points for each learner
      function avgPoints(numbers) {
        let sum = 0;
        numbers.forEach(function (number) {
          sum += number;
          learnerObj[0].avg = Math.round(sum / learnerScores.length);
          learnerObj[1].avg = Math.round(sum / learnerScores2.length);
        });
      }

      //   calculate percentage for each learner
      function getPercentage() {
        let learner1 = learnerScores;
        let learner2 = learnerScores2;
        let pointsAssigned = assignmentInfo;

        let percentage = [];
        let percentage2 = [];

        function calculate(array1, array2) {
          if (element.learner_id === collectId[0]) {
            array1.map((num, index) => {
              percentage = ((num / array2[index]) * 100).toFixed(2);
            });
            perScore.push(Number(percentage));
            perScore.splice(3, 4);
          } else if (element.learner_id === collectId[4]) {
            array1.map((num, index) => {
              percentage2 = ((num / array2[index]) * 100).toFixed(2);
            });

            perScore2.push(Number(percentage2));
            perScore2.splice(2, 4);
          }
        }

        calculate(learnerScores, assignmentInfo);
        calculate(learnerScores2, assignmentInfo);
      }

      getPercentage();

      const percentageScore = perScore.reduce((obj, item, index) => {
        obj[index] = item;
        return obj;
      }, {});

      const percentageScore2 = perScore2.reduce((obj, item, index) => {
        obj[index] = item;
        return obj;
      }, {});

      avgPoints(learnerScores);
      avgPoints(learnerScores2);

      learnerObj[0].percents = percentageScore;
      learnerObj[1].percents = percentageScore2;
    });
  }

  // add nested learners to pareant object
  sbaObj.learners = [learnerObj];

  getAssignmentData(groupAssignments.assignments);

  let result = sbaObj;
  console.log(result);
  return result;
}

getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
