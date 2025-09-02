import type { OVPass } from "../../types/ovApi.types";
import DepartureItem from "../DepartureItem/DepartureItem";
import "./DepartureList.module.css";
type departuresProps = {
  departures: OVPass[];
};

const DepartureList = ({ departures }: departuresProps) => {
  return (
    <ul>
      {departures.map((p, i) => (
        <DepartureItem key={i} pass={p} idx={i} />
      ))}
    </ul>
  );
};
export default DepartureList;
