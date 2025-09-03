import { List } from "@mui/material";
import type { OVPass } from "../../types/ovApi.types";
import DepartureItem from "../DepartureItem/DepartureItem";
import "./DepartureList.module.css";
type departuresProps = {
  departures: OVPass[];
};

const DepartureList = ({ departures }: departuresProps) => {
  return (
    <List disablePadding>
      {departures.map((p, i) => (
        <DepartureItem key={i} pass={p} idx={i} />
      ))}
    </List>
  );
};
export default DepartureList;
