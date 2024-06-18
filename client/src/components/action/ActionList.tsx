import ActionItem from "./ActionItem";
import { actions, useAction } from "../../context/ActionContext";

export default function ActionList() {
  const { selectedAction, handleChangeAction } = useAction();

  return (
    <ul className="px-6 py-4">
      {actions.map((action) => (
        <ActionItem
          onClick={() => handleChangeAction(action.title)}
          {...action}
          key={action.title}
          selected={selectedAction.includes(action.title)}
        />
      ))}
    </ul>
  );
}
