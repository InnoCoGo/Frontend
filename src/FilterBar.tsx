import {Dayjs} from "dayjs";
import Select, {Theme} from "react-select";
import {MobileDateTimePicker} from "@mui/x-date-pickers";
import {Button} from "@mui/material";
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

function FilterBar(props: {
    intl: IntlShape,
    prefersDark: boolean,

    travelPointOptions: selectOption[],

    // start location
    defaultValueStartLocation: selectOption | null,
    onChangeStartLocation: (newValue: selectOption | null) => void,

    // end location
    defaultValueEndLocation: { value: string; label: string } | null,
    onChangeEndLocation: (newValue: selectOption | null) => void,

    // time
    chosenDateTime: Dayjs | null,
    onDateTimeChange: (newValue: Dayjs | null) => void,

    onConfirmFilters: () => void
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
                isSearchable={false}
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
                isSearchable={false}
            />
        </div>
        <div className="flex-container-horizontal">
            {props.intl.formatMessage({id: "at"})}:
            <MobileDateTimePicker
                value={props.chosenDateTime}
                onChange={props.onDateTimeChange}
            />
        </div>
        <Button variant="contained" disableElevation onClick={props.onConfirmFilters}>Ok</Button>
    </div>;
}

export default injectIntl(FilterBar);