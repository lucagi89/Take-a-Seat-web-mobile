import {
  Alert,
  Animated,
} from "react-native";
// import { useRef } from "react";
import { Table } from "../../data/types";
import { updateTableAvailability, deleteDocument } from "../../services/databaseActions";
import { handleBooking } from "./handleBooking";

export const handleTablePress = (table: Table, tables: Table[]) => {
  // check if the table is available
      const promptFn = Alert.prompt;
      promptFn(
        "Book Table",
        "Enter party size",
        async (input) => {
          const size = parseInt(input, 10);
          if (!size || size <= 0)
            return Alert.alert("Invalid Input", "Enter a valid party size.");
          await handleBooking(table, size);
        },
        "plain-text"
      );
    // }
  };

  // const removeTable = async (id: string) => {
  //   await deleteDocument("tables", id);
  // };

  // const toggleAvailability = async (id: string, tables: Table[]) => {
  //   const tbl = tables.find((t) => t.id === id);
  //   if (!tbl) return;
  //   await updateTableAvailability(id, !tbl.isAvailable);
  // };
