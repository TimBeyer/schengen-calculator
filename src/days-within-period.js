'use strict';

const moment = require('moment');

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
const getDaysWithinPeriod = function getDaysWithinPeriod (period, referenceMoment, durations) {
  const periodDuration = moment.duration(period, 'days');
  const periodRange = periodDuration.beforeMoment(referenceMoment);

  const ranges = durations.map((duration) => {
    return moment.twix(duration.start.clone(), duration.end.clone());
  });

  const rangesInsidePeriod = ranges.map((range) => {
    return range.intersection(periodRange);
  }).filter((intersection) => {
    return intersection.isValid();
  });

  const dayCounts = rangesInsidePeriod.map((range) => {
    const days = range.count('days');

    return days;
  });

  return dayCounts;
};

module.exports = getDaysWithinPeriod;
