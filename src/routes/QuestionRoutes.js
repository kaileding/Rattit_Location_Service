/*
* @Author: KaileDing
* @Date:   2017-06-11 21:46:18
* @Last Modified by:   kaileding
* @Last Modified time: 2017-06-20 00:47:38
*/

'use strict';
import express from 'express';
const router = express.Router();
import requestInterceptor from '../interceptors/RequestInterceptor'
import questionsController from '../controllers/QuestionsController'

router.use('/', requestInterceptor);

router.post('/', questionsController.postQuestion);

router.get('/', questionsController.getQuestionsByQuery);

router.get('/:id', questionsController.getQuestionById);

router.get('/:id/votes', questionsController.getVotersForQuestionId);

router.patch('/:id', questionsController.updateQuestion);

router.delete('/:id', questionsController.deleteQuestion);

router.patch('/:id/voters/:voterId', questionsController.castOrChangeVoteForQuestion);

module.exports = router;