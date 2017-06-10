/*
* @Author: KaileDing
* @Date:   2017-05-29 10:52:48
* @Last Modified by:   kaileding
* @Last Modified time: 2017-06-10 02:59:50
*/

'use strict';
import express from 'express'
const router = express.Router();
import httpStatus from 'http-status'
import CLogger from '../helpers/CustomLogger'
let cLogger = new CLogger();

import dbRoutes from './DBRoutes'
import placeRoutes from './PlaceRoutes'
import userRoutes from './UserRoutes'

router.use('/', (req, res, next) => {
	cLogger.say(cLogger.NEWLINE_TYPE, 'Called ['+req.method+'] '+req.url);
	next();
});

router.get('/ping', (req, res) =>
    res.status(httpStatus.OK).send({success: true})
);

router.use('/db', dbRoutes);

router.use('/locations', placeRoutes);

router.use('/users', userRoutes);

module.exports = router;