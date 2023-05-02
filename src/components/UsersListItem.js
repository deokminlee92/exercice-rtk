import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumList from "./AlbumList";

function UsersListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    // removeUser.js 에서 user prop으로 user를 삭제함
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user </div>}
      {user.name}
    </>
  );
  return (
    <ExpandablePanel header={header}>
      {/* 위에서 prop으로 user만을 받았으므로 바로 전달 가능 */}
      <AlbumList user={user} />
    </ExpandablePanel>
  );
}
export default UsersListItem;
