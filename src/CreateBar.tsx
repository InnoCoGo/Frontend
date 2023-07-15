import {Dayjs} from "dayjs";
import {Button, InputLabel, TextField} from "@mui/material";
import {injectIntl, IntlShape} from "react-intl";
import {CustomizedDateTimeSelector, Selector} from "./FilterBar.tsx";
import CreateIcon from '@mui/icons-material/Create';
import CancelIcon from '@mui/icons-material/Cancel';

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
    defaultValueEndLocation: string,
    onChangeEndLocation: (newValue: string) => void,

    // time
    chosenDateTime: Dayjs,
    onDateTimeChange: (newValue: Dayjs) => void,

    //is driver
    defaultValueIsDriver: string,
    onChangeIsDriver: (newValue: string) => void,

    //max place
    //defaultValueMaxPlace: string,
    //onChangeMaxPlace: (newValue: string) => void,

    //taken place
    defaultValueTakenPlace: string,
    onChangeTakenPlace: (newValue: string) => void,

    //description
    defaultValueText: string,
    onTextChange: (newValue: string) => void,

    onConfirmSubmit: () => void
    onConfirmExit: () => void
}) {
    return <div className="flex-container">

        <Selector intl={props.intl} onChange={(event) => props.onChangeStartLocation(event.target.value)}
                  defaultValue={props.defaultValueStartLocation} selectOptions={props.travelPointOptions}
                  labelId={"trip_from"} inputName={"from-create"}/>
        <Selector intl={props.intl} onChange={(event) => props.onChangeEndLocation(event.target.value)}
                  defaultValue={props.defaultValueEndLocation} selectOptions={props.travelPointOptions}
                  labelId={"trip_to"} inputName={"to-create"}/>
        <Selector intl={props.intl} onChange={(event) => props.onChangeIsDriver(event.target.value)}
                  defaultValue={props.defaultValueIsDriver} selectOptions={props.driverPointOptions}
                  labelId={"is_driver"} inputName={"is-driver-create"}/>
        <Selector intl={props.intl} onChange={(event) => props.onChangeTakenPlace(event.target.value)}
                  defaultValue={props.defaultValueTakenPlace} selectOptions={props.takenPointOptions}
                  labelId={"taken_places"} inputName={"taken-places-create"}/>

        <div style={{textAlign: 'left'}}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                {props.intl.formatMessage({id: 'trip_description'})}
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
        <CustomizedDateTimeSelector intl={props.intl} labelId={"at"} chosenDateTime={props.chosenDateTime}
                                    onDateTimeChange={props.onDateTimeChange}/>
        <div className="flex-container-horizontal">
            <Button variant="contained"
                    onClick={props.onConfirmExit}
                    endIcon={<CancelIcon/>}>{props.intl.formatMessage({id: "create_ui_cancel"})}</Button>
            <Button variant="contained"
                    onClick={props.onConfirmSubmit}
                    endIcon={<CreateIcon/>}>{props.intl.formatMessage({id: "create_ui_confirm"})}</Button>
        </div>
    </div>;
}

export default injectIntl(CreateBar);