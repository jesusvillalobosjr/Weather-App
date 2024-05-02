import {format} from 'date-fns';

function convertDateAndTimeFormat(date) {
    const formattedDate = format(date, `PPpp`);
    return formattedDate;
}

function convertDateToWeekDay(date) {
    const formattedDate = format(date,'EEEE');
    return formattedDate;
}

export {convertDateAndTimeFormat, convertDateToWeekDay};