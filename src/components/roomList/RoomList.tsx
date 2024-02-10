import { Chip } from "@material-ui/core";
import React from "react";
import axios from "../../utils/axios";

interface Props {
  onClick: (room: string) => void;
}

function RoomList(props: Props) {
  const [roomList, setRoomList] = React.useState<string[]>([]);
  React.useEffect(() => {
    handleGetRooms();
  }, []);

  async function handleGetRooms() {
    const response = await axios.get("/course/room");
    if (response?.data?.rooms) {
      setRoomList(response?.data?.rooms.sort());
    }
  }

  return (
        <>
          {roomList.map(r => {
            return <>
            <Chip
              color="secondary"
              label={r}
              style={{marginLeft: "10px", marginTop: "10px", marginBottom: "10px"}}
              onClick={() => props.onClick(r)}
            /></>})}
        </>);
}

export default RoomList;
