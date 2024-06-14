type Props = {
  message: string;
};

export default function ChatUser({ message }: Props) {
  return (
    <article className="flex justify-end items-end pl-24 pr-16">
      <p className="bg-light p-4 rounded-lg rounded-br-sm max-w-[80rem] leading-[175%]">
        Lorem ipsum dolor sit amet consectetur. Quisque sit amet et in. Quis
        quisque mi penatibus proin ut et amet.
      </p>
    </article>
  );
}
