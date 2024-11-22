import { useMemo, useState, useContext } from "react";

import { UserContext } from "../Users/UserProvider.js";
import Header from "./Header.js";
import OverviewList from "./OverviewList.js";
import Toolbar from "./Toolbar.js";

function OverviewProvider() {
  const [showArchived, setShowArchived] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const [toDoListOverviewList, setToDoListOverviewList] = useState([
    {
      id: "td01",
      name: "První úkolovník",
      state: "active",
      owner: "u1",
      memberList: ["u2"],
    },
    {
      id: "td02",
      name: "Druhý úkolovník",
      state: "archived",
      owner: "u1",
      memberList: ["u2", "u3"],
    },
    {
      id: "td03",
      name: "Třetí úkolovník",
      state: "active",
      owner: "u3",
      memberList: [],
    },
    {
      id: "td04",
      name: "Čtvrtý úkolovník",
      state: "archived",
      owner: "u2",
      memberList: ["u1"],
    },
  ]);

  // Function to create a new list
  function handleCreate(name) {
    setToDoListOverviewList((current) => [
      ...current,
      {
        id: `td${Math.random().toString(36).substr(2, 9)}`, // Unique ID
        name,
        state: "active",
        owner: loggedInUser,
        memberList: [],
      },
    ]);
  }

  // Function to archive a list
  function handleArchive(dtoIn) {
    setToDoListOverviewList((current) =>
        current.map((item) =>
            item.id === dtoIn.id ? { ...item, state: "archived" } : item
        )
    );
  }

  // Function to delete a list
  function handleDelete(dtoIn) {
    setToDoListOverviewList((current) =>
        current.filter((item) => item.id !== dtoIn.id)
    );
  }

  // Filtered lists based on the archived state and logged-in user
  const filteredToDoListList = useMemo(() => {
    return toDoListOverviewList.filter((item) => {
      const isOwnedOrMember =
          item.owner === loggedInUser || item.memberList.includes(loggedInUser);

      if (showArchived) {
        return isOwnedOrMember;
      }
      return isOwnedOrMember && item.state === "active";
    });
  }, [showArchived, toDoListOverviewList, loggedInUser]);

  return (
      <>
        <Header />
        <Toolbar
            handleCreate={handleCreate}
            showArchived={showArchived}
            setShowArchived={setShowArchived}
        />
        <OverviewList
            OverviewList={filteredToDoListList}
            handleArchive={handleArchive}
            handleDelete={handleDelete}
        />
      </>
  );
}

export default OverviewProvider;
