import {Dayjs} from "dayjs";
import Select, {Theme} from "react-select";
import {DateTimePicker} from "@mui/x-date-pickers";

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

export function FilterBar(props: {
    defaultValueStartLocation: { value: string; label: string } | null,
    onChangeStartLocation: (value: (((prevState: ({ value: string; label: string } | null)) => ({
        value: string;
        label: string
    } | null)) | { value: string; label: string } | null)) => void,
    options: ({ label: string; value: string })[],
    prefersDark: boolean,
    defaultValueEndLocation: { value: string; label: string } | null,
    onChangeEndLocation: (value: (((prevState: ({ value: string; label: string } | null)) => ({
        value: string;
        label: string
    } | null)) | { value: string; label: string } | null)) => void,
    value: Dayjs | null,
    onDateTimeChange: (newValue: Dayjs | null) => void,
    onClick: () => void
}) {
    return <div className="flex-container">
        <div className="flex-container-horizontal">
            From:
            <Select
                defaultValue={props.defaultValueStartLocation}
                onChange={props.onChangeStartLocation}
                options={props.options}
                placeholder={"Start point"}
                theme={getThemeSelector(props.prefersDark)}
            />
        </div>
        <div className="flex-container-horizontal">
            To:
            <Select
                defaultValue={props.defaultValueEndLocation}
                onChange={props.onChangeEndLocation}
                options={props.options}
                placeholder={"End point"}
                theme={getThemeSelector(props.prefersDark)}
            />
        </div>
        <div className="flex-container-horizontal">
            At:
            <DateTimePicker
                value={props.value}
                onChange={props.onDateTimeChange}
            />
        </div>
        <button onClick={props.onClick}>Ok</button>
    </div>;
}