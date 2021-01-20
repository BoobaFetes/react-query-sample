import { memo } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import { userService } from "../../domain/remote-service";

type Props = { canAdd: boolean };
export const List = memo(({ canAdd }: Props) => {
  const { data, isLoading } = useQuery("all-users", () => userService.all());
  const history = useHistory();

  if (isLoading) {
    return <div>loading all users</div>;
  }
  console.log("render List");
  return (
    <div>
      {canAdd && (
        <input
          type="button"
          value="+"
          onClick={() => history.push("/user/add")}
        />
      )}
      <div>
        {data &&
          data.map((item) => (
            <div key={item.id}>
              <input
                type="button"
                value={`${item.name} ${item.nickname} (${item.age})`}
                onClick={() => history.push(`/user/${item.id}`)}
              />
            </div>
          ))}
      </div>
    </div>
  );
});
