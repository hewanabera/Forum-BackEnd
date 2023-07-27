const { v4: uuidv4 } = require('uuid');
const { questionById, getAllQuestions, addQuestion } = require('./question.service');

module.exports = {
    createQuestion: (req, res) => {
        //id is user id
        const { question, id } = req.body;
        req.body.postId = uuidv4();

        //validation
        if (!question || !id) {
            return res.status(400).json({ msg: 'Not all fields have been provided!' })
        }

        //sending data to question table
        addQuestion(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "database connection err" })
            }
            return res.status(200).json({
                msg: "New question was created successfully",
                data: results
            })
        })
    },
    getQuestions: (req, res) => {
        getAllQuestions((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "database connection error" })
            }
            return res.status(200).json({ data: results });
        })
    },
    getQuestionById: (req, res) => {
        //id is postId
        let id = req.params.id;
        questionById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ msg: "database connection error" })
            }
            if (!results) {
                return res.status(400).json({ msg: "Record not found" });
            }
            return res.status(200).json({ data: results });
        })
    }
}

// // Importing required modules and services
// const { v4: uuidv4 } = require('uuid');
// const { questionById, getAllQuestions, addQuestion } = require('./question.service');

// // Exporting functions related to question handling
// module.exports = {
//     createQuestion: (req, res) => {
//         // Extracting data from the request body
//         const { question, id } = req.body;

//         // Generating a unique postId using uuidv4
//         const postId = uuidv4();
//         req.body.postId = postId;

//         // Data validation
//         if (!question || !id) {
//             return res.status(400).json({ msg: 'Not all fields have been provided!' });
//         }

//         // Sending data to the question table using the addQuestion function
//         addQuestion(req.body, (err, results) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ msg: "Database connection error" });
//             }
//             return res.status(200).json({
//                 msg: "New question was created successfully",
//                 data: results
//             });
//         });
//     },
//     getQuestions: (req, res) => {
//         // Fetching all questions from the database using getAllQuestions function
//         getAllQuestions((err, results) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ msg: "Database connection error" });
//             }
//             return res.status(200).json({ data: results });
//         });
//     },
//     getQuestionById: (req, res) => {
//         // Extracting the postId from the URL parameter
//         const postId = req.params.id;

//         // Fetching a specific question by its postId using questionById function
//         questionById(postId, (err, results) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ msg: "Database connection error" });
//             }

//             // If no results are found, return a 400 status with an error message
//             if (!results) {
//                 return res.status(400).json({ msg: "Record not found" });
//             }

//             return res.status(200).json({ data: results });
//         });
//     }
// };
