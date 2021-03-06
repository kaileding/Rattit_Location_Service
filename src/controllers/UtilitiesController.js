/*
* @Author: KaileDing
* @Date:   2017-06-19 20:32:18
* @Last Modified by:   kaileding
* @Last Modified time: 2017-06-19 21:49:41
*/

'use strict';
import httpStatus from 'http-status'
import Promise from 'bluebird'
import utilityRequestValidator from '../Validators/UtilityRequestValidator'
import awsHandler from '../handlers/AWSHandler'
import CLogger from '../helpers/CustomLogger'
let cLogger = new CLogger();

module.exports = {
	
	getSignedS3URL: function(req, res, next) {
		utilityRequestValidator.validateGetS3SignedURLRequest(req).then(result => {

			return awsHandler.getS3SignedUploadURL(req.query.filename, req.query.filetype).then(result => {
				cLogger.say(cLogger.TESTING_TYPE, 'successfully get one signed_S3_URL');
				res.status(httpStatus.OK).send(result);
			}).catch(error => {
				next(error);
			});

		}).catch(error => {
			next(error);
		});
	}

}