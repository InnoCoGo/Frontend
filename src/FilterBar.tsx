import {Dayjs} from "dayjs";
import {Button, FormControl, InputLabel, NativeSelect} from "@mui/material";
import {injectIntl, IntlShape} from "react-intl";

// function getThemeSelector(prefersDark: boolean) {
//     return (theme: Theme) => ({
//         ...theme,
//         colors: {
//             primary25: prefersDark ? 'gray' : '#C1C1C1',
//             primary: prefersDark ? '#C1C1C1' : 'gray',
//             neutral0: (prefersDark ? 'black' : 'white'),
//             primary75: '', primary50: '', danger: '',
//             dangerLight: '', neutral5: '', neutral10: '', neutral20: '',
//             neutral30: '', neutral40: '', neutral50: '', neutral60: '',
//             neutral70: '', neutral80: '', neutral90: ''
//         },
//     })
// }

type selectOption = { value: string; label: string };

function FilterBar(props: {
    intl: IntlShape,
    prefersDark: boolean,

    travelPointOptions: selectOption[],
    driverPointOptions: selectOption[],

    // start location
    defaultValueStartLocation: string | null,
    onChangeStartLocation: (newValue: string | null) => void,

    // end location
    defaultValueEndLocation: string | null,
    onChangeEndLocation: (newValue: string | null) => void,

    // time
    chosenDateTime: Dayjs | null,
    onDateTimeChange: (newValue: Dayjs | null) => void,

    //is driver
    defaultValueIsDriver: string | null,
    onChangeIsDriver: (newValue: string| null) => void,

    onConfirmFilters: () => void,
    onConfirmCreate: () => void
}) {
    return <div className="flex-container">
        <div className="flex-container-horizontal">
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    {props.intl.formatMessage({id: "start_point"})}
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    inputProps={{
                        name: 'from-filters',
                        id: 'uncontrolled-native',
                    }}
                    onChange={(event)=>props.onChangeStartLocation(event.target.value)}
                >
                    {
                        props.travelPointOptions.map((selectOption) =>
                            <option value={selectOption.value} key={parseInt(selectOption.value)}>{selectOption.label}</option>
                        )
                    }
                </NativeSelect>
            </FormControl>

            {/*<Select*/}
            {/*    defaultValue={props.defaultValueStartLocation}*/}
            {/*    onChange={props.onChangeStartLocation}*/}
            {/*    options={props.travelPointOptions}*/}
            {/*    placeholder={props.intl.formatMessage({id: "start_point"})}*/}
            {/*    theme={getThemeSelector(props.prefersDark)}*/}
            {/*    isSearchable={false}*/}
            {/*/>*/}
        </div>
        {/*<div className="flex-container-horizontal">*/}
        {/*    {props.intl.formatMessage({id: "to"})}:*/}
        {/*    <Select*/}
        {/*        defaultValue={props.defaultValueEndLocation}*/}
        {/*        onChange={props.onChangeEndLocation}*/}
        {/*        options={props.travelPointOptions}*/}
        {/*        placeholder={props.intl.formatMessage({id: "end_point"})}*/}
        {/*        theme={getThemeSelector(props.prefersDark)}*/}
        {/*        isSearchable={false}*/}
        {/*    />*/}
        {/*</div>*/}
        {/*<div className="flex-container-horizontal">*/}
        {/*    {props.intl.formatMessage({id: "at"})}:*/}
        {/*    <MobileDateTimePicker*/}
        {/*        value={props.chosenDateTime}*/}
        {/*        onChange={props.onDateTimeChange}*/}
        {/*    />*/}
        {/*</div>*/}
        {/*<div className="flex-container-horizontal">*/}
        {/*    {props.intl.formatMessage({id: "is_driver"})}*/}
        {/*    <Select*/}
        {/*        defaultValue={props.defaultValueIsDriver}*/}
        {/*        onChange={props.onChangeIsDriver}*/}
        {/*        options={props.driverPointOptions}*/}
        {/*        placeholder={props.intl.formatMessage({id: "is_driver_placeholder"})}*/}
        {/*        theme={getThemeSelector(props.prefersDark)}*/}
        {/*        isSearchable={ false }*/}
        {/*    />*/}
        {/*</div>*/}
        <div className="flex-container-horizontal">
        <Button variant="contained" disableElevation onClick={props.onConfirmFilters}>{props.intl.formatMessage({id: "apply_filters"})}</Button>
        <Button variant="contained" disableElevation onClick={props.onConfirmCreate}>{props.intl.formatMessage({id: "create_trip_ui"})}</Button>
        </div>
    </div>;
}

export default injectIntl(FilterBar);