import moment from 'moment'

export function convertTime (unixTimeStamp) {
    return moment.unix(unixTimeStamp).format('M/d/YY, hh:mm A');
}