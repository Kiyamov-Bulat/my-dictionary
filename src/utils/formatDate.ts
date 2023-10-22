export const formatDate = (date: Date): string => {
    const [rawDate, rawTime] = date.toISOString().split('T');
    const strDate = rawDate.replaceAll('-', '.');
    const strTime = rawTime.split('+')[0].split('.')[0];

    return (strDate + ' ' + strTime);
};

export const formatTimestamp = (timestamp: number): string => formatDate(new Date(timestamp));