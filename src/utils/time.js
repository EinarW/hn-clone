import moment from 'moment'

export function convertTime (unixTimeStamp) {
    return moment.unix(unixTimeStamp).format('MM/DD/YY, h:mm A');
}