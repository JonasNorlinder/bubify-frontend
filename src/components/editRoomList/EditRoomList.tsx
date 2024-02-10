import { Button, Chip, FormControl, FormGroup, TextField } from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import React from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

interface Props { }

function EditRoomList(props: Props) {
  const [newRoom, setNewRoom] = React.useState<String>("");
  const [roomList, setRoomList] = React.useState<String[]>([]);
  React.useEffect(() => {
    handleGetRooms();
  }, []);

  async function handleNewRoom() {
    const response = await axios.post("/course/room", {
      room: newRoom
    });
    setNewRoom("");
    if (response?.data) {
      toast("Added room", { type: "success" })
      setRoomList(response.data.rooms);
    }
  }

  async function handleDeleteRoom(name: String) {
    const response = await axios.delete("/course/room/" + name);
    if (response?.data) {
      toast("Removed room", { type: "success" })
      setRoomList(response.data.rooms);
    }
  }

  async function handleGetRooms() {
    const response = await axios.get("/course/room", {headers: { 'Cache-Control': 'no-cache' }});
    if (response?.data?.rooms) {
      setRoomList(response?.data?.rooms.sort());
    }
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
      >
        <Typography>Edit list of predefined rooms</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl style={{width: "100%"}}>
          <FormGroup>
            <Typography>
              <div>
                {roomList.map(r => {
                  return <>
                  <Chip
                    color="secondary"
                    label={r} style={{ marginLeft: "10px", marginBottom: "10px" }}
                    onDelete={() => handleDeleteRoom(r)}
                  /></>})}
                  <TextField
                  id="new-room"
                  label="New room"
                  value={newRoom}
                  fullWidth
                  onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                    if (event.key === "Enter") handleNewRoom();
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNewRoom(event.target.value);
                  }}
                />
                <Button onClick={handleNewRoom} fullWidth>
                  Create room
                </Button>
              </div>
            </Typography>
            </FormGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
}

export default EditRoomList;
