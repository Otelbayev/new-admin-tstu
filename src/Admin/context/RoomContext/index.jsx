import { createContext, useContext, useState } from "react";
import axios from "axios";

const RoomContext = createContext();

export const useRoomContext = () => useContext(RoomContext);

const RoomProvider = ({ children }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [eduBuildType, setEduBuildType] = useState([]);

  const getRoomTypes = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL_API}/roomtype/getallroomtypeselect`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CAPCHA_TOKEN}`,
        },
      }
    );

    if (res.status === 200) {
      setRoomTypes(
        res.data.map((e) => ({
          value: e.id,
          label: e.type,
        }))
      );
    }
  };

  const getEduBuildTypes = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/educationalbuilding/getalleducationalbuildingselect`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CAPCHA_TOKEN}`,
        },
      }
    );

    if (res.status === 200) {
      setEduBuildType(
        res.data.map((e) => ({
          value: e.id,
          label: e.name,
        }))
      );
    }
  };

  return (
    <RoomContext.Provider
      value={{ roomTypes, getRoomTypes, eduBuildType, getEduBuildTypes }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
