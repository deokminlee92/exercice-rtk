import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

function UsersList() {
  // if true, showing skeleton loading spinner
  // const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  // const [loadingUsersError, setLoadingUsersError] = useState(null);
  // const [isCreatingUser, setIsCreatingUser] = useState(false);
  // const [creatingUserError, setCreatingUserError] = useState(null);
  //==> reFactoring avec useThunk() from hooks/use-thunk
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const dispatch = useDispatch();
  // destructuring 을 통해서 state.users 값 업데이트
  const { data } = useSelector((state) => {
    return state.users;
  });

  // 컴포넌트가 처음 렌더링 되었을 때 자동으로 보여짐
  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  // 버튼 핸들러
  const handleUserAdd = () => {
    doCreateUser();
  };

  // body of the page = content; --> 스피너로 가릴 요소만 가리기 위해서 적용
  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={10} className={"h-10 w-full"} />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
      // return (
      //   <div key={user.id} className="mb-2 border rounded">
      //     <div className="flex p-2 justify-between items-center cursor-pointer">
      //       {user.name}
      //     </div>
      //   </div>
      // );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && "ERROR CREATING USER..."}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
