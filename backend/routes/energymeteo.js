'use strict';
/**
Energy meteo API
*/
var http = require('http');
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var xml2js = require('xml2js');
var auth = require('../middleware/auth');
var Log = require('../models').logs;
var meteo = require('../models/meteohistory.js');
var parser = new xml2js.Parser({
    explicitArray:false
});

/**
 * @api {get} /energymeteo/tou Request a series of energy meteo levels
 * @apiGroup Energymeteo
 *
 * @apiParam {String} municipalityId  Test location(trentino users) Id, either storo or sanLorenzo
 * @apiParam {String} token
 *
 *  @apiExample {curl} Example usage:
 *  # Get API token via /api/user/token
 *  export API_TOKEN=fc35e6b2f27e0f5ef...
 *
 *  curl -i -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $API_TOKEN" -d \
 *  '{
 *      "municipalityId":'storo',
 *  }'\
 *  http://localhost:3000/api/energymeteo/tou 
 *
 * @apiSuccessExample {json} Success-Response:
 *[
 *  {
 *      date: "2016-03-06 03:00:00",
 *      tarif: "Low"
 *  },
 *  {
 *      date: "2016-03-06 06:00:00",
 *      tarif: "High"
 *  }
 *]
 */

router.get('/tou', auth.authenticate(), function(request, response,next) {
	 var municipalityId = request.query.municipalityId;
     var userid = request.query.userid;
     var options = {
                    host: '217.77.95.103',
                    path: '/api/tou/'+ municipalityId
                };
             var requestcur = http.get(options, function (res) {
                var data = [];
                     res.on('data', function(incomingData) {
                        data.push(incomingData);
                    }).on('end',function(){
                        try{
                        data = JSON.parse(data);
                        }
                        catch(err){
                            console.error("Error parsing meteo data");
                        }
                         if(data.hasOwnProperty('data')){
                            response.type('json').status('200').send(data);
                        }
                        else{
                            response.sendStatus(500);
                        }
                        
                        Log.create({
                            category: 'Energy meteo data',
                            type: 'get',
                            data: {
                                contractId: userid
                            }
                          });

                    }).on("error", function(){
                        response.sendStatus(500);
                    });                    
                });
             requestcur.setTimeout(3000, function() {
            });
            
});
/**
 * @api {get} /energymeteo/tou/current Request the current energy meteo level
* @apiGroup Energymeteo
 * @apiParam {String} municipalityId  Test location(trentino users) Id, either storo or sanLorenzo
 * @apiParam {String} token
 *
 *  @apiExample {curl} Example usage:
 *  # Get API token via /api/user/token
 *  export API_TOKEN=fc35e6b2f27e0f5ef...
 *
 *  curl -i -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $API_TOKEN" -d \
 *  '{
 *      "municipalityId":'storo',
 *  }'\
 *  http://localhost:3000/api/energymeteo/tou/storo/current
 *
 * @apiSuccessExample {json} Success-Response:
 *[
 *  {
 *      tarif: "High"
 *  }
 *]
 */
router.get('/tou/current', auth.authenticate(), function(request, response, next) {
	 var municipalityId = request.query.municipalityId;
     var userid = request.query.userid;
 var options = {
                    host: '217.77.95.103',
                    path: '/api/tou/'+ municipalityId + '/current'
                };
         var requesttou = http.get(options, function (res) {
                    var data = [];
                     res.on('data', function(incomingDataCurrent) {
                        data.push(incomingDataCurrent);
                    }).on('end',function(){
                        try{
                        data = JSON.parse(data);
                        if(data.hasOwnProperty('tarif')){
                            response.type('json').status('200').send(data);
                        }
                        }
                        catch(err){
                            console.error("Error parsing current meteo data");
                            response.sendStatus(500);
                        }
                        Log.create({
                            category: 'Energy meteo current data',
                            type: 'get',
                            data: {
                                contractId: userid
                            }
                          });

                    }).on("error",function(){
                response.sendStatus(500);
             });                    
                });
});
/**
The following script is used to retrieve all meteo data which are dumped from CN server.
Used while we generate allusagepointsummary information
*/
/*
router.get('/meteodata',auth.authenticate(),function(request,response,next){
    var municipalityId = request.query.municipalityId;
    var meteoHistory = [];
    meteo.findMeteoHistory(municipalityId,function(err,result){
        if(!err){
        result.forEach(function(meteodata){
            meteoHistory.push(meteodata);
        });
        response.status(200).type('json').send(meteoHistory);
    }else{
        response.sendStatus(500);
    }
    });
});  */

module.exports = router;

