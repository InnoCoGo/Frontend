import Select, {Theme} from "react-select";
import {useState} from "react";

const theme = (theme: Theme) => ({
    ...theme,
    colors: {
        primary25: 'blue',
        primary: 'gray',
        neutral0: '', primary75: '', primary50: '', danger: '',
        dangerLight: '', neutral5: '', neutral10: '', neutral20: '',
        neutral30: '', neutral40: '', neutral50: '', neutral60: '',
        neutral70: '', neutral80: '', neutral90: ''
    },
})


export function FilterBar() {

    const [selectedDeparturePoint, setSelectedDeparturePoint] =
        useState<{ value: string; label: string; } | null>(null);
    const [selectedArrivalPoint, setSelectedArrivalPoint] =
        useState<{ value: string; label: string; } | null>(null);

    const travelPointsOptions = [
        {value: 'innopolis', label: 'Innopolis'},
        {value: 'kazan', label: 'Kazan'},
        {value: 'verkhniy uslon', label: 'Verkhniy Uslon'}
    ];
    return <div className="flex-container">
        From:
        <Select
            defaultValue={selectedDeparturePoint}
            onChange={setSelectedDeparturePoint}
            options={travelPointsOptions}
            placeholder={"Departure point"}
            theme={theme}
        />
        To:
        <Select
            defaultValue={selectedArrivalPoint}
            onChange={setSelectedArrivalPoint}
            options={travelPointsOptions}
            placeholder={"Arrival point"}
            theme={theme}
        />
        At:
    </div>;
}