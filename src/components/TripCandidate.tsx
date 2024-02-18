import { useState } from "react";
import { Leg, LegProps, displayTime } from "./Leg"

export type TripCandidateProps = {
    legProps: LegProps[],
}

export const TripCandidate = (props: TripCandidateProps) => {
    const legCnt = props.legProps.length;
    const totalDepartureTime = displayTime(props.legProps.at(0)!.departureTime);
    const totalArrivalTime = displayTime(props.legProps.at(legCnt-1)!.arrivalTime);
    let [isDetailDisplayed, setIsDetailDisplayed] = useState(false);

    const handleDetailClick = () => {
        setIsDetailDisplayed(!isDetailDisplayed);
    }
    return (
        <button className="trip-candidate block" onClick={handleDetailClick}>
            <div className="summary">
                <p>{totalDepartureTime}発 → {totalArrivalTime}着 <button onClick={handleDetailClick} className={isDetailDisplayed ? "active" : "inactive"}></button></p>
            </div>

            {props.legProps.map((legProp, i) => {
                const legProps = {
                    departureTime: legProp.departureTime,
                    departureStation: legProp.departureStation,
                    arrivalTime: legProp.arrivalTime,
                    arrivalStation: legProp.arrivalStation,
                    lineName: legProp.lineName,
                    key: i,
                    display: isDetailDisplayed,
                }
                return Leg(legProps);
            })}
        </button>
    )
}