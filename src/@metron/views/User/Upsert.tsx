import { useReducer, ChangeEventHandler } from "react";
import { useMutation, useQueryClient } from "react-query";
import { IUser } from "../../domain/entity";
import { userService } from "../../domain/remote-service";

const reducer = (prevState: Partial<IUser>, action: Partial<IUser>) =>
  ({ ...prevState, ...action } as Partial<IUser>);

export const Upsert = (props: Partial<IUser>) => {
  const queryClient = useQueryClient();
  const { mutate, reset } = useMutation<IUser, unknown, Partial<IUser>>(
    [props.id || "create-user"],
    (user) => userService.set(user as IUser),
    {
      onSuccess: async (user) => {
        queryClient.setQueryData([user.id], user);
      },
    }
  );

  const [state, dispatch] = useReducer(reducer, props);

  console.log("render Upsert");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mutate(state);
      }}
    >
      <article>
        <Field
          label="nickname"
          value={state.nickname}
          onChange={(e) => dispatch({ nickname: e.target.value })}
        />
        <Field
          label="name"
          value={state.name}
          onChange={(e) => dispatch({ name: e.target.value })}
        />
        <Field
          label="age"
          value={state.age}
          onChange={(e) =>
            dispatch({
              age: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
        <div>
          <input type="button" value="Reset" onClick={() => reset()} />
          <input type="submit" value="OK" />
        </div>
      </article>
    </form>
  );
};

type FieldProps = {
  label: string;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
const Field = ({ label, value, onChange }: FieldProps) => (
  <div>
    <span>{label}</span> <input type="text" value={value} onChange={onChange} />
  </div>
);
