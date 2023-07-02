import {Dayjs} from "dayjs";
import {Button, InputLabel, TextField} from "@mui/material";
import {injectIntl, IntlShape} from "react-intl";
import {CustomizedDateTimeSelector, Selector} from "./FilterBar.tsx";

type selectOption = { value: string; label: string };

function CreateBar(props: {
    intl: IntlShape,
    prefersDark: boolean,

    travelPointOptions: selectOption[],
    driverPointOptions: selectOption[],
    takenPointOptions: selectOption[],

    // start location
    defaultValueStartLocation: string,
    onChangeStartLocation: (newValue: string) => void,

    // end location
    defaultValueEndLocation: string ,
    onChangeEndLocation: (newValue: string) => void,

    // time
    chosenDateTime: Dayjs | null,
    onDateTimeChange: (newValue: Dayjs | null) => void,

    //is driver
    defaultValueIsDriver: string,
    onChangeIsDriver: (newValue: string) => void,

    //max place
    defaultValueMaxPlace: string,
    onChangeMaxPlace: (newValue: string) => void,
    
    //taken place
    defaultValueTakenPlace: string,
    onChangeTakenPlace: (newValue: string) => void,

    //description
    defaultValueText: string,
    onTextChange : (newValue : string) => void,

    onConfirmSubmit: () => void
    onConfirmExit: () => void
}) {
    return <div className="flex-container">

        <Selector intl={props.intl} onChange={(event) => props.onChangeStartLocation(event.target.value)}
                  selectOptions={props.travelPointOptions}  labelId={"trip_from"} inputName={"from-create"}/>
        <Selector intl={props.intl} onChange={(event) => props.onChangeEndLocation(event.target.value)}
                  selectOptions={props.travelPointOptions}  labelId={"trip_to"} inputName={"to-create"}/>
        <Selector intl={props.intl} onChange={(event) => props.onChangeIsDriver(event.target.value)}
                  selectOptions={props.driverPointOptions}  labelId={"is_driver"} inputName={"is-driver-create"}/>
        <Selector intl={props.intl} onChange={(event) => props.onChangeIsDriver(event.target.value)}
                  selectOptions={props.takenPointOptions}  labelId={"max_places"} inputName={"max-places-create"}/>
        <Selector intl={props.intl} onChange={(event) => props.onChangeIsDriver(event.target.value)}
                  selectOptions={props.takenPointOptions}  labelId={"taken_places"} inputName={"taken-places-create"}/>

        <div style={{textAlign:'left'}}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
            {"  " + props.intl.formatMessage({id: 'trip_description'})}
        </InputLabel>
        <div className="flex-container-horizontal">
            <TextField
            type="text" 
            variant="outlined"
            value={props.defaultValueText}
            onChange={(event) => props.onTextChange(event.target.value)}
            />
        </div>
        </div>
        <CustomizedDateTimeSelector intl={props.intl} labelId={"at"} chosenDateTime={props.chosenDateTime} onDateTimeChange={props.onDateTimeChange}/>
        <div className="flex-container-horizontal">
        <Button variant="contained" onClick={props.onConfirmExit}>{props.intl.formatMessage({id: "create_ui_cancel"})}</Button>
        <Button variant="contained" onClick={props.onConfirmSubmit}>{props.intl.formatMessage({id: "create_ui_confirm"})}</Button>
        </div>
    </div>;
}
export default injectIntl(CreateBar);