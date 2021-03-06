/*
* @Author: KaileDing
* @Date:   2017-06-02 00:52:53
* @Last Modified by:   kaileding
* @Last Modified time: 2017-06-10 02:23:35
*/

'use strict';
import httpStatus from 'http-status'
import placeRequestValidator from '../Validators/PlaceRequestValidator'
import CLogger from '../helpers/CustomLogger'
import consts from '../config/Constants'
import googlePlaceSearchHandler from '../handlers/GooglePlaceSearchHandler'
let cLogger = new CLogger();

module.exports = {
	nearbySearch: function(req, res, next) {
		placeRequestValidator.validatePlaceSearchRequest(req).then(result => {

            googlePlaceSearchHandler({
                searchType: consts.NEARBY_SEARCH_TYPE,
                latitude: req.query.lat,
                longitude: req.query.lon,
                rankByDistance: true,
                radius: req.query.radius,
                keyWord: req.query.keyword,
                typeName: req.query.typename,
                pageToken: req.query.pagetoken
            }).then(function(results) {
                res.status(httpStatus.OK).send(results);
            }).catch(err => {
                next(err);
            });

        }).catch(error => {
            next(error);
        });
	},

	textSearch: function(req, res, next) {
		placeRequestValidator.validatePlaceSearchRequest(req).then(result => {

        	googlePlaceSearchHandler({
        		searchType: consts.TEXT_SEARCH_TYPE,
        		queryString: req.query.query,
        		latitude: req.query.lat,
        		longitude: req.query.lon,
        		radius: req.query.radius,
        		typeName: req.query.typename,
        		pageToken: req.query.pagetoken
        	}).then(function(results) {
        		res.status(httpStatus.OK).send(results);
        	}).catch(err => {
        		next(err);
        	});

        }).catch(error => {
            next(error);
        });
	},

	getPlaceDetails: function(req, res, next) {
        placeRequestValidator.validatePlaceDetailSearchRequest(req).then(result => {

            googlePlaceSearchHandler({
                searchType: consts.PLACE_DETAILS_TYPE,
                placeId: req.params.id
            }).then(function(result) {
                res.status(httpStatus.OK).send(result);
            }).catch(err => {
                next(err);
            });

        }).catch(error => {
            next(error);
        });
	}
}