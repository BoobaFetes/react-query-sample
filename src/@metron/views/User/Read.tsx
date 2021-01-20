import { useState } from "react";
import { useQuery } from "react-query";
import { IUser } from "../../domain/entity";
import { userService } from "../../domain/remote-service";
import { Upsert } from "./Upsert";

type Props = { id: string; edit?: boolean };

export const Read = ({ id, edit }: Props) => {
  const [editState, setEdit] = useState(!!edit);
  const { data, isLoading } = useQuery<IUser>([id], () => userService.get(id));

  if (isLoading) {
    return <div>{`user ${id} is loading ...`}</div>;
  }

  if (!data) {
    return null;
  }

  console.log("render Read");
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <article>
        <div>{data.id}</div>
        <div>{`name : ${data.name} ${data.nickname}`} </div>
        <div>{`age : ${data.age} years old`}</div>
        <input
          type="button"
          value="edit"
          onClick={() => {
            setEdit(!editState);
          }}
        />
      </article>
      {editState && <Upsert {...data}></Upsert>}
    </div>
  );
};
