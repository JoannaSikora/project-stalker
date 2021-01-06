import moment from "moment";
import { AT_RISK, OFF_TRACK, ON_HOLD, ON_TRACK } from "./constants/statusConstants";

export const getNextId = ( currentArray ) => {
    if (currentArray.length === 0 ) {
        return 1;
    } else {
        return Math.max.apply(Math, currentArray.map(project => project.id)) + 1;
    }
};

export const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY HH:mm");
};

export const getStatusClassSuffix = (status) => {
        switch(status) {
            case ON_TRACK:
                return '--onTrack';
            case OFF_TRACK:
                return '--offTrack';
            case ON_HOLD:
                return '--onHold';
            case AT_RISK:
                return '--atRisk';
            default:
                return null;
    }
};

export const getStatusValue = (status) => {
    switch(status) {
        case ON_TRACK:
            return 'On Track';
        case OFF_TRACK:
            return 'Off Track';
        case ON_HOLD:
            return 'On Hold';
        case AT_RISK:
            return 'At Risk';
        default:
            return null;
    }
};
