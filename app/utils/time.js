import moment from 'moment'

export function convertTime (unixTimeStamp) {
    return moment.unix(unixTimeStamp).format('MM/DD/YY, hh:mm A');
}