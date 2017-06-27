'use strict';

var moment = require('moment');

require('twix');

/**
 * returns the number of days inside of the date list
 * that lie within the last `period` days counted backwards from
 * the reference date
 * @param  {[type]} period        the amount of days to look back
 * @param  {[type]} referenceMoment the date relative to which the period counts
 * @param  {[type]} durations     the list of date periods with start and end date
 * @return {int}                  the amount of days
 */
var getDaysWithinPeriod = function getDaysWithinPeriod(period, referenceMoment, durations) {
  var periodDuration = moment.duration(period, 'days');
  var periodRange = periodDuration.beforeMoment(referenceMoment);

  var ranges = durations.map(function (duration) {
    return moment.twix(duration.start.clone(), duration.end.clone());
  });

  var rangesInsidePeriod = ranges.map(function (range) {
    return range.intersection(periodRange);
  }).filter(function (intersection) {
    return intersection.isValid();
  });

  var dayCounts = rangesInsidePeriod.map(function (range) {
    var days = range.count('days');

    return days;
  });

  return dayCounts;
};

module.exports = getDaysWithinPeriod;