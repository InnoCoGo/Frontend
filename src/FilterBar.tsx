import dayjs, {Dayjs} from "dayjs";
import {Button, FormControl, InputLabel, NativeSelect} from "@mui/material";
import {injectIntl, IntlShape} from "react-intl";
import {MobileDateTimePicker} from "@mui/x-date-pickers";

type selectOption = { value: string; label: string };

export function Selector(props: {
    defaultValue: string,
    intl: IntlShape,
    inputName: string,
    labelId: string,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    selectOptions: selectOption[]
}) {
    return <div style={{textAlign: 'left'}}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
            {props.intl.formatMessage({id: props.labelId})}
        </InputLabel>
        <div className="flex-container-horizontal"><FormControl fullWidth>
            <NativeSelect
                defaultValue={props.defaultValue}
                inputProps={{
                    name: props.inputName,
                    id: "uncontrolled-native",
                }}
                onChange={props.onChange}
            >
                {
                    props.selectOptions.map((selectOption) =>
                        <option value={selectOption.value}
                                key={parseInt(selectOption.value)}>{selectOption.label}</option>
                    )
                }
            </NativeSelect>
        </FormControl></div>
    </div>;
}

export function CustomizedDateTimeSelector(props: {
    intl: IntlShape,
    labelId: string,
    chosenDateTime: Dayjs,
    onDateTimeChange: (newValue: Dayjs) => void,
}) {
    return <div style={{textAlign: 'left'}}>

        <InputLabel variant="standard" htmlFor="uncontrolled-native">
            {props.intl.formatMessage({id: props.labelId})}
        </InputLabel>
        <div className="flex-container-horizontal"><FormControl fullWidth>

            <MobileDateTimePicker
                value={props.chosenDateTime}
                onChange={(newValue) => props.onDateTimeChange(newValue == null? dayjs() : newValue)}
            />
        </FormControl></div>
    </div>;
}

function FilterBar(props: {
    intl: IntlShape,
    prefersDark: boolean,

    travelPointOptions: selectOption[],
    driverPointOptions: selectOption[],

    // start location
    defaultValueStartLocation: string,
    onChangeStartLocation: (newValue: string) => void,

    // end location
    defaultValueEndLocation: string,
    onChangeEndLocation: (newValue: string) => void,

    // time
    chosenDateTime: Dayjs,
    onDateTimeChange: (newValue: Dayjs) => void,

    //is driver
    defaultValueIsDriver: string,
    onChangeIsDriver: (newValue: string) => void,

    onConfirmFilters: () => void,
    onConfirmCreate: () => void
}) {
    return <div className="flex-container">
        <Selector intl={props.intl} onChange={(event) => props.onChangeStartLocation(event.target.value)}
                  defaultValue={props.defaultValueStartLocation} selectOptions={props.travelPointOptions} labelId={"trip_from"} inputName={"from-filters"}/>
        <Selector intl={props.intl} onChange={(event) => props.onChangeEndLocation(event.target.value)}
                  defaultValue={props.defaultValueEndLocation} selectOptions={props.travelPointOptions} labelId={"trip_to"} inputName={"to-filters"}/>
        <Selector intl={props.intl} onChange={(event) => props.onChangeIsDriver(event.target.value)}
                  defaultValue={props.defaultValueIsDriver} selectOptions={props.driverPointOptions} labelId={"is_driver"} inputName={"is-driver-filters"}/>
        <CustomizedDateTimeSelector intl={props.intl} labelId={"at"} chosenDateTime={props.chosenDateTime}
                                    onDateTimeChange={props.onDateTimeChange}/>
        <div className="flex-container-horizontal">
            <Button variant="contained" disableElevation
                    onClick={props.onConfirmFilters}>{props.intl.formatMessage({id: "apply_filters"})}</Button>
            <Button variant="contained" disableElevation
                    onClick={props.onConfirmCreate}>{props.intl.formatMessage({id: "create_trip_ui"})}</Button>
        </div>
    </div>;
}

export default injectIntl(FilterBar);