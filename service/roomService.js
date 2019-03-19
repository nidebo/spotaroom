const fetch = require('node-fetch');
const _ = require('lodash');
const ROOM_LIMIT = 30;
const ROOM_IDS_URL = 'https://frontend-interview.spotahome.com/api/public/listings/search/markers/madrid';
const ROOM_DETAILS_URL = 'https://frontend-interview.spotahome.com/api/public/listings/search/homecards_ids?';
const DETAILS_FIELDS = [
    'adId',
    'currencySymbol',
    'pricePerMonth',
    'photoUrls.homecardHidpi',
    'title'
];

const getRoomIds = async () => {
    const response = await fetch(ROOM_IDS_URL);
    const { data } = await response.json();
    const roomIds = data.map(room => room.id);
    return roomIds;
}

const getRoomDetailUrl = (roomIds) => {
    const limitedRoomIds = roomIds.slice(0, ROOM_LIMIT);
    let params = '';
    limitedRoomIds.forEach(roomId => {
        params = params.concat(`ids[]=${roomId}&`)
    });
    return ROOM_DETAILS_URL.concat(params);
}

const getFilteredFields = (room) => {
    let filteredRoom = {};
    DETAILS_FIELDS.forEach(fieldPath => {
        const value = _.get(room, fieldPath);
        _.set(filteredRoom, fieldPath, value);
    });
    return filteredRoom;
}

const getRooms = async () => {
    const roomIds = await getRoomIds();
    const roomDetailUrl = getRoomDetailUrl(roomIds);
    const response = await fetch(roomDetailUrl);
    const { data } = await response.json();
    const fieldFilteredRooms = data.homecards.map(room => getFilteredFields(room));
    return { homecards: fieldFilteredRooms };
}


module.exports = {
    getRooms
};