import {Dayjs} from "dayjs";
import Select, {Theme} from "react-select";
import { MobileDateTimePicker} from "@mui/x-date-pickers";
import {Button, TextField} from "@mui/material";
import {injectIntl, IntlShape} from "react-intl";

function getThemeSelector(prefersDark: boolean) {
    return (theme: Theme) => ({
        ...theme,
        colors: {
            primary25: prefersDark ? 'gray' : '#C1C1C1',
            primary: prefersDark ? '#C1C1C1' : 'gray',
            neutral0: (prefersDark ? 'black' : 'white'),
            primary75: '', primary50: '', danger: '',
            dangerLight: '', neutral5: '', neutral10: '', neutral20: '',
            neutral30: '', neutral40: '', neutral50: '', neutral60: '',
            neutral70: '', neutral80: '', neutral90: ''
        },
    })
}

type selectOption = { value: string; label: string };
type selectPlacesOption = { value: number ; label: number}

function CreateBar(props: {
    intl: IntlShape,
    prefersDark: boolean,

    travelPointOptions: selectOption[],
    driverPointOptions: selectOption[],
    takenPointOptions: selectPlacesOption[],

    // start location
    defaultValueStartLocation: selectOption | null,
    onChangeStartLocation: (newValue: selectOption | null) => void,

    // end location
    defaultValueEndLocation: { value: string; label: string } | null,
    onChangeEndLocation: (newValue: selectOption | null) => void,

    // time
    chosenDateTime: Dayjs | null,
    onDateTimeChange: (newValue: Dayjs | null) => void,

    //is driver
    defaultValueIsDriver: selectOption | null,
    onChangeIsDriver: (newValue: selectOption| null) => void,

    //max place
    defaultValueMaxPlace: { value: number ; label: number } | null,
    onChangeMaxPlace: (newValue: selectPlacesOption | null) => void,
    
    //taken place
    defaultValueTakenPlace: { value: number ; label: number } | null,
    onChangeTakenPlace: (newValue: selectPlacesOption | null) => void,

    //description
    defaultValueText: string,
    onTextChange : (newValue : string) => void,

    onConfirmSubmit: () => void
    onConfirmExit: () => void
}) {
    return <div className="flex-container">
        <div className="flex-container-horizontal">
            {props.intl.formatMessage({id: "from"})}:
            <Select
                defaultValue={props.defaultValueStartLocation}
                onChange={props.onChangeStartLocation}
                options={props.travelPointOptions}
                placeholder={props.intl.formatMessage({id: "start_point"})}
                theme={getThemeSelector(props.prefersDark)}
                isSearchable={ false }
            />
        </div>
        <div className="flex-container-horizontal">
            {props.intl.formatMessage({id: "to"})}:
            <Select
                defaultValue={props.defaultValueEndLocation}
                onChange={props.onChangeEndLocation}
                options={props.travelPointOptions}
                placeholder={props.intl.formatMessage({id: "end_point"})}
                theme={getThemeSelector(props.prefersDark)}
                isSearchable={ false }
            />
        </div>
        <div className="flex-container-horizontal">
            {props.intl.formatMessage({id: "at"})}:
            <MobileDateTimePicker
                value={props.chosenDateTime}
                onChange={props.onDateTimeChange}
            />
        </div>
        <div className="flex-container-horizontal">
            {props.intl.formatMessage({id: "is_driver"})}
            <Select
                defaultValue={props.defaultValueIsDriver}
                onChange={props.onChangeIsDriver}
                options={props.driverPointOptions}
                placeholder={props.intl.formatMessage({id: "is_driver_placeholder"})}
                theme={getThemeSelector(props.prefersDark)}
                isSearchable={ false }
            />
        </div>
        <div className="flex-container-horizontal">
            {props.intl.formatMessage({id: "max_places"})}:
            <Select
                defaultValue={props.defaultValueMaxPlace}
                onChange={props.onChangeMaxPlace}
                options={props.takenPointOptions}
                placeholder={props.intl.formatMessage({id: "max_place_placeholder"})}
                theme={getThemeSelector(props.prefersDark)}
                isSearchable={ false }
            />
        </div>
        <div className="flex-container-horizontal">
            {props.intl.formatMessage({id: "places_taken"})}:
            <Select
                defaultValue={props.defaultValueTakenPlace}
                onChange={props.onChangeTakenPlace}
                options={props.takenPointOptions}
                placeholder={props.intl.formatMessage({id: "places_taken_placeholder"})}
                theme={getThemeSelector(props.prefersDark)}
                isSearchable={ false }
            />
        </div>
        <div className="flex-container-horizontal">
            {props.intl.formatMessage({id: "description"})}:
            <TextField
            type="text" 
            variant="outlined"
            value={props.defaultValueText}
            onChange={(event) => props.onTextChange(event.target.value)}
            />
        </div>
        <div className="flex-container-horizontal">
        <Button variant="contained" onClick={props.onConfirmExit}>{props.intl.formatMessage({id: "create_ui_cancel"})}</Button>
        <Button variant="contained" onClick={props.onConfirmSubmit}>{props.intl.formatMessage({id: "create_ui_confirm"})}</Button>
        </div>
    </div>;
}
export default injectIntl(CreateBar);