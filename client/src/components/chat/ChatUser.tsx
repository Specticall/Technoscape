type Props = {
  message: string;
};

export default function ChatUser({ message }: Props) {
  return (
    <article className="flex justify-end items-end pl-24 pr-16">
      <p className="bg-light p-4 rounded-lg rounded-br-sm max-w-[80rem] leading-[175%]">
        {message}
      </p>
    </article>
  );
}
